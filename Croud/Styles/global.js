import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    primaryContainer: {
        flex: 1,
        paddingHorizontal: 15
    },
    
    globalContainer: {
        fontFamily: 'manrope'
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
        fontFamily: "Manrope",
        paddingHorizontal: 12,
        fontSize: "14px",
    },

    primaryTitle: {
        color:  "#263238",
        fontFamily: "Manrope",
        fontSize: "24px"
    },

    primaryText: {
        color:  "#607D8B",
        fontFamily: "Manrope",
        fontSize: "14px"
    },

    darkerText: {
        color:  "#263238",
        fontFamily: "Manrope",
        fontSize: "14px"
    },

    bigDarkText: {
        color:  "#263238",
        fontFamily: "Manrope",
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
        fontFamily: 'Manrope',
    },

    secondaryBtnText: {
        color:  "#607D8B",
        fontSize: "16px",
        fontWeight: "600",
        lineHeight: "21.86px",
        fontFamily: 'Manrope',
    },


    //global fonts: manrope

    //global colors

    primaryBlack: "#263238",
    primaryGrey: "#607D8B",
    secondaryGrey: "#78909C",

    lightGrey: "#ECEFF1",
    primaryGreen: "#20C997",
    
  });
  