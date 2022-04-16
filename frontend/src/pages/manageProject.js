import React, {useMemo, useState, useEffect } from 'react';
import {useTable} from 'react-table';
//import user_data file
import { Columns } from './columns';
import './manageProject.css';
import {DropdownButton, Dropdown} from 'react-bootstrap';

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
      fetch("http://127.0.0.1:5000/getProjects/")
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
        <div>
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
        </table>
        <DropdownButton id="dropdown-item-button" title="Select project :">
        <Dropdown.ItemText>Select project</Dropdown.ItemText>
        <Dropdown.Item as="button">Item1</Dropdown.Item>
        <Dropdown.Item as="button">Item2</Dropdown.Item>
        <Dropdown.Item as="button">Item3</Dropdown.Item>
        </DropdownButton>
        </div>
        
    )

}

export default ManageProject;