import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import trojanSecret from "../trojanSecret";

function PlayerList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
      <li>{number}</li>
  );
  return (
      <ul>{listItems}</ul>
  );
}
export default class ListPlayers extends Component {
  state = {
    modalOpen: false,
    players: [],
    numPlayers: "",
    message: "",
    errorMessage: ""
  };

  handleOpen = async () => {
    this.setState({ modalOpen: true });
      const numPlayers = await trojanSecret.methods.memberCount().call();
      this.setState({ numPlayers });
      var i;
      const players = [10];
      for(i = 0; i <= 10;i++){
        players[i] = await trojanSecret.methods.getListOfPlayers(i).call();
      }
      this.setState({players});

  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={
          <Button color="purple" onClick={this.handleOpen}>
            List all Players
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="List All Players" />
        <Modal.Content>
          <h3>
            <br />
            <br />
            {this.state.numPlayers} names have
            been registered to play this game.{}<PlayerList numbers ={this.state.players}/>
          </h3>
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
