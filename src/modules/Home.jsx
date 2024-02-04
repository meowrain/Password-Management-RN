import {
  Image,
  LayoutAnimation,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddAccount from '../components/AddAccount';
import {useEffect, useRef, useState} from 'react';
import {load, remove} from '../utils/Storage';
import {
  icon_add,
  icon_game,
  icon_platform,
  icon_bank,
  icon_other,
  icon_arrow,
} from '../utils/Icons';


/**
 * @description 列表中的账户类型
 * /*NOTE: 列表中的账户类型
 */
const typesArray = ['🎮游戏', '🖥️平台', '💳银行卡', '💁其它'];


/**
 *  @description  图标map表
 * /*NOTE: 图标map表
 */
const iconMap = {
  [typesArray[0]]: icon_game,
  [typesArray[1]]: icon_platform,
  [typesArray[2]]: icon_bank,
  [typesArray[3]]: icon_other,
};

/**
 * @description Home页主页
 * /*NOTE: Home页主页
 */
export default () => {
  const addAcountRef = useRef(null);
  const [sectionData, setSectionData] = useState([]);
  const [sectionState, setSectionState] = useState({
    [typesArray[0]]: true,
    [typesArray[1]]: true,
    [typesArray[2]]: true,
    [typesArray[3]]: true,
  });
  useEffect(() => {


    /**
     * @description 加载账号列表，存储在sectionData中
     * /*NOTE: 加载账号列表，存储在sectionData中
     */
    load('accountList').then(data => {
      const accountList = JSON.parse(data);
      const gameList =
        accountList.filter(item => item.type === typesArray[0]) || [];
      const platformList =
        accountList.filter(item => item.type === typesArray[1]) || [];
      const bankList =
        accountList.filter(item => item.type === typesArray[2]) || [];
      const otherList =
        accountList.filter(item => item.type === typesArray[3]) || [];
      const sectionData = [
        {type: typesArray[0], data: gameList},
        {type: typesArray[1], data: platformList},
        {type: typesArray[2], data: bankList},
        {type: typesArray[3], data: otherList},
      ];
      setSectionData(sectionData);
    }, []);
  });


  /**
   *
   * @description 渲染主页头部
   * /*NOTE: 渲染主页头部
   */
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleTxt}>账号管理</Text>
      </View>
    );
  };


  /**
   *
   * @description 渲染列表
   * /*NOTE: 渲染列表
   */
  const renderSectionItem = ({item, index, section}) => {
    if (sectionState[section.type]) {
      return null;
    }
    const styles = StyleSheet.create({
      itemLayout: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
      },
      nameTxt: {
        fontSize: 16,
        color: '#333333',
        fontWeight: 'bold',
      },
      accPwdLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      },
      accPwdTxt: {
        flex: 1,
        fontSize: 14,
        color: '#666666',
        marginTop: 12,
        marginBottom: 6,
      },
    });
    return (
      <View style={styles.itemLayout}>
        <Text style={styles.nameTxt}>{item.name}</Text>
        <View style={styles.accPwdLayout}>
          <Text style={styles.accPwdTxt}>{`账号: ${item.account}`}</Text>
          <Text>{`密码： ${item.password}`}</Text>
        </View>
      </View>
    );
  };

  /**
   * @function renderSectionHeader
   * @param {section}
   * @description 渲染列表头
   * /*NOTE: 渲染列表头
   */
  const renderSectionHeader = ({section}) => {
    return (
      <View
        style={[
          styles.groupHeader,
          {
            borderBottomLeftRadius:
              !section.data.length || !sectionState[section.type] ? 12 : 0,
          },
          {
            borderBottomRightRadius:
              !section.data.length || !sectionState[section.type] ? 12 : 0,
          },
        ]}>
        <Image source={iconMap[section.type]} style={styles.typeImg} />
        <Text style={styles.typeTxt}>{section.type}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.arrowButton}
          onPress={() => {
            const copy = {...sectionState};
            copy[section.type] = !copy[section.type];
            setSectionState(copy);
            LayoutAnimation.easeInEaseOut();
          }}>
          <Image
            style={[
              styles.arrowImg,
              {
                transform: [
                  {rotate: sectionState[section.type] ? '-180deg' : '0deg'},
                ],
              },
            ]}
            source={icon_arrow}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {renderTitle()}
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderSectionItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}></SectionList>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => {
          addAcountRef.current.show();
        }}>
        <Image source={icon_add} style={styles.addImg}></Image>
      </TouchableOpacity>

      <AddAccount ref={addAcountRef} />
    </View>
  );
};

/**
 * /*NOTE: 样式
 */
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
  groupHeader: {
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  typeImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  typeTxt: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  arrowButton: {
    position: 'absolute',
    right: 0,
    padding: 16,
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
});
