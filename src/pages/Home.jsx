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
    

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => { 
                if (posts) {
                    setPosts(posts.documents.reverse());
                }
            })
            .finally( () => { setLoading(false) } )
    }, [])

    




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



    return loading ? <Loading/> : (
        <div className='w-full h-full'>
            <div className='relative w-full h-full max-h-[796px] bg-blog_blue flex justify-around items-center rounded-xl'>
                <img src={upper} alt="" className='absolute -top-20 -left-12 ' loading='lazy' />
                <div className='w-[540px] h-[444px] z-10 flex flex-col justify-between items-start'>
                    <p className='text-white font-bold leading-[150%] tracking-[10%] text-base'>Featured Post</p>
                    <h1 className='font-bold text-white leading-[66px] h-auto text-6xl font-roboto'>How AI will Change the Future</h1>
                    <p className='text-base text-white h-auto leading-[150%] '>The future of AI will see home robots having enhanced intelligence, increased capabilities, and becoming more personal and possibly cute. For example, home robots will overcome navigation, direction</p>
                    <button className='w-fit h-12 bg-white rounded-lg font-medium flex content-center text-black px-14 py-4'> <Link to='/post/ai-and-future' className='w-full '> Read More </Link> </button>
                </div>
                <div>
                    <img src={rightImage} alt="" className='relative w-[550px] h-[506px] z-10' loading='lazy' />
                </div>
                <img src={lower} alt="" loading='lazy' className='absolute -bottom-10 right-0 '  />
            </div>


            {userData ?
                <>
                    <h1 className='text-4xl font-bold text-blog_black absolute mt-20 ml-10 underline'>Our Recent Posts</h1>
                    {
                        posts.map((post, index) => (
                            index < 1 ?
                                <div key={post.$id} className='relative w-full max-w-[1232px] h-[636px] mt-36 mx-auto rounded-xl'>
                                    <img src={post?.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : null} alt="" loading='lazy' className='w-full h-[530px] object-cover rounded-xl' />
                                    <div className='absolute w-[920px] h-[320px] bottom-0 right-0 rounded-lg bg-white shadow flex flex-col justify-around pl-10'>
                                        <p className=' leading-[150%] text-sm font-medium text-[#999999] w-32 h-1  '>{formatDateString(post.$createdAt)}</p>
                                        <h2 className=' w-[750px] h-9 text-3xl leading-[30px] text-left tracking-[-1px] font-bold text-blog_black'>{post.title}</h2>
                                        <p className='text-base text-[#666666] tracking-normal text-left leading-[150%] w-[750px] h-[70px]'>{truncateHTML(String(post.content), 250)}</p>
                                        <button className='w-fit px-6 py-2 border-[2px] rounded-md text-blog_blue font-semibold border-blog_blue'> <Link to={`/post/${post.$id}`} >Read More</Link> </button>
                                    </div>
                                </div> : null
                        ))
                    }

                </> : null}


            {userData ?
                <div className='relative max-w-[1234px] mx-auto grid grid-cols-3 gap-5 items-center justify-center gap-y-14 mt-14'>
                    {posts.map((post, index) => (
                        index < 6 ?
                            <div key={post.$id} className=' mx-auto rounded-lg'>
                                <PostCard {...post} time={formatDateString(post.$createdAt)} truncatedContent={truncateHTML(post.content, 250)} />
                            </div>
                            : null
                    ))}
                </div>
                : null}


            {userData ? <Subscribe /> : <Subscribe content='Please Login to read our recent blogs' />}

        </div>
    )


}

export default Home