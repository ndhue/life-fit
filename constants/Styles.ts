import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    height: "100%",
    paddingTop: 40
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    width: 339,
    height: 45,
    borderRadius: 7,
    backgroundColor: Colors.background2,
    paddingHorizontal: 15
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 11
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 25
  },
  radioCheck: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background2,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    width: 12,
    height: 12,
    backgroundColor: Colors.border
  }
});