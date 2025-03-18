import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { format, parse } from 'date-fns';
import { router } from "expo-router";
import { useState } from 'react';


const LogbookScreen = () => {
    function pullData() {
        return {'2025-12-03':['drug1','drug2'],'2025-12-02':['drug1','drug2'],'2025-12-01':['drug1','drug2']};
    }
    const [logs, setLogs] = useState(pullData());
    const addNewLog = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        setLogs((prevLogs: Record<string, string[]>) => {
            const updatedLogs = { ...prevLogs };
            if (!updatedLogs[today]) {
                updatedLogs[today] = [];
            }
            updatedLogs[today].push('drug');
            return updatedLogs;
        });
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
