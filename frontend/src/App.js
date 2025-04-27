import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './page/Home'
import ProductDetail from '../src/component/ProductDetail'

export default function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/product/:id" component={ProductDetail} /> {/* Route cho chi tiết sản phẩm */}
      </Switch>
    </div>
  </Router>
  )
}
