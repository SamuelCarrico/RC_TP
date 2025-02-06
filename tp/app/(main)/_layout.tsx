import {Tabs} from 'expo-router/tabs'
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{title: 'Accueil',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }}/>,
            <Tabs.Screen name='add' options={{title: 'Ajout d\'un ingrédient',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />}}/>
            <Tabs.Screen name='camera' options={{title: 'Camera',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={color} /> }}/>,
            <Tabs.Screen name='[id]' options={{title: 'Détail', href: null}}/>
            <Tabs.Screen name='profile' options={{title: 'Profile',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />}}/>
        </Tabs>)
}