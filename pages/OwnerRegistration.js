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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
var RNFS = require('react-native-fs');
let getdata;
const OwnerRegistration = ({navigation}) => {
  const [OwnerName, setOwnerName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [MailId, setMailId] = useState('');
  const [Address, setAddress] = useState('');
  const [Street, setStreet] = useState('');
  const [place, setPlace] = useState('');
  const [State, setState] = useState('');
  const [country, setcountry] = useState('');
  const [Apartmentno, setApartmentno] = useState('');
  // const [getdata, setgetdata] = useState('');

  const handleSubmitPress = () => {
    if (!OwnerName) {
      alert('Please fill OwnerName');
      return;
    }
    if (!PhoneNumber) {
      alert('Please fill PhoneNumber');
      return;
    }
    if (!Address) {
      alert('Please fill Address');
      return;
    }
    if (!MailId) {
      alert('Please fill MailId');
      return;
    }
    if (!Street) {
      alert('Please fill Street');
      return;
    }
    if (!place) {
      alert('Please fill place');
      return;
    }
    if (!State) {
      alert('Please fill State');
      return;
    }
    if (!Apartmentno) {
      alert('Please fill Apartmentno');
      return;
    }
    if (!country) {
      alert('Please fill country');
      return;
    }

    const store = async val => {
      console.log('-----------------------------');
      const read = await AsyncStorage.getItem('owner');
      console.log(' before reading data inside async storage ', read);
      if (read == null) {
       // console.log(' for first data ');
        let valx = '[' + val + ']';
        await AsyncStorage.setItem('owner', valx);
        getData();
      } else {
        //console.log(' for multiple data ');
        // let val2 =  JSON.parse(read);
        // let val3 =  JSON.parse(val);
        let replace_brackets = read.replace('[', '').replace(']', '');
        let append = '[' + val + ',' + replace_brackets + ']';
        //console.log('append ', append);
        await AsyncStorage.setItem('owner', append);
        getData();
      }
    };
    const getData = async () => {
      const value = await AsyncStorage.getItem('owner');
      if (value != null) {
        console.log(' after storing new data inside async storage ', value);
      }
    };

    let data = {
      OwnerName: OwnerName,
      PhoneNumber: PhoneNumber,
      Address: Address,
      MailId: MailId,
      Street: Street,
      place: place,
      State: State,
      Apartmentno: Apartmentno,
      country: country,
    };

   // console.log('data to be stored into file', data);
    let data2 = JSON.stringify(data);
    if (data2 != null) {
      store(data2);
    }

    //     var filePath = RNFS.ExternalDirectoryPath + '/Ownerdetails.json';

    //     return RNFS.readFile(filePath)
    //       .then(file => {
    //         console.log('FILE DATA', file);
    //         something(file);
    //       })
    //       .catch(err => {
    //         console.log(err.message);
    //       });

    //     function something(getdata) {
    //       if (getdata != null) {
    //         console.log('entered multiple data');
    //         let demo =  '['+ getdata + data2+']';
    // //[ ]
    //         RNFS.writeFile(filePath, demo, 'utf8')
    //           .then(success => {
    //             console.log('SUCCESS');
    //           })
    //           .catch(err => {
    //             console.log(err.message);
    //           });

    //         return RNFS.readFile(filePath)
    //           .then(file => {
    //             console.log('FILE DATA', file);
    //           })
    //           .catch(err => {
    //             console.log(err.message);
    //           });
    //       } else {
    //         console.log('entered single data');
    //         RNFS.writeFile(filePath, data2, 'utf8')
    //           .then(success => {
    //             console.log('SUCCESS');
    //           })
    //           .catch(err => {
    //             console.log(err.message);
    //           });

    //         return RNFS.readFile(filePath)
    //           .then(file => {
    //             console.log('FILE DATA', file);
    //           })
    //           .catch(err => {
    //             console.log(err.message);
    //           });
    //       }
    //     }
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
            padding: 10,
          }}
          placeholder="Address"
          onChangeText={Address => setAddress(Address)}
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
          placeholder="City/Town/Village"
          onChangeText={place => setPlace(place)}
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
          placeholder="Apartment Number/House Number"
          onChangeText={Apartmentno => setApartmentno(Apartmentno)}
        />
      </View>

      <Button title="submit" color="green" onPress={handleSubmitPress} />
    </ScrollView>
  );
};

export default OwnerRegistration;
