#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Copyright (c) 2026 Miguel G. (miguelthemann)
set -e

VERSION="${1:-1.3.6}"
VERSION="${VERSION#v}"
BUILD_DIR="build/braze-linux"
OUT_DIR="build"

echo "Building Linux Packages for Braze v${VERSION}..."
mkdir -p "$BUILD_DIR/opt/braze"
mkdir -p "$BUILD_DIR/usr/bin"
mkdir -p "$BUILD_DIR/usr/share/applications"
mkdir -p "$BUILD_DIR/usr/share/icons/hicolor/128x128/apps"

# 1. Download official Firefox Linux tarball
wget -qO firefox.tar.bz2 "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US"
tar -xf firefox.tar.bz2
mv firefox/* "$BUILD_DIR/opt/braze/"
rm -rf firefox firefox.tar.bz2

# 2. Inject Braze configurations & identity
sed -i 's/^Name=Firefox/Name=Braze/' "$BUILD_DIR/opt/braze/application.ini"
sed -i 's/^RemotingName=firefox/RemotingName=braze/' "$BUILD_DIR/opt/braze/application.ini"
sed -i 's/^Vendor=Mozilla/Vendor=Braze/' "$BUILD_DIR/opt/braze/application.ini"
cp "$BUILD_DIR/opt/braze/application.ini" "$BUILD_DIR/opt/braze/browser/application.ini"

# Rename binaries to native braze executables
if [ -f "$BUILD_DIR/opt/braze/firefox-bin" ]; then
  mv "$BUILD_DIR/opt/braze/firefox-bin" "$BUILD_DIR/opt/braze/braze-bin"
elif [ -f "$BUILD_DIR/opt/braze/firefox" ]; then
  cp "$BUILD_DIR/opt/braze/firefox" "$BUILD_DIR/opt/braze/braze-bin"
fi
ln -sf braze-bin "$BUILD_DIR/opt/braze/firefox-bin"
rm -f "$BUILD_DIR/opt/braze/firefox"

# Native Braze launcher at /opt/braze/braze
cat << 'EOF' > "$BUILD_DIR/opt/braze/braze"
#!/usr/bin/env bash
export MOZ_APP_DISPLAYNAME="Braze"
export MOZ_APP_NAME="braze"
export MOZ_APP_VENDOR="Braze"
export MOZ_APP_REMOTINGNAME="braze"
export XUL_APP_FILE="/opt/braze/browser/application.ini"

exec /opt/braze/braze-bin -app /opt/braze/browser/application.ini "$@"
EOF
chmod 755 "$BUILD_DIR/opt/braze/braze"
ln -sf braze "$BUILD_DIR/opt/braze/firefox"

# Distribution policies & bundled extensions (in both /opt/braze and /opt/braze/browser)
mkdir -p "$BUILD_DIR/opt/braze/distribution/extensions"
cp distribution/policies.json "$BUILD_DIR/opt/braze/distribution/"
cp braze-shields.xpi "$BUILD_DIR/opt/braze/distribution/"
cp braze-shields.xpi "$BUILD_DIR/opt/braze/distribution/extensions/braze-shields@miguelthemann.github.io.xpi"

mkdir -p "$BUILD_DIR/opt/braze/browser/distribution/extensions"
cp distribution/policies.json "$BUILD_DIR/opt/braze/browser/distribution/"
cp braze-shields.xpi "$BUILD_DIR/opt/braze/browser/distribution/"
cp braze-shields.xpi "$BUILD_DIR/opt/braze/browser/distribution/extensions/braze-shields@miguelthemann.github.io.xpi"

# AutoConfig loaders (in both root defaults and browser defaults)
mkdir -p "$BUILD_DIR/opt/braze/defaults/pref"
cp packaging/common/autoconfig.js "$BUILD_DIR/opt/braze/defaults/pref/autoconfig.js"
mkdir -p "$BUILD_DIR/opt/braze/browser/defaults/preferences"
cp packaging/common/autoconfig.js "$BUILD_DIR/opt/braze/browser/defaults/preferences/autoconfig.js"

# AutoConfig script (in both /opt/braze and /opt/braze/browser)
cp packaging/common/braze.cfg "$BUILD_DIR/opt/braze/braze.cfg"
cp packaging/common/braze.cfg "$BUILD_DIR/opt/braze/browser/braze.cfg"

# Braze stylesheets & assets (in both /opt/braze/chrome and /opt/braze/browser/chrome)
mkdir -p "$BUILD_DIR/opt/braze/chrome"
cp -r profile/chrome/* "$BUILD_DIR/opt/braze/chrome/"
mkdir -p "$BUILD_DIR/opt/braze/browser/chrome"
cp -r profile/chrome/* "$BUILD_DIR/opt/braze/browser/chrome/"

# Window and system icons
mkdir -p "$BUILD_DIR/opt/braze/browser/chrome/icons/default"
cp assets/icon-128.png "$BUILD_DIR/opt/braze/browser/chrome/icons/default/default128.png"
mkdir -p "$BUILD_DIR/opt/braze/chrome/icons/default"
cp assets/icon-128.png "$BUILD_DIR/opt/braze/chrome/icons/default/default128.png"

# 3. Launcher script for /usr/bin/braze
cat << 'EOF' > "$BUILD_DIR/usr/bin/braze"
#!/usr/bin/env bash
export MOZ_APP_DISPLAYNAME="Braze"
export MOZ_APP_NAME="braze"
export MOZ_APP_VENDOR="Braze"
export MOZ_APP_REMOTINGNAME="braze"
export XUL_APP_FILE="/opt/braze/browser/application.ini"

exec /opt/braze/braze "$@"
EOF
chmod 755 "$BUILD_DIR/usr/bin/braze"

# 4. Desktop entry and icons
cp braze.desktop "$BUILD_DIR/usr/share/applications/"
for size in 16 32 48 128; do
  mkdir -p "$BUILD_DIR/usr/share/icons/hicolor/${size}x${size}/apps"
  if [ -f "assets/icon-${size}.png" ]; then
    cp "assets/icon-${size}.png" "$BUILD_DIR/usr/share/icons/hicolor/${size}x${size}/apps/braze.png"
  fi
done
mkdir -p "$BUILD_DIR/usr/share/icons/hicolor/scalable/apps"
if [ -f "assets/cat_logo.svg" ]; then
  cp assets/cat_logo.svg "$BUILD_DIR/usr/share/icons/hicolor/scalable/apps/braze.svg"
fi

# 5. Package with FPM
fpm -s dir -t deb \
  -n "braze" -v "$VERSION" --architecture amd64 \
  --description "O rival caótico do Microfost Ledge" \
  --maintainer "Miguel The Mann" \
  --deb-compression xz \
  --depends "libgtk-3-0" \
  --depends "libasound2 | libasound2t64" \
  --depends "libdbus-glib-1-2" \
  --depends "libxt6" \
  --category "web" \
  -C "$BUILD_DIR" -p "$OUT_DIR/braze_${VERSION}_amd64.deb" \
  opt usr

fpm -s dir -t rpm \
  -n "braze" -v "$VERSION" --architecture x86_64 \
  --description "O rival caótico do Microfost Ledge" \
  --maintainer "Miguel The Mann" \
  --depends "gtk3" \
  --depends "alsa-lib" \
  --depends "dbus-glib" \
  --depends "libXt" \
  --category "Applications/Internet" \
  -C "$BUILD_DIR" -p "$OUT_DIR/braze-${VERSION}-1.x86_64.rpm" \
  opt usr

echo "Done! Built .deb and .rpm"
