# 🤖 Exemplos KUI para Agentes de IA

> Exemplos mínimos, autocontidos e prontos para copiar/adaptar.

## 📋 Índice de Exemplos

Cada arquivo é um exemplo **completo e independente** que pode ser copiado e usado diretamente.

### 1. Básicos
- [`01-minimal-form.tsx`](./01-minimal-form.tsx) - Formulário mínimo funcional
- [`02-crud-basic.tsx`](./02-crud-basic.tsx) - CRUD completo básico
- [`03-with-validation.tsx`](./03-with-validation.tsx) - Validações cross-field

### 2. Recursos Avançados
- [`04-with-derived-fields.tsx`](./04-with-derived-fields.tsx) - Campos calculados
- [`05-with-conditional-fields.tsx`](./05-with-conditional-fields.tsx) - Campos condicionais
- [`06-with-grid.tsx`](./06-with-grid.tsx) - Sublistas (grid 1:N)

### 3. Integrações
- [`07-with-rest-provider.tsx`](./07-with-rest-provider.tsx) - Integração REST API
- [`08-with-trpc-provider.tsx`](./08-with-trpc-provider.tsx) - Integração tRPC
- [`09-with-relations.tsx`](./09-with-relations.tsx) - Relacionamentos (FK)

### 4. Casos Reais
- [`10-user-registration.tsx`](./10-user-registration.tsx) - Cadastro de usuário completo
- [`11-product-form.tsx`](./11-product-form.tsx) - Formulário de produto
- [`12-invoice-with-items.tsx`](./12-invoice-with-items.tsx) - Pedido com itens (grid + cálculos)

---

## 🚀 Como Usar

### 1. Para Humanos Desenvolvedores

```bash
# Copie um exemplo
cp examples/ai-examples/01-minimal-form.tsx src/components/MyForm.tsx

# Adapte conforme necessário
# O exemplo já está completo e funcional
```

### 2. Para Agentes de IA

**Instruções para você, agente de IA:**

1. **Leia o exemplo relevante** completo antes de gerar código
2. **Copie a estrutura** exatamente como está
3. **Adapte** apenas o necessário (nomes, campos, lógica de negócio)
4. **Mantenha** as importações e estrutura do exemplo
5. **Não invente** padrões novos - siga os exemplos

**Por exemplo:**
- Usuário pede: "Crie um formulário de cadastro de cliente"
- Você lê: `01-minimal-form.tsx` ou `10-user-registration.tsx`
- Você copia e adapta para "cliente" em vez de "user"

---

## 📚 Estrutura dos Exemplos

Cada exemplo segue esta estrutura:

```tsx
/**
 * EXEMPLO: [Nome do exemplo]
 * 
 * Descrição breve do que o exemplo demonstra
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * Para usar:
 * 1. Passo 1
 * 2. Passo 2
 */

// ===== IMPORTS =====
import { ... } from "...";

// ===== SCHEMA =====
export const schema = zKUI.object({
  // campos
});

// ===== TYPES =====
export type SchemaType = typeof schema._type;

// ===== COMPONENT =====
export function Component() {
  // implementação
}

// ===== USAGE =====
// Exemplo de uso (comentado)
```

---

## ✅ Checklist para Agentes de IA

Ao gerar código baseado nestes exemplos:

- [ ] Copiei um exemplo completo como base
- [ ] Mantive todas as importações necessárias
- [ ] Usei `zKUI.object()` não `z.object()`
- [ ] Adicionei `required: true` onde necessário
- [ ] Campos derivados têm `derived: true` + `compute`
- [ ] Campos transientes têm `transient: true`
- [ ] IDs usam `zKUI.identifier()`
- [ ] Grid tem `itemSchema` e `columns`
- [ ] Provider está registrado no `KuiDataProvider` (quando aplicável)
- [ ] Código está completo e executável

---

## 🎯 Quando Usar Cada Exemplo

| Exemplo | Use quando o usuário pedir... |
|---------|-------------------------------|
| 01-minimal-form | "formulário simples", "quick start" |
| 02-crud-basic | "CRUD", "criar/editar/visualizar" |
| 03-with-validation | "validar", "senha confirmar", "dependências entre campos" |
| 04-with-derived-fields | "calcular", "campo automático", "idade", "total" |
| 05-with-conditional-fields | "mostrar se", "campo condicional", "dinâmico" |
| 06-with-grid | "lista de", "múltiplos", "sublista", "endereços", "telefones" |
| 07-with-rest-provider | "API REST", "fetch", "integrar com backend" |
| 08-with-trpc-provider | "tRPC", "type-safe API" |
| 09-with-relations | "select de", "buscar de outra tabela", "FK", "relacionamento" |
| 10-user-registration | "cadastro", "registro de usuário" |
| 11-product-form | "produto", "e-commerce" |
| 12-invoice-with-items | "pedido", "nota fiscal", "itens" |

---

## 💡 Dicas para Agentes de IA

### 1. Sempre priorize copiar exemplos

❌ **Ruim:** Gerar código do zero baseado em descrição
✅ **Bom:** Copiar exemplo similar e adaptar

### 2. Mantenha a estrutura

❌ **Ruim:** Reorganizar imports, mudar padrões
✅ **Bom:** Manter estrutura exata do exemplo

### 3. Adapte apenas o necessário

❌ **Ruim:** Reescrever tudo com "melhorias"
✅ **Bom:** Trocar apenas nomes e campos específicos

### 4. Combine exemplos quando necessário

Se usuário pede "formulário de produto com validação e grid de fotos":
1. Use `11-product-form.tsx` como base
2. Adicione validação de `03-with-validation.tsx`
3. Adicione grid de `06-with-grid.tsx`

---

## 📖 Documentação Adicional

- [AGENT_GUIDE.md](../../docs/ai-agents/AGENT_GUIDE.md) - Guia completo para agentes
- [PATTERNS.md](../../docs/ai-agents/PATTERNS.md) - Padrões e receitas
- [FIELD_REFERENCE.md](../../docs/ai-agents/FIELD_REFERENCE.md) - Referência de campos

---

**Lembre-se:** Exemplos são testados e funcionam. Modificar demais pode quebrar. Copie, adapte minimamente, e teste.

