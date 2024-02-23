import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = ({title, children, cardStyle}) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 30,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 4, // for android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    marginTop: 8,
  },
});

export default Card;
