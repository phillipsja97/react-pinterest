import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/Connection';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavBar/MyNavBar';
import BoardsContainer from '../Components/BoardsContainer/BoardsContainer';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    console.log(this.removeListener);
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        {
        (authed) ? (<BoardsContainer />) : (<Auth />)
        }
      </div>
    );
  }
}

export default App;
