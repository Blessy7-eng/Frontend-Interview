import axios from 'axios';

// Create an axios instance for the JSON server
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Task 1: Fetch all blogs
export const getBlogs = async () => {
  const { data } = await api.get('/blogs');
  return data;
};

// Task 2: Fetch a single blog by ID
export const getBlogById = async (id: number) => {
  const { data } = await api.get(`/blogs/${id}`);
  return data;
};

// Task 3: Create a new blog
export const createBlog = async (newBlog: any) => {
  const { data } = await api.post('/blogs', newBlog);
  return data;
};