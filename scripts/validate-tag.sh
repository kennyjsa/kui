#!/bin/bash

# Script para validar se a tag corresponde à versão dos pacotes
# Usado antes de push de tags

set -e

# Verifica se há uma tag sendo criada
if [ -z "$1" ]; then
  echo "❌ Uso: ./scripts/validate-tag.sh <tag>"
  echo "   Exemplo: ./scripts/validate-tag.sh v0.0.1"
  exit 1
fi

TAG=$1
TAG_VERSION=${TAG#v}

echo "🏷️  Validando tag: $TAG"
echo ""

# Verifica formato da tag
if [[ ! $TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ Erro: Tag deve seguir formato vX.Y.Z (ex: v0.0.1)"
  exit 1
fi

echo "✅ Formato da tag correto"

# Valida se está na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Erro: Tags devem ser criadas apenas na branch main!"
  echo "   Branch atual: $CURRENT_BRANCH"
  echo ""
  echo "Para corrigir:"
  echo "  1. git checkout main"
  echo "  2. git merge develop"
  echo "  3. git tag $TAG"
  exit 1
fi

echo "✅ Branch main confirmada"

# Valida versões dos pacotes
echo ""
echo "📦 Validando versões dos pacotes..."

ERRORS=0

for pkg in packages/*/package.json; do
  PKG_VERSION=$(grep '"version"' $pkg | head -1 | sed 's/.*": "//;s/".*//')
  PKG_NAME=$(basename $(dirname $pkg))
  
  if [ "$PKG_VERSION" != "$TAG_VERSION" ]; then
    echo "❌ @kui-framework/$PKG_NAME: v$PKG_VERSION (tag: v$TAG_VERSION)"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ @kui-framework/$PKG_NAME: v$PKG_VERSION"
  fi
done

echo ""

if [ $ERRORS -gt 0 ]; then
  echo "❌ Erro: $ERRORS pacote(s) com versão diferente da tag!"
  echo ""
  echo "Para corrigir:"
  echo "  1. ./scripts/bump-version.sh $TAG_VERSION"
  echo "  2. git add ."
  echo "  3. git commit -m \"chore(release): bump version to $TAG_VERSION\""
  echo "  4. git tag -d $TAG  # deletar tag local"
  echo "  5. git tag $TAG     # criar novamente"
  exit 1
fi

echo "✅ Todas as versões estão corretas!"
echo ""
echo "🚀 Tag $TAG pronta para push:"
echo "   git push origin main"
echo "   git push origin $TAG"
exit 0

