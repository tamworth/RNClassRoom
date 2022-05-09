import React from 'react';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import AgoraWhiteBoardView from '../native/AgoraWhiteBoardView';

interface Props {
  style: StyleProp<ViewStyle>;
  whiteBoardId: string;
  roomUuid: string;
  roomToken: string;
}

const WhiteBoardView: React.FC<Props> = ({
  style,
  whiteBoardId,
  roomUuid,
  roomToken,
}) => {
  return (
    <AgoraWhiteBoardView
      style={[styles.container, style]}
      whiteBoardId={whiteBoardId}
      roomUuid={roomUuid}
      roomToken={roomToken}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderRadius: 10,
    borderWidth: 3,
    borderColor: '#00ff00',
  },
});

export default WhiteBoardView;
