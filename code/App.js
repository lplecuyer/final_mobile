import React, { useState } from 'react';
import { StatusBar, Text, View, Image, SafeAreaView } from 'react-native';
import  styles  from './assets/styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './MainMenu.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import User from './User.js';


const Stack = createNativeStackNavigator();


export default function App() 
{
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="MainMenu">

                <Stack.Screen
                    name="Main menu"
                    component={ MainMenu }
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen
                    name="Login"
                    component={ Login }
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SignUp"
                    component={ SignUp }
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="User"
                    component={ User }
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    </NavigationContainer>
  );
}

