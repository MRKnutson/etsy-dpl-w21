import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

import SearchBar from '../components/SearchBar';
import SearchTable from '../components/SearchTable';
import { AuthContext } from '../providers/AuthProvider';

const Home =  () => {
  const auth = useContext(AuthContext)
  const [search, setSearch] = useState(null)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts = async () => {
    try {
      let response = await axios.get(`/api/products`)
      setProducts(response.data)
      setFilteredProducts(response.data)
    } catch (err) {
      alert('error getting products')
    };
  };

  const filterProducts = (search) => {
    let allProducts = products
    let mappedProducts = allProducts.map((product)=>{
      if(product.product_name.includes(search)) {
        return product
      }
    })
    setFilteredProducts(mappedProducts)
    setSearch(search)
  };

  return(
    <Container>
      <h1>Home</h1>
      <SearchBar 
        input = {search}
        filterProducts = {filterProducts}
      />
      {products && <SearchTable products ={filteredProducts}/>}
    </Container>
  )
};

export default Home;