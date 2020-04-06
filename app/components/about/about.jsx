import {StyleSheet, View, Linking} from "react-native";
import React from "react";
import {Text} from "react-native-elements";

export default function about() {
  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <Text style={styles.heading}>אודות meh-AH!</Text>
        <Text style={styles.textHebrew}>
          הנחיות משרד הבריאות מגבילות יציאה מהבית שלא לצורך הצטיידות במזון או תרופות למרחק 100 מטרים מהבית.
          אפליקציה זו נועדה לעזור לכם לשמור על המרחק הזה. 100 מטרים הם הרבה פחות ממה שאתם חושבים...
        </Text>
        <View style={styles.divider} />
        <Text style={styles.heading}>About meh-AH!</Text>
        <Text style={styles.text}>
          meh-AH is the IPA phonetic transcription of the Hebrew word for the number 100.{'\n'}
          Israel's Ministry of Health issued emergency instructions,
          among which is the prohibition of leaving home for a distance of more than 100 meters,
          except for the resupplying of food and medication.
          This app can help people measure the distance from home {'\n'}
          100 Meters are a lot less than you might think...
        </Text>
        <View style = {styles.divider} />
        <Text style={styles.heading}>Credits</Text>
        <Text style={styles.text}>Icons made by
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('Freepik')}
          >
            {' '}Freepik{' '}
          </Text>
          {' '}from{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('http://www.flaticon.com')}
          >
            www.flaticon.com
          </Text>
        </Text>
        <Text style={styles.text}>
          Source code is available as free and open source on {' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://github.com/o4oren/meh-AH')}>
            github
          </Text>.
        </Text>

      </View>
      <View style={styles.bottom}>
        <Text style={styles.text}>
          (c) Oren geva 2020
        </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://sites.google.com/view/meh-ah-privacy-policy/home')}>
          Privacy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textHebrew: {
    fontSize: 16,
    textAlign: 'right',
    marginLeft: 20,
    marginRight: 20
  },
  link: {
    fontSize: 16,
    color: 'blue'
  },
  divider: {
    borderWidth: 0.5,
    borderColor:'#c4c4c4',
    margin:10,
    alignSelf: 'stretch'
  },
  mainBody: {
    // marginBottom: 'auto'
  },
  bottom: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  }
});
