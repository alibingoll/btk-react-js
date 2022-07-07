import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import alertify from "alertifyjs"
import {Route, Switch} from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

export default class App extends Component {
    state = {currentCategory: "", products: [], cart: []};

    changeCategory = (category) => {
        this.setState({currentCategory: category.categoryName});
        this.getProducts(category.id)
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = (categoryId) => {
        let url = "http://localhost:3000/products";
        if (categoryId) {
            url += "?categoryId=" + categoryId
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => this.setState({products: data}));
    };
    addToCart = (product) => {
        let newCart = this.state.cart;
        var addedItem = newCart.find(c => c.product.id === product.id);
        if (addedItem) {
            addedItem.quantity += 1
        } else {
            newCart.push({product: product, quantity: 1})
        }
        this.setState({cart: newCart})
        alertify.success(product.productName + " added to cart!", 2)
    };
    removeFromCart = (product) => {
        let newCart = this.state.cart.filter(c => c.product.id !== product.id)
        this.setState({cart: newCart})
        alertify.error(product.productName + " removed from cart!", 2)
    }

    render() {
        let productInfo = {title: "Product List"};
        let categoryInfo = {title: "Category List"};
        return (
            <Container>
                <Navi
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart}
                ></Navi>
                <Row>
                    <Col md={"3"}>
                        <CategoryList
                            currentCategory={this.state.currentCategory}
                            changeCategory={this.changeCategory}
                            info={categoryInfo}
                        ></CategoryList>
                    </Col>
                    <Col md={"9"}>
                        <Switch>
                            <Route exact path={"/"}
                                   render={props=>(
                                       <ProductList
                                           {...props}
                                           products={this.state.products}
                                           currentCategory={this.state.currentCategory}
                                           addToCart={this.addToCart}
                                           info={productInfo}
                                       ></ProductList>
                                   )
                                   }
                            ></Route>

                            <Route exact path={"/cart"} render={props=>(
                                <CartList
                                    {...props}
                                    cart={this.state.cart}
                                    removeFromCart={this.removeFromCart}
                                ></CartList>
                            )}/>

                            <Route component={NotFound}></Route>
                        </Switch>

                    </Col>
                </Row>
            </Container>
        );
    }
}
