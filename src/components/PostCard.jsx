import React from 'react'
import appwriteService from '../appwrite/configuration'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, time , truncatedContent }) {
    console.log(time);
    
    return (
        <div className='w-96 h-[600px] rounded-lg flex flex-col relative text-blog_black'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt="" className='w-[400px] h-[280px] object-cover relative rounded-lg' />
            <div className='overflow-auto no-scrollbar h-[250px] mt-2 rounded-lg'>
            <p className='px-4 leading-[150%] text-sm font-medium text-[#999999] w-full h-1  mt-3 text-center'> {time} </p>
            <h2 className='px-4 font-bold w-full leading-[30px] h-auto text-2xl font-roboto mt-10 text-left text-black/80'> {title.toUpperCase()} </h2>
            <p className='px-4 text-base h-auto leading-[150%] mt-6  '> {truncatedContent} </p>
            </div>
            <Link to={`/post/${$id}`} className='px-4 mt-6 text-blog_blue underline duration-200 font-bold absolute left-0 bottom-0' >Read More...</Link>
        </div>
    )
}

export default PostCard