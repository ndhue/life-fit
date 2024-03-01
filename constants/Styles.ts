import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const global = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto'
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: 'center', 
    fontSize: 20, 
    fontWeight: '700'
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 11
  },
});