import './App.css'
import { Route,Routes } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import Header from './components/Header';
import NotFound from './pages/NotFound';


function App() {

  return (
  <>
  <Header />
    <Routes>
      <Route path="/" element={<ProductListing />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  
  </>
  )
}

export default App
