import React, {useMemo, useState, useEffect } from 'react';
import {useTable} from 'react-table';
//import user_data file
import { Columns } from './columns';
import './manageProject.css';
import { Link } from "react-router-dom";

export const ManageProject = () => {

    const [user_data, setData] = useState([]);
    const columns = useMemo(() => Columns, [])
    //const data = useMemo(() => user_data, [])

    const tableInstance = useTable({
        columns: columns,
        data: user_data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow 
    } = tableInstance

    useEffect(() => {
      fetch("/getProjects/")
                        .then(response => 
                            response.json()
                        )
                        .then(data => {
                            setData(JSON.parse(data.user_data))
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        })

    return (
        <table {... getTableProps}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                    ))
                }
                
            </thead>
            <tbody {...getTableBodyProps}>
                { rows.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        { row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>  
                        })}
                    </tr>
                    )
                })}                
            </tbody>
	<li>
          <Link to = "/postLogin">Back</Link>
        </li>
        </table>
    )

}

export default ManageProject;
