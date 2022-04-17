import { Link } from 'react-router-dom';

export const Columns = [
    {
        Header: 'Dataset',
        accessor: 'Dataset'
    },
    {
        Header: 'Link',
        accessor: 'link',
	Cell: e =><a href={e.value}> Download zip file here</a>
    }
]