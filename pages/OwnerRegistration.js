import React, {useState, createRef, useEffect} from 'react';
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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
var RNFS = require('react-native-fs');

let configurations = {
  owner: {
    owner_name: '', //give owner_name // ownername //propname/street/replace place- area/state/country/replace aptno- door no
    owner_password: '',
    MailId: '',
    PhoneNumber: '',
    Property_name: '',
    Area: '',
    State: '',
    country: '',
    Street: '',
    Door_Number: '',
  },
  location: [],
  appliance: [],
  Binding: [],
};
//owner_id= " owner.name+owner_address(aptno state... etc)"- club - what string we get is an ownerid
Binding = []; //It will be like - owneraddress_secondfloorbedroom2_light3

const OwnerRegistration = ({navigation}) => {
  const [OwnerName, setOwnerName] = useState('');
  const [password, setpassword] = useState('');
  const [MailId, setMailId] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Property_name, setProperty_name] = useState('');
  const [Street, setStreet] = useState('');
  const [Area, setArea] = useState('');
  const [State, setState] = useState('');
  const [country, setcountry] = useState('');
  const [Door_Number, setDoor_Number] = useState('');
  // const [getdata, setgetdata] = useState('');

  const handleSubmitPress = () => {
    if (
      !OwnerName ||
      !password ||
      !MailId ||
      !PhoneNumber ||
      !Property_name ||
      !Area ||
      !State ||
      !country ||
      !Street ||
      !Door_Number
    ) {
      alert('Please fill all the fields');
      return;
    }

    configurations.owner.owner_name = OwnerName;
    configurations.owner.owner_password = password;
    configurations.owner.MailId = MailId;
    configurations.owner.PhoneNumber = PhoneNumber;
    configurations.owner.Property_name = Property_name;
    configurations.owner.Area = Area;
    configurations.owner.State = State;
    configurations.owner.country = country;
    configurations.owner.Street = Street;
    configurations.owner.Door_Number = Door_Number;

    const store = async configurations => {
      console.log('-----------------------------');
      const async_data_owner = await AsyncStorage.getItem('user_config');
      let read = JSON.parse(async_data_owner);
      console.log(' before reading data inside async storage ', read);
      if (read == null) {
        await AsyncStorage.setItem('user_config', configurations);
        Alert.alert('Data is updated');
        getData();
      } else {
        //console.log(read.owner);
        console.log(password, '< >', read.owner.owner_password);
        if (password == read.owner.owner_password) {
          await AsyncStorage.setItem('user_config', configurations);
          Alert.alert('Data is updated');
        } else {
          Alert.alert(
            'Invalid password, Enter correct password to alter owner data.',
          );
        }
        getData();
      }
    };

    const getData = async () => {
      const value = await AsyncStorage.getItem('user_config');
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
      }
    };

    let data2 = JSON.stringify(configurations);
    if (data2 != null) {
      store(data2);
    }
  };

  return (
    <ScrollView>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
        Owner registration Screen
      </Text>
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
          placeholder="Owner Name"
          onChangeText={OwnerName => setOwnerName(OwnerName)}
        />
      </View>
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
            padding: 10,
          }}
          placeholder="owner password"
          onChangeText={password => setpassword(password)}
        />
      </View>
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
          placeholder="Mail Id"
          onChangeText={MailId => setMailId(MailId)}
        />
      </View>

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
          placeholder="Phone Number"
          onChangeText={PhoneNumber => setPhoneNumber(PhoneNumber)}
        />
      </View>

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
            padding: 10,
          }}
          placeholder="Property_name"
          onChangeText={Property_name => setProperty_name(Property_name)}
        />
      </View>
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
            padding: 10,
          }}
          placeholder="City/Town/Village"
          onChangeText={Area => setArea(Area)}
        />
      </View>
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
            padding: 10,
          }}
          placeholder="State"
          onChangeText={State => setState(State)}
        />
      </View>
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
            padding: 10,
          }}
          placeholder="Country"
          onChangeText={country => setcountry(country)}
        />
      </View>
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
            padding: 10,
          }}
          placeholder="Street"
          onChangeText={Street => setStreet(Street)}
        />
      </View>

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
            padding: 10,
          }}
          placeholder="Apartment Number/House Number"
          onChangeText={Door_Number => setDoor_Number(Door_Number)}
        />
      </View>

      <Button title="submit" color="green" onPress={handleSubmitPress} />
    </ScrollView>
  );
};

export default OwnerRegistration;
