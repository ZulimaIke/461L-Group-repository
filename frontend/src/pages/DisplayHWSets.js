import React, {useMemo, useState, useEffect } from 'react';
import {useTable} from 'react-table';
//import user_data file
import { displayHWSetsColumns } from './displayHWSetsColumns';
import './manageProject.css';
import { Link, useNavigate } from "react-router-dom";
import { color } from '@mui/system';


export const DisplayHWSets = () => {

    const [user_data, setData] = useState([]);
    const columns = useMemo(() => displayHWSetsColumns, []);
    //const data = useMemo(() => user_data, [])

    const tableInstance = useTable({
        columns: columns,
        data: user_data
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow 
    } = tableInstance

    useEffect(() => {
        fetch('http://localhost:5000/getSets')
        .then(res => res.json())
        .then(data => setData(data)
        );
    })

    const h1Style = {
        color: "white",
        height: "10%",
        justifyContent: "center",
        alignItems: "center", 
        display: "flex"
    }

    return (
        <div>
        <h1 style={h1Style}>
        Hardware Sets
        </h1>
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
        {/* <FormControl fullWidth>
            <InputLabel id="project-stack">Project Selection</InputLabel>
            <Select
                labelId="project-stack"
                id="project-select"
                >
                    <MenuItem>Project 1</MenuItem>
                    <MenuItem>Project 2</MenuItem>
                    <MenuItem>Project 3</MenuItem>
            </Select>
        </FormControl> */}
        </div>
        
    )

}

export default DisplayHWSets;