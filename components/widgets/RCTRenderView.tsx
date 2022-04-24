import React from 'react';
import {
    View, 
    Text, 
    StyleSheet
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
            style={[styles.local, style]}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
            />
  };
    
 const _renderRemoteVideos = () => {
    return <RtcRemoteView.SurfaceView
            style={[styles.remote, style]}
            uid={uid}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
            // zOrderMediaOverlay={true}
            />
  };
  
  return ((uid == undefined) ? _renderLocalVideos() : _renderRemoteVideos());
};

const styles = StyleSheet.create({
  local: {
    flex:1,
    backgroundColor: '#00ff00',
  },
  remote: {
    flex:1,
    backgroundColor: '#0000ff',
  },
});

export default RCTRenderView;