import { Text, View } from "react-native";
import "./LogbookScreen";
import LogbookScreen from "@/app/LogbookScreen";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogbookScreen/>
    </View>
  );
}
