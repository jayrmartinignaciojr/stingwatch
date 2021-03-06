import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Catcher } from 'meteor/marvin:imsi-catcher-catcher';

import { DeviceId } from 'meteor/marvin:device-id';

import { SESSION_STATUS, STATUSES } from '../../globals.js';

import StatusScanning from '../components/status/StatusScanning.jsx';
import StatusDanger from '../components/status/StatusDanger.jsx';
import TweetComposer from '../components/status/TweetComposer.jsx';

class StatusPage extends React.Component {
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
          detection={this.props.detection}
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

export default createContainer(() => {
  const deviceId = DeviceId.get();
  const detectionHandle = Meteor.subscribe('catcher.detections.relevant', deviceId);
  const detection = Catcher.Detections.findOne();
  const isMine = detection && (detection.deviceId === deviceId);

  return {
    detection: detection,
    isMine: isMine
  };
}, StatusPage);
