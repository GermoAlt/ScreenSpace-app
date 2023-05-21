import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Landing'}>
        <Stack.Screen
          name={'Landing'}
          component={Landing}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
