import React from 'react';
import ReactDOM from 'react-dom';
import Badge from 'material-ui/Badge';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import CartIcon from 'material-ui/svg-icons/action/shopping-cart';
import AppBar from 'material-ui/AppBar';
import AppData from '../data.json';
import ProductList from './components/product-list';
import Cart from './components/cart';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import ChekoutPage from './components/checkout';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.buyItems = this.buyItems.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updatePrice = this.updatePrice.bind(this);

    this.state = {
      openMenu:false,
      open: false,
      message: '-',
      snakeBar:false,
      cart: [],
      totalItems:0
    }
  }

  handleToggleMenu(){
    console.log('toggle menu');
    this.setState({openMenu: !this.state.openMenu});
  }

  addToCart(item) {
    let cartItems = this.state.cart;
    let item_id = item.id;
    let countItems = cartItems.length;
    let itemInCart = false;
    if(countItems > 0){
      for (let i =0; countItems > i; i++){
        if(cartItems[i].id === item_id){
          cartItems[i].amount += 1;
          itemInCart = true;
        }
      }
    }
    if(itemInCart === false){
      item.amount = 1;
      item.discount = false;
      countItems += 1;
      cartItems.push(item);
    }

    this.setState({
      cart:cartItems,
      totalItems:countItems,
      message:'Item '+ item.name + ' added to the cart!',
      snakeBar:true
    });
  }

  openBasket() {
    console.log('open basket');
    this.setState({
      open: true
    })
  }

  handleClose() {
    console.log('close basket');
    this.setState({
      open: false
    })
  }

  buyItems() {
    this.handleClose();

    this.setState({
      cart:[],
      totalItems:0,
      message:'Items are in your mailbox now! Check it!',
      snakeBar:true
    });
  }

  removeItem(item){
    let currentCart = this.state.cart;
    currentCart.splice( item, 1 );
    this.setState({
      cart: currentCart,
      totalItems:this.state.totalItems - 1,
      message:'Item removed from basket!',
      snakeBar:true
    });
  }

  updatePrice(item, discount){
    let currentCart = this.state.cart;
    currentCart[item].discount = discount;
    this.setState({
      cart: currentCart,
      message: discount === true ? 'You yearned 20% discount!' : '',
      snakeBar: discount === true ? true : false
    });
  }

  render() {

    const cartIcon = (
      <div>
        <Badge
          badgeContent={this.state.totalItems}
          secondary={true}
          badgeStyle={{top: 12, right: 12}}
        >
          <IconButton tooltip="Your cart">
            <CartIcon />
          </IconButton>
        </Badge>
      </div>
    );

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Simple store app"
            iconElementRight={this.state.open ? cartIcon : cartIcon}
            onRightIconButtonTouchTap={this.openBasket.bind(this)}
            onLeftIconButtonTouchTap={this.handleToggleMenu.bind(this)}
          />
          <Tabs>
            <Tab label="Catalog"  value="a">
              <ProductList
                products={AppData.products}
                addToCart={this.addToCart}
              />
            </Tab>
            <Cart
              items={this.state.cart}
              open={this.state.open}
              handleClose={this.handleClose}
              removeItem={this.removeItem}
              buyItems={this.buyItems}
              updatePrice={this.updatePrice}
            />
            <Drawer open={this.state.openMenu} openSecondary={true}>
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
            <Snackbar
              open={this.state.snakeBar}
              message={this.state.message}
              action="undo"
              autoHideDuration={3000}
            />
          </Tabs>
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<Home/>, document.getElementById('app'));
