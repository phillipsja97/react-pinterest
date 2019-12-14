import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/Connection';
import Auth from '../Components/Auth/Auth';
import MyNavbar from '../Components/MyNavBar/MyNavBar';
import BoardsContainer from '../Components/BoardsContainer/BoardsContainer';
import SingleBoard from '../Components/SingleBoard/SingleBoard';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
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

  setSingleBoard = (selectedBoardId) => {
    this.setState({ selectedBoardId });
  };

  renderView = () => {
    const { authed, selectedBoardId } = this.state;

    if (!authed) {
      return (< Auth />);
    }

    if (!selectedBoardId) {
      return (<BoardsContainer setSingleBoard={this.setSingleBoard} />);
    }
    return (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard} />);
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        {
       this.renderView()
        }
      </div>
    );
  }
}

export default App;
