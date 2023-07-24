import React from "react";
import "./index.css";
import Notice from "./notice";
import Protect from "./protect";

type appProps = {};

type appState = {
  menu: number;
};

type ObjType = {
  [key: number]: any;
};

const menuList: ObjType = {
  0: <Notice />,
  1: <Protect />,
};

class Index extends React.Component<appProps, appState> {
  constructor(props: appProps) {
    super(props);

    this.state = {
      menu: 0,
    };
  }

  changeMenu = (menuIndex: number) => {
    this.setState({ menu: menuIndex });
  };

  render() {
    return (
      <div className="wrap">
        <div className="menuBar">
          <ul className="tabs">
            <li className={this.state.menu === 0 ? "active" : ""} onClick={() => this.changeMenu(0)}>
              공고
            </li>
            <li className={`${this.state.menu === 1 ? "active" : ""}`} onClick={() => this.changeMenu(1)}>
              보호중 동물
            </li>
          </ul>
        </div>
        <div className="contentArea">{menuList[this.state.menu]}</div>
      </div>
    );
  }
}

export default Index;
