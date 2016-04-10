import React from 'react';
import NavBar from './NavBar.jsx';
import TweetButton from './TweetButton.jsx';

export default class StatusPage extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <img id="status_scanning-map" className="img-fluid" src="nola.jpg" />
        <TweetButton
          setComposingTweet={this.props.setComposingTweet}
          loggedIn={this.props.loggedIn} />

      </div>
    );
  }
}
