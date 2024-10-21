# 📅 Fase 4: Integração e Backend

**Status:** 🚧 Em Progresso (Sprint 1 ✅ Completa)  
**Período:** 2 dias (20-21/10/2024)  
**Prioridade:** Alta  
**Progresso:** ████████░░░░░░░░░░░░ 40%

## 🎯 Objetivos

Integrar o KUI com backends reais, implementar validações avançadas e gerenciamento de estado complexo.

## 📋 Entregas Planejadas

### Sprint 1: Integração tRPC

#### 1.1 createTrpcProvider ✅
```typescript
const userProvider = createTrpcProvider({
  name: "userProvider",
  router: trpcClient.user,
  procedures: {
    list: "getAll",
    get: "getById",
    create: "create",
    update: "update",
    delete: "delete"
  }
});
```
- [x] Implementar createTrpcProvider
- [x] Adaptar interface DataProvider para tRPC
- [x] Tratamento de erros tRPC
- [x] Loading states automáticos (via React Query)
- [x] Integração com React Query

#### 1.2 Exemplo Backend tRPC ✅
- [x] Criar exemplo completo backend + frontend
- [x] Server tRPC com mock database
- [x] CRUD completo (pessoa e usuário)
- [ ] Autenticação (opcional - futura)

### Sprint 2: Validações Avançadas

#### 2.1 Validações Assíncronas
```typescript
email: zKUI.email("E-mail", {
  validate: async (value) => {
    const exists = await checkEmailExists(value);
    if (exists) throw new Error("E-mail já cadastrado");
  }
})
```
- [ ] Suporte a validações assíncronas no schema
- [ ] Debounce automático
- [ ] Loading state durante validação
- [ ] Cache de validações

#### 2.2 Validações Cross-Field
```typescript
zKUI.object({
  senha: zKUI.password("Senha"),
  confirmarSenha: zKUI.password("Confirmar Senha")
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "Senhas não conferem",
  path: ["confirmarSenha"]
})
```
- [ ] Suporte a .refine() do Zod
- [ ] Validações entre campos
- [ ] Mensagens de erro contextuais

#### 2.3 Validações Condicionais
```typescript
tipoPessoa: zKUI.select("Tipo", ["fisica", "juridica"]),
cpf: zKUI.text("CPF", {
  showIf: (values) => values.tipoPessoa === "fisica",
  required: (values) => values.tipoPessoa === "fisica"
})
```
- [ ] Campos condicionais (showIf)
- [ ] Required condicional
- [ ] Validações condicionais

#### 2.4 Mensagens Customizadas
```typescript
nome: zKUI.text("Nome", {
  required: true,
  errorMessages: {
    required: "Por favor, preencha o nome",
    minLength: "Nome deve ter no mínimo {min} caracteres"
  }
})
```
- [ ] Override de mensagens padrão
- [ ] Suporte a templates
- [ ] Internacionalização (i18n)

### Sprint 3: Estado e Persistência

#### 3.1 Auto-save (Rascunhos)
```typescript
<FormBuilder
  schema={schema}
  autoSave
  autoSaveDelay={2000}
  storageKey="pessoa-draft"
  onAutoSave={(data) => console.log("Salvo:", data)}
/>
```
- [ ] Auto-save em localStorage
- [ ] Auto-save em servidor (opcional)
- [ ] Debounce configurável
- [ ] Indicador visual de salvamento
- [ ] Recuperar rascunho ao reabrir

#### 3.2 Dirty State Control
- [ ] Detectar mudanças no formulário
- [ ] Confirmação ao sair com mudanças
- [ ] beforeunload warning
- [ ] Botão "Descartar mudanças"
- [ ] Diff visual de mudanças

#### 3.3 Formulários Multi-Step
```typescript
<StepperForm
  steps={[
    { label: "Dados Pessoais", schema: dadosPessoaisSchema },
    { label: "Endereço", schema: enderecoSchema },
    { label: "Contato", schema: contatoSchema },
  ]}
  onComplete={(data) => handleSubmit(data)}
/>
```
- [ ] Component StepperForm
- [ ] Navegação entre steps
- [ ] Validação por step
- [ ] Progress indicator
- [ ] Save & continue later

#### 3.4 Formulários Wizard
- [ ] Wizard com lógica condicional
- [ ] Steps dinâmicos baseados em respostas
- [ ] Review step final
- [ ] Editar steps anteriores

### Sprint 4: Otimizações

#### 4.1 Optimistic Updates
```typescript
const mutation = useMutation({
  mutationFn: updatePessoa,
  onMutate: async (data) => {
    // Atualizar UI imediatamente
    await queryClient.cancelQueries(['pessoa', id]);
    const previous = queryClient.getQueryData(['pessoa', id]);
    queryClient.setQueryData(['pessoa', id], data);
    return { previous };
  }
});
```
- [ ] Suporte a optimistic updates
- [ ] Rollback em caso de erro
- [ ] Feedback visual

#### 4.2 Cache e Sincronização
- [ ] Cache inteligente de dados
- [ ] Invalidação de cache
- [ ] Sincronização em tempo real (opcional)
- [ ] Offline-first (opcional)

#### 4.3 Performance Monitoring
- [ ] Métricas de performance
- [ ] Tracking de erros
- [ ] Analytics de uso (opcional)

## 📊 Exemplo Completo

### Backend tRPC
```typescript
// server/routers/pessoa.ts
export const pessoaRouter = router({
  getAll: publicProcedure
    .input(z.object({ page: z.number(), pageSize: z.number() }))
    .query(async ({ input, ctx }) => {
      const pessoas = await ctx.db.pessoa.findMany({
        skip: (input.page - 1) * input.pageSize,
        take: input.pageSize,
      });
      return { data: pessoas, total: await ctx.db.pessoa.count() };
    }),
  
  create: publicProcedure
    .input(pessoaSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.pessoa.create({ data: input });
    }),
});
```

### Frontend
```typescript
const pessoaProvider = createTrpcProvider({
  name: "pessoaProvider",
  router: trpc.pessoa,
});

<KuiDataProvider providers={[pessoaProvider]}>
  <FormBuilder
    schema={pessoaSchema}
    provider={pessoaProvider}
    autoSave
    onSubmit={async (data) => {
      await pessoaProvider.create(data);
    }}
  />
</KuiDataProvider>
```

## 📊 Critérios de Sucesso

- [ ] Integração tRPC funcionando
- [ ] Validações assíncronas com bom UX
- [ ] Auto-save funcionando sem travar UI
- [ ] Formulários multi-step completos
- [ ] Performance mantida (< 100ms para interações)

## 🔗 Dependências

- @trpc/client
- @trpc/server
- @trpc/react-query
- @tanstack/react-query

## 📝 Notas Técnicas

### tRPC
- Manter compatibilidade com REST providers
- Type-safety end-to-end
- Error handling consistente

### Validações
- Validações síncronas sempre antes das assíncronas
- Cache de validações assíncronas
- Cancelar validações pendentes

### Estado
- Immer para imutabilidade
- Zustand ou Context para estado global
- LocalStorage para persistência

## 🐛 Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Validações assíncronas lentas | Alto | Debounce e cache |
| Auto-save causa conflitos | Médio | Merge strategies e timestamps |
| tRPC aumenta bundle | Baixo | Code splitting |
| Complexidade de estado | Alto | Documentação e exemplos |

## ➡️ Próxima Fase

**Fase 5: UX e Refinamentos**

Melhorar experiência do usuário com loading states, notificações e layouts avançados.

