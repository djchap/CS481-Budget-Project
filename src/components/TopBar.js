import React, { Component } from "react";
import { Menu, Header, Dropdown } from "semantic-ui-react";
import budgetBlock from "../budgetBlock";

class TopBar extends Component {
  state = {
    contractSymbol: "",
    contractName: ""
  };



  render() {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Menu.Item position="left">
          <Dropdown item icon="wrench" simple>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Header size="large">Welcome to Budget Block! Your block chain budgeting tool.</Header>
        </Menu.Item>
        <Menu.Item postion="right">
          <img
            src="/money.jpg"
            alt="piggy bank"
            width="300"
            height="50"
          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default TopBar;
