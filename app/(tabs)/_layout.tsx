import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#667EEA',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarStyle: {
          backgroundColor: '#0F0C29',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculate',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>⚖️</Text>,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>📊</Text>,
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: 'Tips',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>💡</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>⚙️</Text>,
        }}
      />
    </Tabs>
  );
}
