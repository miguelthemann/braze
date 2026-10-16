# Braze Repository Architecture & Local Codebase Map

> **Repository:** `miguelthemann/braze`  
> **Base Codebase:** Mozilla Firefox (Gecko Engine + Fenix Android)  
> **Purpose:** Local navigation and architectural map for development and AI assistance.

---

## 1. Overview & Strategy

This repository is a fork of upstream Mozilla Firefox maintaining the **Braze Browser** distribution. Because Mozilla central contains millions of files and tens of gigabytes of source tree, **never run unrestricted `rg` or `grep` from the repository root**. 

All custom Braze functionality, assets, configurations, extensions, and packaging logic are isolated within well-defined modules detailed below.

---

## 2. Directory & Component Mapping

### A. Desktop Runtime & Profile (`bin/`, `profile/`, `distribution/`)
* **`bin/braze`**: The primary executable bash script for running Braze locally on Linux using a self-contained profile.
* **`distribution/policies.json`**: Firefox Enterprise policy file that forces the installation of the Braze Shields extension, sets *ITIS Copernico Search* as the default search engine, and disables telemetry/pocket/studies.
* **`profile/user.js`**: Core browser preferences configuring vertical tabs, legacy stylesheet customizations, dark theme, disabled safe-browsing telemetry, and custom update endpoints.
* **`profile/chrome/userChrome.css`**: UI styling overrides for the desktop browser shell (tab bar, nav bar, custom cat branding, runaway close buttons).
* **`profile/chrome/userContent.css`**: Content-level stylesheet overrides for internal browser pages.
* **`profile/extensions/braze-shields@miguelthemann.github.io.xpi`**: Staged packaged extension for local profile runs.

### B. Braze Shields WebExtension (`extension/`)
* **`extension/manifest.json`**: WebExtension Manifest v2 configured for Gecko (id: `braze-shields@miguelthemann.github.io`).
* **`extension/background.js`**: Background service worker handling Dogecoin mining simulation, periodic Siberian zero-privacy notifications, tracker inversion logic, and automatic GitHub release update checks.
* **`extension/content/reverse_adblock.js` & `reverse_adblock.css`**: Injected script that places pulsing neon borders around ad slots and generates runaway close buttons and Windows 98 pop-ups.
* **`extension/newtab/`**: Custom New Tab page:
  * `index.html`: Dashboard structure.
  * `newtab.js`: Real-time Dogecoin ticker, wasted time counter, and Copernico search logic.
  * `newtab.css`: Dark purple/orange dashboard theme.
  * `copernico.xml`: OpenSearch description for Copernico Search.
* **`extension/popup/`**: Toolbar action popup (`popup.html`, `popup.js`) displaying shield statistics and toggles.
* **`extension/_locales/`**: Localization strings (`pt_PT`, `en_US`, `en_GB`, `it_IT`).
* **`braze-shields.xpi`**: Root-level compiled extension package.

### C. Desktop Gecko Branding & Theming (`browser/branding/braze/`, `browser/themes/`)
* **`browser/branding/braze/`**: Gecko desktop branding module containing:
  * `moz.build`, `content/moz.build`, `locales/moz.build`: Gecko build definitions.
  * `locales/en-US/brand.ftl` & `brand.properties`: Brand identifiers (`-brand-short-name = Braze`, `-brand-full-name = Braze Browser`).
  * `content/about-logo.svg`, `about-wordmark.svg`, `firefox.ico`, `default128.png`, `Assets.car`: App icons and artwork for Linux, Windows, and macOS.
* **`browser/themes/addons/braze/`**: Official built-in dark & vibrant orange theme (`#14111f`, `#ff6600`).
* **`browser/themes/BuiltInThemeConfig.sys.mjs`**: Upstream registry modified to include `braze-theme@miguelthemann.github.io`.
* **`browser/themes/addons/jar.mn`**: Packaging manifest for built-in theme assets.
* **`browser/app/profile/firefox.js`**: Default browser preference overrides (vertical tabs enabled, theme pre-activated, signature enforcement relaxed).

### D. Packaging & Multi-Platform CI (`packaging/`, `scripts/`, `.github/workflows/`)
* **`packaging/common/`**:
  * `autoconfig.js`: Mozilla AutoConfig preference loader (`general.config.filename = "braze.cfg"`).
  * `braze.cfg`: Startup script deploying `chrome/` styles and setting user preferences in newly created profiles.
* **`packaging/mozconfigs/`**:
  * `mozconfig-linux`: Native Linux Gecko build configuration (`--with-branding=browser/branding/braze`, `--disable-telemetry`).
  * `mozconfig-windows`: Windows x64 build configuration (`target=x86_64-pc-windows-msvc`).
  * `mozconfig-android`: Android AArch64 GeckoView build configuration.
