import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Colors, Fonts, Icons} from '../../Dependent/Constants/Constants';
import {moderateScale} from '../../Dependent/Constants/metrics';

const CenterModal = ({visible, onClose}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Your modal content here */}
          <Text style={styles.passwordGenerated}>Your password Generated</Text>
          <Image source={Icons.success_check} style={styles.checkSuccess} />
          <Text style={styles.verifyEmail}>Verify your email</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white background
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: Colors.light_red,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  passwordGenerated: {
    color: Colors.success,
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  checkSuccess: {
    marginTop: moderateScale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
  },
  verifyEmail: {
    color: Colors.secondary,
    fontSize: moderateScale(30),
    fontFamily: Fonts.semi_bold,
  },
});

export default CenterModal;
