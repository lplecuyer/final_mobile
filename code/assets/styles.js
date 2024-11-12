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
});

export default styles