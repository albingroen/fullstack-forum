import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Importing all of the pages we want to declare routes for
import Template from "./components/template";
import Timline from "./pages/timeline";
import Question from "./pages/question";
import NewQuestion from "./pages/newQuestion";

export default () => (
  <BrowserRouter>
    <Template>
      <Switch>
        <Route path="/" exact component={Timline} />
        <Route
          path="/question/:id"
          exact
          render={props => <Question {...props} />}
        />
        <Route
          path="/new-question"
          exact
          render={props => <NewQuestion {...props} />}
        />
      </Switch>
    </Template>
  </BrowserRouter>
);
