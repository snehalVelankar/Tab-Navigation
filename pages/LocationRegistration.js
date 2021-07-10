import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadOptions} from '@babel/core';

import {check_password, read_store_async} from './Functions';

const LocationRegistration = ({navigation}) => {
  const [LocationName, setLocationName] = useState(''); //text input field loc
  const [asyncloc, setasyncloc] = useState([]); //to view dropodown values
  const [drop_loc, setdrop_loc] = useState(''); //to capture dropdown vals

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
      setasyncloc(async_data.location);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handledeletePress = item => {
    console.log('chosen item to delete', item);
    // if (!drop_loc) {
    //   alert('Please enter location');
    //   return;
    // }
    // console.log('chosen dropdown value to delete>>', drop_loc);
    const store = async userdata => {
      console.log('-----------------------------');
      console.log('data from user ', userdata);
      const read_async_data = await AsyncStorage.getItem('user_config');
      let async_data = JSON.parse(read_async_data);
      // console.log('Async data:', async_data);
      // console.log('Async data for location :', async_data.location);
      // console.log(
      //   'Async data for location length :',
      //   async_data.location.length,
      // );

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
        async_data.location.pop(userdata);

        console.log('data to delted in async', async_data);
        let string_data1 = JSON.stringify(async_data);
        await AsyncStorage.setItem('user_config', string_data1);

        Alert.alert(
          'Success',
          'deletion',
          [
            {
              text: 'Ok',

              onPress: () => navigation.navigate('FirstPage'),
            },
          ],
          {cancelable: true},
        );

        getData();
      }
    };
    let data2 = JSON.stringify(item);
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

    const getData = async () => {
      const value = await AsyncStorage.getItem('user_config');
      console.log('data read from async >>', value);
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
      }
    };
  };

  const handleSubmitPress = async () => {
    if (!LocationName) {
      alert('Please enter location');
      return;
    } else {
      let data2 = JSON.stringify(LocationName);
      if (data2 != null) {
        let loc = await read_store_async('location_event', data2);
        console.log('lllll', loc);
        if (loc == 'data is updated') {
          Alert.alert(
            'Success',
            'Data is updated',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('FirstPage'),
              },
            ],
            {cancelable: false},
          );
        } else if (loc == 'same data found ') {
          Alert.alert(
            'location name already present ',
            'please insert new location name',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('FirstPage'),
              },
            ],
            {cancelable: false},
          );
        }
      }
    }
  };

  /*
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
        Alert.alert(
          'Success',
          'data is updated',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('TabStack'),
            },
          ],
          {cancelable: false},
        );
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
          Alert.alert(
            'Success',
            'data is updated',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('TabStack'),
              },
            ],
            {cancelable: false},
          );
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
  };*/

  return (
    <>
      <View
        style={{
          flex: 10,
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmitPress()}>
          <Text>Add location</Text>
        </TouchableOpacity>

        {/* <View>
        <ModalDropdown
          textStyle={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
            alignItems: 'center',
          }}
          dropdownTextStyle={{fontSize: 30}}
          options={asyncloc}
          defaultValue={'Location List'}
          onSelect={(idx, value) => setdrop_loc(value)}></ModalDropdown>
      </View> */}

        <FlatList
          keyExtractor={(item, id) => id}
          data={asyncloc}
          renderItem={({item}) => (
            <View>
              <Text>{item}</Text>
              <Button
                title="delete"
                color="red"
                onPress={() => handledeletePress(item)}
              />
            </View>
          )}
          // ItemSeparatorComponent={() => {
          //   return <View style={styles.separatorLine}></View>;
          // }}
        />
      </View>
    </>
  );
};

export default LocationRegistration;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#7fff00',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#db7093',
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

/*
index_ststus=0
index=0

 binding_data= [amit_hall_fan_bajaj,
  amit_hall_bulb1_bajaj,
  amit_hall_bulb2_bajaj,
  rahul_bedroom_bulb_led,
  ]

  for loop{
    if (binding_data==LA){
     index_ststus=1
     break
    }
    index++
  }

  if(index_sttus ==1){
    pop(bindding_data[index])
  }

  index=2
  index_ststus=1
*/
