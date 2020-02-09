import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { Row, Col } from 'react-flexbox-grid';

const Styles = styled.div`
  padding: 1rem;
  table {
    width : 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
    tfoot {
        tr:first-child {
          td {
            border-top: 2px solid black;
          }
        }
        font-weight: bolder;
      }
  }
`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    }
                )}
            </tbody>
            <tfoot>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => { 
                            if(column.Footer == false){
                                return null;
                            }
                            const columnProps = column.getFooterCustomProps && column.getFooterCustomProps() || {};
                            return (
                                <td {...columnProps} >{column.render('Footer')}</td>
                        ) } )}
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}
function Grid(props) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Transaction',
                accessor: 'store',
                Footer : 'Monthly Reward',
                getFooterCustomProps : ()=>{
                    return {
                        colspan : 3
                    }
                }
            },
            {
                Header: 'Date',
                accessor: 'date',
                Footer : false,
            }, {
                Header: 'Amount Spent',
                accessor: 'amountSpend',
                Footer : false
            }, {
                Header: 'Reward',
                accessor: 'points',
                Footer: info => {
                    // Only calculate total visits if rows change
                    const total = React.useMemo(
                      () =>
                        info.rows.reduce((sum, row) => row.values.points + sum, 0),
                      [info.rows]
                    )
      
                    return <>Total: {total}</>
                  },
            }
        ],
        []
    )

    const data = props.data;//React.useMemo(() => makeData(20), [])
    return (
        <Styles>
            <Row end="xs">
                <Col xs={3} >
                    Total Rewards : {props.totalRewards}
                </Col>
            </Row>
            <Table
                columns={columns}
                data={data}
            />
        </Styles>
    )
}
export default Grid;