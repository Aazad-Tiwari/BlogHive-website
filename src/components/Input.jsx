import React from "react";
import { useId } from "react";

const Input = React.forwardRef(({
  label,
  type = 'text',
  className = '',
  ...props
}, ref) => {

  const id = useId()

  return (
    <div className="w-full">
      {label && <label
        className="inline-block mb-1 pl-1 text-blog_black font-[500]  "
        htmlFor={id}>
        {label}
      </label>}
        <input
        type={type}
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black
        outline-none focus:bg-gray-50 duration-200
         border-2 border-[#7b4ee44d]
         w-full  ${className}`}
        />
    </div>
  )
})


export default Input 