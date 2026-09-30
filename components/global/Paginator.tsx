import React, { useMemo, useCallback, memo } from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
type PaginatorProps = {
    total:number;
    page:number;
    handleUiState:(data:{page:number})=>void;
    PAGES_TO_SHOW:number
}

const Paginator = ({ total, page, handleUiState, PAGES_TO_SHOW }:PaginatorProps) => {

    const totalPages =   total
   
    const visiblePages = useMemo(() => {
        if (totalPages <= PAGES_TO_SHOW) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        const currentGroup = Math.floor((page - 1) / PAGES_TO_SHOW)
        const startPage = currentGroup * PAGES_TO_SHOW + 1
        const endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages)
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }, [page, totalPages, PAGES_TO_SHOW])

    const hasNextGroup = useMemo(() => page + PAGES_TO_SHOW <= totalPages, [page, PAGES_TO_SHOW, totalPages])
    const hasPrevGroup = useMemo(() => page > PAGES_TO_SHOW, [page, PAGES_TO_SHOW])

    const handlePageChange = useCallback((newPage:number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            handleUiState({page:newPage})
        }
    }, [totalPages, handleUiState])

    return (
        <div>
            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem className='hidden md:block'>
                                <PaginationPrevious
                                    text=''
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page - 1) }}
                                    className={`bg-pink-500 hover:bg-pink-600 hover:text-white text-white ${page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                            </PaginationItem>

                            {hasPrevGroup && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink onClick={(e) => { e.preventDefault(); handlePageChange(1) }}>
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                </>
                            )}

                            {visiblePages.map(_page => (
                                <PaginationItem key={_page}>
                                    <PaginationLink
                                        onClick={(e) => { e.preventDefault(); handlePageChange(_page) }}
                                        isActive={page === _page}
                                        className={`cursor-pointer text-primary ${page === _page&&'bg-pink-500 text-white hover:bg-pink-600 hover:text-white'} `}
                                    >
                                        {_page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {hasNextGroup && (
                                <>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink onClick={(e) => { e.preventDefault(); handlePageChange(totalPages) }}>
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}

                            <PaginationItem className='hidden md:block'>
                                <PaginationNext
                                    text=''
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page + 1) }}
                                    className={`bg-pink-500 hover:bg-pink-600 hover:text-white text-white ${page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <Pagination className='mt-4'>
                        <PaginationContent>
                            <PaginationItem className='md:hidden'>
                                <PaginationPrevious
                                    text=''
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page - 1) }}
                                    className={`bg-pink-500 hover:bg-pink-600 hover:text-white   text-white ${page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                            </PaginationItem>
                            <PaginationItem className='md:hidden'>
                                <PaginationNext
                                    text=''
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page + 1) }}
                                    className={`bg-pink-500 hover:bg-pink-600 hover:text-white text-white ${page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </div>
            )}
        </div>
    )
}

export default memo(Paginator)