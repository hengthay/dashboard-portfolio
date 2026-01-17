import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './page/Home'
import Achievement from './page/Achievement'
import Education from './page/Education'
import Experience from './page/Experience'
import Profile from './page/Profile'
import Certificate from './page/Certificate'
import Blog from './page/Blog'
import Project from './page/Project'
import Skill from './page/Skill'
import Login from './page/Login'
import NotFound from './page/NotFound'

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />}/>
        <Route path='/achievements' element={<Achievement />}/>
        <Route path='/educations' element={<Education />}/>
        <Route path='/experiences' element={<Experience />}/>
        <Route path='/profiles' element={<Profile />}/>
        <Route path='/certificates' element={<Certificate />}/>
        <Route path='/blogs' element={<Blog />}/>
        <Route path='/projects' element={<Project />}/>
        <Route path='/skills' element={<Skill />}/>
      </Route>
      <Route path='/login' element={<Login />}/>
      {/* === 404 Fallback === */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App