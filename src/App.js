
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <UserContextProvider className="app">
      <Navbar />
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/write' element={<CreatePost />}/>
        <Route path='/posts/post/:id' element={<PostDetails />}/>
        <Route path='/edit/:id' element={<EditPost />}/>
      </Routes>
      <Footer /> 
    </UserContextProvider>
  );
}

export default App;
