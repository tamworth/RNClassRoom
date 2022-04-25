import React, { useEffect, useRef, useState }  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {RtcChannel, RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';

interface Props {
  style: StyleProp<ViewStyle>;
  uid: String;
  channelName: String;
  volumeProgress: number;
  videoMute: boolean;
}

const RCTRenderView: React.FC<Props> = ({
  style,
  uid,
  channelName,
  volumeProgress,
  videoMute,
}) => {
  // const _channel = useRef<RtcChannel | null>(null);

  // useEffect(() => {
  //   /**
  //    * @name init
  //    * @description Function to initialize the Rtc Engine, attach event listeners and actions
  //    */
  //   const init = async () => {
  //     console.log("rct render view init");
  //     // is local render
  //     if (uid == undefined) {
  //       return;
  //     }
  //     // _channel.current = await RtcChannel.create(uid);
  //     // // await _channel.current.enableVideo();
  //     // _channel.current.addListener('Warning', (warn) => {
  //     //   console.log('channel Warning', warn);
  //     // });

  //     // _channel.current.addListener('Error', (err) => {
  //     //   console.log('channel Error', err);
  //     // });

  //     // _channel.current.
  //   };
  //   init();
  // }, []);

  const _renderLocalVideos = () => {
    return (
      <RtcLocalView.SurfaceView
        style={styles.render}
        channelId={channelName}
        renderMode={VideoRenderMode.Hidden}
      />
    );
  };
  const _renderRemoteVideos = () => {
    return (
      <RtcRemoteView.SurfaceView
        style={styles.render}
        uid={uid}
        channelId={channelName}
        renderMode={VideoRenderMode.Hidden} 
        // zOrderMediaOverlay={true}
      />);
  };

  const _renderBottom = () => {
    let progress = volumeProgress == undefined ? 0.5 : volumeProgress;
    let height = 10 * progress;
    let top = 4 + (10 - height);
    let additionStyle1 = {
      top: top,
      height: height,
    };
    let additionStyle2 = {
      borderRadius: 5,
    };
    var additionStyle = progress < 1 ? additionStyle1 : additionStyle2;
    return (
      <View style={styles.bottom}>
        <Image
          style={styles.image}
          source={require('./resource/ic_mic_status_on.png')}
        />
        <Text style={styles.text}>{'sheen'}</Text>
        <View style={[styles.volume, additionStyle]} />
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
  volume: {
    position: 'absolute',
    top: 4,
    left: 7,
    height: 10,
    width: 6,
    backgroundColor: '#00ff00AA',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default RCTRenderView;
