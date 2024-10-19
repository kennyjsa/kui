# Person & Addresses Example

Exemplo completo de uso do KUI Framework com formulário de Pessoa.

## Executar

```bash
pnpm install
pnpm dev
```

Acesse: http://localhost:3000

## Características Demonstradas

### Schema Pessoa

- ✅ Campo `identifier` (ID sempre readonly)
- ✅ Campo `text` com máscara (CPF)
- ✅ Campo `readOnlyIn` (CPF readonly no modo edit)
- ✅ Campo `date` (Data de Nascimento)
- ✅ Campo `derived` (Idade calculada automaticamente)
- ✅ Campo `email` com validação
- ✅ Campo `text` com máscara (Telefone)

### Modos de Formulário

1. **Create**: Todos os campos editáveis (exceto ID e campos derived)
2. **Edit**: CPF fica readonly, outros campos editáveis
3. **View**: Todos os campos readonly

## Estrutura

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── schemas/
    └── pessoa.schema.ts
```

## Próximos Passos

- [ ] Adicionar schema de Endereço
- [ ] Implementar relacionamento Pessoa ↔ Endereços (1:N)
- [ ] Adicionar campo de relação com Usuário
- [ ] Implementar CrudGrid para lista de endereços

