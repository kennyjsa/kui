import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

export interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function SimplePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: SimplePaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-2 py-3 border-t">
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Exibindo {startItem}-{endItem} de {totalItems}
      </div>

      {/* Controles */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        
        <div className="text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

