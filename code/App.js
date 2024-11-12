import React, { useState } from 'react';
import { StatusBar, Text, View, Image, SafeAreaView } from 'react-native';
import  styles  from './assets/styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './MainMenu.js';
import Login from './Login.js';


const Stack = createNativeStackNavigator();


export default function App() 
{
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="Main menu">

                <Stack.Screen
                    name="Main menu"
                    component={ MainMenu }
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen
                    name="Login"
                    component={ Login }
                    options={{ title: 'Login' }}
                />

            </Stack.Navigator>
    </NavigationContainer>
  );
}

