import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const LogbookScreen = () => {
    const [logs, setLogs] = useState([
        { date: 'March 12, 2025', drugs: ['Drug 1', 'Drug 2', 'Drug 3'] },
        { date: 'March 13, 2025', drugs: ['Drug 1', 'Drug 2', 'Drug 3'] },
        { date: 'March 14, 2025', drugs: ['Drug 1', 'Drug 2', 'Drug 3'] },
        { date: 'March 15, 2025', drugs: ['Drug 1', 'Drug 2', 'Drug 3'] },
    ]);

    const addNewLog = () => {
        const newDate = `March ${logs.length + 12}, 2025`;
        setLogs([{ date: newDate, drugs: ['Drug 1', 'Drug 2', 'Drug 3'] }, ...logs]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Logbook</Text>
            <FlatList
                data={logs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.logEntry}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.center}>I took the following drugs:</Text>
                        {item.drugs.map((drug, index) => (
                            <Text key={index} style={styles.center}>{index + 1}. {drug}</Text>
                        ))}
                    </View>
                )}
            />
            <TouchableOpacity style={styles.fab} onPress={addNewLog}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    center: {
      textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
        backgroundColor: 'white',
        width: '100%'
    },
    logEntry: {
        marginBottom: 20,
        textAlign: 'center'
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'blue',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        textAlign: 'center',
    },
});

export default LogbookScreen;
