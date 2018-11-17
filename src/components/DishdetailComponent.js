import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>
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