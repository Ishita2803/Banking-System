import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route ,Switch} from 'react-router-dom'
import ViewAllusers from './components/viewAllusers';
import 'bootstrap/dist/css/bootstrap.min.css'
import Edit from './components/edit'
import FrontPage from './components/frontPage';
import ViewOne from './components/viewOne';
import Transfer from './components/transfer';
import Invoice from './components/invoice';
import Nav from './components/nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={FrontPage}/>
          <Route exact path='/viewAll' component={ViewAllusers}/>
          <Route path='/edit/:userID' component={Edit}/>
          <Route path='/view/:userID' component={ViewOne}/>
          <Route path='/transfer/:userID' component={Transfer}/>
          <Route path='/invoice/:userID' component={Invoice}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
