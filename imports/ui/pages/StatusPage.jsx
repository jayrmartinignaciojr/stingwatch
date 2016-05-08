import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import { SESSION_STATUS, STATUSES } from '../../globals.js';

import StatusScanning from '../components/status/StatusScanning.jsx';
import StatusDanger from '../components/status/StatusDanger.jsx';
import TweetComposer from '../components/status/TweetComposer.jsx';

export default class StatusPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      composingTweet: false
    };
  }

  setComposingTweet(isComposing) {
    this.setState({composingTweet: isComposing})
  }

  renderStatus() {
    if (this.props.status === STATUSES.SCANNING) {
      return (
        <StatusScanning
          setComposingTweet={this.setComposingTweet.bind(this)}
          toggleGeekMode={this.props.toggleGeekMode} />
      );
    } else {
      return (
        <StatusDanger
          setComposingTweet={this.setComposingTweet.bind(this)}
          toggleGeekMode={this.props.toggleGeekMode} />
      );
    }
  }

  render() {
    if(this.state.composingTweet) {
      return (
        <TweetComposer
          status={this.props.status}
          setComposingTweet={this.setComposingTweet.bind(this)} />
      );
    } else {
      return this.renderStatus();
    }
  }
}
