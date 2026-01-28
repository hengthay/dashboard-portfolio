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
import DashboardLayout from './components/layout/DashboardLayout'
import AchievementCreate from './components/Achievement/AchievementCreate'
import AchievementUpdate from './components/Achievement/AchievementUpdate'
import AchievementDetails from './components/Achievement/AchievementDetails'
import BlogCreate from './components/Blog/BlogCreate'
import BlogUpdate from './components/Blog/BlogUpdate'
import BlogDetails from './components/Blog/BlogDetails'
import CertificateCreate from './components/Certificate/CertificateCreate'
import CertificateDetail from './components/Certificate/CertificateDetail'
import CertificateUpdate from './components/Certificate/CertificateUpdate'
import EducationCreate from './components/Education/EducationCreate'
import EducationDetail from './components/Education/EducationDetail'
import EducationUpdate from './components/Education/EducationUpdate'
import ExperienceCreate from './components/Experience/ExperienceCreate'
import ExperienceDetail from './components/Experience/ExperienceDetail'
import ExperienceUpdate from './components/Experience/ExperienceUpdate'
import ProjectCreate from './components/Project/ProjectCreate'
import ProjectDetail from './components/Project/ProjectDetail'
import ProjectUpdate from './components/Project/ProjectUpdate'

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/achievements' element={<Achievement />}/>
          <Route path='/achievements/create' element={<AchievementCreate />}/>
          <Route path='/achievements/:id' element={<AchievementDetails />}/>
          <Route path='/achievements/:id/edit' element={<AchievementUpdate />}/>
          <Route path='/blogs' element={<Blog />}/>
          <Route path='/blogs/create' element={<BlogCreate />}/>
          <Route path='/blogs/:id' element={<BlogDetails />}/>
          <Route path='/blogs/:id/edit' element={<BlogUpdate />}/>
          <Route path='/certificates' element={<Certificate />}/>
          <Route path='/certificates/create' element={<CertificateCreate />}/>
          <Route path='/certificates/:id' element={<CertificateDetail />}/>
          <Route path='/certificates/:id/edit' element={<CertificateUpdate />}/>
          <Route path='/educations' element={<Education />}/>
          <Route path='/educations/create' element={<EducationCreate />}/>
          <Route path='/educations/:id' element={<EducationDetail />}/>
          <Route path='/educations/:id/edit' element={<EducationUpdate />}/>
          <Route path='/experiences' element={<Experience />}/>
          <Route path='/experiences/create' element={<ExperienceCreate />}/>
          <Route path='/experiences/:id' element={<ExperienceDetail />}/>
          <Route path='/experiences/:id/edit' element={<ExperienceUpdate />}/>
          <Route path='/projects' element={<Project />}/>
          <Route path='/projects/create' element={<ProjectCreate />}/>
          <Route path='/projects/:id' element={<ProjectDetail />}/>
          <Route path='/projects/:id/edit' element={<ProjectUpdate />}/>
          <Route path='/profiles' element={<Profile />}/>
          <Route path='/skills' element={<Skill />}/>
        </Route>
      </Route>
      <Route path='/login' element={<Login />}/>
      {/* === 404 Fallback === */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App