# 🤖 Documentação para Agentes de IA

> Central de recursos para agentes de IA gerarem código usando o KUI Framework.

## 🎯 Objetivo

Esta documentação foi especificamente criada para tornar o KUI Framework **AI-friendly**, permitindo que agentes de IA (como GPT, Claude, etc) possam:

- ✅ Entender rapidamente como o framework funciona
- ✅ Gerar código correto e funcional
- ✅ Seguir padrões estabelecidos
- ✅ Resolver problemas comuns
- ✅ Integrar com backends (REST e tRPC)

---

## 📚 Documentação Disponível

### 1. **[AGENT_GUIDE.md](./AGENT_GUIDE.md)** - 🚀 COMECE AQUI
**Guia principal para agentes de IA**

Contém:
- Visão geral rápida do framework
- Exemplo mínimo funcional
- Instalação e setup
- Padrões comuns mais usados
- Referência rápida de campos
- Troubleshooting
- Checklist de verificação

**Use quando:** Primeira vez usando KUI ou precisa de referência rápida.

---

### 2. **[PATTERNS.md](./PATTERNS.md)** - 📖 Receitas e Exemplos
**Padrões completos prontos para copiar**

Contém:
- CRUD completo (create, edit, view, list)
- Validações cross-field
- Campos derivados e calculados
- Relacionamentos (N:1, N:M)
- Grids e sublistas (1:N)
- Campos condicionais (showIf)
- Integração com backend
- Máscaras e formatação
- Layouts responsivos
- Casos especiais (upload, rating, color)

**Use quando:** Implementar funcionalidades específicas.

---

### 3. **[FIELD_REFERENCE.md](./FIELD_REFERENCE.md)** - 📋 Referência Completa
**Todos os 18 tipos de campos detalhados**

Contém:
- Documentação completa de cada campo
- Opções disponíveis
- Exemplos de uso
- Tipo TypeScript resultante
- Dicas de uso

**Campos documentados:**
- Básicos: identifier, text, textarea, number, date
- Seleção: select, radio
- Booleanos: boolean, checkbox, switch
- Avançados: email, password, currency, rating, color, file
- Especiais: relation, grid

**Use quando:** Dúvida sobre um campo específico ou suas opções.

---

### 4. **[REST_INTEGRATION.md](./REST_INTEGRATION.md)** - 🌐 REST API
**Integração completa com REST APIs**

Contém:
- Configuração de provider REST
- CRUD completo (list, get, create, update, delete)
- Autenticação (Bearer token, API key, cookies)
- Transformações (API ↔ Form)
- Tratamento de erros
- Casos avançados (query params, múltiplos providers, timeout)

**Use quando:** Integrar KUI com API REST.

---

### 5. **[TRPC_INTEGRATION.md](./TRPC_INTEGRATION.md)** - ⚡ tRPC
**Integração type-safe com tRPC**

Contém:
- Setup completo do tRPC
- Configuração de routers
- Provider tRPC para KUI
- CRUD completo
- Relacionamentos
- Autenticação
- Prisma integration
- Subscriptions (real-time)

**Use quando:** Integrar KUI com tRPC.

---

## 🗂️ Exemplos Práticos

### Localização: [`/examples/ai-examples/`](../../examples/ai-examples/)

Exemplos completos e autocontidos prontos para copiar:

| Arquivo | Descrição | Use quando... |
|---------|-----------|---------------|
| `01-minimal-form.tsx` | Formulário mínimo | Quick start, aprender o básico |
| `02-crud-basic.tsx` | CRUD completo | Create, edit, view |
| `03-with-validation.tsx` | Validações | Senha confirmar, cross-field |
| `04-with-derived-fields.tsx` | Campos calculados | Idade, total, desconto |
| `05-with-conditional-fields.tsx` | Campos condicionais | Mostrar/ocultar por condição |
| `06-with-grid.tsx` | Sublistas | Endereços, telefones, itens |
| `07-with-rest-provider.tsx` | REST API completo | Integração REST |

**Veja [/examples/ai-examples/README.md](../../examples/ai-examples/README.md) para lista completa e índice.**

---

## 🎓 Como Usar Esta Documentação

### Para Agentes de IA

#### Cenário 1: Primeira Vez
1. Leia [AGENT_GUIDE.md](./AGENT_GUIDE.md) completo
2. Execute mentalmente o "Exemplo Mínimo Funcional"
3. Guarde a estrutura básica

#### Cenário 2: Criar Formulário Simples
1. Copie exemplo de `/examples/ai-examples/01-minimal-form.tsx`
2. Adapte campos do schema
3. Implemente onSubmit

#### Cenário 3: Funcionalidade Específica
**Usuário pede:** "Crie um formulário com validação de senha"

**Você faz:**
1. Busca em [PATTERNS.md](./PATTERNS.md) → "Validação Cross-Field"
2. Copia o padrão
3. Adapta para o caso específico

#### Cenário 4: Dúvida sobre Campo
**Usuário pede:** "Use um campo de rating"

**Você faz:**
1. Busca em [FIELD_REFERENCE.md](./FIELD_REFERENCE.md) → "rating()"
2. Copia exemplo
3. Usa no schema

#### Cenário 5: Integração com API
**Usuário pede:** "Conecte com minha API REST"

**Você faz:**
1. Leia [REST_INTEGRATION.md](./REST_INTEGRATION.md)
2. Copie configuração de provider
3. Adapte endpoints e baseUrl

---

## ✅ Checklist Universal

Sempre que gerar código KUI, verifique:

### Imports
- [ ] `import { zKUI } from "@kui-framework/zod-extension"` (não `zod`)
- [ ] `import { FormBuilder } from "@kui-framework/forms"`

