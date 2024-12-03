import React from 'react'
import upper from '../assets/upper.png'
import lower from '../assets/upper.png'

function Subscribe({className}) {
    return (
        <div className={`h-[234px] bg-blog_blue w-full overflow-hidden relative flex items-center justify-center mt-20 ${className} `}>
            <img src={upper} alt="" className='absolute -top-28 -left-28' />
            <h2 className=' text-7xl text-white font-bold leading-3 tracking-wide'>Get Your Stories Heard</h2>
            <img src={lower} alt="" className='absolute -bottom-56 -right-28' />
        </div>
    )
}

export default Subscribe