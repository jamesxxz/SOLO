import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      {/* Top Bar */}
      <View style={{ height: 40, backgroundColor: '#333' }}>
        <Text style={{ color: '#fff', marginLeft: 10 }}>9:41</Text>
      </View>
      {/* App Logo */}
      <Image source={require('./solo_logo.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }} />
      {/* Login Text */}
      <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Connect, train, workout.</Text>
      {/* Login Button */}
      <TouchableOpacity style={{ backgroundColor: '#00f0ff', padding: 15, margin: 10, borderRadius: 10 }}>
        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
      {/* Create Account Button */}
      <TouchableOpacity style={{ backgroundColor: '#ccc', padding: 15, margin: 10, borderRadius: 10 }}>
        <Text style={{ color: '#000', fontSize: 18, textAlign: 'center' }}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
