import React from 'react'
import Home from './Home'
import Cuisine from './Cuisine';
import SeeMore from './SeeMore';
import Recipe from './Recipe';
import Contact from './Contact';
import Category from '../Components/Category';
import Search from '../Components/Search';
import Logo from '../Components/Logo';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Searched from './Searched';
import {AnimatePresence} from 'framer-motion'

function Pages() {
  const location= useLocation();
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Logo></Logo>
      </div>
      <div className='row'>
          <Search></Search>
      </div>
      <div className='row'>
        <Category />
      </div>
      <div className='row'>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path='/home' element={<Home/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/cuisine/:type' element={<Cuisine/>} />
            <Route path='/seemore/:tag/:session' element={<SeeMore/>} />
            <Route path='/searched/:search' element = {<Searched/>} />
            <Route path='/recipe/:name' element = {<Recipe/>} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Pages