'use client';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useUrlParams } from '@/hooks/useUrlParams';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Pagination({ currentPage, totalPages, hasNext, hasPrev }: PaginationProps) {
  const { setPage } = useUrlParams();

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1} className="hidden md:inline-flex">
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => setPage(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start" className="hidden md:inline-flex">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i} className="hidden md:inline-flex">
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => setPage(i)}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end" className="hidden md:inline-flex">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages} className="hidden md:inline-flex">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setPage(totalPages)}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => hasPrev && setPage(currentPage - 1)}
            className={!hasPrev ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        {renderPageNumbers()}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => hasNext && setPage(currentPage + 1)}
            className={!hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
