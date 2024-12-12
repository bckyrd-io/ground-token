import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing the icon library

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    // Define a primary green color, or adapt it from Colors
    const activeTintColor = Colors[colorScheme ?? 'dark'].tint || '#34D399'; // Green color (adjust to your theme)

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: activeTintColor, // Set the active color to green
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={28} color={color} /> // "home" icon
                    ),
                }}
            />
            <Tabs.Screen
                name="locate"
                options={{
                    title: 'Locate',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="map" size={28} color={color} /> // "map" icon
                    ),
                }}
            />
            <Tabs.Screen
                name="playground"
                options={{
                    title: 'Playground',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="basketball" size={28} color={color} /> // "basketball" icon
                    ),
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="stats-chart" size={28} color={color} /> // "stats-chart" icon
                    ),
                }}
            />
            <Tabs.Screen
                name="status"
                options={{
                    title: 'Status',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="document-text" size={28} color={color} /> // "document-text" icon
                    ),
                }}
            />
            <Tabs.Screen
                name="adminUsers"
                options={{
                    title: 'Admin Users',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={28} color={color} /> // "person" icon for user management
                    ),
                }}
            />
            <Tabs.Screen
                name="adminPlayground"
                options={{
                    title: 'Admin Playground',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="game-controller" size={28} color={color} /> // "game-controller" icon for playground admin
                    ),
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Login',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="log-in" size={28} color={color} /> // "log-in" icon for login
                    ),
                }}
            />
            <Tabs.Screen
                name="admin"
                options={{
                    title: 'Admin',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="shield-checkmark" size={28} color={color} /> // "shield-checkmark" icon for admin
                    ),
                }}
            />
            <Tabs.Screen
                name="payment"
                options={{
                    title: 'Payment',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="card" size={28} color={color} /> // "card" icon for payment
                    ),
                }}
            />
            <Tabs.Screen
                name="overview"
                options={{
                    title: 'Overview',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="eye" size={28} color={color} /> // "eye" icon for overview
                    ),
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Register',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-add" size={28} color={color} /> // "person-add" icon for registration
                    ),
                }}
            />
            <Tabs.Screen
                name="passwordRecovery"
                options={{
                    title: 'Password Recovery',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="key" size={28} color={color} /> // "key" icon for password recovery
                    ),
                }}
            />
        </Tabs>
    );
}
