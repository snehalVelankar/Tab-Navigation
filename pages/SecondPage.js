import React, {useState, createRef, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import masterData from './Master.json';

const SecondPage = ({navigation}) => {
  const [getdata, setgetdata] = useState([]);
  const [selected, setselected] = useState('');
  const [devices, setDevices] = useState({});

  useEffect(() => {    
    setDevices(masterData.Device);

    retrieve();
  }, []);

  const retrieve = async () => {
    const read = await AsyncStorage.getItem('owner');
    if (read != null) {
      setgetdata(JSON.parse(read));
    }
  };

  //let custom = require('./Master.json')
  //let f =custom.Device.fan.make
  //console.log(f);

  let currencies = [
    {country: 'UK', currency: 'GBP', currencylabel: 'pound'},
    {country: 'EU', currency: 'EUR', currencylabel: 'euro'},
    {country: 'USA', currency: 'USD', currencylabel: 'USD Dollor'},
  ];

  state = {
    currencies: [
      {country: 'UK', currency: 'GBP', currencylabel: 'pound'},
      {country: 'EU', currency: 'EUR', currencylabel: 'Euro'},
      {country: 'USA', currency: 'USD', currencylabel: 'USD dollor'},
    ],
    currentLabel: 'Select your currency',
    currency: '',
  };

  return (
    <SafeAreaView style={{flex: 1}}>
       <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Registration Screen{'\n'}(Welcome You are on Registration Tab)
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OwnerRegistration')}>
            <Text>Owner Registration</Text>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item, id) => id}
            data={getdata}
            renderItem={({item}) => (
              <ScrollView>
                <Text>{item.OwnerName}</Text>
              </ScrollView>
            )}
            ItemSeparatorComponent={() => {
              return <View style={styles.separatorLine}></View>;
            }}
          />
          <TouchableOpacity style={styles.button}>
            <Text>Appliance Registration</Text>
          </TouchableOpacity>
      

      <Picker
       selectedValue={state.currency}
       onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}
      >
        {currencies.map(v => {
          return <Picker.Item color="red" label={v.currencyLabel} value={v.currency} key={v.currency}/>;
        })}
      </Picker>

      <TouchableOpacity style={styles.button}>
            <Text>Location Registration</Text>
          </TouchableOpacity> 
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
});

export default SecondPage;
