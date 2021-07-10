import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {useFocusEffect} from '@react-navigation/native';
import {check_password} from './Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecondPage = ({navigation}) => {
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [view, setview] = useState();

  function close(isShow) {
    setisDialogVisible(isShow);

    navigation.navigate('FirstPage');
  }

  const sendInput = async (inputText, close) => {
    console.log('password ' + inputText);
    let val = await check_password(inputText);
    console.log('val', val);
    if (val == 'valid') {
      setview(false);
      setisDialogVisible(close);
    } else {
      Alert.alert(
        'Incorrect Credentials',
        'Enter valid password',
        [
          {
            text: 'Ok',

            onPress: () => navigation.navigate('FirstPage'),
          },
        ],
        {cancelable: false},
      );


    }
   
  };

  const retrieve = async () => {
    const read = await AsyncStorage.getItem('user_config');
    if (read == null) {
      setview(true);
    } else {
      setview(false);
      setisDialogVisible(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieve();
    }, []),
  );

  return (
    <View style={styles.container}>
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'VERIFICATION'}
        message={'Enter Password'}
        submitInput={inputText => {
          sendInput(inputText, false);
        }}
        closeDialog={() => {
          close(false);
        }}></DialogInput>
      {view == false ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OwnerRegistration')}>
            <Text>Modify Owner</Text>
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
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OwnerRegistration')}>
            <Text>Add Owner</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default SecondPage;