* **`packaging/windows/installer.nsi`**: NSIS installer recipe generating `Braze-Setup-${VERSION}.exe`, killing running instances, writing registry entries, and placing shortcuts.
* **`packaging/arch/PKGBUILD`**: Arch Linux packaging script generating `braze-bin` package.
* **`scripts/build-linux-packages.sh`**: Standalone Linux packaging script using FPM to download latest official Gecko base, inject Braze identity and profile, and compile `.deb` and `.rpm` installers.
* **`.github/workflows/build-installers.yml`**: Unified GitHub Actions workflow for building Linux (`.deb`, `.rpm`), Arch (`.pkg.tar.zst`), Windows (`.exe`), and Android (`.apk`).

### E. Android App / Fenix (`mobile/android/`)
* **`mobile/android/branding/braze/`**: Android GeckoView branding definition and resources.
* **`mobile/android/fenix/app/src/main/res/`**:
  * `mipmap-*/`: App launcher icons and adaptive icons (`ic_launcher.webp`, `ic_launcher_round.webp`).
  * `drawable-*/`: Wordmarks, splash logos, onboarding banners (`ic_splash_logo.xml`, `ic_onboarding_welcome.xml`).
  * `values/colors.xml`: Braze brand palette.
  * `values/strings.xml`, `values-pt-rPT/`, `values-pt-rBR/`: Localized app strings.
* **`mobile/android/fenix/app/src/main/java/org/mozilla/fenix/update/BrazeUpdateChecker.kt`**: In-app updater querying `https://api.github.com/repos/miguelthemann/braze/releases/latest`, resolving ABI-specific APKs (arm64-v8a, universal), and prompting the user to update.
* **`mobile/android/fenix/app/src/main/java/org/mozilla/fenix/HomeActivity.kt`**: Triggers background update checks on resume.
* **`mobile/android/fenix/app/src/main/java/org/mozilla/fenix/settings/about/`**: "Verificar atualizações" setting entry.
* **`mobile/android/gradle/mozconfig.gradle`**: Dynamic JSON fallback allowing Fenix Gradle compilation without requiring full `./mach configure`.
* **`mobile/android/android-components/components/lib/crash/`**: Standalone build crash report stub.

### F. Root Metadata & Assets
* **`assets/`**: Master SVG logo (`cat_logo.svg`), PNG icons (16, 32, 48, 128), and Windows ICO (`icon.ico`).
* **`braze.desktop`**: Linux XDG desktop entry with `Categories=Network;WebBrowser;` and `Icon=braze`.
* **`README.md`**: User documentation, download table linked to GitHub Releases, and feature descriptions.
* **`LICENSE`** & **`LICENSE-MOZILLA.txt`**: Dual-licensing documentation (MIT for Braze unique components, MPL-2.0 for Mozilla code).

---

## 3. Fast Search & Navigation Guide for Agents

When searching or inspecting code, **always narrow the search path**:

| Target Area | Recommended Path for `rg` / File Tools |
| :--- | :--- |
| **Extension & Chaos Engine** | `extension/` |
| **Profile & User Preferences** | `profile/`, `distribution/` |
| **Desktop Branding & Theme** | `browser/branding/braze/`, `browser/themes/` |
| **Linux / Windows Packaging** | `packaging/`, `scripts/`, `.github/workflows/` |
| **Android (Fenix) App** | `mobile/android/fenix/app/src/`, `mobile/android/branding/braze/` |
| **Android Build / Gradle** | `mobile/android/gradle/`, `mobile/android/fenix/build.gradle` |
| **Upstream Gecko Core** | `toolkit/`, `browser/app/`, `dom/`, `netwerk/` *(target specific directories only)* |

---

## 4. Common Developer Workflows

### 1. Launching Braze Locally (Linux)
```bash
./bin/braze
```

### 2. Packaging the WebExtension
```bash
cd extension
zip -r ../braze-shields.xpi manifest.json background.js content/ newtab/ popup/ icons/ _locales/
cp ../braze-shields.xpi ../profile/extensions/braze-shields@miguelthemann.github.io.xpi
```

### 3. Building Linux Distro Packages (.deb / .rpm)
```bash
./scripts/build-linux-packages.sh 1.3.1
```

### 4. Building Android (Fenix) Locally
```bash
cd mobile/android/fenix
./gradlew :app:assembleBeta --no-daemon -x test -PdisableOptimization
```

### 5. Compiling Native Gecko Engine (Full Build)
```bash
MOZCONFIG=packaging/mozconfigs/mozconfig-linux ./mach build
```