### Schema
- [ ] Usa `zKUI.object()` não `z.object()`
- [ ] IDs usam `zKUI.identifier()`
- [ ] Campos obrigatórios têm `required: true`

### Campos Especiais
- [ ] Derivados têm `derived: true` + `compute`
- [ ] Transientes têm `transient: true`
- [ ] Condicionais têm `showIf`
- [ ] Grids têm `itemSchema` e `columns`

### Integração
- [ ] Provider criado e registrado no `KuiDataProvider`
- [ ] Headers de auth configurados (se necessário)
- [ ] Transformações implementadas (se API tem formato diferente)

### Componente
- [ ] `<FormBuilder>` tem props: schema, mode, onSubmit
- [ ] onSubmit trata erros (try/catch)
- [ ] Loading states implementados

---

## 🔍 Busca Rápida

### Por Funcionalidade

- **Formulário básico:** [AGENT_GUIDE.md](./AGENT_GUIDE.md#exemplo-mínimo-funcional)
- **CRUD completo:** [PATTERNS.md](./PATTERNS.md#crud-completo)
- **Validação:** [PATTERNS.md](./PATTERNS.md#formulários-com-validação)
- **Cálculo automático:** [PATTERNS.md](./PATTERNS.md#campos-derivados-e-calculados)
- **Relacionamento:** [PATTERNS.md](./PATTERNS.md#relacionamentos)
- **Sublista:** [PATTERNS.md](./PATTERNS.md#grids-e-sublistas)
- **Campo condicional:** [PATTERNS.md](./PATTERNS.md#campos-condicionais)
- **REST API:** [REST_INTEGRATION.md](./REST_INTEGRATION.md)
- **tRPC:** [TRPC_INTEGRATION.md](./TRPC_INTEGRATION.md)

### Por Tipo de Campo

Todos os 18 campos estão documentados em [FIELD_REFERENCE.md](./FIELD_REFERENCE.md):
- identifier, text, textarea
- number, currency, date, systemDate
- select, radio, boolean, checkbox, switch
- email, password, rating, color, file
- relation, grid

---

## 💡 Princípios para Agentes de IA

### ✅ Fazer

1. **Copiar exemplos completos** e adaptar
2. **Seguir padrões estabelecidos** exatamente
3. **Manter estrutura** dos exemplos
4. **Usar tipos corretos** (zKUI não z)
5. **Incluir todas as importações** necessárias
6. **Gerar código executável** completo

### ❌ Evitar

1. ❌ Inventar padrões novos
2. ❌ Misturar `z.` e `zKUI.`
3. ❌ Omitir importações
4. ❌ Criar código incompleto
5. ❌ Ignorar type-safety
6. ❌ Gerar código não testável

---

## 🆘 Troubleshooting

### Problema: Código não compila
**Solução:**
1. Verifique se está usando `zKUI` não `z`
2. Confira se todas as importações estão corretas
3. Compare com exemplo similar em `/examples/ai-examples/`

### Problema: Campo não aparece
**Solução:**
1. Verifique `hiddenIn` ou `showIf`
2. Confirme que o modo está correto (create/edit/view)
3. Veja se o campo tem metadados KUI

### Problema: Provider não funciona
**Solução:**
1. Confirme que está registrado no `KuiDataProvider`
2. Verifique se o nome corresponde ao usado no schema
3. Teste os métodos do provider isoladamente

### Problema: Validação não funciona
**Solução:**
1. Use `.refine()` após `.object()`
2. Retorne boolean na função
3. Especifique `path` para mostrar erro no campo correto

---

## 📖 Ordem de Leitura Recomendada

### Para Entender o Framework
1. [AGENT_GUIDE.md](./AGENT_GUIDE.md) - Visão geral
2. [FIELD_REFERENCE.md](./FIELD_REFERENCE.md) - Tipos de campos
3. [PATTERNS.md](./PATTERNS.md) - Padrões comuns
4. Exemplos em `/examples/ai-examples/`

### Para Implementar CRUD
1. [AGENT_GUIDE.md](./AGENT_GUIDE.md) - Setup básico
2. [PATTERNS.md](./PATTERNS.md#crud-completo) - CRUD completo
3. `/examples/ai-examples/02-crud-basic.tsx` - Exemplo prático

### Para Integrar com Backend
1. [REST_INTEGRATION.md](./REST_INTEGRATION.md) ou [TRPC_INTEGRATION.md](./TRPC_INTEGRATION.md)
2. `/examples/ai-examples/07-with-rest-provider.tsx`
3. [PATTERNS.md](./PATTERNS.md#integração-com-backend) - Padrões avançados

---

## 🎯 Objetivos Alcançados

Com esta documentação, agentes de IA conseguem:

✅ **Gerar formulários completos** a partir de descrições
✅ **Implementar CRUD** com validações e integrações
✅ **Resolver 90%+ dos casos comuns** sem invenção
✅ **Seguir padrões consistentes** do framework
✅ **Produzir código type-safe** e testável
✅ **Integrar com REST e tRPC** corretamente

---

## 📞 Manutenção

Esta documentação deve ser atualizada quando:
- Novos campos forem adicionados
- Novos padrões forem identificados
- Exemplos precisarem de melhorias
- Feedback de uso real for recebido

---

## 🚀 Próximos Passos

Após estudar esta documentação:

1. **Teste** gerando um formulário simples
2. **Compare** seu código com exemplos
3. **Refine** baseado nos padrões
4. **Integre** com backend quando necessário

---

**Lembre-se:** Esta documentação é viva. Se encontrar casos não cobertos, adicione novos exemplos e padrões aqui.

**Boa sorte gerando código KUI!** 🎉

