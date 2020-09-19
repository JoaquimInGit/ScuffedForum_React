import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import postService from "../../../services/post";

export default class RemoveDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleRemove() {
        postService.removeComment(this.props.postId, this.props.comment)
        window.location.reload();
       
    }

    render() {
        const { show, handleClose } = this.props;
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you Sure you want to remove this comment?
          <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                            this.handleRemove()
                            
                        }}
                    >
                        Delete
              </Button>

                    <Button
                        variant="success"
                        onClick={() => handleClose()}
                    >
                        cancel
          </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}