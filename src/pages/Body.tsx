import React, { useEffect, useState } from 'react'
import axiosClient from '../utils/axiosclient';
import ItemCard from '../components/ItemCard';
import type { Product } from '../types/Product';

const Body:React.FC = () => {
    const [items,setitems] = useState<Product[]>([]);

  const fetchProduct=async()=>{
      try {
        const response = await axiosClient.get<{ products: Product[] }>('/products/');
        const products = response.data.products;
        setitems(products);
        
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
      fetchProduct();
  },[])

  return (
   <>
   <div className='container'>
    {items.map((item) => (
            <ItemCard key={item.id} data={item}/>
      ))}
      </div>
   </>
  )
}

export default Body