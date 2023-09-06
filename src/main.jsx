import React from 'react'
import { DndProvider, useDragLayer } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


const DragPreview = () => {
  const { item, itemType, currentOffset } = useDragLayer(( monitor ) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
  }))
  
  if(!currentOffset) return null;

  return(
    <div
      style={ itemType === 'COLUMN' && {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: currentOffset.x,
        top: currentOffset.y,
      }
      ||
      itemType === 'ROW' && {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: currentOffset.x / 2,
        top: currentOffset.y + 10,
      }
    }
    >
      {itemType === 'COLUMN' && (
        <div
          style = {{
            border: '1px solid black',
            backgroundColor: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            color: 'black',
          }}
        >
          {item.column.heading}
        </div>
      )}

      
      {itemType === 'ROW' && (
        <div
          style = {{
            border: '1px solid black',
            backgroundColor: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            color: 'black',
          }}
        >
          {item.row.id} | {item.row.account_name} | {item.row.card_number} | {item.row.amount} | {item.row.account_number}
        </div>
      )}
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <DragPreview />
      <App />
    </DndProvider>
  </React.StrictMode>,
)
