import React from 'react'
import Home from './Home'
import Cuisine from './Cuisine';
import Category from '../Components/Category';
import {Navigate, Route, Routes} from 'react-router-dom';

function Pages() {
  return (
    <>
      <Category />
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/cuisine' element={<Cuisine/>} />
        <Route path='/cuisine/:type' element={<Cuisine/>} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </>
  )
}

export default Pages