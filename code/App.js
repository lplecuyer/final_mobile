
import React, { useState } from 'react';
import { StatusBar, Text, View, Image, SafeAreaView } from 'react-native';
import  styles  from './assets/styles.js';
import BaseTemplate from './BaseTemplate.js';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();



function mainMenu()
{
  return <BaseTemplate />;
}

export default function App() 
{
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">

                <Stack.Screen
                    name="Main menu"
                    component={ mainMenu }
                    options={{ title: 'Main menu' }}
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

