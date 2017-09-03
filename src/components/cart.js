import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.countTotalPrice = this.countTotalPrice.bind(this);
    this.removeItemFormCart = this.removeItemFormCart.bind(this);
    this.checkItemCouponCode = this.checkItemCouponCode.bind(this);
    this.checkFullCouponCode = this.checkFullCouponCode.bind(this);
    this.state = {
      total_amount: 0,
      coupon_all: 12345,
      coupon_all_on: false
    }
  }

  componentWillMount(){
    this.countTotalPrice();
  }

  componentWillReceiveProps(){
    this.countTotalPrice();
  }

  removeItemFormCart(e){
    let item = e.target.getAttribute('data-id');
    console.log('remove item id: ' + item);
    this.props.removeItem(item);
  }

  changeItemAmount(e, new_value){
    console.log('change price');
    let item_id = e.target.getAttribute('data-id');
    this.props.items[item_id].amount = new_value;
    this.countTotalPrice();
  }

  countTotalPrice() {
    let items = this.props.items,
        price = 0,
        current_price = 0;

    for (let i = 0; i < items.length; i++) {
      current_price = (items[i].discount === false ? items[i].price : items[i].discount_price)
      price += current_price * items[i].amount;
    }
    console.log(this.state.coupon_all_on);
    if(this.state.coupon_all_on === true){
      price = Math.round(price * 0.9);
    }

    console.log('new Total price is: ' + price);
    this.setState({
      total_amount: price
    });
  }

  checkItemCouponCode(e, value){
    console.log('check coupon value');
    let item_id = e.target.getAttribute('data-id');
    if(this.props.items[item_id].discount_id === parseInt(value)){
      e.target.parentNode.style = "background-color:#ccc";
      this.props.updatePrice(item_id, true);
      console.log('you yarn discount! ' + this.props.items[item_id].price);
    }else if(this.props.items[item_id].discount === true
      && this.props.items[item_id].discount_id !== parseInt(value)){
      e.target.parentNode.style = "background-color:transparent";
      this.props.updatePrice(item_id, false);
    }
  }

  checkFullCouponCode(e, value){
    if(this.state.coupon_all === parseInt(value)){
      this.setState({
        coupon_all_on: true
      });
      console.log('earned total discount!');
      setTimeout(()=>{this.countTotalPrice()}, 300);
    }else{
      this.setState({
        coupon_all_on: false
      });
      setTimeout(()=>{this.countTotalPrice()}, 300);
    }
  }

  render() {
    const totalPrice = this.state.total_amount,
          items = this.props.items;
    const actions = (totalPrice !== 0) ? ([
        <RaisedButton
          label="Cancel"
          primary={true}
          style={{'marginRight': '20px'}}
          onClick={this.props.handleClose}
        />,
        <RaisedButton
          label="Process To Checkout"
          primary={true}
          keyboardFocused={true}
          onClick={this.props.buyItems}
        />,
      ]) :
      (<RaisedButton
        label="Close"
        primary={true}
        onClick={this.props.handleClose}
      />);

    const ItemRow = (item, key) => (
      <TableRow key={key} data-id={key}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{item.weight} gr.</TableRowColumn>
        <TableRowColumn>{item.discount === false ? item.price : item.discount_price}$</TableRowColumn>
        <TableRowColumn><TextField
          id={"amount-input-" + key}
          data-id={key}
          defaultValue={(item.amount) ? item.amount : 1}
          onChange={(e, newValue) => this.changeItemAmount(e, newValue)}
        /></TableRowColumn>
        <TableRowColumn><TextField
          id={"coupon-for-" + key}
          data-id={key}
          defaultValue={item.discount === true ? item.discount_id : ''}
          onChange={(e, value) => this.checkItemCouponCode(e, value)}
        /></TableRowColumn>
        <TableRowColumn>
          <IconButton onClick={(e, key) => this.removeItemFormCart(e, item)}>
            <CloseIcon/>
          </IconButton>
        </TableRowColumn>
      </TableRow>
    );
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
      >
        {totalPrice === 0 ? (
          <div>No products added yet! Please add some!</div>
        ) : (
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Item</TableHeaderColumn>
                <TableHeaderColumn>Weight</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Amount</TableHeaderColumn>
                <TableHeaderColumn>Coupon(20%)</TableHeaderColumn>
                <TableHeaderColumn>-</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {items.map((item, i) => {
                return (
                  ItemRow(item, i)
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn>Enter Total coupon code here(10%): </TableRowColumn>
                <TableRowColumn><TextField
                  id={"coupon-all"}
                  onChange={(e, value) => this.checkFullCouponCode(e, value)}
                /></TableRowColumn>
                <TableRowColumn>Total price: {totalPrice}</TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Dialog>
    )
  }
}

export default Cart;