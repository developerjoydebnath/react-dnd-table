/* eslint-disable react/prop-types */


import React from 'react';

const Pagination = ({
    setTotalPages,
    totalPages,
    itemsPerPage,
    pageNumber,
    setPageNumber,
    setItemsPerPage,
    totalData
}) => {


        // total page 
        React.useEffect(() => {
            // set the total page value to the state
            const total = Math.ceil(totalData / itemsPerPage)
            setTotalPages(total)
            
            // adjust last page if the jump to last page
            if(totalPages < pageNumber) {
                setPageNumber(totalPages)
            }

            if(pageNumber === 0 && totalPages !== 0) {
                setPageNumber(1)
            }
            
        }, [pageNumber, itemsPerPage, totalData, totalPages])
    
    
    
        // previous page number 
        const prevIousPage = () => {
            if(pageNumber > 1) {
                setPageNumber((prev) => prev - 1)
            }
        }
        
        // next page number 
        const nextPage = () => {
            if(pageNumber < totalPages) {
                setPageNumber(prev => prev + 1)
            }
        }
    
        // go to the last page
        const goToLastPage = () => {
            setPageNumber(totalPages)
        }
    
        // go to the first page
        const goToFirstPage = () => {
            setPageNumber(1)
        }


    return (
        <div className="flex gap-5 items-center">
                    
                    <div>
                        <button
                            disabled={pageNumber < 2}
                            onClick={goToFirstPage} 
                            className="border px-2 py-1 rounded cursor-pointer shadow me-2 disabled:bg-zinc-400 disabled:cursor-not-allowed"
                        >
                            {'<<'}
                        </button>
                        <button
                            disabled={pageNumber < 2}
                            onClick={prevIousPage} 
                            className="border px-3 py-1 rounded cursor-pointer shadow me-2 disabled:bg-zinc-400 disabled:cursor-not-allowed"
                        >
                            {'<'}
                        </button>
                        <button
                            disabled={pageNumber > totalPages - 1}
                            onClick={nextPage} 
                            className="border px-3 py-1 rounded cursor-pointer me-2 shadow disabled:bg-zinc-400 disabled:cursor-not-allowed"
                        >
                            {'>'}
                        </button>
                        <button
                            disabled={pageNumber > totalPages - 1}
                            onClick={goToLastPage} 
                            className="border px-2 py-1 rounded cursor-pointer shadow disabled:bg-zinc-400 disabled:cursor-not-allowed"
                        >
                            {'>>'}
                        </button>
                    </div>

                    <div>
                        <select
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                            }}
                            name="sort"
                            id="sort" 
                            className="border w-20 rounded py-0.5 outline-none shadow"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            
                        </select>
                    </div>

                    <div>
                        <h4 className="text-slate-500"> Page {pageNumber} of {totalPages} </h4>
                    </div>
                    
                </div>
    );
};

export default Pagination;