import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Layout from './Layout.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Signin from './Components/Signin/Signin.jsx'
import Blog from "./Components/Blog/Blog.jsx"
import App from './App.jsx'
import Signup from './Components/Signup/Signup.jsx'
import GoodbyePage from './Components/DontLeaveUs/Goodbyepage.jsx'
import BlogCreationPage from './Components/BlogCreationPage/BlogCreationPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/logout' element={<GoodbyePage/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/write-blog' element={<BlogCreationPage/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    </StrictMode>,
)
