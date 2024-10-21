# 🚀 Guia de Release - KUI Framework

## 📋 Pré-requisitos

### 1. NPM Token (Granular Access Token - Recomendado)

1. Acesse https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Clique em "Generate New Token" → **"Granular Access Token"**
3. Configure:
   - **Token name:** KUI GitHub Actions
   - **Expiration:** No expiration (ou 1 ano, renovar anualmente)
   - **Packages and scopes:**
     - Permissions: **Read and write**
     - Select packages: **All packages** (ou apenas @kui-framework/* se org existir)
   - **Organizations:** Selecionar @kui (se houver organização)
4. Clique em "Generate token"
5. Copie o token gerado (começa com `npm_...`)

**Por que Granular Token?**
- ✅ Mais seguro (escopo limitado)
- ✅ Pode restringir a pacotes específicos
- ✅ Auditoria melhorada
- ✅ Recomendação oficial NPM desde 2022

**Alternativa (Classic Token):**
Se preferir usar Classic Token:
- Generate New Token → Classic Token
- Type: **Automation**

### 2. Configurar Secret no GitHub

1. Vá para https://github.com/kennyjsa/kui/settings/secrets/actions
2. Clique em "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Cole o token NPM gerado
5. Clique em "Add secret"

---

## 🎯 Processo de Release

### ⚠️ Importante: Tags Apenas na Main!

O workflow de release **só dispara em tags na branch `main`**.

### Fluxo Completo

1. **Desenvolver na branch `develop`**
   ```bash
   git checkout develop
   # ... fazer mudanças ...
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin develop
   ```

2. **Atualizar versões**
   ```bash
   # Usar script helper
   ./scripts/bump-version.sh 0.0.2
   
   # Husky validará automaticamente ao commit
   git add .
   git commit -m "chore(release): preparar v0.0.2"
   git push origin develop
   ```

3. **Merge para main**
   ```bash
   git checkout main
   git pull origin main
   git merge develop
   git push origin main
   ```

4. **Criar Tag na main**
   ```bash
   # Husky validará branch e versões automaticamente
   git tag -a v0.0.2 -m "Release v0.0.2"
   
   # Push da tag (dispara GitHub Actions!)
   git push origin v0.0.2
   ```

5. **GitHub Actions fará automaticamente:**
   - ✅ Validar que tag está na main
   - ✅ Validar versões dos package.json
   - ✅ Build de todos os pacotes
   - ✅ Publicação no NPM em ordem
   - ✅ Criação de GitHub Release
   - ✅ Changelog gerado automaticamente

6. **Voltar para develop**
   ```bash
   git checkout develop
   git merge main
   git push origin develop
   ```

### Método 2: Via Terminal

```bash
# 1. Atualizar versões
./scripts/bump-version.sh 0.0.2

# 2. Commit
git add .
git commit -m "chore(release): bump version to 0.0.2"

# 3. Criar tag e push
git tag v0.0.2
git push origin develop
git push origin v0.0.2

# GitHub Actions cuida do resto!
```

---

## 📝 Convenções de Versionamento

Seguimos **Semantic Versioning (semver)**:

### Formato: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): Novas features (retrocompatível)
- **PATCH** (0.0.1): Bug fixes

### Alpha/Beta/RC

- `0.0.x` - Alpha (API instável)
- `0.x.0` - Beta (API semi-estável)
- `1.0.0-rc.x` - Release Candidate
- `1.0.0` - Produção estável

### Exemplos

```bash
# Bug fix
v0.0.1 → v0.0.2

# Nova feature
v0.0.2 → v0.1.0

# Breaking change
v0.9.0 → v1.0.0
```

---

## 🔄 Fluxo Completo de Release

### 1. Desenvolvimento
```bash
# Branch develop
git checkout develop
git pull origin develop

# Fazer mudanças...
git add .
git commit -m "feat: nova funcionalidade"
git push origin develop
```

### 2. Preparar Release
```bash
# Atualizar versão
./scripts/bump-version.sh 0.0.2

# Atualizar CHANGELOG.md (se manual)
# Adicionar features, fixes, breaking changes

# Commit release prep
git add .
git commit -m "chore(release): preparar v0.0.2"
git push origin develop
```

### 3. Criar Tag
```bash
# Criar tag anotada
git tag -a v0.0.2 -m "Release v0.0.2 - Bug fixes e melhorias"

# Push tag
git push origin v0.0.2
```

### 4. Aguardar GitHub Actions
- ⏳ Build (~3 min)
- ⏳ Publish NPM (~2 min)
- ⏳ Create Release (~30s)
- ✅ **Total: ~5-6 minutos**

### 5. Verificar
```bash
# Verificar no NPM
npm view @kui-framework/forms

# Verificar GitHub Release
# https://github.com/kennyjsa/kui/releases
```

---

## 🛠️ Scripts Úteis

### Bump Version Script

Criar `scripts/bump-version.sh`:

```bash
#!/bin/bash

NEW_VERSION=$1

if [ -z "$NEW_VERSION" ]; then
  echo "❌ Uso: ./scripts/bump-version.sh <versão>"
  echo "   Exemplo: ./scripts/bump-version.sh 0.0.2"
  exit 1
fi

echo "📦 Atualizando versão para $NEW_VERSION..."

# Atualizar todos os package.json
for pkg in packages/*/package.json; do
  # Usar jq ou sed para atualizar version
  sed -i '' "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$pkg"
  echo "  ✅ $(dirname $pkg)"
done

echo "✅ Versão atualizada para $NEW_VERSION em todos os pacotes"
```

### Check Publish Status

Criar `scripts/check-publish.sh`:

```bash
#!/bin/bash

echo "📦 Verificando publicação dos pacotes..."

packages=("zod-extension" "theme" "core" "ui" "forms")

for pkg in "${packages[@]}"; do
  echo ""
  echo "Verificando @kui-framework/$pkg..."
  npm view @kui-framework/$pkg version 2>/dev/null || echo "  ❌ Não publicado"
done
```

---

## ⚠️ Troubleshooting

### Erro: NPM_TOKEN inválido
1. Verificar se o secret está configurado no GitHub
2. Gerar novo token no NPM
3. Atualizar secret no GitHub

### Erro: Tag já existe
```bash
# Deletar tag local e remota
git tag -d v0.0.1
git push origin :refs/tags/v0.0.1

# Criar novamente
git tag v0.0.1
git push origin v0.0.1
```

### Erro: Publicação falhou
1. Verificar logs do GitHub Actions
2. Verificar se algum pacote já foi publicado
3. Pode ser necessário publicar manualmente os pendentes

### Release duplicado
- GitHub Actions cria release automaticamente
- Não criar release manual antes do workflow

---

## 📚 Referências

- [GitHub Actions - NPM Publishing](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)
- [NPM Provenance](https://docs.npmjs.com/generating-provenance-statements)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🎯 Exemplo Completo

```bash
# 1. Desenvolver feature
git checkout develop
git pull
# ... fazer mudanças ...
git add .
git commit -m "feat(forms): adicionar novo campo xyz"
git push origin develop

# 2. Preparar release
./scripts/bump-version.sh 0.0.2
git add .
git commit -m "chore(release): preparar v0.0.2"
git push origin develop

# 3. Criar tag (dispara o workflow!)
git tag -a v0.0.2 -m "Release v0.0.2"
git push origin v0.0.2

# 4. Aguardar GitHub Actions
# Acesse: https://github.com/kennyjsa/kui/actions

# 5. Verificar
npm view @kui-framework/forms
# Sucesso! 🎉
```

---

## 📅 Cadência de Releases

### Sugestão

- **Patch** (0.0.x): A cada bug fix importante
- **Minor** (0.x.0): A cada nova feature ou sprint completa
- **Major** (x.0.0): Breaking changes planejados

### Exemplo Timeline

```
v0.0.1 - Alpha inicial ← AGORA
v0.0.2 - Bug fixes
v0.0.3 - Mais bug fixes
v0.1.0 - Beta (API semi-estável, features completas)
v0.2.0 - Beta com testes
v1.0.0 - Produção (API estável, testes completos, docs)
```

---

## 🎉 Após a Publicação

1. **Testar instalação**
   ```bash
   npx create-next-app test-kui
   cd test-kui
   npm install @kui-framework/forms @kui-framework/ui @kui-framework/core @kui-framework/zod-extension
   ```

2. **Anunciar**
   - Twitter/X
   - LinkedIn
   - Dev.to
   - Discord (se houver)

3. **Monitorar**
   - NPM downloads
   - GitHub issues
   - Community feedback


