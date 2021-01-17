import "./App.css";
import LoginPage from "./pages/loginPage";

import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AddCustomerPage from "./pages/addCustomerPage";
import UsersNameAndEmail from "./components/usersNameAndEmail";
import DetailCustomerPage from "./pages/detailCustomerPage";

function App() {
  return (
    <div className="App">
      <UsersNameAndEmail />
      <Switch>
        <Route path="/customer/:customerID">
          <DetailCustomerPage />
        </Route>

        <Route path="/add">
          <AddCustomerPage />
        </Route>

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
