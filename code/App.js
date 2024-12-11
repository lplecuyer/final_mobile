import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './Views/MainMenu.js';
import Login from './Views/Login.js';
import SignUp from './Views/SignUp.js';
import User from './Views/UserMenu.js';
import BaseTemplate from './Templates/BaseTemplate.js';
import Review from './Views/Review.js';
import UserToken from './Views/UserToken.js';
import GamesList from './Views/GamesList.js';
import ReviewsList from './Views/ReviewsList.js';
import ReviewUpdate from './Views/ReviewUpdate.js';
import UpdateComment from './Views/UpdateComment.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <BaseTemplate>
            <Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainMenu" component={MainMenu} />
                <Stack.Screen name="UserToken" component={UserToken} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="User" component={User} />
                <Stack.Screen name="Review" component={Review} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="GamesList" component={GamesList} />
                <Stack.Screen name="ReviewsList" component={ReviewsList} />
                <Stack.Screen name="ReviewUpdate" component={ReviewUpdate} />
                <Stack.Screen name="UpdateComment" component={UpdateComment} />
            </Stack.Navigator>
        </BaseTemplate>
    </NavigationContainer>
  );
}
