/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Icon } from "../assets/Icons/Icon";


export const DraggableTableHeader = ({
    column,
    columnOrder,
    setColumnOrder,
    filter,
    filterValue,
    searchButtons,
    setSearchButtons
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
    };

    const handleSearchBtn = (id) => {
        const indexOfId = searchButtons.indexOf(id);
        if(indexOfId === -1) {
            setSearchButtons([...searchButtons, id]);
        } else {
            const newButton = [...searchButtons]
            newButton.splice(indexOfId, 1);
            setSearchButtons(newButton);
        }
    };


    // eslint-disable-next-line react/prop-types
    return <th className={`px-2 transition-all text-left ${isDragging ? 'opacity-30': ''} ${isActive ? 'scale-105' : ''}`} ref={ref}>
        <div>
            <div className="flex justify-start items-center gap-5 py-2">
                <span className="text-gray-600">{column?.heading}</span>
                <span 
                    className="p-1 cursor-pointer"
                    onClick={() => handleSearchBtn(column.id)}
                >
                    <Icon iconName="search" className="h-4 w-4 fill-gray-500" />
                </span>
            </div>
            
            { searchButtons.find(btn => btn === column.id) &&
                <div className="mb-1 -mt-1">
                    {column?.id === 'amount' ? 
                        <span className="flex items-center gap-2 justify-start">
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
            }
        </div>
    </th>
}