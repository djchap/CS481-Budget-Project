import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import budgetBlock from "../budgetBlock";

export default class ViewBudget extends Component {
  state = {
    modalOpen: false,
    value: "",
    message: "",
    errorMessage: "",
    loading: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit = async event => {
    event.preventDefault();
    var newMessage = "";
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      const accounts = await web3.eth.getAccounts();
      newMessage = await budgetBlock.methods.see_progress().call({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({
      loading: false,
      message: newMessage
    });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button color="yellow" onClick={this.handleOpen}>
            View Budget
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="View Budget" />
        <Modal.Content>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary type="submit" loading={this.state.loading}>
              <Icon name="check" />
              See Budgets
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
