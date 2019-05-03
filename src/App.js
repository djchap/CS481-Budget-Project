import React, { Component } from "react";
import web3 from "./web3";
import budgetBlock from "./budgetBlock";
import TopBar from "./components/TopBar";
import { Container, Card } from "semantic-ui-react";
import Register from "./components/Register";
import Withdraw from "./components/Withdraw";
import DepositFunds from "./components/DepositFunds";
import ViewBudget from "./components/ViewBudget";


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
                  Create A New Budget Line
                </h4>
                <Register />
              </Card.Content>
            </Card>

            <Card color="red" header="Close your account">
              <Card.Content>
                <h4>Withdraw from Holdings</h4>
                <br />
                <Withdraw />
              </Card.Content>
            </Card>

            <Card color="green" header="Deposit Funds">
              <Card.Content>
                <h4>Deposit Funds</h4>
                <br />
                <DepositFunds />
              </Card.Content>
            </Card>

              <Card color="yellow" header="View your budget">
                  <Card.Content>
                      <h4>View Your budget</h4>
                      <br />
                      <ViewBudget />
                  </Card.Content>
              </Card>

          </Card.Group>
        </div>
      </Container>
    );
  }
}

export default App;
