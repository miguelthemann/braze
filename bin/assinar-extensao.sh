#!/usr/bin/env bash
# Script para assinar o Braze Shields através da API oficial da Mozilla (AMO)
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXT_DIR="$DIR/extension"

echo -e "\e[1;33m🐱 Braze Shields - Assinatura Oficial Mozilla AMO\e[0m"
echo -e "Para obteres um ficheiro .xpi com assinatura criptográfica oficial da Mozilla:"
echo -e "1. Acede a: \e[34mhttps://addons.mozilla.org/developers/addon/api/key/\e[0m"
echo -e "2. Gera as tuas chaves (JWT Issuer e JWT Secret).\n"

read -p "Introduz o teu JWT Issuer (ex: user:1234567:890): " AMO_KEY
read -s -p "Introduz o teu JWT Secret: " AMO_SECRET
echo ""

if [ -z "$AMO_KEY" ] || [ -z "$AMO_SECRET" ]; then
  echo -e "\e[1;31m[!] Chaves em falta. Assinatura cancelada.\e[0m"
  exit 1
fi

echo -e "\e[1;32m[*] A submeter e a assinar com a Mozilla AMO...\e[0m"
npx --yes web-ext sign \
  --source-dir "$EXT_DIR" \
  --api-key "$AMO_KEY" \
  --api-secret "$AMO_SECRET" \
  --artifacts-dir "$DIR"

# Encontra o xpi assinado gerado
SIGNED_XPI=$(ls -t "$DIR"/braze_shields*.xpi 2>/dev/null | head -n 1)
if [ -n "$SIGNED_XPI" ]; then
  cp "$SIGNED_XPI" "$DIR/braze-shields.xpi"
  cp "$SIGNED_XPI" "$DIR/profile/extensions/braze-shields@braze.cat.xpi"
  echo -e "\e[1;32m[✓] Ficheiro assinado com sucesso e atualizado em braze-shields.xpi!\e[0m"
fi
