import React from 'react'
import upper from '../assets/upper.png'
import lower from '../assets/upper.png'

function Subscribe({className, content = 'Get Your Stories Heard' }) {
    return (
        <div className={`h-[234px] bg-blog_blue w-full overflow-hidden relative flex items-center justify-center mt-20 ${className} `}>
            <img src={upper} alt="" className='absolute -top-28 -left-28' />
            <h2 className=' text-6xl text-white font-bold leading-3 tracking-wide text-center'> {content} </h2>
            <img src={lower} alt="" className='absolute -bottom-56 -right-28' />
        </div>
    )
}

export default Subscribe