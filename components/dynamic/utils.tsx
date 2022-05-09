import React from 'react';
import {Text} from 'react-native';
import packages from './packages';

function getParsedModule(
  code: string,
  moduleName: any,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  packages: object | null,
) {
  const _this = Object.create(packages);
  function require(name: string) {
    if (!(name in _this) && moduleName === name) {
      let module = {exports: {}};
      _this[name] = () => module;
      // eslint-disable-next-line no-new-func
      let wrapper = Function('require, exports, module', code);
      wrapper(require, module.exports, module);
    } else if (!(name in _this)) {
      throw `Module '${name}' not found`;
    }
    return _this[name]().exports;
  }

  return require(moduleName);
}

export async function fetchComponent(id: string) {
  try {
    const text = await fetch(
      `http://192.168.31.12:8080//${id}.js?time=${Date.now()}`,
    ).then(a => {
      if (!a.ok) {
        throw new Error('Network response was not ok');
      }
      return a.text();
    });
    console.log('id:', id, ', content:', text);
    return {default: getParsedModule(text, id, packages)};
  } catch (error) {
    console.log(error);
    return {
      default() {
        return <Text>Failed to Render</Text>;
      },
    };
  }
}
