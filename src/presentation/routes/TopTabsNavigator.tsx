import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { MatchScreen } from '../screens/match/MatchScreen';
import { FavouriteScreen } from '../screens/favourite/FavouriteScreen';

import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createMaterialTopTabNavigator();

const MatchIcon = ({ focused }: { focused: boolean }) => (
    <Ionicons
        name="flame"
        size={15}
        color={focused ? 'red' : 'grey'}
        style={styles.icon}
    />
);

const FavouriteIcon = ({ focused }: { focused: boolean }) => (
    <Ionicons
        name="star"
        size={15}
        color={focused ? 'red' : 'grey'}
        style={styles.icon}
    />
);

export const TopTabsNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.indicator,
                tabBarItemStyle: styles.tabItem,
                tabBarShowLabel: false, // Oculta los nombres de las pestañas
            }}
        >
            <Tab.Screen
                name="MatchTopTab"
                component={MatchScreen}
                options={{
                    tabBarIcon: MatchIcon,
                }}
            />
            <Tab.Screen
                name="FavouriteTopTab"
                component={FavouriteScreen}
                options={{
                    tabBarIcon: FavouriteIcon,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
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
