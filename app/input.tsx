import React, {useState} from 'react';
import { View, Text, Button, StatusBar, TextInput } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

export default function LogInputScreen() {
    const router = useRouter();  // Initialize the useRouter hook
    const [name, setName]=useState()
    const handleSubmit = () => {
        // Handle form submission here
        console.log('Form submitted!');
        router.back()
        // Navigate back or perform other actions
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <StatusBar hidden={true} />
            <Text>Please enter the name of the medication you used:</Text>
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
                onChangeText={setName}
                value={name}
                placeholder="useless placeholder"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}
