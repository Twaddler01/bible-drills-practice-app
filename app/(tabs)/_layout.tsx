// app/_layout.tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { SetupProvider, useSetup } from '../contexts/SetupContext';

export default function TabLayout() {
  const { isSetupComplete } = useSetup();

  // Effect hook to update the href dynamically based on setup completion
 useEffect(() => {
   // Log state changes for debugging
   console.log("isSetupComplete changed:", isSetupComplete);
 }, [isSetupComplete]);

  return (
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="setup"
          options={{
            title: 'Setup Drill',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            title: 'Start Practice',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'play-sharp' : 'play-outline'} color={color} size={24} />
            ),
            href: isSetupComplete ? '/practice' : null,  // Only show this tab if setup is complete
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'play-sharp' : 'play-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
  );
}

export default function App() {
  return (
    <SetupProvider>
      <TabLayout />
    </SetupProvider>
  );
}
