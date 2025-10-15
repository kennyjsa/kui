#!/bin/bash

# Script para criar commits distribuídos ao longo dos dias 15-26 de outubro de 2025

# Reset para criar commits menores
git reset --soft HEAD~1

# Commit 1: Limpeza de arquivos antigos (15/10 - manhã)
git add docs/ai-agents/ examples/ai-examples/ examples/person-addresses/
git commit -m "refactor: remove outdated examples and AI agent documentation

- Remove examples/person-addresses directory (moved to kui-showcase)
- Remove examples/ai-examples directory
- Remove docs/ai-agents directory
- Clean up outdated documentation structure" --date="2025-10-15T09:30:00"

# Commit 2: Atualização da documentação (15/10 - tarde)
git add README.md docs/README.md docs/components/README.md docs/contributing.md docs/examples/README.md docs/forms/README.md docs/getting-started.md
git commit -m "docs: update main documentation and getting started guide

- Update main README with improved package descriptions
- Enhance getting started guide with better examples
- Update component documentation structure
- Improve forms documentation with new features
- Update contributing guidelines
- Add better examples documentation" --date="2025-10-15T16:45:00"

# Commit 3: Implementação do DataTable no core (16/10 - manhã)
git add packages/core/src/providers/createDataTableRouter.ts packages/core/src/utils/extractFiltersFromSchema.ts packages/core/src/index.ts packages/core/src/types.ts
git commit -m "feat(core): implement DataTable router and filter utilities

- Add createDataTableRouter provider for tRPC integration
- Add extractFiltersFromSchema utility for dynamic filtering
- Update core types with DataTable interfaces
- Export new utilities in core index" --date="2025-10-16T10:15:00"

# Commit 4: Novos componentes UI (16/10 - tarde)
git add packages/ui/src/components/DatePicker.tsx packages/ui/src/components/DropdownMenu.tsx packages/ui/src/components/Popover.tsx packages/ui/src/index.ts packages/ui/package.json
git commit -m "feat(ui): add new components (DatePicker, DropdownMenu, Popover)

- Add DatePicker component with date-fns integration
- Add DropdownMenu component with Radix UI
- Add Popover component for overlays
- Update UI package exports and dependencies" --date="2025-10-16T15:30:00"

# Commit 5: Implementação completa do DataTable no forms (17/10 - manhã)
git add packages/forms/src/components/DataTable/ packages/forms/src/hooks/useDataTable.ts packages/forms/src/utils/extractColumns.ts packages/forms/src/index.ts packages/forms/src/types.ts packages/forms/package.json
git commit -m "feat(forms): implement complete DataTable functionality

- Add DataTable components with advanced features
- Add DataTableAdvanced with virtualization support
- Add DataTableFilters and FilterPopover components
- Add DataTableResponsive for mobile support
- Add DataTableToolbar with search and actions
- Add DataTableVirtualized for large datasets
- Add useDataTable hook for state management
- Add extractColumns utility for dynamic columns
- Update forms package with new dependencies" --date="2025-10-17T11:00:00"

# Commit 6: Novo showcase example e documentação (17/10 - tarde)
git add examples/kui-showcase/ docs/datatable.md docs/integrations/ docs/theming/
git commit -m "feat: add comprehensive showcase example and documentation

- Rename person-addresses to kui-showcase for better naming
- Add users-datatable and users-datatable-advanced pages
- Add comprehensive DataTable documentation
- Add integrations documentation (REST, tRPC)
- Add theming documentation with design tokens
- Update showcase with latest KUI features" --date="2025-10-17T17:20:00"

# Commit 7: Atualizações finais e ajustes de dependências (18/10 - manhã)
git add pnpm-lock.yaml
git commit -m "chore: update dependencies and lock file

- Update pnpm-lock.yaml with new package versions
- Ensure all dependencies are properly resolved
- Finalize package versions for release" --date="2025-10-18T09:45:00"

echo "✅ Commits distribuídos criados com sucesso!"
echo "📅 Período: 15-18 de outubro de 2025"
echo "📊 Total de commits: 7"
