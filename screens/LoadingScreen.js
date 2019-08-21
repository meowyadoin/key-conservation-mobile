import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import {
  getProfileData,
  afterFirstLogin,
  loginSuccess
} from '../store/actions';
import { withAmplitude } from '../components/withAmplitude';

class LoadingScreen extends React.Component {
  async componentDidMount() {
    // id in the auth0 database
    const sub = await SecureStore.getItemAsync('sub', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    // console.log("**********loading screen**********", roles);
    // id in the PG database
    this.props.getProfileData(null, sub, true);
    setTimeout(async () => {
      if (sub) {
        // console.log("data is present");
        // console.log(this.props.userId);
        if (this.props.userId) {
          // console.log('yes', this.props.userRole, roles);
          const userRole = this.props.userRole;
          await SecureStore.setItemAsync('roles', `${userRole}`);
          const newRole = await SecureStore.getItemAsync('roles', {});
          // console.log('yes', this.props.userRole, newRole);
          await SecureStore.setItemAsync('id', `${this.props.userId}`);
          this.props.getProfileData(this.props.userId, null, true);
          this.props.setAmpId(this.props.userId);
          this.props.AmpEvent('Login');
          let route;
          if (this.props.firstLogin) {
            this.props.afterFirstLogin();
            this.props.navigation.navigate(
              this.props.userRole === 'conservationist'
                ? 'EditPro'
                : 'EditSupPro'
            );
          } else {
            this.props.navigation.navigate(
              this.props.userRole === 'conservationist'
                ? 'Conservationist'
                : 'Supporter'
            );
          }
        } else {
          // console.log("no", this.props.userId);
          this.props.navigation.navigate('CreateAccount');
        }
      } else {
        // console.log("data is not present");
        this.props.navigation.navigate('Login');
      }
    }, 3000);
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/FurBackground.png')}
        style={styles.container}
      >
        <Image
          style={styles.logo}
          source={require('../assets/images/keyFullWhite.png')}
        />
        <Text style={styles.text}>Empowering Hope</Text>
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color='white' />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  userId: state.currentUserProfile.id,
  firstLogin: state.firstLogin,
  userRole: state.currentUserProfile.roles
});

export default connect(
  mapStateToProps,
  { getProfileData, afterFirstLogin }
)(withAmplitude(LoadingScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  logo: {
    width: 189,
    height: 189
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    color: 'white'
  },
  indicator: {
    marginTop: 50
  }
});
