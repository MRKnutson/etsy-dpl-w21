import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormControl, Table } from 'react-bootstrap';
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';

const Home =  () => {
  const auth = useContext(AuthContext)
  const [search, setSearch] = useState(null)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(()=>{
    getProducts()
  },[])

  useEffect(()=>{
    filterProducts()
  },[search])

  const getProducts = async () => {
    try {
      let response = await axios.get(`/api/products`)
      setProducts(response.data)
      setFilteredProducts(response.data)
    } catch (err) {
      alert('error getting products')
    };
  };

  const filterProducts = () => {
    let allProducts = products
    let mappedProducts = allProducts.map((product)=>{
      if(product.product_name.includes(search)) {
        return product
      }
    })
    setFilteredProducts(mappedProducts)
  };

  const renderProducts = () => {
    return products.map((product)=>{
      return(
        <>
          <tr key = {product.product_id}> 
            <td>{product.product_name}</td>
            <td>${(Math.round(product.price*100)/100).toFixed(2)}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
          </tr>
        </>
      )
    })
  };


  return(
    <div>
      <h1>Home</h1>
      <Form className="d-flex" onSubmit={()=>renderProducts()}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange = { (e)=>{setSearch(e.target.value)} }
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts && renderProducts()}
        </tbody>
      </Table>
      <RenderJson json={search} />
      <RenderJson json={filteredProducts} />
    </div>
  )
};

export default Home;