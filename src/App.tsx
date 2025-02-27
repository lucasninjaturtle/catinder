import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { BottomTabNavigator } from './presentation/routes/BottomTabsNavigator';


export const App = () => {
  return (

    <NavigationContainer>

      <BottomTabNavigator />

    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
