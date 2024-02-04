import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  UIManager,
} from 'react-native';
import Home from './src/modules/Home';
/**
 * @description 开启布局动画
 *
 */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
function App() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#f5f5f5'
    backgroundColor: 'dark',
  },
});

export default App;
