import React, { useMemo } from 'react';
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

const CustomPagination: React.FC<PaginationProps> = React.memo(
    ({
        currentPage,
        totalPages,
        totalResults,
        resultsPerPage,
        onPageChange,
    }) => {
        const start = (currentPage - 1) * resultsPerPage + 1;
        const end = Math.min(currentPage * resultsPerPage, totalResults);

        const handlePageChange = (page: number) => {
            onPageChange(page);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        const createPageItems = useMemo(() => {
            const items: JSX.Element[] = [];
            if (totalResults === 0) return items;

            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    items.push(
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={currentPage === i}
                                onClick={() => handlePageChange(i)}
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
                            onClick={() => handlePageChange(1)}
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
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
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
                                onClick={() => handlePageChange(currentPage)}
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
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
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
                            onClick={() => handlePageChange(totalPages)}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            return items;
        }, [currentPage, totalPages, totalResults]);

        return (
            <nav
                className='flex flex-col items-center justify-center pt-4'
                aria-label='Table navigation'
            >
                <Pagination>
                    <PaginationPrevious
                        onClick={() =>
                            handlePageChange(
                                currentPage > 1 ? currentPage - 1 : 1
                            )
                        }
                        disabled={currentPage === 1 || totalResults === 0}
                    >
                        Previous
                    </PaginationPrevious>

                    <PaginationContent>{createPageItems}</PaginationContent>

                    <PaginationNext
                        onClick={() =>
                            handlePageChange(
                                currentPage < totalPages
                                    ? currentPage + 1
                                    : totalPages
                            )
                        }
                        disabled={
                            currentPage === totalPages || totalResults === 0
                        }
                    >
                        Next
                    </PaginationNext>
                </Pagination>

                <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                    {`Showing ${start}-${end} of ${totalResults} results`}
                </span>
            </nav>
        );
    }
);

export default CustomPagination;
