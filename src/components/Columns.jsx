

export const Columns = [
    {
        id: 'id',
        heading: 'ID',
        cell: ({row}) => {
            if(!row) return null;
            return <td>{row?.id}</td>
        }
    },
    {
        id: 'account_name',
        heading: 'Account Name',
        cell: ({row}) => {
            if(!row) return null;
            return <td>{row.account_name}</td>
        }
    },
    {
        id: 'account_number',
        heading: 'Account Number',
        cell: ({row}) => {
            if(!row) return null;
            return <td>{row.account_number}</td>
        }
    },
    {
        id: 'amount',
        heading: 'Amount',
        cell: ({row}) => {
            if(!row) return null;
            return <td>{row.amount}</td>
        }

    },
    {
        id: 'card',
        heading: 'Card',
        cell: ({row}) => {
            if(!row) return null;
            return <td>{row.card_number}</td>
        }
    }
]