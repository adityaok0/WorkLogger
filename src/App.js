import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Analytics } from "./Analytics";
import { NewTask } from "./NewTask";
import Draggable from "react-draggable";

function App() {
  window.onload = function () {
    document.body.addEventListener("touchstart", function () {}, false);
  };
  return (
    <div className="App">
      <Router>
        <Container fluid className="h-100 p-0">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/analytics">
              <Analytics />
            </Route>
            <Route exact path="/newTab">
              <NewTask />
            </Route>
            *
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
