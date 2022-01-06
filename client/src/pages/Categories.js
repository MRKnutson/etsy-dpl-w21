import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Table } from 'react-bootstrap';
import { TableCard } from '../components/Styles';

const Categories = () => {
  const [products, setProducts] = useState();

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts= async () => {
    try {
      let response  = await axios.get(`/api/categories`)
      normalizeData(response.data)
    } catch (err) {
      alert('error getting products')
    }
  };

  const normalizeData = (data) => {
    let categories = [... new Set(data.map(product=> product.category))];
    let newObject=categories.map((category)=>{
      let filteredProducts = data.filter((p)=>{
        return (p.category == category)
      })
      return({category: category, products: filteredProducts})
    })
    setProducts(newObject);
  };

  const renderTables = () => {
    return products.map((category)=>{
      return(
        <TableCard key = {category.category}>
          <Card border = "dark" className = "text-center" bg = "secondary" text = "white" style = {{borderRadius: "0px"}}>
            <Card.Body>
              <Card.Title>
              {category.category}
              </Card.Title>
            </Card.Body>
          </Card>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Description</th>
                <th>Seller</th>
                <th>Seller Email</th>
              </tr>
            </thead>
            <tbody>
              {renderRows(category.products)}
            </tbody>
          </Table>
        </TableCard>
      )
    })
  };

  const renderRows = (categoryProducts)=>{
    return categoryProducts.map((product)=>{
      return(
        <>
        <tr key = {product.product_id}>
          <td>{product.product_name}</td>
          <td>${(Math.round(product.price*100)/100).toFixed(2)}</td>
          <td>{product.description}</td>
          <td>{product.seller_name}</td>
          <td>{product.email}</td>
        </tr>
        </>
      )
    })
  };

  return(
    <Container>
      <h1>Available Products by Category:</h1>
      {products && renderTables()}
    </Container>
  )
};

export default Categories;