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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
            <Ionicons name="document" size={28} color={color} /> // "document" icon
          ),
        }}
      />
      <Tabs.Screen
        name="adminUsers"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={28} color={color} /> // "people" icon
          ),
        }}
      />
      <Tabs.Screen
        name="adminPlayground"
        options={{
          title: 'Locations',
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" size={28} color={color} /> // "location" icon
          ),
        }}
      />
    </Tabs>
  );
}
