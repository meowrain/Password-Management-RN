import {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import {
  Text,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import icon_close_modal from '../assets/icon_close_modal.png';
export default forwardRef((props, ref) => {
  const [visable, setVisable] = useState(false); //设置Modal是否可见的State,默认不可见
  const [type, setType] = useState('🎮游戏');
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  /**
   * @description 控制Modal显示函数
   * @return setVisable(true);
   */
  const show = () => {
    setVisable(true);
  };

  /**
   * @description 控制Modal关闭函数
   * @return setVisable(false);
   */
  const hide = () => {
    setVisable(false);
  };
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  /**
   * @description 渲染 添加账号文字和关闭按钮
   * @returns React.FC
   */
  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleTxt: {
        fontSize: 16,
        color: '#333333',
        fontWeight: 'bold',
      },
      closeButton: {
        position: 'absolute',
        right: 6,
        resizeMode: 'contain',
      },
      closeImg: {
        width: 30,
        height: 30,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>添加账号</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.closeButton}
          onPress={hide}>
          <Image source={icon_close_modal} style={styles.closeImg}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * @description 渲染账号类型
   * @returns React.FC
   */
  const renderType = () => {
    const styles = StyleSheet.create({
      typesLayout: {
        marginTop: 8,
        width: '100%',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'tomato',
        borderRadius: 8,
      },
      tab: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#c0c0c0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      leftTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      rightTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      moveLeft1Pixel: {
        marginLeft: -1,
      },
      tabTxt: {
        fontSize: 14,
      },
    });

    const typesArray = ['🎮游戏', '🖥️平台', '💳银行卡', '💁其它'];

    return (
      <View style={styles.typesLayout}>
        {typesArray.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.tab,
                index === 0
                  ? styles.leftTab
                  : index === 3
                  ? styles.rightTab
                  : {},
                index > 0 && styles.moveLeft1Pixel,
                {
                  backgroundColor: type === item ? '#3050ff' : 'transparent',
                },
              ]}
              key={`${item}`}
              onPress={() => {
                setType(item);
              }}
              activeOpacity={0.8}>
              <Text
                style={[
                  styles.tabTxt,
                  {color: type === item ? 'white' : '#666666'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  /**
   * @description 渲染账号名称组件
   * @return React.JSX.Element
   */
  const renderName = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={name}
        onChangeText={text => {
          setName(text || '');
        }}></TextInput>
    );
  };
  /**
   * @description 渲染输入账号输入框
   * @returns
   */
  const renderAccount = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={account}
        onChangeText={text => {
          setAccount(text || '');
        }}></TextInput>
    );
  };
  const renderPassword = () => {
    const styles = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
    });
    return (
      <TextInput
        style={styles.input}
        maxLength={20}
        value={password}
        onChangeText={text => {
          setPassword(text || '');
        }}></TextInput>
    );
  };
  const renderButton = () => {
    const styles = StyleSheet.create({
      saveButton: {
        width: '100%',
        height: 44,
        backgroundColor: '#3050ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8,
        marginBottom: 8,
      },
      saveTxt: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
    });
    return (
      <TouchableOpacity style={styles.saveButton} activeOpacity={0.6}>
        <Text style={styles.saveTxt}> 保存 </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={visable}
      onRequestClose={hide}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      {/* NOTE: 使用KeyboardAvoidingView可以让这个框自己往上走，不会让键盘挡住 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding':'height'}
      >
        {/* NOTE: 当我们需要点击空白地方就能关闭键盘的时候，只需要把父组件设置为ScrollView就行了  */}
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.content}>
          {renderTitle()}
          <Text style={styles.subTitleTxt}>账号类型</Text>
          {renderType()}
          <Text style={styles.subTitleTxt}>账号名称</Text>
          {renderName()}
          <Text style={styles.subTitleTxt}>账号</Text>
          {renderAccount()}
          <Text style={styles.subTitleTxt}>密码</Text>
          {renderPassword()}
          {renderButton()}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
});
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#666666',
    marginTop: 10,
  },
});
