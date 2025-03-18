import { View, StatusBar } from "react-native";
import "./LogbookScreen";
import LogbookScreen from "@/app/LogbookScreen";
import React from 'react';
import './_layout';


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <StatusBar hidden={true} />
      <LogbookScreen/>
    </View>
);
}
