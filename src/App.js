import "./App.css";
import LoginPage from "./pages/loginPage";

import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>

        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
