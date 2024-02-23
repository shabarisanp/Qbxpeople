/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Fonts, Images} from '../../../Dependent/Constants/Constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Dependent/Constants/metrics';
import CustomTextInput from '../../Components/TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../Components/Cards';
import CustomButton from '../../Components/Button';
import TimeRangeSlider from '../../Components/TimeRangeSlider';
import {useNavigation} from '@react-navigation/native';

const Header = navigation => {
  return (
    <View style={styles.row}>
      <Text style={styles.homeText}>Home</Text>
      <CustomTextInput
        inputContainer={styles.inputContainer}
        inputStyle={styles.input}
        icon={'search'}
        iconContainer={styles.iconStyle}
        container={styles.container}
      />
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <LinearGradient
          colors={[Colors.grey, Colors.white]}
          style={styles.notificationIconContainer}>
          <Icon name={'bell-o'} size={25} style={[styles.icon]} />
          <View style={styles.notificationRequired}>
            <Text style={styles.notificationNumber}>1</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <Image source={Images.profile} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};
const loginContainer = (
  isCheckIn,
  setCheckIn,
  status,
  setStatus,
  hours,
  minutes,
  seconds,
  handleStart,
  handleStop,
) => {
  const StatusCheck = status => {
    console.log(status);
    setCheckIn(!isCheckIn);
    if (status === 'Check-out') {
      setStatus('checked-in');
      handleStart();
    } else {
      setStatus('Check-Out');
      handleStop();
    }
  };
  return (
    <Card>
      <View style={styles.timeContainer}>
        <Text style={styles.timeBox}>{hours.toString().padStart(2, '0')}</Text>
        <Text style={styles.timecolon}>:</Text>
        <Text style={styles.timeBox}>
          {minutes.toString().padStart(2, '0')}
        </Text>
        <Text style={styles.timecolon}>:</Text>
        <Text style={styles.timeBox}>
          {seconds.toString().padStart(2, '0')}
        </Text>
      </View>
      <TimeRangeSlider status={status} />
      <Text style={styles.shiftContent}>Shift</Text>
      <Text style={styles.shiftContent}>09:00 AM To 06:00 PM</Text>
      <CustomButton
        linearColors={[
          isCheckIn ? Colors.danger : Colors.success_light,
          isCheckIn ? Colors.danger : Colors.success_light,
        ]}
        textColor="white"
        title={isCheckIn ? 'Check-Out' : 'Check-In'}
        iconSize={20}
        textStyle={styles.buttonText}
        buttonStyle={styles.customButton}
        onPress={() => StatusCheck(isCheckIn ? 'Check-in' : 'Check-out')}
      />
    </Card>
  );
};
const EventPortal = ({event}) => {
  return (
    <View style={styles.eventContainer}>
      <Image source={event.image} style={styles.eventIcons} />
      <Text style={styles.eventName}>{event.name}</Text>
      <View style={styles.box} />
      <Card cardStyle={styles.cardStyle}>
        {event.users.map((user, index) => (
          <View key={user.id}>
            <Image
              source={user.profileImage}
              style={[styles.profile, {alignSelf: 'center'}]}
              key={index}
            />
            <Text style={styles.personName}>{user.name}</Text>
            <CustomTextInput
              inputContainer={styles.chatinputContainer}
              inputStyle={styles.chartInput}
              iconContainer={styles.iconStyle}
              placeHolder="Send your wishes"
            />
            <View style={styles.borderLine} />
          </View>
        ))}
      </Card>
    </View>
  );
};
const HomeScreen = () => {
  const data = [
    {
      id: '1',
      name: 'Birthday',
      image: Images.birthday,
      users: [
        {id: '1', name: 'John Mayor', profileImage: Images.profile},
        {id: '2', name: 'Alice Smith', profileImage: Images.profile},
        {id: '3', name: 'Bob Johnson', profileImage: Images.profile},
      ],
    },
    {
      id: '2',
      name: 'Hire',
      image: Images.hire,
      users: [
        {id: '4', name: 'Emma Brown', profileImage: Images.profile},
        {id: '5', name: 'Michael White', profileImage: Images.profile},
        {id: '6', name: 'Sophia Davis', profileImage: Images.profile},
      ],
    },
    // Add more events as needed
  ];
  const [isCheckIn, setCheckIn] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [status, setStatus] = useState('Check-Out');

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsedTime = Math.floor((now - startTime) / 1000);

        const h = Math.floor(elapsedTime / 3600);
        const m = Math.floor((elapsedTime % 3600) / 60);
        const s = elapsedTime % 60;

        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(new Date());
  };

  const handleStop = () => {
    setIsRunning(false);
    // setHours(0);
    // setMinutes(0);
    // setSeconds(0);
  };
  const renderItem = ({item}) => <EventPortal event={item} />;
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[Colors.home_bg_1, Colors.home_bg_2]}
      style={styles.linearGradient}>
      {Header(navigation)}
      {loginContainer(
        isCheckIn,
        setCheckIn,
        status,
        setStatus,
        hours,
        minutes,
        seconds,
        handleStart,
        handleStop,
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: verticalScale(22),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  homeText: {
    fontFamily: Fonts.bold,
    color: Colors.dark,
    fontSize: moderateScale(24),
  },
  inputContainer: {
    borderColor: Colors.secondary,
    // borderWidth: 1,
    width: verticalScale(141),
    backgroundColor: Colors.white,
    borderRadius: 30,
  },
  input: {
    flex: 1,
    paddingVertical: 0, // Remove vertical padding
    paddingHorizontal: 0, // Remove horizontal padding
    fontSize: 16,
    backgroundColor: Colors.white,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  iconStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  notificationIconContainer: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  icon: {
    color: Colors.dark,
  },
  notificationRequired: {
    backgroundColor: Colors.danger,
    width: 15,
    height: 15,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: verticalScale(9),
    right: verticalScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    backgroundColor: Colors.light_white,
    borderRadius: 50,
    padding: verticalScale(5),
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
  },
  timeBox: {
    backgroundColor: Colors.light_purple,
    padding: verticalScale(20),
    fontFamily: Fonts.bold,
    fontSize: moderateScale(25),
    color: Colors.dark,
    borderRadius: 5,
  },
  darkColor: {
    color: Colors.dark,
  },
  timecolon: {
    padding: verticalScale(10),
    fontFamily: Fonts.bold,
    fontSize: moderateScale(25),
    color: Colors.dark,
  },
  shiftContent: {
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: moderateScale(16),
    color: Colors.dark,
    marginTop: verticalScale(5),
  },
  customButton: {
    width: verticalScale(192),
    height: horizontalScale(50),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.semi_bold,
  },
  eventContainer: {
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
  },
  eventIcons: {
    width: verticalScale(50),
    height: verticalScale(50),
  },
  box: {
    borderColor: Colors.box_border,
    borderWidth: 1,
    width: 270,
    height: 85,
    borderRadius: 30,
  },
  eventName: {
    fontSize: moderateScale(24),
    color: Colors.dark,
    top: verticalScale(15),
    fontFamily: Fonts.bold,
    backgroundColor: Colors.white,
  },
  cardStyle: {
    //position: 'absolute',
    top: horizontalScale(-55),
    width: verticalScale(300),
    alignItems: 'center',
  },
  personName: {
    color: Colors.dark,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    fontSize: moderateScale(16),
    marginVertical: moderateScale(15),
  },
  chatinputContainer: {
    borderColor: Colors.grey_light_semi,
    borderWidth: 0.5,
    width: verticalScale(261),
    backgroundColor: Colors.grey_light_semi,
    borderRadius: 30,
    padding: 5,
  },
  chartInput: {
    flex: 1,
    paddingVertical: 0, // Remove vertical padding
    paddingHorizontal: 0, // Remove horizontal padding
    fontSize: 16,
    backgroundColor: Colors.grey_light_semi,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  borderLine: {
    borderTopColor: Colors.grey_light_semi,
    borderTopWidth: 1,
    marginVertical: moderateScale(15),
  },
  notificationNumber: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: Fonts.bold,
  },
  container: {
    marginBottom: 0,
  },
});

export default HomeScreen;
