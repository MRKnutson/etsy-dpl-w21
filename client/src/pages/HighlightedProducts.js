import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import RenderJson from '../components/RenderJson';
import { TableCard } from '../components/Styles';

const HighlightedProducts = () => {
  const [sellerChoice, setSellerChoice] = useState(null)
  const [buyerChoice, setBuyerChoice] = useState(null)
  const [buyer, setBuyer] = useState(null)
  const [buyers, setBuyers]= useState(null)
  const [sellers, setSellers]= useState(null)
  const [products, setProducts]= useState()

  useEffect(()=>{
    getData()
  },[])

  const getData= async ()=>{
    try {
      let sellerResponse = await axios.get(`api/sellers`)
      setSellers(sellerResponse.data)
    } catch (err) {
      alert('error getting data')
    }
  };

  const getBuyerData = async (id) => {
    if(id){
    try{
      let response = await axios.get(`/api/sellers/${id}`)
      setBuyers(response.data)
    } catch (err){
      alert('error getting buyers')
    }}
  };

  const getProducts = async (seller_id, buyer_id) => {
    try {
      let response = await axios.get(`/api/sellers/${seller_id}/buyers/${buyer_id}`)
      setProducts(response.data)
    } catch (err) {
      alert('error getting products')
    }
  };

  const renderSellerOptions =()=>{
      if(sellers){
        return (
          sellers.map((seller)=>{
          return <option key = {seller.id}>{seller.name}</option>
        }))
      } else {
      alert('havent mapped')
    }
  };

  const handleSellerSelection = (seller_name) => {
    if(seller_name){
    setBuyers(null)
    setProducts(null)
    let seller = sellers.find((s)=>s.name == seller_name)
    setSellerChoice(seller)
    getBuyerData(seller.id)}
  };

  const handleBuyerSelection = (buyer_name) => {
    setBuyerChoice(buyer_name)
    let thisBuyer = buyers.find((b)=>b.name == buyer_name)
    setBuyer(thisBuyer)
    getProducts(sellerChoice.id, thisBuyer.id)
  };

  const renderBuyerOptions =()=>{
    if(buyers){
      return buyers.map((buyer)=>{
        return <option key = {buyer.id}>{buyer.name}</option>
      })
    } else {
      return null
    }
  };

  const buyerDropdown = () => {
    if (buyers){
      return(
        <>
          <h3>Buyer</h3>
          <Form.Select onChange = {(e)=>handleBuyerSelection(e.target.value)}>
            {renderBuyerOptions()}
          </Form.Select>
        </>
      )
    } else {
      return(
        <>
          <h3>Buyer</h3>
          <Form.Select disabled />
        </>
      )
    }
  };

  const renderProductTable = () => {
    if(products.length>0){
      return(
        <TableCard style ={{marginTop: "30px"}}>
          <Card border = "dark" className = "text-center" bg = "secondary" text = "white" style = {{borderRadius: "0px"}}> 
            <Row>
              <Col as = "h5">Seller Email: {sellerChoice.email}</Col>
              <Col></Col>
              <Col as = "h5">Buyers max price: {buyer.max_price}</Col>
            </Row>
          </Card>
          <Table striped bordered hover >
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
              {renderRows()}
            </tbody>
          </Table>
        </TableCard>
      )
    } else {
      return (
        <TableCard style ={{marginTop: "30px"}}>
          <Card border = "dark" className = "text-center" bg = "secondary" text = "white" style = {{borderRadius: "0px"}}>
            <h4>No Product Matches</h4>
          </Card>
        </TableCard>
      )
    }
  };

  const renderRows = () => {
    if(products && products != []){
      let uniqueProducts = [... new Set(products.map(product=>product.product_id))]
      let uniqueMatches = uniqueProducts.map(p=>{
        let product = products.find((matchedProduct)=>{
          return(p ==matchedProduct.product_id)
        })
        return product
      })
      return uniqueMatches.map((product)=>{
        return(
          <tr key = {product.product_id}>
            <td>{product.product_name}</td>
            <td>${(Math.round(product.price*100)/100).toFixed(2)}</td>
            <td>{product.description}</td>
            <td>{product.seller_name}</td>
            <td>{product.email}</td>
          </tr>
        )
      })
    } else {
      return (
        <tr>
          <td>No Matches</td>
          <td>No Matches</td>
          <td>No Matches</td>
          <td>No Matches</td>
          <td>No Matches</td>
        </tr>
      )
    }
  };

  return(
    <Container>
      <h1>Select things here</h1>
      <h3>Seller:</h3>
      <Form.Select onChange ={(e)=>handleSellerSelection(e.target.value)}>
        <option>Select a Seller</option>
        {sellers && renderSellerOptions()}
      </Form.Select>
      {buyerDropdown()}
      {products && renderProductTable()}
    </Container>
  )
};

export default HighlightedProducts;