import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TabChatScreen } from '../screens/tabs/TabChatScreen';
import { TabUserScreen } from '../screens/tabs/TabUserScreen';
import { TopTabsNavigator } from './TopTabsNavigator';

import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();

const TabBarButton = (props: any) => (
    <TouchableOpacity {...props} hitSlop={{ top: 8, bottom: 22, left: 8, right: 8 }} />
);

const TabBarIcon = (name: any) => ({ focused, size }: { color?: string; focused: boolean; size: number }) => (
    <Ionicons name={name} size={size} color={focused ? 'red' : 'grey'}/>
);

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabItem,
            }}
        >
            <Tab.Screen name="Match" component={TopTabsNavigator}
                options={{
                    tabBarButton: TabBarButton,
                    tabBarIcon: TabBarIcon('paw'),
                }}
            />
            <Tab.Screen name="Chat" component={TabChatScreen}
                options={{
                    tabBarButton: TabBarButton,
                    tabBarIcon: TabBarIcon('chatbubble-outline'),
                }} />
            <Tab.Screen name="User" component={TabUserScreen}
                options={{
                    tabBarButton: TabBarButton,
                    tabBarIcon: TabBarIcon('person-outline'),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        bottom: 50,
        alignSelf: 'center',
        width: 156,
        height: 44,
        borderRadius: 60,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        top: 2,
    },
});
