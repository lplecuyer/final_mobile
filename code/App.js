
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from './MainMenu.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import User from './UserMenu.js';
import BaseTemplate from './BaseTemplate.js';
import Review from './Review.js';
import UserToken from './UserToken.js';
import GamesList from './GamesList.js';
import ReviewsList from './ReviewsList.js';
import ReviewCreate from './ReviewCreate.js';
import ReviewUpdate from './ReviewUpdate.js';
import UpdateComment from './UpdateComment.js';

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
              name="AddReviewScreen"
              component={ ReviewCreate }
              options={{headerShown: false}}
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


