import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import "./style.css";

class Template extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="wrapper">
        <div className="timeline">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/new-question">
              <Button primary>New question</Button>
            </Link>
          </nav>
          {children}
        </div>
      </div>
    );
  }
}

export default Template;
