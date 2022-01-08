import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './components/Layout';
import Protected from './pages/Protected';
import RequireAuth from './components/RequireAuth';
import Products from './pages/Products';
import Categories from './pages/Categories';
import HighlightedProducts from './pages/HighlightedProducts';
import DataVisualization from './pages/DataVisualization';

function App() {
  return (
    <Routes>
      <Route element ={<Layout />}>
        <Route path = "/" element = {<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/products" element = {<Products />} />
        <Route path = "/categories" element = {<Categories/>} />
        <Route path = "/visualizations" element = {<DataVisualization/>} />
        <Route path = "/interestingproducts" element = {<HighlightedProducts/>} />
        <Route element = {<RequireAuth />}>
          <Route path = "/protected" element = {<Protected />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
