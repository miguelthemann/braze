/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

package org.mozilla.fenix.update

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.widget.Toast
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject
import org.mozilla.fenix.BuildConfig
import org.mozilla.fenix.R
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

object BrazeUpdateChecker {
    private const val GITHUB_API_URL = "https://api.github.com/repos/miguelthemann/braze/releases/latest"
    private const val PREFS_NAME = "braze_update_checker"
    private const val KEY_LAST_CHECK = "last_check_timestamp"
    private const val THROTTLE_INTERVAL_MS = 6 * 60 * 60 * 1000L // 6 hours

    data class ReleaseInfo(
        val tagName: String,
        val versionName: String,
        val releaseUrl: String,
        val downloadUrl: String,
    )

    fun check(activity: Activity, interactive: Boolean = false) {
        val prefs = activity.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val now = System.currentTimeMillis()
        val lastCheck = prefs.getLong(KEY_LAST_CHECK, 0L)

        if (!interactive && (now - lastCheck < THROTTLE_INTERVAL_MS)) {
            return
        }

        if (interactive) {
            Toast.makeText(activity, R.string.update_checking, Toast.LENGTH_SHORT).show()
        }

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val releaseInfo = fetchLatestRelease()
                prefs.edit().putLong(KEY_LAST_CHECK, now).apply()

                withContext(Dispatchers.Main) {
                    if (activity.isFinishing || activity.isDestroyed) return@withContext

                    val currentVersion = getCurrentVersion(activity)
                    if (isNewerVersion(releaseInfo.versionName, currentVersion)) {
                        showUpdateDialog(activity, releaseInfo, currentVersion)
                    } else if (interactive) {
                        Toast.makeText(
                            activity,
                            activity.getString(R.string.update_toast_up_to_date, currentVersion),
                            Toast.LENGTH_LONG,
                        ).show()
                    }
                }
            } catch (e: Exception) {
                if (interactive) {
                    withContext(Dispatchers.Main) {
                        if (!activity.isFinishing && !activity.isDestroyed) {
                            Toast.makeText(
                                activity,
                                activity.getString(R.string.update_toast_error),
                                Toast.LENGTH_SHORT,
                            ).show()
                        }
                    }
                }
            }
        }
    }

    private fun getCurrentVersion(context: Context): String {
        val vn = try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            packageInfo.versionName
        } catch (e: Exception) {
            null
        }
        val fallback = if (!BuildConfig.VERSION_NAME.isNullOrBlank() && BuildConfig.VERSION_NAME != "null") {
            BuildConfig.VERSION_NAME
        } else {
            "1.3.1"
        }
        return if (vn.isNullOrBlank() || vn == "null") fallback else vn
    }

    private fun fetchLatestRelease(): ReleaseInfo {
        val url = URL(GITHUB_API_URL)
        val conn = url.openConnection() as HttpURLConnection
        conn.requestMethod = "GET"
        conn.setRequestProperty("Accept", "application/vnd.github.v3+json")
        conn.setRequestProperty("User-Agent", "Braze-Android-App")
        conn.connectTimeout = 10000
        conn.readTimeout = 10000

        val responseCode = conn.responseCode
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw IllegalStateException("GitHub API returned HTTP $responseCode")
        }

        val reader = BufferedReader(InputStreamReader(conn.inputStream))
        val body = reader.readText()
        reader.close()
        conn.disconnect()

        val json = JSONObject(body)
        val tagName = json.getString("tag_name")
        val cleanVersion = tagName.removePrefix("v").trim()
        val releaseUrl = json.optString("html_url", "https://github.com/miguelthemann/braze/releases/latest")

        var downloadUrl = releaseUrl
        val assets = json.optJSONArray("assets")
        if (assets != null && assets.length() > 0) {
            val primaryAbi = if (Build.SUPPORTED_ABIS.isNotEmpty()) Build.SUPPORTED_ABIS[0] else ""
            var bestApkUrl: String? = null
            var universalApkUrl: String? = null
            var fallbackApkUrl: String? = null

            for (i in 0 until assets.length()) {
                val asset = assets.getJSONObject(i)
                val name = asset.optString("name", "")
                val dlUrl = asset.optString("browser_download_url", "")
                if (name.endsWith(".apk", ignoreCase = true)) {
                    if (primaryAbi.isNotBlank() && name.contains(primaryAbi, ignoreCase = true)) {
                        bestApkUrl = dlUrl
                    } else if (name.contains("universal", ignoreCase = true)) {
                        universalApkUrl = dlUrl
                    } else if (fallbackApkUrl == null) {
                        fallbackApkUrl = dlUrl
                    }
                }
            }

            downloadUrl = bestApkUrl ?: universalApkUrl ?: fallbackApkUrl ?: releaseUrl
        }

        return ReleaseInfo(
            tagName = tagName,
            versionName = cleanVersion,
            releaseUrl = releaseUrl,
            downloadUrl = downloadUrl,
        )
    }

    fun isNewerVersion(remote: String, current: String): Boolean {
        val rParts = remote.removePrefix("v").split(".").mapNotNull { part ->
            part.takeWhile { it.isDigit() }.toIntOrNull()
        }
        val cParts = current.removePrefix("v").split(".").mapNotNull { part ->
            part.takeWhile { it.isDigit() }.toIntOrNull()
        }
        val maxLen = maxOf(rParts.size, cParts.size)
        for (i in 0 until maxLen) {
            val r = rParts.getOrElse(i) { 0 }
            val c = cParts.getOrElse(i) { 0 }
            if (r > c) return true
            if (r < c) return false
        }
        return false
    }

    private fun showUpdateDialog(activity: Activity, releaseInfo: ReleaseInfo, currentVersion: String) {
        MaterialAlertDialogBuilder(activity)
            .setTitle(activity.getString(R.string.update_dialog_title))
            .setMessage(
                activity.getString(
                    R.string.update_dialog_message,
                    releaseInfo.versionName,
                    currentVersion,
                ),
            )
            .setPositiveButton(activity.getString(R.string.update_dialog_action_download)) { _, _ ->
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(releaseInfo.downloadUrl))
                activity.startActivity(intent)
            }
            .setNegativeButton(activity.getString(R.string.update_dialog_action_later), null)
            .show()
    }
}
