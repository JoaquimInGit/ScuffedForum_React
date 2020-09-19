import React from "react";
import { Modal, Button, Form  } from "react-bootstrap";
import postService from "../../services/post";
import categoryService from "../../services/category";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;
  show = true;
  categorys = [];

  constructor(props) {
    super(props);
    this.toEdit = props.post !== undefined;
    this.state = this.getFormState();
    this.getFormState = this.getFormState.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.post }
      : { title: "", description: "", category: "" };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.title === "" || this.state.description === "" || this.state.category === "") {
      alert("Cannot Post, with empty fields");
    } else {
      const jsonData = (({ title, description, category }) => ({ title, description, category }))(
        this.state
      );
      if (this.toEdit) {
        const { _id } = this.props.post;
        postService.update(_id, jsonData).then(() => this.props.submited(jsonData));
      } else {
        postService.create(jsonData).then((result) => this.props.submited({ ...jsonData }));
      }
    }
    window.location.reload();
  }


  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  getCategories() {
    categoryService.getAll()
      .then((value) => { this.categorys = value })
      .catch(err => this.setState({ error: err }));
  }



  render() {

    //const { show } = this.props;
    const { title, description, category } = this.state;
    this.getCategories();
    return (
      <Modal show={this.props.show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit post" : "Create post"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(evt) => this.setState({ title: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control value={description} onChange={(evt) => this.setState({ description: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <select 
              
              onChange={(evt) => this.setState({ category: evt.target.value })}
            
              
              >
                <option >Category</option>
                {this.categorys.map((item, index) =>
                  <option  key={`item${index}`} value={item.nameCategory}>{item.nameCategory}</option>
                )}
              </select>
            
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}