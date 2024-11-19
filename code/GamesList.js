import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from './assets/styles.js';
import NavigationTemplate from './NavigationTemplate.js';
const gameNumbers = [...Array(50)]

export default function GamesList({ navigation }) {

    const [selectedFilter, setSelectedFilter] = useState("OrderAZ");
    const [searchText, setSearchText] = useState("");


    return (
        <View style={styles.background}>

            <Text style={[styles.title, {marginTop: 30}]}> Games List </Text>

            <View style={{ flexDirection: "row", justifyContent: "center", width: "100%", height: 50, marginTop: 30 }}>
                <View style={{ flexDirection: "row", width: "50%", alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.tinytext}>Filter By: </Text>
                    <Text style={styles.tinytext}>{selectedFilter}</Text>
                    <Picker
                        style={{ width: 30, height: 30, marginLeft: 10 }}
                        dropdownIconColor={'white'}
                        selectedValue={selectedFilter}
                        onValueChange={(itemValue) => setSelectedFilter(itemValue)}>
                        <Picker.Item label="Alphabetical ordered Name" value="Name A-Z" />
                        <Picker.Item label="Reversed alphabetical ordered Name" value="Name Z-A" />
                        <Picker.Item label="Date added to Steam newest -> oldest" value="DateNewOld" />
                        <Picker.Item label="Date added to Steam oldest -> newest" value="DateOldNew" />
                    </Picker>
                </View>
                <View style={{ width: "50%", alignItems: "center", justifyContent: "center" }}>
                    <TextInput style={styles.SearchBar} placeholder='Search Game' />
                </View>
            </View>
            <View style={[styles.separator, { width: "100%", marginTop: 10 }]} />
            <View style={styles.FlatList}>
                <FlatList numColumns={2}
                    contentContainerStyle={{ paddingBottom: 250 }}
                    data={gameNumbers}
                    renderItem={() => {
                        return (
                            <View style={{alignContent: 'center', flexDirection: "column", justifyContent: "center"}}>
                                <Image source={require('./assets/User_Icon.png')} style={styles.Game} />
                                <Text style={[styles.tinytext, {textAlign: "center", marginBottom: 10}]}>test</Text>
                            </View>
                        )
                    }}
                />
            </View>
            <NavigationTemplate />
        </View>
    );
}
