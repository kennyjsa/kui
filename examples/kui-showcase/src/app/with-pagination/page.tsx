"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationInfo,
} from "@kui-framework/ui";

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);

  // Dados de exemplo
  const totalPages = 10;
  const totalItems = 250;
  const itemsPerPage = 25;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Pagination</h1>
        <p className="text-muted-foreground">
          Sistema de paginação baseado nos padrões do Radix UI
        </p>
      </div>

      <div className="space-y-8">
        {/* Pagination Básica */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pagination Básica</h2>
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <PaginationInfo
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={5}
              />
            </div>
          </div>
        </div>

        {/* Pagination com Variantes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Variantes</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Default</h3>
              <Pagination
                currentPage={currentPage2}
                totalPages={totalPages}
                onPageChange={setCurrentPage2}
                variant="default"
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Solid</h3>
              <Pagination
                currentPage={currentPage2}
                totalPages={totalPages}
                onPageChange={setCurrentPage2}
                variant="solid"
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Outline</h3>
              <Pagination
                currentPage={currentPage2}
                totalPages={totalPages}
                onPageChange={setCurrentPage2}
                variant="outline"
              />
            </div>
          </div>
        </div>

        {/* Pagination com Tamanhos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tamanhos</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Small</h3>
              <Pagination
                currentPage={currentPage3}
                totalPages={totalPages}
                onPageChange={setCurrentPage3}
                size="sm"
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
              <Pagination
                currentPage={currentPage3}
                totalPages={totalPages}
                onPageChange={setCurrentPage3}
                size="md"
              />
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Large</h3>
              <Pagination
                currentPage={currentPage3}
                totalPages={totalPages}
                onPageChange={setCurrentPage3}
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Pagination com Muitas Páginas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Muitas Páginas (50 páginas)</h2>
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <PaginationInfo
                currentPage={currentPage4}
                totalPages={50}
                totalItems={1250}
                itemsPerPage={25}
              />
              <Pagination
                currentPage={currentPage4}
                totalPages={50}
                onPageChange={setCurrentPage4}
                maxVisiblePages={5}
                showFirstLast={true}
                showPrevNext={true}
              />
            </div>
          </div>
        </div>

        {/* Pagination Compacta */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pagination Compacta</h2>
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <PaginationInfo
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={3}
                showFirstLast={false}
                showPrevNext={true}
              />
            </div>
          </div>
        </div>

        {/* Pagination com Componentes Individuais */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Componentes Individuais</h2>
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-center space-x-2">
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
              />

              {currentPage > 1 && (
                <PaginationItem
                  page={currentPage - 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              )}

              <PaginationItem
                page={currentPage}
                isActive={true}
              />

              {currentPage < totalPages && (
                <PaginationItem
                  page={currentPage + 1}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              )}

              {currentPage < totalPages - 1 && (
                <>
                  <PaginationEllipsis />
                  <PaginationItem
                    page={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  />
                </>
              )}

              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
              />
            </div>
          </div>
        </div>

        {/* Pagination com Informações Detalhadas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Com Informações Detalhadas</h2>
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <PaginationInfo
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
                <p className="text-xs text-muted-foreground">
                  Página {currentPage} de {totalPages} • {totalItems} itens total
                </p>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={5}
              />
            </div>
          </div>
        </div>

        {/* Código de Exemplo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como Usar</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationInfo
} from "@kui-framework/ui";

// Pagination básica
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  maxVisiblePages={5}
/>

// Com informações
<div className="flex items-center justify-between">
  <PaginationInfo
    currentPage={currentPage}
    totalPages={totalPages}
    totalItems={totalItems}
    itemsPerPage={itemsPerPage}
  />
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
</div>

// Com variantes
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  variant="solid"
  size="lg"
/>

// Componentes individuais
<div className="flex items-center space-x-2">
  <PaginationPrevious
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage <= 1}
  />
  <PaginationItem
    page={currentPage}
    isActive={true}
  />
  <PaginationNext
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage >= totalPages}
  />
</div>`}
            </pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Melhores Práticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">✅ Faça</h3>
              <ul className="text-sm space-y-1">
                <li>• Use paginação para grandes listas de dados</li>
                <li>• Mostre informações de contexto (página X de Y)</li>
                <li>• Mantenha consistência visual</li>
                <li>• Teste acessibilidade com screen readers</li>
                <li>• Use ellipsis para muitas páginas</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">❌ Evite</h3>
              <ul className="text-sm space-y-1">
                <li>• Usar paginação para poucos itens</li>
                <li>• Criar paginação muito complexa</li>
                <li>• Ignorar acessibilidade</li>
                <li>• Usar paginação como filtro</li>
                <li>• Esconder informações importantes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
