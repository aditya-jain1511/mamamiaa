import React from 'react'
import Home from './Home'
import Cuisine from './Cuisine';
import Recipe from './Recipe';
import Category from '../Components/Category';
import Search from '../Components/Search';
import Logo from '../Components/Logo';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Searched from './Searched';
import {AnimatePresence} from 'framer-motion'

function Pages() {
  const location= useLocation();
  return (
    <>
      <Logo></Logo>
      <Search></Search>
      <Category />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/home' element={<Home/>} />
          <Route path='/cuisine/:type' element={<Cuisine/>} />
          <Route path='/searched/:search' element = {<Searched/>} />
          <Route path='/recipe/:name' element = {<Recipe/>} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default Pages