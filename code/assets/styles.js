import { StyleSheet } from 'react-native';


styles = StyleSheet.create({
    safeArea: {
        alignContent: 'flex-start',
    },
    header : {
        width: '100%',
        height: 150,
        backgroundColor: '#22262F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    menucontainer: {
        backgroundColor: '#22262F',
        width: '100%',
        height: '35%',
        justifyContent: "flex-start",
        elevation: 30,
        marginTop: 100,
        alignItems: 'center',
        flexDirection: "column",
    },
    tinytext: {
        color: 'white',
        borderColor: '#22262F',
        borderWidth: 2,
        width: '80%',
        textAlign: 'center',
        padding: 10,
        marginTop: 30
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: '#B1B1AE',
        marginTop: 75,
        width: '90%'
    },
    ButtonMenu: {
        backgroundColor: '#4BB50D', 
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        alignItems: 'center',
        marginVertical: 10
    },
    textButtonMenu: {
        color: '#B5FA74', 
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#4BB50D',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#B5FA74',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles