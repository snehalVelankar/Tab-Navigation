import React, {useState, createRef, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import {check_password, read_store_async} from './Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ApplianceRegistration = ({navigation}) => {
  const [Device, setDevice] = useState('');
  const [asyncapp, setasyncapp] = useState([]);
  const [drop_app, setdrop_app] = useState(''); //to capture dropdown vals

  app_obj = {
    Device: '',
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(value);
      //console.log('async data loc:', async_data);
      // console.log('async data app:', async_data.appliance);
      setasyncapp(async_data.appliance);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handledeletePress = () => {
    if (!drop_app) {
      alert('Please enter appliance');
      return;
    }
    console.log('chosen dropdown value to delete>>', drop_app);

    const store = async userdata => {
      // console.log('-----------------------------');
      // console.log('data from user ', userdata);
      const read_async_data = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(read_async_data);
      // console.log('Async data:', async_data);
      // console.log('Async data for appliance :', async_data.appliance);
      // console.log(
      //   'Async data for appliance length :',
      //   async_data.appliance.length,
      // );
      let app_status = 0;
      let app_len = async_data.appliance.length;

      for (let x = 0; x < app_len; x++) {
        console.log(
          'userdata' + userdata,
          'async appliance[x]' + async_data.appliance[x],
        );
        if (userdata == async_data.appliance[x]) {
          app_status = 1;
          break;
        }
      }
      console.log('local status', app_status);
      if (app_status == 0) {
        async_data.appliance.pop(userdata);

        console.log('data to delted in async', async_data);
        let string_data1 = JSON.stringify(async_data);
        await AsyncStorage.setItem('user_config', string_data1);

        Alert.alert(
          'Success',
          'deletion',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('TabStack'),
            },
          ],
          {cancelable: false},
        );

        getData();
      }
    };
    const getData = async () => {
      const value = await AsyncStorage.getItem('user_config');
      console.log('data read from async >>', value);
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
      }
    };
    let data2 = JSON.stringify(drop_app);

    Alert.alert(
      'Are you sure ',
      ' you want  to delete',
      [
        {
          text: 'Ok',

          onPress: () => store(data2),
        },
        {
          text: 'cancel',

          onPress: () => console.log('cancel pressed'),
        },
      ],
      {cancelable: true},
    );
  };

  const handleSubmitPress = async () => {
    if (!Device) {
      alert('Please enter Device');
      return;
    } else {
      let data2 = JSON.stringify(Device);
      if (data2 != null) {
        read_store_async('appliance_event', data2);
      }
    }
  };

  // const handleSubmitPress = () => {
  //   if (!Device) {
  //     alert('Please enter Device');
  //     return;
  //   }

  //   const store = async userdata => {
  //     console.log('-----------------------------');
  //     console.log('data from user ', userdata);
  //     const read_async_data = await AsyncStorage.getItem('user_config');
  //     let async_data = JSON.parse(read_async_data);
  //     console.log('Async data:', async_data);
  //     console.log('Async data for Device :', async_data.appliance);
  //     console.log(
  //       'Async data for appliance length :',
  //       async_data.appliance.length,
  //     );
  //     if (async_data.appliance.length <= 0) {
  //       async_data.appliance.push(userdata);
  //       console.log('data to be written in async', async_data);
  //       let string_data = JSON.stringify(async_data);
  //       await AsyncStorage.setItem('user_config', string_data);
  //       Alert.alert('Data is updated');
  //       getData();
  //     } else {
  //       let loc_status = 0;
  //       let loc_len = async_data.appliance.length;

  //       for (let x = 0; x < loc_len; x++) {
  //         console.log(
  //           'userdata' + userdata,
  //           'async appliance[x]' + async_data.appliance[x],
  //         );
  //         if (userdata == async_data.appliance[x]) {
  //           loc_status = 1;
  //           break;
  //         }
  //       }
  //       console.log('local status', loc_status);
  //       if (loc_status == 0) {
  //         async_data.appliance.push(userdata);

  //         console.log('data to be written in async', async_data);
  //         let string_data1 = JSON.stringify(async_data);
  //         await AsyncStorage.setItem('user_config', string_data1);
  //         Alert.alert(
  //           'Success',
  //           'data is updated',
  //           [
  //             {
  //               text: 'Ok',
  //               onPress: () => navigation.navigate('TabStack'),
  //             },
  //           ],
  //           {cancelable: false},
  //         );
  //         getData();
  //       } else {
  //         console.log('same data found ');
  //         Alert.alert(
  //           'Device name already present, please insert new Device name',
  //         );
  //         loc_status = 0;
  //       }
  //     }
  //   };
  //   const getData = async () => {
  //     const value = await AsyncStorage.getItem('user_config');
  //     console.log('data read from async >>', value);
  //     if (value != null) {
  //       console.log(' after storing new data inside async storage ', value);
  //     }
  //   };
  //   let data2 = JSON.stringify(Device);
  //   if (data2 != null) {
  //     store(data2);
  //   }
  // };
  return (
    <ScrollView>
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
          placeholder=" Enter Device name eg:Fan,AC,Light...etc"
          onChangeText={Device => setDevice(Device)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmitPress()}>
        <Text> submit </Text>
      </TouchableOpacity>
      <View>
        <ModalDropdown
          textStyle={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}
          dropdownTextStyle={{fontSize: 30}}
          options={asyncapp}
          defaultValue={'Appliance List'}
          onSelect={(idx, value) => setdrop_app(value)}></ModalDropdown>
      </View>
      <Button title="delete" color="red" onPress={handledeletePress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 40,
    marginTop: 20,
    marginLeft: 35,

    marginRight: 35,
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  delete_button: {
    flex: 1,
    height: 40,
    marginTop: 20,
    marginLeft: 35,

    marginRight: 35,
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default ApplianceRegistration;
