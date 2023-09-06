/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { DraggableRow } from "../DraggableRow";
import { DraggableTableHeader } from "../DraggableTableHeader";


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
        amount: '',
        card_number: '',
        account_number: '',
        account_name: '',
    })
    

    // get the column data by heading ids
    const tableColumns = columnOrder.map(col => {
        return columns.find(column => col === column.id)
    })


    // get the row data by row ordering
    const tableRows = rowOrder.map(row => {
        return data.find(r => r.id === row)
    })


    // set filtering text to the local state
    const filter = (e) => {
        switch (e?.target?.id) {
            case 'id':
                return setFilterValue({...filterValue, id : e?.target?.value.toLowerCase()})
            case 'account_name':
                return setFilterValue({...filterValue, account_name : e?.target?.value.toLowerCase()})
            case 'card':
                return setFilterValue({...filterValue, card_number : Number(e?.target?.value)})
            case 'amount':
                return setFilterValue({...filterValue, amount : Number(e?.target?.value)})
            case 'account_number':
                return setFilterValue({...filterValue, account_number : Number(e?.target?.value)})
            default:
                return;
        }
    }

    // filter
    const filteredData = tableRows.filter(row => {
        return (
            row.id.toLowerCase().includes(filterValue.id) &&
            row.account_name.toLowerCase().includes(filterValue.account_name) &&
            row.account_number.includes(filterValue.account_number) &&
            row.card_number.includes(filterValue.card_number) &&
            row.amount.includes(filterValue.amount)
        )

    })
    
    console.log(filteredData);


    return (
        <div>
            <table>

                <thead>
                    <tr>
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
                    {filteredData.map((row, index) => (
                  
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
        </div>
    )
}