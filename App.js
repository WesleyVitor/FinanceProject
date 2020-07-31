import 'react-native-gesture-handler';
import React from 'react';
import { View,Text,StatusBar } from 'react-native';
import Routes from './src/routes/index';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

console.disableYellowBox = true;

export default function App() {
 return (
   <NavigationContainer>
     <AuthProvider>
      <StatusBar backgroundColor="#333" barStyle="light-content"  />
      <Routes/>
     </AuthProvider>
     
   </NavigationContainer>
  );
}


