import React from 'react';
import { View, Text, Linking, Platform } from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import styles from '../../../constants/Profile/tabs/Details';

import Clipboard from '../../../assets/jsicons/detailAboutUs/Clipboard';
import Seedling from '../../../assets/jsicons/detailAboutUs/Seedling';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Envelope from '../../../assets/jsicons/socialmedia/Envelope';
import PhoneAdd from '../../../assets/jsicons/socialmedia/PhoneAdd';
import Phone from '../../../assets/jsicons/socialmedia/Phone';
import IgAdd from '../../../assets/jsicons/socialmedia/IgAdd';
import Twitter from '../../../assets/jsicons/socialmedia/Twitter';
import TwitterAdd from '../../../assets/jsicons/socialmedia/TwitterAdd';
import Instagram from '../../../assets/jsicons/socialmedia/Instagram';
import FbAdd from '../../../assets/jsicons/socialmedia/FbAdd';
import Facebook from '../../../assets/jsicons/socialmedia/Facebook';
import Lightbulb from '../../../assets/jsicons/detailAboutUs/Lightbulb';
import Hand from '../../../assets/jsicons/detailAboutUs/Hand';

const Details = props => {
  const { profile } = props;

  const makeCall = () => {
		let phoneNumber = profile.phone_number;
		// let phoneNumber = 123456789 -- used for testing purposes
		if (Platform.OS === 'android') {
			phoneNumber = `tel:${phoneNumber}`;
		} else {
			phoneNumber = `telprompt:${phoneNumber}`;
		}
		Linking.openURL(phoneNumber);
	};

  return (
    <View style={styles.container}>
      {profile.roles === 'supporter' ? (
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Clipboard />
            <Text style={styles.title}>{'About Me'}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{profile.mini_bio}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Clipboard />
            <Text style={styles.title}>{'About Us'}</Text>
          </View>
          <Text style={styles.body}>{profile.about_us}</Text>
        </View>
      )}

      <View style={styles.sections}>
        <View style={styles.iconWrap}>
          <Seedling />
          <Text style={styles.title}>{'Species & Habitats'}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{profile.species_and_habitats}</Text>
        </View>
      </View>

      {profile.roles !== 'supporter' && (
        <View>
          <View style={styles.SocialContainer}>
            <TouchableOpacity
              onPress={async () => {
                profile.email &&
                  profile.email !== null &&
                  (await Linking.openURL(`mailto:${profile.email}`));
              }}
            >
              <Envelope />
            </TouchableOpacity>
            {profile.phone_number === null ? (
              props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => props.navigation.navigate('EditPro')}
                >
                  <PhoneAdd />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={makeCall}
              >
                <Phone />
              </TouchableOpacity>
            )}
            {profile.instagram === null ? (
              props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => props.navigation.navigate('EditPro')}
                >
                  <IgAdd />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                style={{ padding: 0, padding: 0 }}
                onPress={() => WebBrowser.openBrowserAsync(profile.instagram)}
              >
                <Instagram />
              </TouchableOpacity>
            )}
            {profile.twitter === null ? (
              props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => props.navigation.navigate('EditPro')}
                >
                  <TwitterAdd />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                onPress={() => WebBrowser.openBrowserAsync(profile.twitter)}
              >
                <Twitter />
              </TouchableOpacity>
            )}
            {profile.facebook === null ? (
              props.myProfile === true ? (
                <TouchableOpacity
                  style={{ padding: 0, padding: 0 }}
                  onPress={() => props.navigation.navigate('EditPro')}
                >
                  <FbAdd />
                </TouchableOpacity>
              ) : null
            ) : (
              <TouchableOpacity
                onPress={() => WebBrowser.openBrowserAsync(profile.facebook)}
              >
                <Facebook />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Lightbulb />
              <Text style={styles.title}>{'Big Issues'}</Text>
            </View>
            <View>
              <Text style={styles.body}>{profile.issues}</Text>
            </View>
          </View>
          <View style={styles.campMission}>
            <View style={styles.iconWrap}>
              <Hand />
              <Text style={styles.donateTitle}>{'Support Our Mission'}</Text>
            </View>
            <View>
              <Text style={styles.donateText}>
                Your donation helps us more{'\n'}than you know. Thanks!
              </Text>
              <View style={styles.donateButton}>
                <TouchableOpacity
                  onPress={async () =>
                    profile.org_cta &&
                    profile.org_cta !== null &&
                    (await WebBrowser.openBrowserAsync(profile.org_cta))
                  }
                  style={{
                    width: 243,
                    height: 48
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#00ff9d',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      height: '100%'
                    }}
                  >
                    <Text
                      style={{
                        color: '#323339',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        letterSpacing: 2
                      }}
                    >
                      Donate
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Details;