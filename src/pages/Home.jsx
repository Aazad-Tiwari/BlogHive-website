import React, { useEffect, useState } from 'react'
import { Loading, PostCard, Subscribe } from '../components'
import appwriteService from '../appwrite/configuration'
import { useSelector } from 'react-redux'
import upper from '../assets/upper.png'
import lower from '../assets/lower.png'
import rightImage from '../assets/rightImage.png'
import { Link } from 'react-router-dom'

function Home() {

    const userData = useSelector(state => state.auth.userData)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPosts = async () => {
        if (userData) {
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
        }else{
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

        const truncatedText = (textContent.length > maxlength) ? textContent.slice(0, maxlength - 1) + '…' : textContent;

        return truncatedText;
    }

    function formatDateString(dateString) {
        if (!dateString) return null; // Handle cases where the input is undefined or null

        const date = new Date(dateString); // Convert the date string to a Date object

        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date); // Format the date
    }


    // const truncatedText = truncateHTML(String(lastPost.content), 250)
    // console.log(truncatedText);



    return loading ? <Loading message='Keeping you up-to-date' /> : (
        <div className='w-full h-full mx-auto overflow-x-hidden'>
            <div className='relative w-full h-full xlg:max-h-[796px] xxsm:max-h-[850px] xmd:max-h-[600px] bg-blog_blue flex xxsm:flex-col xmd:flex-row xlg:flex-row justify-around items-center rounded-xl xxsm:px-8 lg:px-0 xmd:gap-6 lg:gap-0'>
                <img src={upper} alt="" className='absolute -top-20 -left-12 hidden xsm:w-[280px] xsm:h-full xsm:block xlg:block xlg:h-auto xlg:w-auto ' loading='lazy' />
                <div className='xlg:w-[540px] xlg:h-[444px] z-10 flex flex-col xxsm:gap-5 xxsm:text-center xmd:text-left xlg:gap-0 justify-between xmd:w-[450px] xmd:h-[355px]'>
                    <p className='text-white font-bold leading-[150%] tracking-[10%] text-base'>Featured Post</p>
                    <h1 className='font-bold text-white xmd:leading-[66px] xxsm:[20px] h-auto xxsm:text-4xl xmd:text-6xl font-roboto'>How AI will Change the Future</h1>
                    <p className='text-base text-white h-auto leading-[150%] '>The future of AI will see home robots having enhanced intelligence, increased capabilities, and becoming more personal and possibly cute. For example, home robots will overcome navigation, direction</p>
                    <button className='w-fit h-12 bg-white rounded-lg font-medium flex items-center text-black px-14 py-4 xmd:mx-0 xxsm:mx-auto'> <Link to='/post/ai-and-future' className='w-full '> Read More </Link> </button>
                </div>
                <div>
                    <img src={rightImage} alt="" className='relative xlg:w-[550px] xlg:h-[506px] z-10 xmd:w-[400px] xmd:h-[355px] xxsm:w-[520px] xxsm:h-[380px] object-cover rounded-lg ' loading='lazy' />
                </div>
                <img src={lower} alt="" loading='lazy' className='absolute -bottom-10 right-0 hidden xlg:block'  />
            </div>


            {userData ?
                <>
                    <h1 className='text-4xl font-bold text-blog_black relative mt-20 xsm:ml-10 underline text-center xsm:text-left'>Our Recent Posts</h1>
                    {
                        posts.map((post, index) => (
                            index < 1 ?
                                <div key={post.$id} className='relative w-full xl:max-w-[1232px] md:max-w-[700px] h-[636px] mt-14 mx-auto rounded-xl hidden md:block xl:block'>
                                    <img src={post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null} alt="" loading='eager' className='w-full h-[530px] object-cover object-top rounded-xl' />
                                    <div className='absolute xl:w-[920px] md:w-[610px] h-[320px] bottom-0 right-0 rounded-lg bg-white shadow flex flex-col justify-around pl-10 border border-black overflow-auto no-scrollbar'>
                                        <p className=' leading-[150%] text-sm font-medium text-[#999999] w-32 '>{formatDateString(post.$createdAt)}</p>
                                        <h2 className='text-3xl leading-[36px] text-left tracking-[-1px] font-bold text-blog_black'>{post.title}</h2>
                                        <p className='text-base text-[#666666] tracking-normal text-left leading-[150%] '>{truncateHTML(String(post.content), 250)}</p>
                                        <button className='w-fit px-6 py-2 border-[2px] rounded-md text-blog_blue font-semibold border-blog_blue'> <Link to={`/post/${post.$id}`} >Read More</Link> </button>
                                    </div>
                                </div> : null
                        ))
                    }

                </> : null}


            {userData ?
                screen.availWidth > 768 ? <div className='relative max-w-[1234px] w-full mx-auto grid xl:grid-cols-3 xmd:grid-cols-2 xlg:gap-5 gap-3 items-center justify-center gap-y-14 mt-14 px-2'>
                    {posts.map((post, index) => (
                        (index < 7 && index > 0) ?
                            <div key={post.$id} className=' mx-auto rounded-lg'>
                                <PostCard {...post} time={formatDateString(post.$createdAt)} truncatedContent={truncateHTML(post.content, 250)} />
                            </div>
                            : null
                    ))}
                </div>
                : null : null}

            {userData ?
                screen.availWidth < 768 ? <div className='relative max-w-[1234px] w-full mx-auto grid xl:grid-cols-3 xmd:grid-cols-2 xlg:gap-5 gap-3 items-center justify-center gap-y-14 mt-14 px-2'>
                    {posts.map((post, index) => (
                        (index < 6 ) ?
                            <div key={post.$id} className=' mx-auto rounded-lg'>
                                <PostCard {...post} time={formatDateString(post.$createdAt)} truncatedContent={truncateHTML(post.content, 250)} />
                            </div>
                            : null
                    ))}
                </div>
                : null : null}


            {userData ? <Subscribe /> : <Subscribe content='Please Login to read our recent blogs' />}

        </div>
    )
}

export default Home