// @mui
import { Box, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
// components
import Page from '../../components/Page';
// import { axiosPosts } from '../utils/axios'
import { getPosts } from 'src/api/blog';



// interface for posts
interface IPost {
    id: number,
    title: string,
    body: string,
    authorId: string,
}


export default function PostsPage() {
    // const [ posts, setPosts ] = useState<IPost[]>([]);
    const [ rows, setRows ] = useState<IPost[]>([]);
    
    // from https://mui.com/components/tables/
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, sortable:true },
        { field: 'title', headerName: 'Title', width: 130, sortable:true },
        { field: 'body', headerName: 'Body', width: 130, sortable:true },
        {
            field: 'authorId',
            headerName: 'Author',
            type: 'string',
            width: 90,
            sortable:true
        }
    ];


    useEffect(() => {
        getPosts().then((res) => {
            console.log('res >> ', res)
            setRows(res.data);
        })
    },[])

    return (
        <Page title="All Posts">
            <Container maxWidth='sm'>
                <Typography variant="h3" component="h1" paragraph>
                    All posts
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div> 
            </Container>
        </Page>
    );
}