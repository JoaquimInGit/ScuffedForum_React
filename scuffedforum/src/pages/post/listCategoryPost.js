import React from "react";
import { Container, Button, Table, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import postService from "../../services/post";
import SubmitDialogComponent from "../../components/post/SubmitDialogComponent.js";
import CategoryPage from "../category/category.js";

export default class listCategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            error: undefined,
            toCreate: false,
        }
    }

    componentDidMount() {
        postService.getAll()
        .then(value => this.setState({ posts: value }))
            .catch(err => this.setState({ error: err }));
    }

    render() {
        const { posts, error, toCreate } = this.state;
        let currentUser = sessionStorage.getItem('user');
        let role = JSON.parse(currentUser).role;
        return(
            <Container >
            <Row>
                <Col xs={6} md={4}>
                    <CategoryPage props={this.props} />
                </Col>
                <Col xs={12} md={8}>
            <Container >

                {error !== undefined && <Alert variant={"danger"}>
                    {error}
                </Alert>}
                <Button
                    variant="outline-warning"
                    style={{ margin: "10px 0" }}
                    onClick={() => this.setState({ toCreate: true })} >
                    <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>&nbsp;
                    Create your Post
                </Button>
                <SubmitDialogComponent
                    handleClose={() => this.setState({ toCreate: false })}
                    show={toCreate}
                    submited={(updatedPost) => this.setState({ post: updatedPost, toCreate: false })}
                />
                <Table className="table" >
                    <thead>
                        <tr>
                            <th  >Title</th>
                            <th >Description</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) =>
                         post.category === window.location.pathname.slice(15) &&
                             <tr key={`post${index}`}>                             
                                    <td >{post.title}</td>
                                    <td >{post.description}</td>
                               <td ><Button 
                               variant="outline-warning" 
                               onClick={() => this.props.history.push(`/post/details/${post._id}`)} > 
                               <FontAwesomeIcon icon={faPlus} /> </Button></td>                               
                            </tr>                                
                        )}
                    </tbody>
                </Table>
            </Container>
            </Col>
                </Row>
            </Container>)
    }
}