import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Modal,
  Pressable,
} from 'react-native';

const getData = async () => {
  const value = await AsyncStorage.getItem('user_config');
  if (value != null) {
    console.log(' after storing new data inside async storage ', value);
  }
};

const read_store_async = async (event, config_obj) => {
  const async_data_owner = await AsyncStorage.getItem('user_config');
  let read = JSON.parse(async_data_owner);
  //console.log(' before reading data inside async storage ', read);

  let async_data = JSON.parse(async_data_owner);
  switch (event) {
    case 'owner_event':
      if (read == null) {
        await AsyncStorage.setItem('user_config', config_obj);
        return 'Data is updated';
        getData();
      } else {
        //console.log(read.owner);
        //console.log(password, '< >', read.owner.owner_password);
        await AsyncStorage.setItem('user_config', config_obj);
        return 'Data is updated';
        getData();
      }
      break;

    case 'location_event':
      if (async_data.location.length <= 0) {
        async_data.location.push(config_obj);
        //console.log('data to be written in async', async_data);
        let string_data = JSON.stringify(async_data);
        await AsyncStorage.setItem('user_config', string_data);
        return 'data is updated';
        // Alert.alert('data is updated');
        getData();
      } else {
        let loc_status = 0,
          loc_len = async_data.location.length;
        for (let x = 0; x < loc_len; x++) {
          console.log(
            'userdata' + config_obj,
            'async location[x]' + async_data.location[x],
          );
          if (config_obj == async_data.location[x]) {
            loc_status = 1;
            break;
          }
        }
        console.log('local status', loc_status);
        if (loc_status == 0) {
          async_data.location.push(config_obj);
          console.log('data to be written in async', async_data);
          let string_data1 = JSON.stringify(async_data);
          await AsyncStorage.setItem('user_config', string_data1);
          // Alert.alert('data is updated');
          return 'data is updated';
          getData();
        } else {
          // console.log('same data found ');
          return 'same data found ';
          // Alert.alert(
          //   'location name already present, please insert new location name',
          // );
          loc_status = 0;
        }
      }
      break;

    case 'appliance_event':
      if (async_data.appliance.length <= 0) {
        async_data.appliance.push(config_obj);
        //console.log('data to be written in async', async_data);
        let string_data = JSON.stringify(async_data);
        await AsyncStorage.setItem('user_config', string_data);
        return 'data is updated';
        // Alert.alert('data is updated');
        getData();
      } else {
        let app_status = 0,
          app_len = async_data.appliance.length;
        for (let x = 0; x < app_len; x++) {
          if (config_obj == async_data.appliance[x]) {
            app_status = 1;
            break;
          }
        }
        console.log('appliance status', app_status);
        if (app_status == 0) {
          async_data.appliance.push(config_obj);
          console.log('data to be written in async', async_data);
          let string_data1 = JSON.stringify(async_data);
          await AsyncStorage.setItem('user_config', string_data1);
          // Alert.alert('data is updated');
          return 'data is updated';
          getData();
        } else {
          console.log('same data found ');
          return 'same data found ';
          // Alert.alert(
          //   'application name already present, please insert new location name',
          // );
          app_status = 0;
        }
      }
      break;
  }
};

const check_password = async pass => {
  const async_data_owner = await AsyncStorage.getItem('user_config');
  var result = '';
  if (async_data_owner) {
    let read = JSON.parse(async_data_owner);
    if (pass == read.owner.owner_password) {
      result = 'valid';
    } else {
      result = 'invalid';
    }

    return result;
  } else {
    result = 'valid';

    return result;
  }
};

export {check_password, read_store_async};
/*
on presss of submit button
{
    pop up - please enter password to make changes  [xyz]
    val=check_password(xyz)
    if (val==valid)
        read_store_async("owner_event",configurations)
}
*/
