import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: "#F5F7FA",
        padding: 20,
        justifyContent: "center",
    },
    listSearchBar: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    listSearchItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 16,
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    footer: {
        marginTop: "auto",
        padding: 20,
        paddingBottom: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#00000099",
    },
    close: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    recordButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
    },
    resultContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    productName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    containerProfil: {
        backgroundColor: "#F5F7FA",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        height: "100%",
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    nameProfil: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    emailProfil: {
        fontSize: 14,
        color: "gray",
    },
    logoutButtonProfil: {
        width: "100%",
    },
    lastFoodText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10
    },
});
