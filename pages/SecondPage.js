import React, {useState, createRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecondPage = ({navigation}) => {
  const [getdata, setgetdata] = useState([]);
  const [view, setview] = useState('');
  const [view1, setview1] = useState('');

  const retrieve = async () => {
    const read = await AsyncStorage.getItem('user_config');

    const read1 = await AsyncStorage.getItem('user_config');
    if (read != null) {
      setview(read);
    }
    if (read1 != null) {
      let async_data = JSON.parse(read1);
      let loc = async_data.location;
      setview1(loc);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieve();
    }, [retrieve]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OwnerRegistration')}>
            <Text>Add Owner</Text>
          </TouchableOpacity>

          {view.length == 0 ? (
            <></>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LocationRegistration')}>
                <Text>Location Registration</Text>
              </TouchableOpacity>
            </>
          )}

          {view1.length == 0 ? (
            <></>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ApplianceRegistration')}>
                <Text>Appliance Registration</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}></Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}></Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#fff',
  },
  dropdown_3: {
    marginVertical: 20,
    marginHorizontal: 16,
    fontSize: 100,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 100,
    height: 100,
    flexGrow: 100,
  },
});

export default SecondPage;
