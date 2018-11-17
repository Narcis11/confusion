import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


   function RenderComments({comments}) {
        if (comments != null) {
            console.log('In renderComment, comments is: ' + comments.name); 
            const commentsSection = comments.map(comment => {
                //console.log('key is: ' + comment.comment);
                return (
                    <div> 
                        <li className="mb-3" key={comment.id}>
                            <p className="mb-0">{comment.comment}</p>
                            <p>{comment.author}</p>
                            <p>{new Intl.DateTimeFormat('ro-RO', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
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
            console.log('In renderComment, comments is null');
            return (
                <div></div>//nothing will be rendered on the screen
              );
        }
        
    };
    
    

    function RenderDish({dish}) {
        
        if (dish != null) {
          console.log('In renderDish, dish is: ' + dish.name);
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
          console.log('In renderDish, Dish is null');
          return(
              <div> </div>
          )
        }
      }

      const DishDetail = (props) => {
        if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-6 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            </div>
        );
        }
        else {
            return (
                null
            );
        }
      }



export default DishDetail;