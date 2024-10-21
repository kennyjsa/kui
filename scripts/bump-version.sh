#!/bin/bash

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
  echo "❌ Uso: ./scripts/bump-version.sh <versão>"
  echo "   Exemplo: ./scripts/bump-version.sh 0.0.2"
  exit 1
fi

echo "📦 Atualizando versão para $NEW_VERSION..."

# Atualizar package.json de cada pacote
for pkg in packages/*/package.json; do
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$pkg"
  else
    # Linux
    sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$pkg"
  fi
  echo "  ✅ $(dirname $pkg)"
done

echo ""
echo "✅ Versão atualizada para $NEW_VERSION em todos os pacotes"
echo ""
echo "Próximos passos:"
echo "  1. git add ."
echo "  2. git commit -m \"chore(release): preparar v$NEW_VERSION\""
echo "  3. git push origin develop"
echo "  4. git tag v$NEW_VERSION"
echo "  5. git push origin v$NEW_VERSION"
echo ""
echo "🚀 GitHub Actions fará o resto!"

