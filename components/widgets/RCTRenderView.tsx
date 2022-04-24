import React from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    Image
} from 'react-native';
import RtcEngine, {
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
} from 'react-native-agora';

interface Props {
  uid: String;
  channelName: String;
}

const RCTRenderView: React.FC<Props> = ({style, uid, channelName}) => {

const _renderLocalVideos = () => {
  console.log('_renderLocalVideos', channelName, uid);
  return <RtcLocalView.SurfaceView
          style={styles.render}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
          />
};
    
const _renderRemoteVideos = () => {
  return (<RtcRemoteView.SurfaceView
            style={styles.render}
            uid={uid}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
            // zOrderMediaOverlay={true}
            />);
  };

  const _renderBottom = () => {
    return (
      <View style={styles.bottom}>
        <Image 
          style={styles.image} 
          source={require('./resource/ic_mic_status_on.png')}/>
        <Text style={styles.text} >{'sheen'}</Text>
      </View>
    );
  };

  return (
    <View style={style}>
      {uid == undefined ? _renderLocalVideos() : _renderRemoteVideos()}
      {_renderBottom()}
    </View>
  );
};

const styles = StyleSheet.create({
  render: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bottom: {
    position: 'absolute',
    backgroundColor: '#00000000',
    height: 22,
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  text: {
    paddingLeft: 3,
    flex: 1,
    color: '#ffffff',
  },
});

export default RCTRenderView;
