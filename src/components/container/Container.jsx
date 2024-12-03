import React from 'react'

function Container({children}) {
  return <div className='relative w-full mx-auto'>
    {children}
  </div>
  
}

export default Container