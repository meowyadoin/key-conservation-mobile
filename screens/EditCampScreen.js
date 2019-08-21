import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editCampaign, getCampaigns, clearMedia } from '../store/actions';
import BackButton from '../components/BackButton';

import DoneButton from '../components/DoneButton';

import UploadMedia from '../components/UploadMedia';

class CreateCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold'
      },
      headerLeft: (
        <BackButton
          navigation={navigation} 
      />
      ),
      headerRight: (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('edit')}
        />
      )
    };
  };

  state = {
    camp_img: this.props.selectedCampaign.camp_img,
    camp_name: this.props.selectedCampaign.camp_name,
    camp_desc: this.props.selectedCampaign.camp_desc,
    camp_cta: this.props.selectedCampaign.camp_cta
  };

  componentDidMount() {
    this.props.navigation.setParams({ edit: this.edit });
  }

  edit = async () => {
    if (
      !this.state.camp_img ||
      !this.state.camp_name ||
      !this.state.camp_desc ||
      !this.state.camp_cta
    ) {
      return;
    } else {
      let changes = this.state;
      if (this.props.mediaUpload) {
        changes = {
          ...this.state,
          camp_img: this.props.mediaUpload
        }
      }
      await this.props.editCampaign(this.props.selectedCampaign.camp_id, changes);
      await this.props.getCampaigns();
      this.props.navigation.goBack();
    }
  };

  clearState = () => {
    this.setState({
      camp_img: this.props.selectedCampaign.camp_img,
      camp_name: this.props.selectedCampaign.camp_name,
      camp_desc: this.props.selectedCampaign.camp_desc,
      camp_cta: this.props.selectedCampaign.camp_cta
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={90}
        enabled={Platform.OS === 'android' ? true : false}
      >
      <KeyboardAwareScrollView>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#fff',
            minHeight: '100%'
          }}
        >
          <NavigationEvents
            onWillFocus={this.props.clearMedia}
            onDidBlur={this.clearState}
          />
          <View style={styles.sectionContainer}>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Campaign Name</Text>
              <TextInput
                ref={input => {
                  this.campNameInput = input;
                }}
                returnKeyType='next'
                placeholder='Koala In Need!'
                style={styles.inputContain}
                onChangeText={text => this.setState({ camp_name: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.campImgUrlInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.camp_name}
              />
            </View>
            <View style={styles.sections}>
              <UploadMedia />
              {/* <Text style={styles.sectionsText}>Campaign Image URL</Text>
              <TextInput
                ref={input => {
                  this.campImgUrlInput = input;
                }}
                returnKeyType='next'
                keyboardType='url'
                placeholder='Please include full URL'
                autoCapitalize='none'
                style={styles.inputContain}
                onChangeText={text => this.setState({ camp_img: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.campDetailsInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.camp_img}
              /> */}
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Campaign Details</Text>
              <TextInput
                ref={input => {
                  this.campDetailsInput = input;
                }}
                returnKeyType='next'
                placeholder='Add campaign details and list of monetary needs.'
                style={styles.inputContain2}
                onChangeText={text => this.setState({ camp_desc: text })}
                multiline={true}
                value={this.state.camp_desc}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Donation Link</Text>
              <TextInput
                ref={input => {
                  this.donationLinkInput = input;
                }}
                returnKeyType='next'
                keyboardType='url'
                placeholder='Please include full URL'
                autoCapitalize='none'
                style={styles.inputContain}
                onChangeText={text => this.setState({ camp_cta: text })}
                value={this.state.camp_cta}
              />
            </View>
          </View>
        </ScrollView>
       
      </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  mediaUpload: state.mediaUpload
});

export default connect(
  mapStateToProps,
  { editCampaign, getCampaigns, clearMedia }
)(CreateCampScreen);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#f5f5f5',
    paddingLeft: 10,
    paddingRight: 10,
    height: 75
  },
  TouchableOpacity: {},
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },
  CancelButton: {
    fontSize: 16,
    color: 'black'
  },
  PublishButton: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  camera: {
    backgroundColor: '#C4C4C4',
    width: '100%',
    height: 150,
    flexDirection: 'row'
  },
  CameraContainerButton: {
    marginTop: 120,
    marginRight: 10,
    marginLeft: 10
  },
  inputContain: {
    height: 48,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 25
  },
  inputContain2: {
    height: 140,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 25,
    textAlignVertical: 'top'
  },
  Card: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 25
  },
  cardPara: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 13
  },
  sectionsText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 5
  }
});