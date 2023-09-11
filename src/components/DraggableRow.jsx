/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { useDrag, useDrop } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"



export const DraggableRow = ({
    row,
    tableColumns,
    rowOrder,
    setRowOrder,
    searchText
}) => {

    const ref = React.useRef(null)


    const reOrderedTableRow = (dragRowID, targetRowID, rowOrder) => {

        const newRowRowOrder = [...rowOrder]

        const dragRowIndex = newRowRowOrder.indexOf(dragRowID)

        const targetRowIndex = newRowRowOrder.indexOf(targetRowID)

        newRowRowOrder.splice(
            targetRowIndex,
            0,
            newRowRowOrder.splice(dragRowIndex, 1)[0]
        )

        return newRowRowOrder
    }


    const [{isDragging}, drag, preview] = useDrag({
        type: 'ROW',
        item: {row},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'ROW',
        drop: (dragRow) => {
            const reOrdered = reOrderedTableRow(dragRow.row.id, row.id, rowOrder)
            setRowOrder(reOrdered)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    })

    const isActive = canDrop && isOver;


    drag(drop(ref))

    React.useEffect(() => {
        preview(getEmptyImage())
    }, [preview])


    return <tr className={`${isActive ? 'bg-[#e6e6e6]' : 'hover:bg-[#e6e6e6]'}`} ref={ref} style={{ opacity: isDragging ? '0.5' : ''}}>
        {tableColumns?.map(col => (
            <React.Fragment key={col.id}>
                {col.cell({row}, searchText)}
            </React.Fragment>
        ) )}
    </tr>
}