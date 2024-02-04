import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import icon_add from '../assets/icon_add.png';
import AddAccount from '../components/AddAccount';
import { useRef } from 'react';
export default () => {
  const addAcountRef = useRef(null);
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>账号管理</Text>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <TouchableOpacity style={styles.addButton} activeOpacity={0.5} onPress={()=>{addAcountRef.current.show()}}>
        <Image source={icon_add} style={styles.addImg}></Image>
      </TouchableOpacity>
      <AddAccount ref={addAcountRef}/>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  titleLayout: {
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  addImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
});
