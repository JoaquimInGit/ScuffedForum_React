import React from "react";
import { Modal, Button, Form  } from "react-bootstrap";
import postService from "../../../services/post";

export default class SubmitDialogComponent extends React.Component {
  show = true;

  constructor(props) {
    super(props);
    this.state = {
        userId : 0,
        comment : ""
    }
    this.handleCancel = this.handleCancel.bind(this);
  }


  handleSubmit(evt) {
    let currentUser = sessionStorage.getItem('user');
    let idUser = JSON.parse(currentUser)._id;
    evt.preventDefault();
    if (this.state.comment === "") {
      alert("Cannot Post, with empty fields");
    } else {
      const jsonData = (({comment}) => ({comment}))(
        this.state
      );
        postService.createComment(this.props.idPost, jsonData).then((result) => this.props.submited({...jsonData}));
      }
      window.location.reload();
  }


  handleCancel() {
    this.props.handleClose();
  }


  render() {

    //const { show } = this.props;
    const { comment } = this.state;

    return (
      <Modal show={this.props.show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>Create a Commment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>

            <Form.Group>
              <Form.Control value={comment} onChange={(evt) => this.setState({ comment: evt.target.value })} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              Cancel
            </Button>
            <Button variant="warning" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}