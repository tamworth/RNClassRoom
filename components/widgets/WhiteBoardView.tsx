import React from 'react';
import {View, StyleSheet, ViewStyle, StyleProp} from 'react-native';

interface Props {
  style: StyleProp<ViewStyle>;
  uid: String;
  channelName: String;
}

const WhiteBoardView: React.FC<Props> = ({style}) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#00ff00',
  },
});

export default WhiteBoardView;
