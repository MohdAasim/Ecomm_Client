import './App.css'
import { Route,Routes } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import ProductDesc from './pages/ProductDesc';
import Aboutus from './pages/Aboutus';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';


function App() {

  return (
  <>
    <AuthProvider >
  <Header />
    <Routes>
      <Route path="/" element={<ProductListing />}/>
      <Route path="/desc/:id" element={<ProductDesc />}/>
      <Route path='/about' element={<Aboutus />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </AuthProvider>
  </>
  )
}

export default App
