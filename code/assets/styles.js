import { StyleSheet } from 'react-native';


styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#343C53',
    },
    header : {
        width: '100%',
        height: 150,
        backgroundColor: '#22262F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
    }
});

export default styles