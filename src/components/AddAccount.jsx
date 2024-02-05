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
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { SvgXml } from 'react-native-svg';
import icon_close_modal from '../assets/icon_close_modal.png';
import {getUUID} from '../utils/UUID';
import {save, load} from '../utils/Storage';
export default forwardRef((props, ref) => {
  const [visable, setVisable] = useState(false); //设置Modal是否可见的State,默认不可见
  const [type, setType] = useState('🎮游戏');
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState();
  const {onSave} = props;
  const [isModify, setIsModify] = useState(false);
  const [isOpenEye,setIsOpenEye] = useState(false);
  /**
   * @description 控制Modal显示函数
   * @return setVisable(true);
   */
  const show = currentAccount => {
    setVisable(true);
    if (currentAccount) {
      setIsModify(true);
      setId(currentAccount.id);
      setType(currentAccount.type);
      setName(currentAccount.name);
      setAccount(currentAccount.account);
      setPassword(currentAccount.password);
    } else {
      setIsModify(false);
      let id = getUUID();
      setId(id);
      setType('🎮游戏');
      setName('');
      setAccount('');
      setPassword('');
    }
  };

  /**
   * @description 控制Modal关闭函数
   * @return setVisable(false);
   */
  const hide = () => {
    setVisable(false);
  };

  /**
   * @description 将show和hide函数传递给父组件
   *
   */
  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  /**
   * @description 保存按钮执行逻辑
   */
  const onSavePress = () => {
    const newAccount = {
      id,
      type,
      name,
      account,
      password,
    };
    load('accountList').then(data => {
      let accountList = data ? JSON.parse(data) : [];
      if (isModify) {
        accountList = accountList.filter(item => item.id !== id);
      }
      accountList.push(newAccount);
      save('accountList', JSON.stringify(accountList)).then(() => {
        hide();
        onSave();
      });
    });
  };
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
        <Text style={styles.titleTxt}>
          {isModify ? '编辑账号' : '添加账号'}
        </Text>
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
      root: {
        flexDirection: 'row',
        marginTop: 8,
      },
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333333',
      },
      eye: {
        position: 'absolute',
        right: 10,
        top: 10
      },
    });
    const xmlOpenEye = `<svg data-v-1932284b="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-1932284b="" fill-rule="evenodd" clip-rule="evenodd" d="M2.11069 9.43732C3.21647 7.77542 5.87904 4.58331 9.89458 4.58331C13.8801 4.58331 16.6483 7.72502 17.8345 9.4049C18.0905 9.76747 18.0905 10.2325 17.8345 10.5951C16.6483 12.2749 13.8801 15.4166 9.89458 15.4166C5.87904 15.4166 3.21647 12.2245 2.11069 10.5626C1.88009 10.2161 1.88009 9.7839 2.11069 9.43732ZM9.89458 3.33331C5.19832 3.33331 2.20919 7.03277 1.07001 8.74489C0.560324 9.51091 0.560323 10.4891 1.07001 11.2551C2.20919 12.9672 5.19832 16.6666 9.89458 16.6666C14.5412 16.6666 17.6368 13.0422 18.8556 11.3161C19.4168 10.5213 19.4168 9.4787 18.8556 8.68391C17.6368 6.95774 14.5412 3.33331 9.89458 3.33331ZM7.29165 9.99998C7.29165 8.50421 8.50421 7.29165 9.99998 7.29165C11.4958 7.29165 12.7083 8.50421 12.7083 9.99998C12.7083 11.4958 11.4958 12.7083 9.99998 12.7083C8.50421 12.7083 7.29165 11.4958 7.29165 9.99998ZM9.99998 6.04165C7.81385 6.04165 6.04165 7.81385 6.04165 9.99998C6.04165 12.1861 7.81385 13.9583 9.99998 13.9583C12.1861 13.9583 13.9583 12.1861 13.9583 9.99998C13.9583 7.81385 12.1861 6.04165 9.99998 6.04165Z" fill="#9499A0"></path>
    </svg>`;
    const xmlCloseEye = `<svg data-v-1932284b="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-1932284b="" fill-rule="evenodd" clip-rule="evenodd" d="M17.5753 6.85456C17.7122 6.71896 17.8939 6.63806 18.0866 6.63806C18.7321 6.63806 19.0436 7.42626 18.5748 7.87006C18.1144 8.30554 17.457 8.69885 16.6478 9.03168L18.1457 10.5296C18.2101 10.5941 18.2613 10.6706 18.2962 10.7548C18.331 10.839 18.349 10.9293 18.349 11.0204C18.349 11.1116 18.331 11.2019 18.2962 11.2861C18.2613 11.3703 18.2101 11.4468 18.1457 11.5113C18.0812 11.5757 18.0047 11.6269 17.9205 11.6618C17.8363 11.6967 17.746 11.7146 17.6548 11.7146C17.5637 11.7146 17.4734 11.6967 17.3892 11.6618C17.305 11.6269 17.2284 11.5757 17.164 11.5113L15.3409 9.68819C15.2898 9.63708 15.247 9.57838 15.2141 9.51428C14.4874 9.71293 13.6876 9.87122 12.8344 9.98119C12.8363 9.99011 12.8381 9.99908 12.8397 10.0081L13.2874 12.5472C13.315 12.7266 13.2713 12.9098 13.1656 13.0573C13.0598 13.2049 12.9005 13.3052 12.7217 13.3367C12.5429 13.3683 12.3589 13.3285 12.2091 13.2259C12.0592 13.1234 11.9555 12.9663 11.9202 12.7882L11.4725 10.2491C11.4645 10.2039 11.4611 10.1581 11.4621 10.1125C10.9858 10.1428 10.4976 10.1586 10.0002 10.1586C9.57059 10.1586 9.14778 10.1468 8.73362 10.1241C8.73477 10.1656 8.7322 10.2074 8.72578 10.249L8.27808 12.7881C8.24612 12.9694 8.14345 13.1306 7.99265 13.2362C7.84186 13.3418 7.65528 13.3831 7.47398 13.3512C7.29268 13.3192 7.1315 13.2166 7.0259 13.0658C6.9203 12.915 6.87892 12.7284 6.91088 12.5471L7.35858 10.008C7.35877 10.007 7.35896 10.0061 7.35915 10.0052C6.50085 9.90284 5.6941 9.75191 4.95838 9.56025C4.93012 9.60634 4.89634 9.64933 4.85748 9.68819L3.03438 11.5113C2.96992 11.5757 2.8934 11.6269 2.80918 11.6618C2.72496 11.6967 2.63469 11.7146 2.54353 11.7146C2.45237 11.7146 2.36211 11.6967 2.27789 11.6618C2.19367 11.6269 2.11714 11.5757 2.05268 11.5113C1.98822 11.4468 1.93709 11.3703 1.90221 11.2861C1.86732 11.2019 1.84937 11.1116 1.84937 11.0204C1.84937 10.9293 1.86732 10.839 1.90221 10.7548C1.93709 10.6706 1.98822 10.5941 2.05268 10.5296L3.49373 9.08855C2.6197 8.744 1.91247 8.33062 1.42559 7.87006C0.956591 7.42636 1.26799 6.63816 1.91359 6.63816C2.10629 6.63816 2.28789 6.71896 2.42489 6.85456C2.70009 7.12696 3.19529 7.45886 3.98459 7.77796C5.54429 8.40856 7.73699 8.77016 10.0001 8.77016C12.2632 8.77016 14.4558 8.40856 16.0156 7.77796C16.8049 7.45886 17.3001 7.12696 17.5753 6.85456Z" fill="#9499A0"></path></svg>`;
    return (
      <View style={styles.root}>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={password}
          secureTextEntry={isOpenEye}
          onChangeText={text => {
            setPassword(text || '');
          }}></TextInput>
        <TouchableOpacity style={styles.eye} onPress={()=>{
          setIsOpenEye(!isOpenEye)
        }}>
          {isOpenEye ? <SvgXml xml={xmlOpenEye}></SvgXml>: <SvgXml xml={xmlCloseEye}></SvgXml>}
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.6}
        onPress={onSavePress}>
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* NOTE: 当我们需要点击空白地方就能关闭键盘的时候，只需要把父组件设置为ScrollView就行了  */}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.root}>
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
          </View>
        </TouchableWithoutFeedback>
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
