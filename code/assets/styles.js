import { StyleSheet } from 'react-native';


styles = StyleSheet.create({
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
        fontSize: 16,
        color: '#B1B1AE',
        textAlign: 'center',
    },
    outline: {
        position: 'absolute',
        fontSize: 16,
        color: '#22262F', // Couleur de contour
        textShadowColor: '#22262F', // Couleur d'ombre (équivalente à la bordure)
        textShadowOffset: { width: -1, height: 1 }, // Décalage pour l'épaisseur du contour
        textShadowRadius: 2, // Rayon de flou pour adoucir le contour
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
    navigationContainer: {
        backgroundColor: '#22262F',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40
    },
    icon: {
        width: 60,
        height: 40,
    },
    separator: {
        height: 1,
        width: "auto",
        borderWidth: 1,
        borderColor: "#B1B1AE",
        marginVertical: 30
    },
    background: {
        backgroundColor: '#343C53',
        flex: 1,
        alignItems: 'center',
    },
    SearchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f1',
        borderRadius: 10,
        borderWidth: 1,
        width: '100%',
        height: "80%"
    },
    Game: {
        width: 140,
        height: 200,
        marginTop: 20,
        marginHorizontal: 30,
        resizeMode: 'stretch'
    },
    navigationBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70, // Hauteur de la barre de navigation
        backgroundColor: '#000', // Change selon ton design
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: '50%',
        backgroundColor: '#27516C',
        borderColor: '#2a498c',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
    
});

export default styles