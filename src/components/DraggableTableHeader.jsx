/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";


export const DraggableTableHeader = ({
    id,
    column,
    columnOrder,
    setColumnOrder,
    filter,
    filterValue
}) => {
 
    const ref = useRef(null);



    const reOrderedColumns = (dragColumnID, targetColumnID, columnOrder) => {
        const newColumnOrder = [...columnOrder]

        const indexOfDragColumn = newColumnOrder.indexOf(dragColumnID)
        const indexOfTargetColumn = newColumnOrder.indexOf(targetColumnID)
        

        newColumnOrder.splice(indexOfTargetColumn, 0, newColumnOrder.splice(indexOfDragColumn, 1)[0])

        return newColumnOrder;
        
    };


    const [ {isDragging} , drag, preview] = useDrag({
        type: 'COLUMN',
        item: {column},
        // end: (item, monitor) => {
        //     const dropResult = monitor.getDropResult()
        //     if(dropResult){
        //         console.log(dropResult);
        //     }
        // },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    

    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'COLUMN',
        drop: (dragCol) => {
            const reOrdered = reOrderedColumns(dragCol?.column?.id, column?.id, columnOrder)
            setColumnOrder(reOrdered)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    })
    
    const isActive = isOver && canDrop;

    drag(drop(ref))

    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview])

    const inputType = (columnId) => {
        switch (columnId) {
            case 'id':
                return 'text';
            case 'account_name':
                return 'text';
            case 'amount':
                return 'number';
            case 'card':
                return 'number';
            case 'account_number':
                return 'number';
            default:
                return;
        }
    }
    


    // eslint-disable-next-line react/prop-types
    return <th className={`px-2 transition-all ${isDragging ? 'opacity-30': ''} ${isActive ? 'scale-105' : ''}`} ref={ref}>
        <div>
            <div>
                {column?.heading} 
            </div>
            <div className="my-1.5">
                {column?.id === 'amount' ? 
                    <span className="flex items-center gap-2 justify-center">
                        <input 
                            type='number'
                            min={0}
                            id={`${column?.id}_min`}
                            value={filterValue[column?.id]}
                            onChange={(e) => filter(e)}
                            placeholder="Min"
                            className="w-16 ps-2 text-sm font-normal outline-none rounded py-0.5 text-gray-500"
                        />
                        <input 
                            type='number'
                            min={0}
                            id={`${column?.id}_max`}
                            value={filterValue[column?.id]}
                            onChange={(e) => filter(e)}
                            placeholder="Max"
                            className="w-16 ps-2 text-sm font-normal outline-none rounded py-0.5 text-gray-500"
                        />
                    </span>
                    :
                    <input 
                        type={inputType(column?.id)}
                        name="" 
                        id={column?.id}
                        value={filterValue[column?.id]}
                        onChange={(e) => filter(e)}
                        placeholder="Search..."
                        className="w-32 ps-2 text-sm font-normal outline-none rounded py-0.5 text-gray-500"
                    />
                }
            </div>
        </div>
    </th>
}