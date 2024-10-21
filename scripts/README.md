# 🛠️ Scripts de Automação

Scripts utilitários para gerenciar releases e publicações do KUI Framework.

## 📜 Scripts Disponíveis

### `bump-version.sh`

Atualiza a versão em todos os `package.json` dos pacotes.

```bash
./scripts/bump-version.sh 0.0.2
```

**O que faz:**
- Atualiza `"version"` em todos os `packages/*/package.json`
- Mantém as versões sincronizadas
- Exibe próximos passos

### `validate-version.sh`

Valida se todas as versões dos pacotes estão alinhadas.

```bash
./scripts/validate-version.sh
# ou
pnpm validate:versions
```

**O que faz:**
- Compara versões de todos os pacotes
- Verifica se estão sincronizadas
- Retorna erro se houver divergência

**Usado por:**
- Husky pre-commit hook
- CI/CD antes de publicar

### `validate-tag.sh`

Valida tag antes de fazer push.

```bash
./scripts/validate-tag.sh v0.0.2
```

**O que faz:**
- Valida formato da tag (vX.Y.Z)
- Verifica se está na branch `main`
- Valida se versões dos pacotes correspondem à tag
- Retorna erro se algo estiver errado

**Usado por:**
- Husky pre-push hook
- Validações manuais antes de release

### `check-publish.sh`

Verifica status de publicação dos pacotes no NPM.

```bash
./scripts/check-publish.sh
```

**O que faz:**
- Consulta NPM registry
- Exibe versão publicada de cada pacote
- Mostra data de publicação
- Lista links para NPM

---

## 🔄 Fluxo de Release

### 1. Preparar Release

```bash
# Atualizar versões
./scripts/bump-version.sh 0.0.2

# Commit (husky validará automaticamente)
git add .
git commit -m "chore(release): preparar v0.0.2"
git push origin develop
```

### 2. Merge para Main

```bash
git checkout main
git merge develop
git push origin main
```

### 3. Criar Tag

```bash
# Criar tag (husky validará)
git tag -a v0.0.2 -m "Release v0.0.2"

# Validar manualmente se quiser
./scripts/validate-tag.sh v0.0.2

# Push (dispara GitHub Actions!)
git push origin v0.0.2
```

### 4. Verificar Publicação

```bash
# Aguardar GitHub Actions (~5 min)
# Depois verificar:
./scripts/check-publish.sh
```

---

## 🛡️ Validações Automáticas

### Husky Hooks

**Pre-commit:**
- ✅ Valida versões se `package.json` foi modificado

**Pre-push:**
- ✅ Detecta push de tags
- ✅ Valida que está na main
- ✅ Valida versões correspondem à tag

### GitHub Actions

**Ao push de tag:**
- ✅ Valida branch é main
- ✅ Valida versões dos pacotes
- ✅ Build completo
- ✅ Publicação automática
- ✅ GitHub Release

---

## 📋 Checklist Manual

Antes de criar tag:

```bash
# 1. Validar versões
./scripts/validate-version.sh

# 2. Verificar branch
git branch --show-current  # deve ser 'main'

# 3. Build local
pnpm build

# 4. Criar tag
git tag -a v0.0.2 -m "Release v0.0.2"

# 5. Validar tag
./scripts/validate-tag.sh v0.0.2

# 6. Push (se tudo OK)
git push origin main
git push origin v0.0.2
```

---

## 🐛 Troubleshooting

### "Versões não estão alinhadas"

```bash
# Corrigir:
./scripts/bump-version.sh 0.0.2
git add .
git commit --amend --no-edit
```

### "Tag não está na main"

```bash
# Deletar tag e refazer:
git tag -d v0.0.2
git checkout main
git merge develop
git tag v0.0.2
```

### "Husky não está rodando"

```bash
# Reinstalar hooks:
pnpm prepare
chmod +x .husky/*
```

---

## 📚 Mais Informações

- Ver `CHANGELOG.md` para histórico de releases
- Ver `.github/workflows/release.yml` para detalhes do CI/CD
- Ver `.github/PUBLISH_NOW.md` para instruções da primeira publicação

