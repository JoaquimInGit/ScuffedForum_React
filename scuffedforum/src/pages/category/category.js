import React from 'react';
import { Container, Button, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import servicesCat from "../../services/category";
import SubmitDialogComponent from '../../components/category/SubmitDialog';

export default class TvShowListPage extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {
            categorys: [],
            error: undefined,
            toCreate: false,
            textColor: "secondary"
        };
    }

    componentDidMount() {
        servicesCat.getAll()
            .then(value => this.setState({ categorys: value }))
            .catch(err => this.setState({ error: err }));
    }

    handleRemove(categoryId) {//mandar o id e o metodo removed
        if (categoryId.inserted === 1 || categoryId.inserted === null) {
            servicesCat.remove(categoryId._id)
                .catch(err => this.setState({ error: err }));
        } else {
            servicesCat.remove(categoryId)
                .catch(err => this.setState({ error: err }));
        }
        window.location.reload();
    }



    render() {
        const { categorys, error, toCreate } = this.state;
        let currentUser = sessionStorage.getItem('user');
        let role = JSON.parse(currentUser).role;
        return (
            <Container className="container p-3 my-3 bg-dark text-white" variant="dark"  >
                {error !== undefined && <Alert variant="danger"> {error} </Alert>}
                {<div className="buttons-container">
                    {role === 1 &&
                        <Button
                            variant="outline-warning"
                            style={{ alignSelf: 'flex-start' }}
                            onClick={() => this.setState({ toCreate: true })}
                        >
                            <FontAwesomeIcon icon={faPlus} />&nbsp;New Category
                    </Button>
                    }
                </div>}

                <SubmitDialogComponent
                    show={toCreate}
                    handleClose={() => this.setState({ toCreate: false })}
                    submited={createdCategory =>
                        this.setState({ categorys: [...categorys, createdCategory], toCreate: false })}
                />

                <br />
                <Table responsive className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="text-light" >Category</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {categorys.map((category, index) => (
                            <tr key={`category${index}`}>
                                <td className= "text-warning"
                                    onClick={() => {
                                        console.log(this.props);
                                        this.props.props.history.push("/post/category/" + category.nameCategory)
                                    }
                                }
                                >{category.nameCategory}</td>
                                <td>
                                    {role === 1 &&
                                        <Button
                                        variant="outline-danger"
                                        onClick={() => this.handleRemove(category._id)}
                                        className="float-right"
                                    >
                                        Remove
                                    </Button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}