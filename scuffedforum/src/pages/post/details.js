import React from "react";
import { Container, Button, Col, Row, Jumbotron, Badge, Spinner, Alert, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import postService from "../../services/post";
import RemoveDialogComponent from "../../components/post/removeDialogComponent";
import SubmitDialogComponent from "../../components/post/SubmitDialogComponent";
import SubmitDialogComment from "../../components/post/comment/submitDialogComment";
import RemoveDialogComment from "../../components/post/comment/removeDialogComment";

export default class BookDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: undefined,
      error: undefined,
      toRemove: false,
      toRemoveComment: false,
      toUpdate: false,
      toCreate: false,
    };
  }

  componentDidMount() {
    postService
      .getOne(this.props.match.params.id)
      .then((value) => this.setState({ post: value }))
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { post, error, toRemove,toRemoveComment, toUpdate, toCreate } = this.state;
    let currentUser = sessionStorage.getItem('user');
    let userId = JSON.parse(currentUser)._id;
    return (
      <div>
        <Container>
          <Button variant="outline-primary" style={{ margin: "10px 0" }} onClick={() => this.props.history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Back to list
        </Button>
          {error !== undefined && <Alert variant="danger">{error}</Alert>}
          {post !== undefined ? (
            <div>
              <Jumbotron>
                <Row>
                  <Col xs={6} md={8} lg={9}>
                    <h1>{post.title}</h1>
                    <h5>{post._id}</h5>
                    <Row>
                      <Col xs={4} md={3} lg={2}>
                        <Badge variant="secondary">Description</Badge>
                      </Col>
                      <Col xs={8} md={9} lg={10}>
                        {post.description}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4} md={3} lg={2}>
                        <Badge variant="secondary">Category</Badge>
                      </Col>
                      <Col xs={8} md={9} lg={10}>
                        {post.category}
                      </Col>
                    </Row>


                    <Button
                      variant="outline-primary"
                      style={{ margin: "10px 0" }}
                      onClick={() => this.setState({ toCreate: true })} >
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </Button>
                    <SubmitDialogComment
                      
                      show={toCreate}
                      idPost = {post._id}
                      submited={(updatedPost) => this.setState({ toCreate: false })}
                      handleClose={() => this.setState({ toCreate: false })}
                      
                    />
                    <Table className="table" >
                      <thead>
                        <tr>
                          <th  >User</th>
                          <th >Comment</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {post.comments !== null && post.comments.map((comment, index) =>
                          <tr key={`comment${index}`}>
                            <td >{comment.userId}</td>
                            <td >{comment.comment}</td>
                            {userId === comment.userId &&
                            <td> <Button variant="danger" onClick={() => this.setState({ toRemoveComment: true })}>
                            Remove
                    </Button>
                    
                   
                    
                   
           </td> }

                          </tr>
                        )}
                        {console.log(toRemoveComment)}
                      </tbody>

                      <RemoveDialogComment
                props={this.props}
                postId={post._id}
                comment={post.comment}
                show={toRemoveComment}
                handleClose={() => this.setState({ toRemoveComment: false })}
                removed={() => this.setState({ toRemoveComment: false })}
              />
                    </Table>

                    

                    <br />

                      {userId === post.userId &&
                        <div>
                          <Button variant="dark" onClick={() => this.setState({ toUpdate: true })}>
                            Update
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={() => this.setState({ toRemove: true })}>
                            Remove
                    </Button>
                        </div>
                      }
                  </Col>
                </Row>
              </Jumbotron>
 

              <RemoveDialogComponent
                postId={post._id}
                show={toRemove}
                handleClose={() => this.setState({ toRemove: false })}
                removed={() => this.props.history.goBack()}
              />
              <SubmitDialogComponent
                post={post}
                show={toUpdate}
                handleClose={() => this.setState({ toUpdate: false })}
                submited={(updatedBook) => this.setState({ post: updatedBook, toUpdate: false })}
              />
            </div>

          ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
        </Container>
      </div>
    );
  }
}