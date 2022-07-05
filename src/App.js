import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Component } from "react";
export default class App extends Component {
  state = { currentCategory: "", products: [] };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id)
  };
  componentDidMount(){
    this.getProducts();
  }
  getProducts = (categoryId) => {
      let url =  "http://localhost:3000/products";
      if(categoryId){
          url+="?categoryId="+categoryId
      }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <Container>
        <Row>
          <Navi></Navi>
        </Row>
        <Row>
          <Col md={"3"}>
            <CategoryList
              currentCategory={this.state.currentCategory}
              changeCategory={this.changeCategory}
              info={categoryInfo}
            ></CategoryList>
          </Col>
          <Col md={"9"}>
            <ProductList
              products={this.state.products}
              currentCategory={this.state.currentCategory}
              info={productInfo}
            ></ProductList>
          </Col>
        </Row>
      </Container>
    );
  }
}
