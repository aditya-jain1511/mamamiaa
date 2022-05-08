import Veggie from "../Components/Veggie";
import Popular from "../Components/Popular";
import Eggie from "../Components/Eggie";
import Vegan from "../Components/Vegan";
import { motion } from "framer-motion";

import React from 'react'

function Home() {
  return (
    <motion.div animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{duration: 0.5}}>
        <Popular />
        <Eggie />
        <Veggie></Veggie>
        <Vegan />
    </motion.div>
  )
}

export default Home