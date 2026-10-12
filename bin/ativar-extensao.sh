#!/usr/bin/env bash
# Script para instalar a política do Braze que permite o Braze Shields sem erros de assinatura
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
POLICIES_SRC="$DIR/distribution/policies.json"
POLICIES_DEST_DIR="/etc/firefox/policies"
POLICIES_DEST="$POLICIES_DEST_DIR/policies.json"

echo -e "\e[1;33m🐱 Braze Browser - Ativação Permanente do Braze Shields\e[0m"
echo -e "Este script copia as políticas empresariais para \e[32m$POLICIES_DEST\e[0m,"
echo -e "permitindo que o Gecko instale o Braze Shields e o ITIS Copernico Search nativamente.\n"

if [ "$EUID" -ne 0 ]; then
  echo -e "\e[1;31m[!] Permissão de administrador necessária. A executar sudo...\e[0m"
  exec sudo "$0" "$@"
fi

mkdir -p "$POLICIES_DEST_DIR"
cp "$POLICIES_SRC" "$POLICIES_DEST"
chmod 644 "$POLICIES_DEST"

echo -e "\e[1;32m[✓] Política instalada com sucesso em $POLICIES_DEST!\e[0m"
echo -e "\e[1;32m[✓] O Braze Shields será agora carregado automaticamente pelo motor Gecko sem erros de assinatura.\e[0m"
echo -e "\e[1;36mReinicia o Braze para as alterações entrarem em vigor!\e[0m"
