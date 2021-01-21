import {
  Switch,
  BrowserRouter, Route, Router
} from "react-router-dom";
import history from "./app/config/history";
import Navbar from './app/components/Navbar/Navbar';
import Admin from './app/views/admin';
import { useState } from "react";
import { isAuthenticated } from './app/config/auth';
import LoginContext from './app/context/LoginContext';
import Portal from './app/views/portal/Portal';
import Login from './app/views/auth/Login';
function App() {

  const [isLogged, setIsLogged] = useState(isAuthenticated())

  return (
    <BrowserRouter >
        <LoginContext.Provider value={{isLogged: isLogged, setIsLogged: setIsLogged}}>
          <Navbar></Navbar>
            <main>
              <Router history={history}>
              <Switch> 
                <Route component={Admin} path="/" />
                <Route component={Portal} path="/portal" />
                <Route exact path={'/login'} component={Login} />
                <Route exact path={'/register'} component={() => <h1>Só um teste</h1>} />
              </Switch>
              </Router>
            </main>
            </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
