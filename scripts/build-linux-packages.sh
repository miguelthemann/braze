#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Copyright (c) 2026 Miguel G. (miguelthemann)
set -e

VERSION="${1:-1.3.1}"
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

# Rename binary to native braze executable
mv "$BUILD_DIR/opt/braze/firefox" "$BUILD_DIR/opt/braze/braze"
ln -s braze "$BUILD_DIR/opt/braze/firefox"

mkdir -p "$BUILD_DIR/opt/braze/distribution/extensions"
cp distribution/policies.json "$BUILD_DIR/opt/braze/distribution/"
cp braze-shields.xpi "$BUILD_DIR/opt/braze/distribution/"
cp braze-shields.xpi "$BUILD_DIR/opt/braze/distribution/extensions/braze-shields@miguelthemann.github.io.xpi"
mkdir -p "$BUILD_DIR/opt/braze/defaults/pref"
cp profile/user.js "$BUILD_DIR/opt/braze/defaults/pref/braze-defaults.js"
mkdir -p "$BUILD_DIR/opt/braze/browser/defaults/preferences"
cp profile/user.js "$BUILD_DIR/opt/braze/browser/defaults/preferences/braze-defaults.js"
mkdir -p "$BUILD_DIR/opt/braze/browser/defaults/profile/chrome"
cp -r profile/chrome/* "$BUILD_DIR/opt/braze/browser/defaults/profile/chrome/"

# Window and system icons
mkdir -p "$BUILD_DIR/opt/braze/browser/chrome/icons/default"
cp assets/icon-128.png "$BUILD_DIR/opt/braze/browser/chrome/icons/default/default128.png"

# 3. Native symlink for /usr/bin/braze
ln -s /opt/braze/braze "$BUILD_DIR/usr/bin/braze"

# 4. Desktop entry and icons
cp braze.desktop "$BUILD_DIR/usr/share/applications/"
cp assets/icon-128.png "$BUILD_DIR/usr/share/icons/hicolor/128x128/apps/braze.png"

# 5. Package with FPM
fpm -s dir -t deb \
  -n "braze" -v "$VERSION" --architecture amd64 \
  --description "O rival caótico do Microfost Ledge" \
  --maintainer "Miguel The Mann" \
  -C "$BUILD_DIR" -p "$OUT_DIR/braze_${VERSION}_amd64.deb" \
  opt usr

fpm -s dir -t rpm \
  -n "braze" -v "$VERSION" --architecture x86_64 \
  --description "O rival caótico do Microfost Ledge" \
  --maintainer "Miguel The Mann" \
  -C "$BUILD_DIR" -p "$OUT_DIR/braze-${VERSION}-1.x86_64.rpm" \
  opt usr

echo "Done! Built .deb and .rpm"
