// @mui
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridApi, GridCellValue, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
// components
import Page from '../../components/Page';
// import { axiosPosts } from '../utils/axios'
import { getPosts } from 'src/api/blog';
import Avatar from 'src/theme/overrides/Avatar';



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
        },
        {
            field: "action",
            headerName: "Ation",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e:any) => {
                e.stopPropagation(); // don't select this row after clicking
        
                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
        
                api
                  .getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
        
                return alert(JSON.stringify(thisRow, null, 4));
              };
        
              return <Button variant='contained' onClick={onClick}>Modify</Button>;
            }
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
            <Container maxWidth='md'>
                <Typography variant="h3" component="h1" paragraph>
                    All Treasures 
                    <Button variant='outlined' sx={{marginLeft:'10px'}}>Add</Button>
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