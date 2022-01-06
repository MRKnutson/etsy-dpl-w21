import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Container, Table } from 'react-bootstrap';
import { TableCard } from '../components/Styles';

const Products = () => {
  const [normalizedData, setNormalizedData] = useState([]);

  useEffect(()=>{
    getProducts()
  },[]);

  const getProducts = async () => {
    try {
      let response = await axios.get(`/api/products`)
      normalizeData(response.data)
    } catch (err) {
      alert('error getting products')
    }
  };

  const normalizeData = (data) => {
    let sellers = [... new Set(data.map(product=> product.seller_name))];
    let newObject=sellers.map((seller)=>{
      let filteredProducts = data.filter((p)=>{
        return (p.seller_name == seller)
      })
      return({seller_name: seller, seller_email: filteredProducts[0].email, seller_id: filteredProducts[0].seller_id, products: filteredProducts})
    })

    setNormalizedData(newObject);
  };

  const renderTables = () => {
    return normalizedData.map((seller)=>{
      return(
        <TableCard key = {seller.seller_id}>
          <Card border = "dark" className = "text-center" bg = "secondary" text = "white" style = {{borderRadius: "0px"}}>
            <Card.Header>
              <Card.Title>
              {seller.seller_name}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle>
                {seller.seller_email}
              </Card.Subtitle>
            </Card.Body>
          </Card>
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
              {renderRows(seller.products)}
            </tbody>
          </Table>
        </TableCard>
      )
    })
  };

  const renderRows = (products)=>{
    return products.map((product)=>{
      return(
        <tr key = {product.id}>
          <td>{product.product_name}</td>
          <td>${(Math.round(product.price*100)/100).toFixed(2)}</td>
          <td>{product.description}</td>
          <td>{product.category}</td>
        </tr>
      )
    })
  };

  return (
    <Container style = {{marginTop: "15px"}}>
      <h1>Available Products by Seller:</h1>
      {normalizedData && renderTables()}
    </Container>
  );
};

export default Products;