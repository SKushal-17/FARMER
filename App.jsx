import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './frontend/pages/ProfileScreen';
import MachineryComponent from './frontend/pages/MachineryComponent';
import CropsComponent from './frontend/pages/CropsComponent';
import CartScreen from './frontend/components/CartScreen';
import LoginScreen from './frontend/pages/LoginScreen';
import SignupScreen from './frontend/pages/SignupScreen';
import MarketPrices from './frontend/pages/MarketPrices';
import { CartProvider } from './frontend/pages/CartContext';
import { UserProvider } from './frontend/contexts/UserContext'; // Import UserProvider

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MarketPricesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market Prices"
        component={MarketPrices}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Machinery') {
            iconName = 'build';
          } else if (route.name === 'Crops') {
            iconName = 'eco';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Machinery" component={MachineryComponent} />
      <Tab.Screen name="Crops" component={CropsComponent} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profile" // Ensure Profile screen is correctly named and registered
        component={ProfileScreen} 
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MarketPricesStack"
        component={MarketPricesStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );
}
