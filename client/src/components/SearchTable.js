import React from 'react'
import { Table } from 'react-bootstrap';
import { TableCard } from './Styles';

const SearchTable = (props) => {
  const { products } = props;
  // console.log(filteredProducts)

  const renderProducts = () => {
    return products.map((product)=>{
      if(product) {
        return(
          <tr key = {product.product_id}> 
            <td>{product.product_name}</td>
            <td>${(Math.round(product.price*100)/100).toFixed(2)}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
          </tr>
      )}
      return null
    })
  };

  return(
    <TableCard style = {{border: "1px solid lightgrey"}}>
      <Table striped borderless hover>
        <thead style = {{borderBottom: "2px solid black"}}>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products && renderProducts()}
        </tbody>
      </Table>
    </TableCard>
  )
};

export default SearchTable;