import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import RCTRenderView from '../widgets/RCTRenderView';
import WhiteBoardView from '../widgets/WhiteBoardView';
import AccountConfig from '../config/AccountConfig';


import RtcEngine from 'react-native-agora';

class BaseClassRoomContainer extends Component {
  _engine: RtcEngine | undefined;

  constructor(props) {
    super(props);
    this.state = {
      isJoined: false,
      peerIds: [],
      localAudioMute: false,
      localVideoMute: false,
      localVolumeValue: 0.5,
    };
    this.initEngine();
  }

  async initEngine() {
    const {appId} = AccountConfig;
    let that = this;
    that._engine = await RtcEngine.create(appId);
    await that._engine.enableVideo();
    await this._engine.enableAudioVolumeIndication(200, 3, true);
    await this._engine.enableAudio(true);
    // await that._engine.enableLocalAudio(false);
    // await this._engine.disableAudio();
    // await this._engine.muteLocalAudioStream(true);
    that.startListenerAndJoin();
  }

  startListenerAndJoin() {
    this._engine?.addListener('Warning', warn => {
      console.log('engine Warning', warn);
    });

    this._engine?.addListener('Error', err => {
      console.log('engine Error', err);
    });

    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      console.log('engine UserJoined', uid, elapsed);
      // If new user
      if (this.state.peerIds.indexOf(uid) === -1) {
        // Add peer ID to state array
        this.setState({
          peerIds: [...this.state.peerIds, uid],
        });
      }
    });

    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.log('engine UserOffline', uid, reason);
      // Remove peer ID from state array
      this.setState({
        peerIds: this.state.peerIds.filter(id => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('engine JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        isJoined: true,
      });
    });

    this._engine?.addListener(
      'AudioVolumeIndication',
      (speakers, totalVolume) => {
        // console.log('engine AudioVolumeIndication', totalVolume, speakers);
        let localSpeaker = speakers.filter(speaker => speaker.uid == 0)[0];
        if (localSpeaker == undefined) {
          return;
        }
        this.setState({
          localVolumeValue: localSpeaker.volume / 255,
        });
    });

    // Join Channel using null token and channel name
    this._engine?.joinChannel(
      AccountConfig.token,
      AccountConfig.channelName,
      null,
      0,
    );
  }

  muteLocalAudio(mute: boolean) {
    this._engine?.muteLocalAudioStream(mute);
    this.setState({
      localAudioMute: mute,
    });
  }

  muteLocalVideo(mute: boolean) {
    this._engine?.muteLocalVideoStream(mute);
    this.setState({
      localVideoMute: mute,
    });
  }

  renderLocalView() {
    // console.log('isJoined', this.state.isJoined);
    if (this.state.isJoined) {
      return (
        <RCTRenderView
          style={styles.student}
          channelName={AccountConfig.channelName}
          // uid={undefined}
          volumeProgress={this.state.localVolumeValue}
        />
      );
    }
    return <View style={styles.student} />;
  }

  renderWhiteBoard() {
    return (
      <WhiteBoardView
        style={styles.whiteBorder}
        whiteBoardId={AccountConfig.whiteBoardAppId}
        roomUuid={AccountConfig.whiteBoardRoomId}
        roomToken={AccountConfig.whiteBoardRoomToken}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderWhiteBoard()}
        <ScrollView
          style={styles.studentContainer}
          contentContainerStyle={styles.padding}
          horizontal={false}>
          {this.renderLocalView()}
          {this.state.peerIds.map(value => {
            return (<RCTRenderView
                key={value}
                style={styles.student}
                uid={value}
                channelName={AccountConfig.channelName}
              />);})}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  whiteBorder: {
    flex: 3,
  },
  studentContainer: {
    flex: 1,
    backgroundColor: '#00ff00',
    flexDirection: 'column',
  },
  student: {
    height: 100,
    backgroundColor: '#ff00ff',
    margin: 2,
  },
  padding: {
    // paddingVertical:2.5,
    paddingHorizontal: 2,
  },
});

export default BaseClassRoomContainer;
