import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import RenderJson from '../components/RenderJson';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [normalizedData, setNormalizedData] = useState([]);

  useEffect(()=>{
    getProducts()
  },[]);

  const getProducts = async () => {
    try {
      let response = await axios.get(`/api/products`)
      setProducts(response.data)
      normalizeData(response.data)
    } catch (err) {
      alert('error getting products')
    }
  };

  const normalizeData = (data) => {
    let sellers = [... new Set(data.map(product=> product.seller_name))];
    let newObject=sellers.map((seller)=>{
      let sproducts = data.filter((p)=>{
        return (p.seller_name == seller)
      })
      // let email = data.filter((person)=> person.seller_name === seller).map(person => person.seller_email)
      return({seller_name: seller, products: sproducts})
    })
    // let sproducts = data.filter((p)=>{
    //   return(p.seller_name == "Sue Yu")
    // })
    setNormalizedData(newObject);
  };

  const renderTables = () => {
    return normalizedData.map((seller)=>{
      return(
        <>
        <h3>{seller.seller_name}</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
            </tr>
          </thead>
          <tbody>
            {renderRows(seller.products)}
          </tbody>
        </Table>
        </>
      )
    })
  };

  const renderRows = (products)=>{
    return products.map((product)=>{
      return(
        <>
        <tr>
          <td>{product.product_name}</td>
          <td>${(Math.round(product.price*100)/100).toFixed(2)}</td>
        </tr>
        </>
      )
    })
  };

  return (
    <Container>
      {renderTables()}
      <RenderJson json = {normalizedData} />
      <RenderJson json = {products} />
    </Container>
  );
};

export default Products;