import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/configuration'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    console.log(post);
                    if (post) {
                        if (userData.$id == post.userId) {
                            setPost(post)
                        }
                        else {
                            navigate('/all-posts')
                        }
                    }
                })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])



    return post ? <div className='py-8'> <Container>  <PostForm post={post} />  </Container> </div> : null
}

export default EditPost