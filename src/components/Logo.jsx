import React from 'react'
import {faBlog} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Logo({height }) {
  return (
    <FontAwesomeIcon className={` text-[#7c4ee4] h-10 ${height}`} icon={faBlog} />
  )
}

export default Logo