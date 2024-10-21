#!/bin/bash

# Script para validar se as versões dos package.json estão alinhadas
# Usado por husky antes de criar tags

set -e

# Pega a versão de um package.json de referência
REFERENCE_VERSION=$(grep '"version"' packages/core/package.json | head -1 | sed 's/.*": "//;s/".*//')

echo "📦 Validando versões dos pacotes..."
echo "   Versão de referência: v$REFERENCE_VERSION"
echo ""

ERRORS=0

for pkg in packages/*/package.json; do
  PKG_VERSION=$(grep '"version"' $pkg | head -1 | sed 's/.*": "//;s/".*//')
  PKG_NAME=$(basename $(dirname $pkg))
  
  if [ "$PKG_VERSION" != "$REFERENCE_VERSION" ]; then
    echo "❌ @kui/$PKG_NAME: v$PKG_VERSION (esperado: v$REFERENCE_VERSION)"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ @kui/$PKG_NAME: v$PKG_VERSION"
  fi
done

echo ""

if [ $ERRORS -gt 0 ]; then
  echo "❌ Erro: $ERRORS pacote(s) com versão diferente!"
  echo ""
  echo "Para corrigir, execute:"
  echo "  ./scripts/bump-version.sh $REFERENCE_VERSION"
  exit 1
fi

echo "✅ Todas as versões estão alinhadas!"
exit 0

