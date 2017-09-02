import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/FlatButton';

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
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <RaisedButton primary={true} label="Add To Cart" onClick={() => this.clickButton(item)} />
        </CardActions>
        <CardText expandable={true}>
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