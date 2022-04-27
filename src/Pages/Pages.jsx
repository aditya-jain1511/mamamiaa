import React from 'react'
import Home from './Home'
import Cuisine from './Cuisine';
import Recipe from './Recipe';
import Category from '../Components/Category';
import Search from '../Components/Search';
import {Navigate, Route, Routes} from 'react-router-dom';
import Searched from './Searched';

function Pages() {
  return (
    <>
      <Search></Search>
      <Category />
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/cuisine/:type' element={<Cuisine/>} />
        <Route path='/searched/:search' element = {<Searched/>} />
        <Route path='/recipe/:name' element = {<Recipe/>} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </>
  )
}

export default Pages