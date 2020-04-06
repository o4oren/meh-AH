import React from 'react';
import {Header, Icon} from 'react-native-elements';
import * as RootNavigation from '../../services/rootNavigation';

export default  function header() {
  // const navigation =  useNavigation();
  function renderLeftItem() {
    return (
      <Icon
        name='menu'
        type='material'
        color='#fff'
        onPress={() => RootNavigation.toggleDrawer()}
      />
    );
  }
  return (
    <Header
      leftComponent={renderLeftItem()}
      centerComponent={{ text: 'meh-AH!', style: { color: '#fff', fontSize: 20 } }}
      backgroundColor={'#44327d'}
    />
  );
}
