import { useEffect, useState } from "react"
import Get from "./Get"
import Post from "./Post"
import Put from "./Put"
import Delete from "./Delete"

// POST
const postNewsBlog = (data) => Post('posts', false, data)

// PUT
const updateNewsBlog = (data, id) => Put(`posts/${id}`, false, data)

// DELETE
const deleteNewsBlog = (id) => Delete(`posts/${id}`, false)

// GET
const getNewsBlog = () => Get('users', false)
const getComments = () => Get('comments', true)

const API = {
    postNewsBlog,
    updateNewsBlog,
    deleteNewsBlog,
    getNewsBlog,
    getComments
}

export default API


const BlogPost = () => {
    const [state, setState] = useState({
        post: [],
        formBlogPost: {
            id: 1,
            title: '',
            body: ''
        },
        isUpdate: false,
        comments: []
    })

    const getPostAPI = () => {
        API.getNewsBlog().then(result => {
            setState({
                post: result
            })
        })
        API.getComments().then(result => {
            setState({
                comments: result
            })
        })
    }

    const postDataToAPI = () => {
        API.postNewsBlog(state.formBlogPost).then(res => {
            getPostAPI()
            setState({
                isUpdate: false,
                formBlogPost: {
                    id: 1,
                    title: '',
                    body: ''
                }
            })
        })
    }

    const putDataToAPI = () => {
        API.updateNewsBlog(state.formBlogPost, state.formBlogPost.id).then(res => {
            getPostAPI()
            setState({
                isUpdate: false,
                formBlogPost: {
                    id: 1,
                    title: '',
                    body: ''
                }
            })
        })
    }

    handleRemove = (data) => {
        API.deleteNewsBlog(data).then(() => {
            getPostAPI()
        })
    }

    useEffect(() => {
        getPostAPI()
    }, [])

    return (
        <>
            <h2>Blog Post</h2>
            {
                state.comments.map(comment => {
                    return <p>{comment.name} - {comment.email}</p>
                })
            }
        </>
    )
}
