// Braze Browser - Profile Preferences
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

// Zero Privacy & Chaos
user_pref("privacy.trackingprotection.enabled", false);
user_pref("privacy.trackingprotection.pbmode.enabled", false);
user_pref("network.cookie.cookieBehavior", 0); // Accept all cookies with open arms

// Titlebar & Window Customization
user_pref("browser.tabs.inTitlebar", 1);
