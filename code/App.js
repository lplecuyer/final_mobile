
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

export default function App() 
{
  return (
    <NavigationContainer>
      <BaseTemplate>
        <Stack.Navigator initialRouteName="Main menu">

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
              name="User"
              component={ User }
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="Review"
              component={ Review }
              options={{ headerShown: false }}
          />
                
          <Stack.Screen
              name="SignUp"
              component={ SignUp }
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

          <Stack.Screen
              name="ReviewUpdate"
              component={ ReviewUpdate }
              options={{ headerShown: false }}
          />

          <Stack.Screen
              name="UpdateComment"
              component={ UpdateComment }
              options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </BaseTemplate>
    </NavigationContainer>
  );
}


