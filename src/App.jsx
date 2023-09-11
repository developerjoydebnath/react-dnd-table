/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Columns } from './components/Columns';
import { Table } from './components/table/Table';
import { fakeData } from './fakeData/fakeData';

function App() {
  const [data, setData] = React.useState(fakeData({numberOfRows: 500}))

  return (
    <div>
      <Table 
        data={data}
        columns={[...Columns]}
        loading={false}
      />
    </div>
  )
}

export default App
