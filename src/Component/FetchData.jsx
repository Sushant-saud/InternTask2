import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import style from './style.css';
function FetchData() {
    const [data, setdata] = useState([]);
    const apiEndPoint = "https://jsonplaceholder.typicode.com/todos";
    useEffect(() => {
        const getPosts = async () => {
            const { data: res } = await axios.get(apiEndPoint);
            setdata(res);
        };
        getPosts();
    }, []);
//Add data to databse
    const addPost = async () => {
        const post = { title: "New Post", body: "new" };
        await axios.post(apiEndPoint, post);
        setdata([post, ...data]);
    };
//Update data 
    const handleUpdate = async (post) => {
        post.title = "Updated";
        await axios.put(apiEndPoint + "/" + post.id);
        const postsClone = [...data];
        const index = postsClone.indexOf(post);
        postsClone[index] = { ...post };
        setdata(postsClone);
    };
    //Delete data
    const handleDelete = async (post) => {
        await axios.delete(apiEndPoint + "/" + post.id + post);
        setdata(data.filter((p) => p.id !== post.id));
    };
    if (data.length === 0) return <h2> there are no post in the Database </h2>;
    return (
        <>
            <div className="container">
                <h2> There are {data.length} post in the Database </h2>
                <button onClick={addPost} className=" btn-primary">
                   <span>Add Post</span> 
                </button>
                <div className='Details'>
                <table className="table">
                    <thead>
                        <tr>
                          
                            <th>Title</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((post) => (
                            <tr>
                                
                                <td> {post.title} </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdate(post)}
                                        className="btn btn-info btn-sm"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(post)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}

export default FetchData;