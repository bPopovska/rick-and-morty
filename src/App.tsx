import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CharacterList from "./components/CharacherList";

const App: React.FC = () => {

  return (
    <Router>
      <Switch>
        <Route path="/:pageNr" children={<CharacterList />} />
      </Switch>
      <Switch>
         <Route path="/" children={<CharacterList pageOverride={1} />} />
      </Switch>
    </Router>
  );
};

export default App;
