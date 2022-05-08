import React, { useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'

function Search() {

    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e)=> {
        e.preventDefault();
        navigate('/searched/'+input);
    }

    return (
        <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}  className='col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2'>
            <form className='formStyle' onSubmit={submitHandler}>
                <div>
                    <FaSearch />
                    <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
                </div>
            </form>
        </motion.div>
    )
}

export default Search