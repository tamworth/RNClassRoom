import React, { useEffect, useRef, useState } from 'react';
import {
  View, 
  ScrollView, 
  StyleSheet
} from 'react-native';
import RCTRenderView from '../widgets/RCTRenderView';
import AccountConfig from '../config/AccountConfig';


interface Props {
  roomName: String;
}

import RtcEngine from 'react-native-agora';

const ClassRoomContainer: React.FC<Props> = (roomName) => {
  const _engine = useRef<RtcEngine | null>(null);
  const [isJoined, setJoined] = useState(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);

  useEffect(() => {
    /**
     * @name init
     * @description Function to initialize the Rtc Engine, attach event listeners and actions
     */
    const init = async () => {
      const { appId } = AccountConfig;
      _engine.current = await RtcEngine.create(appId);
      await _engine.current.enableVideo();

      _engine.current.addListener('Warning', (warn) => {
        console.log('engine Warning', warn);
      });

      _engine.current.addListener('Error', (err) => {
        console.log('engine Error', err);
      });

      _engine.current.addListener('UserJoined', (uid, elapsed) => {
        console.log('engine UserJoined', uid, elapsed);
        // If new user
        if (peerIds.indexOf(uid) === -1) {
          // Add peer ID to state array
          setPeerIds((prev) => [...prev, uid]);
        }
      });

      _engine.current.addListener('UserOffline', (uid, reason) => {
        console.log('engine UserOffline', uid, reason);
        // Remove peer ID from state array
        setPeerIds((prev) => prev.filter((id) => id !== uid));
      });

      // If Local user joins RTC channel
      _engine.current.addListener(
        'JoinChannelSuccess',
        (channel, uid, elapsed) => {
          console.log('engine JoinChannelSuccess', channel, uid, elapsed);
          // Set state variable to true
          this.state.isJoined = true;
        }
      );

      const startCall = async () => {
        // Join Channel using null token and channel name
        await _engine.current?.joinChannel(
          AccountConfig.token,
          AccountConfig.channelName,
          null,
          0
        );
      };

      startCall();
    };

    init();
  }, []);

  const renderLocalView = () => {
    console.log("isJoined", isJoined);
    if(isJoined) {
      return (<RCTRenderView style={styles.teacher} channelName={config.channelName}/> );
    }
    return (<View style={styles.teacher} />);
  };

  const renderTeacherView = () => {
    //  =peerIds.indexOf(0)
  }

  return (
    <View style={styles.container} >
       {renderLocalView()}
      <ScrollView
        style={styles.studentContainer}
        contentContainerStyle={styles.padding}
        horizontal={false}
      >
        {peerIds.map((value) => {
          return (
            <RCTRenderView
              key={value}
              style={styles.student}
              uid={value}
              channelName={config.channelName}
            />
          );
        })}
      </ScrollView> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  teacher: {
    flex:3,
  },
  studentContainer: {
    flex:1,
    backgroundColor: '#00ff00',
    flexDirection: 'column',
  },
  student: {
    height: 150,
    backgroundColor:'#ff00ff',
    margin: 2,
  },
  padding: {
    // paddingVertical:2.5,
    paddingHorizontal: 2,
  },
});

export default ClassRoomContainer;