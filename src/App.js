import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/Posts/PostDetails/PostDetails";

function App() {
  return (
    <Router>
      <div className="app">
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/post-details/:id" exact component={PostDetails} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
