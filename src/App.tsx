import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './presentation/routes/BottomTabsNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';

export const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer >
        <View style={styles.container}>
          <BottomTabNavigator />
        </View>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
