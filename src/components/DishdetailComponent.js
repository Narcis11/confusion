import React, {Component} from 'react';
import { Control, LocalForm, Errors } from "react-redux-form";
import {Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Label
  } from 'reactstrap';
import {Loading} from './LoadingComponent';

  const required = val => val && val.length;
  const maxLength = len => val => !val || val.length <= len;
  const minLength = len => val => val && val.length >= len;

   function RenderComments({comments, addComment, dishId}) {
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
               <CommentForm dishId={dishId} addComment={addComment} />
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
              <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
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
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish != null) {
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
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
      }

      class CommentForm extends Component {
        constructor(props) {
          super(props);
          this.state = {
            isModalOpen: false,
            yourname:'',
            rating:1,
            feedback:''
          };
          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal() {
          this.setState({
            isModalOpen: !this.state.isModalOpen
          });
          console.log("Modal toggled");
        }
        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        render() {
          console.log("Inside comment form");
          return (
            <div className="submit-comment-modal">
              <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg" /> Submit Comment
              </Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                  <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    <Row className="form-group">
                      <Col md={10}>
                        <Label htmlFor="firstname">Rating</Label>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={10}>
                        <Control.select model=".rating" id=".rating" name="rating" style={{width: '100%'}} >
                          <option value="1" md={10}>1</option>
                          <option value="2" md={10}>2</option>
                          <option value="3" md={10}>3</option>
                          <option value="4" md={10}>4</option>
                          <option value="5" md={10}>5</option>
                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="firstname" md={12}>
                        Your name
                      </Label>
                    </Row>
                    <Row className="form-group">
                      <Col md={10}>
                        <Control.text
                          model=".yourname"
                          id="yourname"
                          name="yourname"
                          placeholder="Your name"
                          className="form-control"
                          validators={{
                            required,
                            minLength: minLength(3),
                            maxLength: maxLength(15)
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".yourname"
                          show="touched"
                          messages={{
                            required: "Required",
                            minLength: "Must be greater than 2 characters",
                            maxLength: "Must be 15 characters or less"
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="feedback" md={12}>
                        Your Feedback
                      </Label>
                    </Row>
                    <Row className="form-group">
                      <Col md={10}>
                        <Control.textarea
                          model=".feedback"
                          id="feedback"
                          name="feedback"
                          rows="6"
                          className="form-control"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={10}>
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </ModalBody>
              </Modal>
            </div>
          );
        }
      }


export default DishDetail;