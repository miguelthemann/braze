// Braze Browser - Profile Preferences (100% De-Firefoxed)
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("browser.startup.homepage", "file:///home/miguel/Projectos/braze/home/index.html");
user_pref("browser.newtabpage.enabled", true);
user_pref("browser.newtab.url", "file:///home/miguel/Projectos/braze/home/index.html");
user_pref("browser.startup.page", 1); // 1 = Open homepage

// Allow extensions placed in profile/extensions to be enabled immediately
user_pref("xpinstall.signatures.required", false);
user_pref("extensions.autoDisableScopes", 0);
user_pref("extensions.enabledScopes", 15);

// Browser UI & Behavior
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.aboutConfig.showWarning", false);
user_pref("browser.tabs.warnOnClose", false);
user_pref("browser.tabs.inTitlebar", 1);

// Disable Firefox Accounts, Sync, and Firefox View
user_pref("identity.fxaccounts.enabled", false);
user_pref("browser.tabs.firefox-view", false);
user_pref("browser.tabs.firefox-view-next", false);
user_pref("extensions.pocket.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("app.shield.optoutstudies.enabled", false);

// Braze Branding & Support links
user_pref("app.support.baseURL", "https://github.com/miguelthemann/braze");
user_pref("app.feedback.baseURL", "https://github.com/miguelthemann/braze");
user_pref("general.useragent.override", "Mozilla/5.0 (X11; Linux x86_64; rv:157.0) Gecko/20100101 Braze/1.0");

// Zero Privacy & Siberian Chaos
user_pref("privacy.trackingprotection.enabled", false);
user_pref("privacy.trackingprotection.pbmode.enabled", false);
user_pref("network.cookie.cookieBehavior", 0); // Accept all cookies with open arms
