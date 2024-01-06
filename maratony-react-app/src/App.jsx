import * as React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Sign from './pages/Sign/Sign';
import Runs from './pages/Runs/Runs.jsx';
import ForgotPassword from './pages/Login/ForgotPassword.tsx'
import Results from './pages/Results/Results.jsx';
import Profile from './pages/Profile/Profile.jsx';

function App() {
  console.log(localStorage.getItem('user') === null);
  return (
  <AuthProvider>
    <div className="App">
      <Navbar />
      <div style={{ marginTop: '75px' }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Sign />}></Route>
        <Route path="/runs" element={<Runs />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/results" element={<Results/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
      </div>
      <Footer/>
    </div>
  </AuthProvider>
  );
}

export default App;
