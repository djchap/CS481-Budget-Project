import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import budgetBlock from "../budgetBlock";

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
            await budgetBlock.methods.deposit().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amount, "ether")
            });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({
            loading: false,
            message: "Your funds have been deposited"
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
                            <label>Amount in Eth</label>
                            <input
                                placeholder="Amount"
                                onChange={event => this.setState({ amount: event.target.value })}
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
