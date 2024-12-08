import React, { useEffect, useState } from 'react'
import { Loading, PostCard, Subscribe } from '../components'
import appwriteService from '../appwrite/configuration'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchPosts = async () => {
        try {
            setLoading(true)

            const fetchedPosts = await appwriteService.getPosts([])
            if (fetchedPosts) {
                const reversedPosts = fetchedPosts.documents.reverse()
                setPosts(reversedPosts)
                localStorage.setItem('posts', JSON.stringify(reversedPosts))
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const checkCacheAndFetch = async () => {
            const cachedPosts = localStorage.getItem('posts')
            if (cachedPosts) {
                setPosts(JSON.parse(cachedPosts))
                setLoading(false)
            } else {
                await fetchPosts()
            }
        }

        checkCacheAndFetch()


    }, [])

    useEffect( () => {
        if (sessionStorage.getItem('Required')) {
            fetchPosts();
            sessionStorage.removeItem('Required');
        }else{
            sessionStorage.setItem('Required', 'true' )
        }
    } , [] )


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

    return loading ? (<Loading />) :
        (
            <div>
                <div className='flex flex-col max-w-xl justify-center items-center mx-auto text-center gap-5 mb-16 mt-4'>
                    <p className='font-bold leading-[150%] tracking-[10%] text-sm text-gray-500 animate-pulse'>OUR BLOGS</p>
                    <h2 className='leading-[45%] text-3xl text-blog_black font-bold  '>Find all our blogs here</h2>
                    <p className='leading-[150%] text-sm text-gray-500 font-[500] '>our blogs are written with research research and by well known writers so we can provide you the best blogs and articles to read them all along</p>
                </div>

                <div className='relative max-w-[1234px] mx-auto grid grid-cols-3 gap-5 items-center justify-center border mt-14 gap-y-16'>
                    {posts.map((post) => {
                        const postDate = formatPostDate(post.$createdAt)
                        const truncatedContent = truncateHTML(post.content, 250)
                        return (
                            <div key={post.$id} className='mx-auto rounded-lg '>
                                <PostCard {...post} time={postDate} truncatedContent={truncatedContent} />
                            </div>
                        )
                    })}

                </div>
                <Subscribe className="mb-20" />
            </div>


        )
}

export default AllPost