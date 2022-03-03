// @mui
import { Box, Container, Typography } from '@mui/material';
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
    authorID:number
}



export default function PostsPage() {
    const [ posts, setPosts ] = useState<IPost[]>([]);
    
    useEffect(() => {
        getPosts().then((res) => {
            console.log('res >> ', res)
            setPosts(res.data);
        })
    },[])

    return (
        <Page title="All Posts">
            <Container>
                <Typography variant="h3" component="h1" paragraph>
                    All the posts
                </Typography>
                <Box>
                    {
                        posts.map((post)=>{
                            return (
                                <Box sx={{ m: 2 }} key={post.id}>  
                                    {post.title}
                                </Box>
                            )
                        })
                    }
                </Box>
            </Container>
        </Page>
    );
}