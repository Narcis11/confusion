import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {

      renderComment(selectedDish) {
        //console.log('In renderComment, comments is: ' + comments);
        if (selectedDish != null) { 
            const commentsSection = selectedDish.comments.map(comment => {
                //console.log('key is: ' + comment.comment);
                return (
                    <div> 
                        <li className="mb-3" key={comment.id}>
                            <p className="mb-0">{comment.comment}</p>
                            <p>{comment.author}</p>
                        </li>
                    </div>
                );
            });
          return (
             <div>
                <h4>Comments</h4>
               {commentsSection}
             </div>
         )
    }
        else {
            return (
                <div></div>//nothing will be rendered on the screen
              );
        }
        
    }

    renderDish(dish) {
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
          
        }
      }

      render() {
        return (
            <div className="row">
                <div className="col-6 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-6 col-md-5 m-1">
                    {this.renderComment(this.props.selectedDish)}  
                </div>
                
            </div>
        );
    }
}



export default DishDetail;