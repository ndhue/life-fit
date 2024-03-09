import { StyleSheet } from "react-native";

export const bg = { uri: "https://res.cloudinary.com/dpb8gwksd/image/upload/v1709954083/background_zpgxtb.png" }

export const global = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  wrapper: {
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
  error: {
    fontSize: 12,
    color: 'red',
    paddingTop: 5
  }
});