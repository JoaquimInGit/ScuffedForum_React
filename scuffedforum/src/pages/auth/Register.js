import React from "react";
import services from "../../services";
import { Form, Button, Card } from "react-bootstrap";
import "./Auth.css";

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", role: 2 };
    }

    handleSubmit(evt) {
        evt.preventDefault();
        services.auth.register(this.state).then(() => {
            this.props.history.push("/login");
        });
    }

    render() {
        const { username, password, role } = this.state;
        return (
            <div id="auth-board">
                <Card style={{ width: "18rem" }}>
                    <Form onSubmit={(evt) => this.handleSubmit(evt)}>
                        <Card.Body>
                            <Card.Title>Register</Card.Title>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control value={username} onChange={(evt) => this.setState({ username: evt.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(evt) => this.setState({ password: evt.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" value={role} onChange={(evt) => this.setState({ role: parseInt(evt.target.value) })}>
                                    <option value={2}>Servent</option>
                                    <option value={1}>Boss</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" block>Register</Button>
                            <Button variant="outline-secondary" size="sm" onClick={() => this.props.history.push("/login")} block>Login</Button>
                        </Card.Body>
                    </Form>
                </Card>
            </div>
        );
    }
}