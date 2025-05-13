import { useEffect } from 'react'
import './App.css'
import axiosClient from './utils/axiosclient';
import { Route,Routes } from 'react-router-dom';
import Body from './pages/Body';


function App() {

//   const fetchProduct=async()=>{
//       try {
//         const response = await axiosClient.get('/products/');
//         console.log(response.data);
        
//       } catch (error) {
//         console.log(error);
//       }
//   }

//   useEffect(()=>{
//       fetchProduct();
//   },[])

  return (
  <>
    <Routes>
      <Route path="/" element={<Body />}/>
    </Routes>
  </>
  )
}

export default App
