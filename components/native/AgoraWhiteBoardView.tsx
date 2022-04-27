import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent, Platform, View} from 'react-native';

class WhiteBoardView extends React.Component {
  static propTypes: {
    whiteBoardId: PropTypes.Requireable<string>;
    roomUuid: PropTypes.Requireable<string>;
    roomToken: PropTypes.Requireable<string>;
  };
  render() {
    if (Platform.OS == 'android') {
      return <View {...this.props} />;
    }
    return <RCTAgoraWhiteBoardView {...this.props} />;
  }
}

WhiteBoardView.propTypes = {
  whiteBoardId: PropTypes.string,
  roomUuid: PropTypes.string,
  roomToken: PropTypes.string,
};

const RCTAgoraWhiteBoardView = requireNativeComponent(
  'RCTWhiteBoardView',
  WhiteBoardView,
);
export default WhiteBoardView;
