import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import axios from 'axios';

const DataVisualization = () => {
  const [catAve, setCatAve] = useState();

  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    try {
      let response = await axios.get(`/api/cat_ave`)
      setCatAve(response.data)
    } catch (err) {
      alert('error getting data')
    }
  };

  const Bar = () => {
    return(
      <Container>
        <h3>Average Item Price</h3>
        <VictoryChart domainPadding = {{x : 25}}>
          <VictoryAxis />
          <VictoryAxis 
            dependentAxis
            tickFormat = {(x)=> (`$${x}`)}
          />
          <VictoryBar
            cornerRadius={{ topLeft: 25 }}
            barRatio = {0.6}
            style = {{
              data: {
                fill: "#c43a31",
                // width: 25
              }
            }}
            data = {catAve}
            x = "category"
            y = "frequency"
          />
        </VictoryChart>
      </Container>
    )
  };

  return(
    <Container>
      <h1>Lets Visualize some Data</h1>
      {catAve && Bar()}
    </Container>
  )
};

export default DataVisualization;