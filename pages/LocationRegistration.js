import React, {useState} from 'react';
import {View, ScrollView, TextInput, Button, Alert} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

configurations = {
  location: '[]',
};

const LocationRegistration = ({navigation}) => {
  const [LocationName, setLocationName] = useState('');
  const [asyncloc, setasyncloc] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [retrieveData]),
  );

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(value);
      console.log('async data loc:', async_data);
      // console.log('async data app:', async_data.appliance);
      setasyncloc(async_data.location);
     
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleSubmitPress = () => {
    if (!LocationName) {
      alert('Please enter location');
      return;
    }

    const store = async userdata => {
      console.log('-----------------------------');
      console.log('data from user ', userdata);
      const read_async_data = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(read_async_data);
      console.log('Async data:', async_data);
      console.log('Async data for location :', async_data.location);
      console.log(
        'Async data for location length :',
        async_data.location.length,
      );
      if (async_data.location.length <= 0) {
        async_data.location.push(userdata);
        console.log('data to be written in async', async_data);
        let string_data = JSON.stringify(async_data);
        await AsyncStorage.setItem('user_config', string_data);
        Alert.alert('Data is updated');
        getData();
      } else {
        let loc_status = 0;
        let loc_len = async_data.location.length;

        for (let x = 0; x < loc_len; x++) {
          console.log(
            'userdata' + userdata,
            'async location[x]' + async_data.location[x],
          );
          if (userdata == async_data.location[x]) {
            loc_status = 1;
            break;
          }
        }
        console.log('local status', loc_status);
        if (loc_status == 0) {
          async_data.location.push(userdata);

          console.log('data to be written in async', async_data);
          let string_data1 = JSON.stringify(async_data);
          await AsyncStorage.setItem('user_config', string_data1);
          Alert.alert('Data is updated');
          getData();
        } else {
          console.log('same data found ');
          Alert.alert(
            'location name already present, please insert new location name',
          );
          loc_status = 0;
        }
      }
    };
    const getData = async () => {
      const value = await AsyncStorage.getItem('user_config');
      console.log('data read from async >>', value);
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
      }
    };
    let data2 = JSON.stringify(LocationName);
    if (data2 != null) {
      store(data2);
    }
  };

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
          placeholder=" Enter Location name eg: Hall,dining,Kitchen...etc"
          onChangeText={LocationName => setLocationName(LocationName)}
        />
      </View>
      <View>
        <ModalDropdown
          textStyle={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}
          dropdownTextStyle={{fontSize: 30}}
          options={asyncloc}
          defaultValue={'select location'}
          onSelect={(idx, value) => setlocation(value)}></ModalDropdown>
      </View>

      <Button title="submit" color="green" onPress={handleSubmitPress} />
    </ScrollView>
  );
};

export default LocationRegistration;
