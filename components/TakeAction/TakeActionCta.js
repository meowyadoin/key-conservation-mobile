import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import styles from '../../constants/TakeAction/TakeActionCta';

const TakeActionCta = props => {
  const { profile } = props;
  console.log(profile.org_cta);

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonTouch}
        onPress={async () =>
          profile.org_cta &&
          profile.org_cta !== null &&
          (await WebBrowser.openBrowserAsync(profile.org_cta))
        }
      >
        <Text style={styles.text}>Donate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TakeActionCta;
