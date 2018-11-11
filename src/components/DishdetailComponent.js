import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    renderDish(dish) {
        console.log('In renderDish, dish is: ' + dish);
        if (dish != null) {
          return (
            <Card>
              <CardImg width="100%" object src={dish.image} alt={dish.name} />
              <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          );
        }
        else {
          return (
            <div></div>//nothing will be rendered on the screen
          );
        }
      }

      render() {
        return (
            <div className="m-1">
              {this.renderDish(this.props.selectedDish)}
            </div>
        );
    }
}



export default DishDetail;