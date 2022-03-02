import axios from 'src/utils/axios';

export async function getPosts(): Promise<any>{
    try {
        return axios.get('/blog/posts');

    } catch (error) {
        return []
    }
}