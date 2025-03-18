import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { format, parse } from 'date-fns';

const LogbookScreen = () => {
    // Simulating pulling past data
    const pullPastData = (): Record<string, string[]> => {
        return {'2025-03-15': ['Drug 1', 'Drug 2', 'Drug 3'],
            '2025-03-14': ['Drug 1', 'Drug 2', 'Drug 3'],
            '2025-03-13': ['Drug 1', 'Drug 2', 'Drug 3'],
            '2025-03-12': ['Drug 1', 'Drug 2', 'Drug 3'] };
    }

    const [logs, setLogs] = useState(pullPastData());

    const addNewLog = () => {
        const formattedToday = format(new Date(), 'yyyy-MM-dd');
        setLogs(prevLogs => ({
            ...prevLogs,
            [formattedToday]: ['Drug 1', ...(prevLogs[formattedToday] || [])]
        }));
    };

    const formatDate = (dateStr: string) => {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        return format(date, 'MMMM dd, yyyy');
    };

    const transformLogs = (logs:Object) => {
        const logsList=[];
        for (const [key, value] of Object.entries(logs)) {
            logsList.push({date: key, drugs: value});
        }
        logsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return logsList;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Logbook</Text>
            <FlatList
                data={transformLogs(logs)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.logEntry}>
                        <Text style={styles.date}>{formatDate(item.date)}</Text>
                        <Text style={styles.center}>I took the following drugs:</Text>
                        {item.drugs.map((drug: string, index:number) => (
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
