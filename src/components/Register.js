import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import budgetBlock from "../budgetBlock";

export default class Register extends Component {
  state = {
    modalOpen: false,
    value: "",
    name: "",
    goal: "",
    priority: "",
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
      await budgetBlock.methods
        .make_budget(this.state.name, this.state.goal, this.state.priority) // contains the user account name
        .send({
          from: accounts[0]
        });
      this.setState({
        loading: false,
        message: "Your new budget item has been addded"
      });
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "rejected transaction"
      });
    }
  };

  render() {
    return (
      <Modal
        trigger={
          <Button primary onClick={this.handleOpen}>
            Create Account
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Budget Line Creation" />
        <Modal.Content>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Budget Name</label>
              <input
                placeholder="Name"
                onChange={event =>
                  this.setState({
                    name: event.target.value
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Goal</label>
              <input
                  placeholder="How much to save?"
                  onChange={event =>
                      this.setState({
                        goal: event.target.value
                      })
                  }
              />
            </Form.Field>
            <Form.Field>
              <label>Priority</label>
              <input
                  placeholder="How important is this? 1 being most important 10 least"
                  onChange={event =>
                      this.setState({
                        priority: event.target.value
                      })
                  }
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary type="submit" loading={this.state.loading}>
              <Icon name="check" />
              Create Account
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
