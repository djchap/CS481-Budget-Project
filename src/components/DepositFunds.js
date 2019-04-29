import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import trojanSecret from "../trojanSecret";

export default class DepositFunds extends Component {
    state = {
        modalOpen: false,
        value: "",
        days: "",
        amount:"",
        message: "",
        errorMessage: "",
        loading: false
    };

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    onSubmit = async event => {
        event.preventDefault();
        this.setState({
            loading: true,
            errorMessage: "",
            message: "waiting for blockchain transaction to complete..."
        });
        try {
            const accounts = await web3.eth.getAccounts();
            await trojanSecret.methods.setSecret(this.state.value, this.state.amount).send({
                from: accounts[0]
            });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({
            loading: false,
            message: "Your Secret Message has been saved on the Blockchain"
        });
    };

    render() {
        return (
            <Modal
                trigger={
                    <Button  color="green" onClick={this.handleOpen}>
                        Deposit Funds
                    </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Header icon="browser" content="Deposit Funds" />
                <Modal.Content>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Account Name (enter an existing or new account name)</label>
                            <input
                                placeholder="Name"
                                onChange={event => this.setState({ value: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Amount in Eth</label>
                            <input
                                placeholder="Amount"
                                onChange={event => this.setState({ amount: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Number of days to hold funds</label>
                            <input
                                placeholder="Days"
                                onChange={event => this.setState({ days: event.target.value })}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button primary type="submit" loading={this.state.loading}>
                            <Icon name="check" />
                            Deposit
                        </Button>
                        <hr />
                        <h2>{this.state.message}</h2>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.handleClose} inverted>
                        <Icon name="cancel" /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
