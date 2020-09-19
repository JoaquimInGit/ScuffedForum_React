import React from "react";
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPlus } from '@fortawesome/free-solid-svg-icons';
import postService from "../../services/post";
import SubmitDialogComponent from "../../components/post/SubmitDialogComponent.js";
import CategoryPage from "../category/category.js";

export default class myList extends React.Component {

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
        let userId = JSON.parse(currentUser)._id;
        console.log(userId)
        return(
        <div>
        <CategoryPage props = {this.props} />
            <Container className="float-right" style={{ width: "900px" }} >

                {error !== undefined && <Alert variant={"danger"}>
                    {error}
                </Alert>}
                <Button
                    variant="outline-primary"
                    style={{ margin: "10px 0" }}
                    onClick={() => this.setState({ toCreate: true })} >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Button>
                <SubmitDialogComponent
                    handleClose={() => this.setState({ toCreate: false })}
                    show={toCreate}
                    submited={(updatedPost) => this.setState({ post: updatedPost, toCreate: false })}
                />
                <Table className="table" style={{ width: "900px" }} >
                    <thead>
                        <tr>
                            <th  >Title</th>
                            <th >Description</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) =>
                         post.userId === userId &&
                            
                             <tr key={`post${index}`}>                             
                                    <td >{post.title}</td>
                                    <td >{post.description}</td>
                               <td ><Button variant="outline-primary" onClick={() => this.props.history.push(`/post/details/${post._id}`)} > <FontAwesomeIcon icon={faInfo} /> </Button></td>                               
                            </tr>          
                                        
                        )}
                    </tbody>
                </Table>
            </Container>
            </div>)
    }
}