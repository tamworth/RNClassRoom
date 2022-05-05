import React, {Component, useEffect, useRef, useState } from 'react';
import {
    View, 
    ScrollView, 
    StyleSheet
} from 'react-native';
import RCTRenderView from '../widgets/RCTRenderView';
import BaseClassRoomContainer from './BaseClassRoomContainer';
import DynamicComponent from '../dynamic/dynamic-component';

class ClassRoomOneToOneContainer extends BaseClassRoomContainer {

    render(): JSX.Element {
        return <DynamicComponent __id="counter" />
    }
}


export default ClassRoomOneToOneContainer;