import React, {Component, useEffect, useRef, useState } from 'react';
import {
    View, 
    ScrollView, 
    StyleSheet
} from 'react-native';
import RCTRenderView from '../widgets/RCTRenderView';
import WhiteBoardView from '../widgets/WhiteBoardView';

const config = {
  appId: '09c93e011d934eb0b4b71b5d8a4d3c4a',
  token: '00609c93e011d934eb0b4b71b5d8a4d3c4aIAAqHGbK3TUk8sRy/KO43hY4dStWsw11E98IoOhIY4WqxvLWKwwAAAAAEABCtiZwfotmYgEAAQB+i2Zi',
  channelName: 'sheenrn',
};

import RtcEngine from 'react-native-agora';

class BaseClassRoomContainer extends Component {
    state = {
        isJoined: false,
        peerIds: [],
    };
    _engine:RtcEngine = null;

    constructor(props) {
        super(props);
        this.initEngine();
    }

    async initEngine() {
        const { appId } = config;
        let that = this
        this._engine = await RtcEngine.create(appId);
        await this._engine.enableVideo();
        that.startListenerAndJoin();
    }

    startListenerAndJoin() {
        this._engine.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        this._engine.addListener('Error', (err) => {
            console.log('Error', err);
        });

        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            // If new user
            if (peerIds.indexOf(uid) === -1) {
                // Add peer ID to state array
                this.setState({
                    peerIds: (prev) => [...prev, uid]
                });
            }
        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            // Remove peer ID from state array
            this.setState({
                peerIds: (prev) => prev.filter((id) => id !== uid)
            });
        });

      // If Local user joins RTC channel
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            // Set state variable to true
            this.setState({
                isJoined: true
            });
        });

        // Join Channel using null token and channel name
        this._engine.joinChannel(
            config.token,
            config.channelName,
            null,
            0);
    }

  renderLocalView() {
    console.log('isJoined', this.state.isJoined);
    if (this.state.isJoined) {
            return (
            <RCTRenderView style={styles.student} channelName={config.channelName}/> 
            );
        }
        return (<View style={styles.student} />);
    }

    renderWhiteBoard() {
        return <WhiteBoardView style={styles.whiteBorder}/>
    }

    render() {
        return (
            <View style={styles.container} >
                {this.renderWhiteBoard()}
                <ScrollView
                    style={styles.studentContainer}
                    contentContainerStyle={styles.padding}
                    horizontal={false}
                >
                    {this.renderLocalView()}
                    {this.state.peerIds.map((value) => {
                        return (<RCTRenderView
                            key={value}
                            style={styles.student}
                            uid={value}
                            channelName={config.channelName}
                        />);
                    })}
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
