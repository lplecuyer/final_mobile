import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './assets/styles.js';
import ShtweamService from './Services/SteamService.js';

export default function ReviewsList({ navigation, route }) {
    const { gameid } = route.params;
    console.log(gameid)
    return  (
        <View style={styles.background}>
            <Text>Game ID: {gameid}</Text>
        </View>
    )
}
