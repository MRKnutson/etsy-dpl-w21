import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import RenderJson from "../components/RenderJson"

const Categories = () => {
  const [products, setProducts] = useState();

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts= async () => {
    try {
      let response  = await axios.get(`/api/categories`)
      setProducts(response.data)
    } catch (err) {
      alert('error getting products')
    }
  };

  return(
    <Container>
      <RenderJson json = {products} />
    </Container>
  )
};

export default Categories;