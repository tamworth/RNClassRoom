import * as React from 'react';
import * as ReactNative from 'react-native';
// import * as ReactRedux from "react-redux";
import * as ReactNativeElements from 'react-native-elements';
// import * as ReactNavigationNative from "@react-navigation/native";
// import * as Icons from "react-native-vector-icons";
// import * as RTC from 'react-native-agora';
const Packages = {
  react: () => React,
  'react-native': () => ReactNative,
  // "react-redux": () => ReactRedux,
  'react-native-elements': () => ReactNativeElements,
  // "@react-navigation/native": () => ReactNavigationNative,
  // "react-native-vector-icons": () => Icons
  // "react-native-agora": () => RTC
};

const fromPairs = (
  pairs: (string | (() => {exports: any}))[][] | [any, any][],
) => Object.assign({}, ...pairs.map(([k, v]) => ({[k]: v})));
const AllPackages = fromPairs(
  Object.keys(Packages).map(k => [k, () => ({exports: Packages[k]()})]),
);

export default AllPackages;
