import './App.css'
import {Routes,Route,Outlet} from 'react-router-dom'
import {
  BlogDetails,
  CategoriesPage,
  Home,
  LoginPage,
  SignupPage,
  WriterPage,
} from "./pages";
import { Footer, Loading, Navbar } from './components';

function Layout() {
  return (
    <div className='w-full flex flex-col min-h-screen px-4 md:px-10 2xl'>
      {/* Navbar */}
      <Navbar/>
      <div className='flex-1'>
      <Outlet />
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  )

}
function App() {
const theme = 'light';
const isLoading = false;
  return (
    <main className={theme}>
      <div className='w-full min-h-screen bg-white relative dark:bg-[#020b19]'>
        <Routes>
          <Route element={<Layout />} >
          <Route path='/' element={<Home/>} />
          <Route path='/:slug/:id?' element={<BlogDetails/>} />
          <Route path='/category' element={<CategoriesPage/>} />
          <Route path='/:writer/:id?' element={<WriterPage/>} />
          </Route>
          <Route path='/sign-up' element={<SignupPage/>} />
          <Route path='/sign-in' element={<LoginPage/>} />
        </Routes>
        {isLoading && <Loading/>}
      </div>
    </main>
  )
}

export default App
