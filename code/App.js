import React, { useState } from 'react';
import { StatusBar, Text, View, Image, SafeAreaView } from 'react-native';
import  styles  from './assets/styles.js';
import BaseTemplate from './BaseTemplate.js';


function mainMenu()
{
  return <BaseTemplate />;
}

export default function App() 
{
  return (
    mainMenu()
  );
}

