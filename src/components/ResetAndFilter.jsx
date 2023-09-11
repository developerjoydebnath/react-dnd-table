/* eslint-disable react/prop-types */

import React from "react";


export const ResetAndFilter = ({
    columns,
    columnOrder,
    setColumnOrder,
    selecteds,
    setAllSelected,
    allSelected,
    setSelecteds,
    searchText,
    handleGlobalSearch,
    setSearchText,
    setItemsPerPage
}) => {
    

    // unselect select all if at least one selected is false
    React.useEffect(() => {
        if(
            selecteds.id === false ||
            selecteds.account_name === false ||
            selecteds.account_number === false ||
            selecteds.card === false ||
            selecteds.amount === false
        ) {
            setAllSelected(false);
        }
        else if(
            selecteds.id === true &&
            selecteds.account_name === true &&
            selecteds.account_number === true &&
            selecteds.card === true &&
            selecteds.amount === true
        ) {
            setAllSelected(true);
        }
    }, [selecteds]);
    
    
    // handling the column by selected status
    React.useEffect(() => {
        if(
            selecteds.id === false &&
            selecteds.account_name === false &&
            selecteds.account_number === false &&
            selecteds.card === false &&
            selecteds.amount === false
        ){
            setColumnOrder([]);
        }
        if (
            allSelected &&
            selecteds.id === true &&
            selecteds.account_name === true &&
            selecteds.account_number === true &&
            selecteds.card === true &&
            selecteds.amount === true
        ){
            setColumnOrder(['id', 'account_name', 'account_number', 'amount', 'card'])
        }
                    
    },[allSelected, selecteds]);
        

    // unselect all items if all selected is false
    React.useEffect(() => {
        if(allSelected){
            setSelecteds({
                id : true,
                amount: true,
                card: true,
                account_number: true,
                account_name: true,
            })
        }
    }, [allSelected, setSelecteds]);


    // reset column headings
    const resetColumnOrder = () => {
        setItemsPerPage(15)
        setSearchText('');
        setAllSelected(true);
        setColumnOrder(columns.map(column => column.id));
    }

    // handle select all status 
    const selectAllStatus = () => {
        setAllSelected(!allSelected)
        if(allSelected){
            setSelecteds({
                id : false,
                amount: false,
                card: false,
                account_number: false,
                account_name: false,
            });
        }
    }   


    // handling column hiding and showing
    const handleHiding = (e) => {
    const index = columnOrder.findIndex(i => i === e.target.id);
        if(!e.target.checked){
            if(index !== -1){
                const newColOrder = [...columnOrder];
                newColOrder.splice(index, 1);
                setColumnOrder(newColOrder);
            }
        } else {
            if(index === -1){
                setColumnOrder([...columnOrder, e.target.id]);
            }
        }
    };

    // handle single item status
    const singleChecking = (e) => {
        
        switch (e.target.id) {
            case 'id':
                handleHiding(e);
                return setSelecteds({...selecteds, id: !selecteds.id});
            case 'card':
                handleHiding(e);
                return setSelecteds({...selecteds, card: !selecteds.card});
            case 'amount':
                handleHiding(e);
                return setSelecteds({...selecteds, amount: !selecteds.amount});
            case 'account_number':
                handleHiding(e);
                return setSelecteds({...selecteds, account_number: !selecteds.account_number});
            case 'account_name':
                handleHiding(e);
                return setSelecteds({...selecteds, account_name: !selecteds.account_name});
            default:
                return selecteds;
        }
    }


    return (
        <div className="flex justify-end items-center gap-2 mb-3">
            <input 
                type="text" className="border py-[6px] outline-none rounded-md px-3 text-slate-500 shadow" 
                placeholder="Search..." 
                onChange={(e) => handleGlobalSearch(e)}
                value={searchText}
            />
            <button 
                onClick={resetColumnOrder} 
                className="border px-5 py-[6px] rounded bg-slate-200 hover:bg-slate-300 hover:text-gray-600 font-semibold text text-gray-500"
            >
                Reset
            </button>

            <div className="relative group">

                <span className="border px-5 py-[7px] rounded bg-slate-200 cursor-pointer font-semibold text text-gray-500 hover:bg-slate-300">Filters</span>

                <div className="absolute top-full right-0 pt-3 w-40 group-hover:block hidden">
                    <div className="border bg-white px-2 py-2 rounded-md w-full shadow-md">
                        <div className="my-1">
                            <input 
                                checked={allSelected}
                                onChange={selectAllStatus} type="checkbox" 
                                name='all' 
                                id='all'
                                className="me-1 cursor-pointer"
                            />
                            <label htmlFor='all' className="cursor-pointer">Select All</label>
                        </div>
                        {
                            columns.map(col => 
                                <div key={col.id} className="my-1">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => singleChecking(e)} 
                                        checked={selecteds[col.id]} 
                                        name={col.id} 
                                        id={col.id} 
                                        className="me-1 cursor-pointer"
                                    />
                                    <label htmlFor={col.id} className="cursor-pointer">
                                        {col.heading}
                                    </label>
                                </div>
                            ) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}