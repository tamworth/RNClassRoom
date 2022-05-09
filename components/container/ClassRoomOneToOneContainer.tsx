import React, {Component, useEffect, useRef, useState } from 'react';
import {StyleSheet} from 'react-native';
import BaseClassRoomContainer from './BaseClassRoomContainer';
import DynamicComponent from '../dynamic/dynamic-component';
import AccountConfig from '../config/AccountConfig';

class ClassRoomOneToOneContainer extends BaseClassRoomContainer {
  render(): JSX.Element {
    return (
      <DynamicComponent
        __id="rtc-render"
        style={styles.container}
        channelName={AccountConfig.channelName}/>
    )
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    }
  });

export default ClassRoomOneToOneContainer;
