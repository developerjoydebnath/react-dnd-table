/* eslint-disable react/prop-types */


import React from 'react';
import { Icon } from '../assets/Icons/Icon';

const Pagination = ({
    setTotalPages,
    totalPages,
    itemsPerPage,
    pageNumber,
    setPageNumber,
    setItemsPerPage,
    totalData
}) => {

    const [goToPage, setGoToPage] = React.useState('');

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
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // jump to any page 
    const jumpToPage = (e) => {
        if(e.target.value){
            if( e.target.value <= totalPages ){
                setGoToPage(Number(e.target.value));
                setPageNumber(Number(e.target.value));
            } else {
                alert('Page number is getter than total pages');
                setGoToPage('');
            }
        } else {
            setGoToPage('');
        }
    };


    return (
        <div className="flex gap-5 items-center">
                    
                    <div>
                        <button
                            disabled={pageNumber < 2}
                            onClick={goToFirstPage} 
                            className="border px-2 py-1 rounded cursor-pointer shadow me-2 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                        >
                            <Icon iconName='double-arrow-left' className='h-5 w-5' />
                        </button>
                        <button
                            disabled={pageNumber < 2}
                            onClick={prevIousPage} 
                            className="border px-2 py-1 rounded cursor-pointer shadow me-2 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                        >
                            <Icon iconName='arrow-left' className='h-5 w-5' />
                        </button>
                        <button
                            disabled={pageNumber > totalPages - 1}
                            onClick={nextPage} 
                            className="border px-2 py-1 rounded cursor-pointer me-2 shadow disabled:bg-zinc-300 disabled:cursor-not-allowed"
                        >
                            <Icon iconName='arrow-right' className='h-5 w-5' />
                        </button>
                        <button
                            disabled={pageNumber > totalPages - 1}
                            onClick={goToLastPage} 
                            className="border px-2 py-1 rounded cursor-pointer shadow disabled:bg-zinc-300 disabled:cursor-not-allowed"
                        >
                            <Icon iconName='double-arrow-right' className='h-5 w-5' />
                        </button>
                    </div>

                    <div className='flex justify-center items-center gap-2'>
                        <h4 className='text-slate-500'>Go to page</h4>
                        <input 
                            type="number"
                            className='border py-0.5 w-10 text-slate-500 outline-none rounded text-center shadow'
                            value={goToPage}
                            onChange={(e) => jumpToPage(e)}
                        />
                    </div>
                    
                    <div>
                        <select
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                            }}
                            name="sort"
                            id="sort" 
                            className="border w-20 rounded py-0.5 px-1 outline-none shadow"
                            value={itemsPerPage}
                        >
                            <option value="10">10</option>
                            <option value="15" selected>15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            
                        </select>
                    </div>

                    <div>
                        <h4 className="text-slate-500"> Page {pageNumber} of {totalPages} </h4>
                    </div>
                    
                </div>
    );
};

export default Pagination;