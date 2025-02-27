import React, { memo, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View } from 'react-native';
import { MatchScreen } from '../screens/match/MatchScreen';
import { FavouriteScreen } from '../screens/favourite/FavouriteScreen';

import Ionicons from '@react-native-vector-icons/ionicons';


const Tab = createMaterialTopTabNavigator();

const MatchIcon = memo(({ focused }: { focused: boolean }) => {
    console.log('MatchIcon - focused:', focused); // 🔍 Log para ver qué pasa con el estado en cada render

    return (
        <Ionicons
            name="flame"
            size={15}
            color={focused ? 'red' : 'grey'} // Rojo si está seleccionado
            style={styles.icon}
        />
    );
});


const FavouriteIcon = memo(({ focused }: { focused: boolean }) => {
    console.log('FavouriteIcon - focused:', focused); // 🔍 Log para ver qué pasa con el estado en cada render

    return (
        <Ionicons
            name="star"
            size={15}
            color={focused ? 'red' : 'grey'} // Rojo si está seleccionado
            style={styles.icon}
        />
    );
});




export const TopTabsNavigator = () => {
    const renderMatchIcon = useCallback(({ focused }: { focused: boolean }) => <MatchIcon focused={focused} />, []);
    const renderFavouriteIcon = useCallback(({ focused }: { focused: boolean }) => <FavouriteIcon focused={focused} />, []);
    return (
        <View style={styles.container}>
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.indicator,
                tabBarItemStyle: styles.tabItem,
                tabBarShowLabel: false, // Oculta los nombres de las pestañas
                lazy: true, // Solo renderiza la pestaña seleccionada
                tabBarShowIcon: true, // Habilita la visualización de íconos
            }}
        >
            <Tab.Screen
                name="MatchTopTab"
                component={MatchScreen}
                options={{
                    tabBarIcon: renderMatchIcon,
                }}
                //unmountOnBlur={true}
            />
            <Tab.Screen
                name="FavouriteTopTab"
                component={FavouriteScreen}
                options={{
                    tabBarIcon: renderFavouriteIcon,
                }}
                //unmountOnBlur={true}
            />
        </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tabBar: {
        backgroundColor: '#E3E3E4',
        borderRadius: 28,
        alignSelf: 'center',
        marginTop: 60,
        width: 84,
        height: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    indicator: {
        width: '50%',
        height: '100%',
        borderRadius: 28,
        backgroundColor: 'white',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        flexGrow: 1,
        alignContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    icon: {
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        bottom: 9,
      },
});

