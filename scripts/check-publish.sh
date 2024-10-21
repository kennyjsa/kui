#!/bin/bash

echo "📦 Verificando status de publicação dos pacotes KUI..."
echo ""

packages=("zod-extension" "theme" "core" "ui" "forms")

for pkg in "${packages[@]}"; do
  echo "Verificando @kui-framework/$pkg..."

  VERSION=$(npm view @kui-framework/$pkg version 2>/dev/null)

  if [ -z "$VERSION" ]; then
    echo "  ❌ Não publicado"
  else
    echo "  ✅ v$VERSION"
    PUBLISHED_AT=$(npm view @kui-framework/$pkg time.modified 2>/dev/null)
    echo "  📅 Publicado em: $PUBLISHED_AT"
  fi

  echo ""
done

echo "🔗 Links NPM:"
for pkg in "${packages[@]}"; do
  echo "  https://www.npmjs.com/package/@kui-framework/$pkg"
done

