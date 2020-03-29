import {Slider, Text} from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";
import {View} from "react-native";
import React from "react";
import allActions from '../../redux/actions';

export default function rangeSlider() {
  const range = useSelector(state => state.settings.allowedRange);
  const dispatch = useDispatch();
  return (
    <View>
      <Slider
        value={range}
        onValueChange={value => dispatch(allActions.settingsActions.setAllowedRange(value))}
        minimumValue={0}
        maximumValue={1000}
        step={10}
        thumbTintColor={'#5388d0'}
      />
      <Text style={styles.text}>מרחק מותר {range} מטרים</Text>
    </View>
  );
}
const styles = {
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
};
