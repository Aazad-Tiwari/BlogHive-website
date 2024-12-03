import React, { useEffect, useState } from 'react'
import { PostCard } from '../components'
import appwriteService from '../appwrite/configuration'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([])
            .then((post) => {
                if (post) {
                    setPosts(post.documents)
                }
            })
    }, [])

    function truncateHTML(htmlString, maxlength) {
        const textContent = new DOMParser().parseFromString(htmlString, 'text/html').body.textContent || '';
        return (textContent.length > maxlength) ? textContent.slice(0, maxlength - 1) + '…' : textContent;
    }

    function formatPostDate(postDate) {
        const date = new Date(postDate);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }


    return (
        <div className='relative max-w-[1234px] mx-auto grid grid-cols-3 gap-5 items-center justify-center border mt-14'>
            {posts.map((post) => {
                const postDate = formatPostDate(post.$createdAt)
                const truncatedContent = truncateHTML(post.content, 250)
                return (
                    <div key={post.$id} className='mx-auto rounded-lg'>
                        <PostCard {...post} time={postDate} truncatedContent={truncatedContent} />
                    </div>
                )
            })}
        </div>
    )
}

export default AllPost