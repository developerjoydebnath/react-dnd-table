/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Columns } from './components/Columns';
import { Table } from './components/table/Table';
import { fakeData } from './fakeData/fakeData';

function App() {
  const [data, setData] = React.useState(fakeData({numberOfRows: 300}))
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <Table 
        data={data}
        columns={[...Columns]}
        loading={loading}
      />
    </div>
  )
}

export default App
