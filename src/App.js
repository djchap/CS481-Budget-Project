import React, { Component } from "react";
import web3 from "./web3";
import trojanSecret from "./trojanSecret";
import TopBar from "./components/TopBar";
import { Container, Card } from "semantic-ui-react";
import Register from "./components/Register";
import Unregister from "./components/Unregister";
import CreateSecret from "./components/CreateSecret";
import UnlockSecret from "./components/UnlockSecret";
import ReadSecret from "./components/ReadSecret";
import ListPlayers from "./components/ListPlayers";
import GetBalance from "./components/GetBalance";

class App extends Component {
  state = {
    value: "",
    message: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: "Waiting for blockchain transaction to complete..."
    });

    await trojanSecret.methods.registerTrojan(this.state.value).send({
      from: accounts[0]
    });

    this.setState({ message: "you have been registered as a new Trojan!" });
  };

  render() {
    return (
      <Container>
        <TopBar />
        <h4>
          <p></p>
          <p>
            Actions to retrieve information should operate quickly.
            <br />
            But please be aware, actions that push information to the blockchain may
            take about 15 seconds to complete.
          </p>
        </h4>

        <div>
          <Card.Group>
            <Card color="blue" header="Register to Play">
              <Card.Content>
                <h4>
                  Create an account to get started.
                </h4>
                <Register />
              </Card.Content>
            </Card>

            <Card color="red" header="Close your account">
              <Card.Content>
                <h4>We will surely miss you!</h4>
                <br />
                <Unregister />
              </Card.Content>
            </Card>

            <Card color="green" header="Deposit Funds">
              <Card.Content>
                <h4>Deposit Funds</h4>
                <br />
                <CreateSecret />
              </Card.Content>
            </Card>

              <Card color="yellow" header="View your budget">
                  <Card.Content>
                      <h4>View Your budget</h4>
                      <br />
                      <ReadSecret />
                  </Card.Content>
              </Card>

          </Card.Group>
        </div>
      </Container>
    );
  }
}

export default App;
