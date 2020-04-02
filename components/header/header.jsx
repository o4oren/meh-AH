import React from 'react';
import {Header, Icon} from 'react-native-elements'

export default  function header(props) {
  function renderLeftItem() {
    return (
      <Icon
        name='menu'
        type='material'
        color='#fff'
        onPress={() => props.navigation.openDrawer()}
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
