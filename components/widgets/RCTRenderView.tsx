import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';

interface Props {
  style: StyleProp<ViewStyle>;
  uid: number;
  channelName: string;
  volumeProgress: number;
  videoMute: boolean;
}

const RCTRenderView: React.FC<Props> = ({
  style,
  uid,
  channelName,
  volumeProgress,
}) => {
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
      />
    );
  };

  const _renderBottom = () => {
    var progress = volumeProgress == undefined ? 0 : volumeProgress;
    //TODO: add scale factor looks good
    progress = progress * 1.2;
    var heightVal = 10 * progress;
    var additionStyle1 = {};
    let borderRadiusVal = 5;
    if (heightVal > 8) {
      heightVal = 10;
      additionStyle1 = {
        borderRadius: borderRadiusVal,
      };
    } else if (heightVal < 2) {
      heightVal = 0;
    } else {
      heightVal = Math.max(Math.min(heightVal, 8), 2);
      additionStyle1 = {
        borderBottomLeftRadius: borderRadiusVal,
        borderBottomRightRadius: borderRadiusVal,
      };
    }
    let topVal = 10 - heightVal;
    let additionStyle2 = {
      top: 4 + topVal,
      height: heightVal,
    };
    return (
      <View style={styles.bottom}>
        <Image
          style={styles.image}
          source={require('./resource/ic_mic_status_on.png')}
        />
        <Text style={styles.text}>{'sheen'}</Text>
        <View style={[styles.volume, additionStyle1, additionStyle2]} />
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
    left: 7,
    width: 6,
    backgroundColor: '#00ff00AA',
  },
});

export default RCTRenderView;
