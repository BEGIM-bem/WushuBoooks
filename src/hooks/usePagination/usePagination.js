import { useCallback, useState } from 'react';

export const usePagination = (data, perPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil((data || []).length / perPage);

    const currentData = useCallback(() => {
        const begin = (currentPage - 1) * perPage;
        const end = begin + perPage;
        return (data || []).slice(begin, end);
    }, [currentPage, perPage, data])
    const next = useCallback(() => setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage)), [maxPage]);
    const prev = useCallback(() => setCurrentPage((currentPage) => Math.max(currentPage - 1, 1)), []);
    const jump = useCallback((page) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }, [maxPage])
    return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;