import React from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    resultsPerPage: number;
    onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalResults,
    resultsPerPage,
    onPageChange,
}) => {
    if (totalResults === 0) {
        return null;
    }

    const start = (currentPage - 1) * resultsPerPage + 1;
    const end = Math.min(currentPage * resultsPerPage, totalResults);

    const createPageItems = () => {
        const items = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={currentPage === i}
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        isActive={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 3) {
                items.push(<PaginationEllipsis key='start-ellipsis' />);
            }

            if (currentPage > 2 && currentPage < totalPages - 1) {
                items.push(
                    <PaginationItem key={currentPage - 1}>
                        <PaginationLink
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage !== 1 && currentPage !== totalPages) {
                items.push(
                    <PaginationItem key={currentPage}>
                        <PaginationLink
                            isActive
                            onClick={() => onPageChange(currentPage)}
                        >
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 1) {
                items.push(
                    <PaginationItem key={currentPage + 1}>
                        <PaginationLink
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 2) {
                items.push(<PaginationEllipsis key='end-ellipsis' />);
            }

            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        isActive={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <nav
            className='flex flex-col items-center justify-center pt-4'
            aria-label='Table navigation'
        >
            <Pagination>
                <PaginationPrevious
                    onClick={() =>
                        onPageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1 || totalResults === 0}
                >
                    Previous
                </PaginationPrevious>

                <PaginationContent>{createPageItems()}</PaginationContent>

                <PaginationNext
                    onClick={() =>
                        onPageChange(
                            currentPage < totalPages
                                ? currentPage + 1
                                : totalPages
                        )
                    }
                    disabled={currentPage === totalPages || totalResults === 0}
                >
                    Next
                </PaginationNext>
            </Pagination>

            <span className='text-sm font-normal text-gray-500'>
                {`Showing ${start}-${end} of ${totalResults} results`}
            </span>
        </nav>
    );
};

export default CustomPagination;
