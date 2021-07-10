import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check_password} from './Functions';
const SecondPage = ({navigation}) => {
  const [view, setview] = useState(false);
  const [pwd, setpwd] = useState('');
  //true = ownerbutton,false==password ,0==owner +loc
  const enablepassword = async () => {
    console.log('password', pwd);
    let val = await check_password(pwd);
    console.log('val', val);
    if (val == 'valid') {
      setview(true);
    } else {
      Alert.alert('Invalid Password');
    }
  };

  const retrieve = async () => {
    const read = await AsyncStorage.getItem('user_config');

    if (read == null) {
      setview(true);
    } else {
      // let obj = JSON.parse(read);
      // let owner = obj.owner.owner_name;
      // if (owner) {
      //   setview(0);
      // } else {
      setview(false);
      // }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieve();
    }, []),
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
          {view == false ? (
            <>
              <View
                style={{
                  flex: 1,
                  height: 40,
                  marginTop: 20,
                  marginLeft: 35,
                  marginRight: 35,
                  margin: 10,
                }}>
                <TextInput
                  style={{
                    borderWidth: 2,
                  }}
                  placeholder="enter Password"
                  onChangeText={pwd => setpwd(pwd)}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={enablepassword}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OwnerRegistration')}>
                <Text>Add Owner</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LocationRegistration')}>
                <Text>Location Registration</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ApplianceRegistration')}>
                <Text>Appliance Registration</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Binding')}>
                <Text>Binding</Text>
              </TouchableOpacity>
            </>
          )}

          {/* {view == 0 ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OwnerRegistration')}>
                <Text>Add Owner</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LocationRegistration')}>
                <Text>Location Registration</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OwnerRegistration')}>
                <Text>Add Owner</Text>
              </TouchableOpacity>
            </>
          )} */}
          {/* <TouchableOpacity
                 style={styles.button}
                onPress={() => navigation.navigate('LocationRegistration')}>
                <Text>Location Registration</Text>
             </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ApplianceRegistration')}>
                <Text>Appliance Registration</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Binding')}>
                <Text>Binding</Text>
              </TouchableOpacity>
             */}
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
