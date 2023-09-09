/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { DraggableRow } from "../DraggableRow";
import { DraggableTableHeader } from "../DraggableTableHeader";
import Pagination from "../Pagination";
import { ResetAndFilter } from "../ResetAndFilter";


export const Table = ({
    data=[],
    columns=[],
    loading=false,
}) => {
    
    // gey the column ordering
    const [columnOrder, setColumnOrder] = React.useState(columns.map(column => column.id))

    // get the row ordering
    const [rowOrder, setRowOrder] = React.useState(data.map(row => row.id))

    // filter state
    const [filterValue, setFilterValue] = React.useState({
        id : '',
        amount_min: '',
        amount_max: 0,
        card_number: '',
        account_number: '',
        account_name: '',
    });

    // select status
    const [selecteds, setSelecteds] = React.useState({
        id : true,
        amount: true,
        card: true,
        account_number: true,
        account_name: true,
    })


    // items per page 
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    
    // page number
    const [pageNumber, setPageNumber] = React.useState(1);

    // total data after filtering
    const [totalData, setTotalData] = React.useState(data?.length);

    // total page
    const [totalPages, setTotalPages] = React.useState(Math.ceil(totalData / itemsPerPage));
    
    // all checked 
    const [allSelected, setAllSelected] = React.useState(true)

    // get the column data by heading ids
    const tableColumns = columnOrder.map(col => {
        return columns.find(column => col === column.id);
    });


    // get the row data by row ordering
    const tableRows = rowOrder.map(row => {
        return data.find(r => r.id === row)
    });


    // set filtering text to the local state
    const filter = (e) => {
        switch (e?.target?.id) {
            case 'id':
                return setFilterValue({...filterValue, id : e?.target?.value.toLowerCase()})
            case 'account_name':
                return setFilterValue({...filterValue, account_name : e?.target?.value.toLowerCase()})
            case 'card':
                return setFilterValue({...filterValue, card_number : Number(e?.target?.value)})
            case 'amount_min':
                return setFilterValue({...filterValue, amount_min : Number(e?.target?.value)})
            case 'amount_max':
                return setFilterValue({...filterValue, amount_max : Number(e?.target?.value)})
            case 'account_number':
                return setFilterValue({...filterValue, account_number : (e?.target?.value)})
            default:
                return;
        }
    }
    

    // search filter
    const searchFilteredData = tableRows.filter(row => {
        
        return (
            row.id.toLowerCase().includes(filterValue.id) &&
            row.account_name.toLowerCase().includes(filterValue.account_name) &&
            row.account_number.includes(filterValue.account_number) &&
            row.card_number.includes(filterValue.card_number) &&
            row.amount > filterValue.amount_min &&
            row.amount < filterValue.amount_max
        )

    })

    // pagination 
    const paginationData = searchFilteredData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)


    // set total data after filtering
    React.useEffect(() => {
        if(
            selecteds.id === false &&
            selecteds.account_name === false &&
            selecteds.account_number === false &&
            selecteds.card === false &&
            selecteds.amount === false
        ) {
            setTotalPages(0);
        } else {
            setTotalPages(Math.ceil(totalData / itemsPerPage));
            setTotalData(searchFilteredData?.length);
        }
    }, [searchFilteredData, selecteds, itemsPerPage,  totalData]);


    React.useEffect(() => {
        // maximum amount of table
        const maxAmount = Math.max(...data.map(d => (parseInt(d.amount)))) + 1;

        if(filterValue.amount_max == 0){
            setFilterValue({...filterValue, amount_max: maxAmount})
        }
        
    }, [filterValue.amount_max]);

 

    return (
        <div className="mx-20 mt-10 rounded-md">
            <ResetAndFilter
                setAllSelected={setAllSelected}
                columns={columns}
                allSelected={allSelected}
                selecteds={selecteds}
                setSelecteds={setSelecteds}
                columnOrder={columnOrder}
                setColumnOrder={setColumnOrder}
            />
            <table className="w-full">

                <thead className="">
                    <tr className="bg-slate-200">
                        {tableColumns.map(column => 

                            <DraggableTableHeader
                                key={column.id}
                                id={column.id}
                                column={column}
                                columnOrder={columnOrder}
                                setColumnOrder={setColumnOrder}
                                filter={filter}
                                filterValue={filterValue}
                            />
                            
                        )}
                    </tr>
                </thead>
                
                <tbody>
                    {paginationData
                    .map((row, index) => (
                  
                        <DraggableRow 
                            key={index}
                            row={row}
                            tableColumns={tableColumns}
                            rowOrder={rowOrder}
                            setRowOrder={setRowOrder}
                        />
                        
                    ))}
                </tbody>
                
            </table>
            <div className="my-10">
                <Pagination
                    setTotalPages={setTotalPages}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setItemsPerPage={setItemsPerPage}
                    totalData={totalData}
                />
            </div>
        </div>
    )
}