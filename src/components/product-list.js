import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {GridList} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import ActionAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  clickButton(item){
    this.props.addToCart(item);
  }
 
  render() {
    const Item = (item, key) => (
      <Card key={key}>
        <CardHeader
          title={item.name}
          subtitle={"price: " + item.price + '$'}
        />
        <CardActions>
          <FlatButton icon={<ActionAddShoppingCart />} primary={true} label="Add To Cart" onClick={() => this.clickButton(item)} />
        </CardActions>
        <CardText>
          {item.description}
        </CardText>
      </Card>
    );

    return (
        <div>
          <GridList
            cols={4}
          >
          {this.props.products.map((item, i) => {
            return (
              Item(item, i)
            );
          })
          }
          </GridList>
        </div>
    )
  }
}

export default ProductList;