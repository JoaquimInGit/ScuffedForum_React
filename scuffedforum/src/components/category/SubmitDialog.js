import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import categoryServices from '../../services/category';

export default class SubmitDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCategory: '',
        };
    }

    handleSubmit(evt) {
        evt.preventDefault();//prevenir que o formulario submeta por defeito o serviço na web
        categoryServices
            .create(this.state)
            .then(categoryId => this.props.submited({ ...this.state, _id: categoryId }));
    }

    handleCancel() {
        this.setState(this.getFormState());
        this.props.handleClose();
    }


    render() {
        const { show, handleClose } = this.props;
        const { nameCategory } = this.state;

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={evt => this.handleSubmit(evt)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={nameCategory}
                                onChange={evt => this.setState({ nameCategory: evt.target.value })}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Cancel
            </Button>
                        <Button variant="primary" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}