import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {
  moderateScale,
  verticalScale,
} from '../../../Dependent/Constants/metrics';
import Card from '../../Components/Cards';
import {Colors, Fonts, Images} from '../../../Dependent/Constants/Constants';
import FloatLabelInput from '../../Components/FloatingLableTextInput';

const PersonalDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={[styles.heading, styles.marginBottom]}>
          Personal Details
        </Text>
        <FloatLabelInput label="Designiation" />
        <FloatLabelInput label="Employee ID" />
        <FloatLabelInput label="Department" />
        <FloatLabelInput label="Mobile" />
        <FloatLabelInput label="Email ID" />
      </Card>
      <Card>
        <Text style={[styles.heading, styles.marginBottom]}>Availability</Text>
        <FloatLabelInput label="Designiation" />
        <FloatLabelInput label="Employee ID" />
        <FloatLabelInput label="Department" />
        <FloatLabelInput label="Mobile" />
        <FloatLabelInput label="Email ID" />
      </Card>
      <Card>
        <Text style={[styles.heading, styles.marginBottom]}>Reporting To</Text>
        <View style={styles.centerSelf}>
          <Image source={Images.profile} style={styles.profile} />
          <Text style={[styles.heading, styles.marginTop]}>Shilpa</Text>
          <Text style={styles.desigintation}>Manager Digital Marketing</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    padding: verticalScale(16),
  },
  heading: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(16),
  },
  profile: {
    width: verticalScale(80),
    height: verticalScale(80),
    borderRadius: 50,
  },
  centerSelf: {
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  marginTop: {
    marginTop: verticalScale(20),
  },
  marginBottom: {
    marginBottom: verticalScale(20),
  },
  desigintation: {
    color: Colors.dark,
    fontFamily: Fonts.semi_bold,
    fontSize: moderateScale(16),
  },
});
