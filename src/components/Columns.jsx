import Highlighter from "react-highlight-words";


export const Columns = [
    {
        id: 'id',
        heading: 'ID',
        cell: ({row}, searchText) => {
            if(!row) return null;
            return (
                <td>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchText]}
                        autoEscape={true}
                        caseSensitive={false}
                        textToHighlight={row.id}
                    />
                </td>
            )
        }
    },
    {
        id: 'account_name',
        heading: 'Account Name',
        cell: ({row}, searchText) => {
            if(!row) return null;
            return (
                <td>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchText]}
                        autoEscape={true}
                        caseSensitive={false}
                        textToHighlight={row.account_name}
                    />
                </td>
            )
        }
    },
    {
        id: 'account_number',
        heading: 'Account Number',
        cell: ({row}, searchText) => {
            if(!row) return null;
            return (
                <td>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchText]}
                        autoEscape={true}
                        caseSensitive={false}
                        textToHighlight={row.account_number}
                    />
                </td>
            )
        }
    },
    {
        id: 'amount',
        heading: 'Amount',
        cell: ({row}, searchText) => {
            if(!row) return null;
            return (
                <td>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchText]}
                        autoEscape={true}
                        caseSensitive={false}
                        textToHighlight={row.amount}
                    />
                </td>
            )
        }

    },
    {
        id: 'card',
        heading: 'Card',
        cell: ({row}, searchText) => {
            if(!row) return null;
            return (
                <td>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchText]}
                        autoEscape={true}
                        caseSensitive={false}
                        textToHighlight={row.card}
                    />
                </td>
            )
        }
    }
]