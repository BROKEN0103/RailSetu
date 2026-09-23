import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';
import { Select } from './Select';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  totalItems,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between px-2 py-3 gap-4", className)}>
      <div className="flex-1 flex justify-between sm:hidden w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
        <div>
          {totalItems !== undefined && (
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * pageSize, totalItems)}
              </span>{' '}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {onPageSizeChange && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select
                value={pageSize.toString()}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                options={pageSizeOptions.map(o => ({ label: o.toString(), value: o }))}
                inputSize="sm"
                className="w-20"
              />
            </div>
          )}
          
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <Button
              variant="outline"
              size="sm"
              className="rounded-l-md rounded-r-none px-2 h-9"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="relative inline-flex items-center px-4 py-2 border border-border bg-surface text-sm font-medium text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                );
              }
              
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "relative inline-flex items-center px-4 py-2 border text-sm font-medium h-9",
                    currentPage === page
                      ? "z-10 bg-primary/10 border-primary text-primary"
                      : "bg-surface border-border text-foreground hover:bg-muted"
                  )}
                >
                  {page}
                </button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-r-md rounded-l-none px-2 h-9"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
