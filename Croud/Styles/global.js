import { Manrope_700Bold } from "@expo-google-fonts/manrope";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    primaryContainer: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#F8F8F8"
    },
    
    globalContainer: {
        fontFamily: 'Manrope_500Medium'
    },

    primaryInput: {
        backgroundColor: "#e8e8e8",  //"#ECEFF1",
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        width: 355,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    primaryTopWrapper: {
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    secondaryInput: {
        backgroundColor: "#e8e8e8",  //"#ECEFF1",
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        width: 160,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    primaryInputIcon: {
        color:  "#607D8B",
        paddingHorizontal: 5
    },

    primaryTextInput: {
        height: "100%",
        marginLeft: 10,
        flex: 1,
    },

    dangerText: {
        color:  "#20C997",
        textAlign: "center",
        fontFamily: "Manrope_500Medium",
        paddingHorizontal: 12,
        fontSize: "14px",
    },

    primaryTitle: {
        color:  "#263238",
        fontFamily: "Manrope_700Bold",
        fontSize: "24px"
    },

    primaryText: {
        color:  "#607D8B",
        fontFamily: "Manrope_500Medium",
        fontSize: "14px"
    },

    darkerText: {
        color:  "#263238",
        fontFamily: "Manrope_600SemiBold",
        fontSize: "14px"
    },

    bigDarkText: {
        color:  "#263238",
        fontFamily: "Manrope_500Medium",
        fontSize: "20px"
    },

    primaryGreenBtn: {
        backgroundColor: "#20C997",
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        width: 335,
        borderRadius: 10,
        paddingHorizontal: 13,
    },


    secondaryGreenBtn: {
        backgroundColor: "#20C997",
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        borderRadius: 10,
        paddingHorizontal: 13,
    },

    secondaryGreyBtn: {
        backgroundColor: "#e8e8e8",  //"#ECEFF1",
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        width: 335,
        borderRadius: 10,
        paddingHorizontal: 13,
        marginTop: 10
    },

    primaryBtnText: {
        color: "white",
        fontSize: "16px",
        fontWeight: "600",
        lineHeight: "21.86px",
        fontFamily: 'Manrope_600SemiBold',
    },

    secondaryBtnText: {
        color:  "#607D8B",
        fontSize: "16px",
        fontWeight: "600",
        lineHeight: "21.86px",
        fontFamily: 'Manrope_600SemiBold',
    },


    //global fonts: manrope

    //global colors

    primaryBlack: "#263238",
    primaryGrey: "#607D8B",
    secondaryGrey: "#78909C",
    inputGrey: "#e8e8e8",
    lightGrey: "#ECEFF1",
    primaryGreen: "#20C997",
    
  });
  