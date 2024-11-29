
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './MainMenu.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import UserMenu from './UserMenu.js';
import BaseTemplate from './BaseTemplate.js';
import UserToken from './UserToken.js';
import GamesList from './GamesList.js';
import ReviewsList from './ReviewsList.js';


const Stack = createNativeStackNavigator();


export default function App() 
{
  return (
    <NavigationContainer>
      <BaseTemplate>
        <Stack.Navigator initialRouteName="MainMenu">

          <Stack.Screen
              name="Main menu"
              component={ MainMenu }
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="User token"
              component={ UserToken }
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
              name="User menu"
              component={ UserMenu }
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="BaseTemplate"
              component={ BaseTemplate }
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="GamesList"
              component={ GamesList }
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="ReviewsList"
              component={ ReviewsList }
              options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </BaseTemplate>
    </NavigationContainer>
  );
}

