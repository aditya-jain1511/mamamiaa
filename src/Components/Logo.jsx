import React from 'react'
import {Link} from 'react-router-dom';
import {GiKnifeFork} from 'react-icons/gi'

function Logo() {
  return (
        <div className='logoNav'>
            <GiKnifeFork />
            <Link to={'/home'}  className='logo'> MaMaMia </Link>
        </div>
  )
}

export default Logo