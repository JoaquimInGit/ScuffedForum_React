import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import postService from '../../services/post';

export default class RemoveDialogComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRemove() {
        postService.remove(this.props.postId).then(() => {
            this.props.removed();
        });
    }

    render() {
        const { show, handleClose } = this.props;
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you Sure you want to remove this Post?
          <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        disabled={false}
                        onClick={() => {
                            this.setState({ sure: true });
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