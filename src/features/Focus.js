import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";
import { fontSizes, spacing } from "../utils/Sizes";
import { Colors } from "../utils/Colors";

export const Focus= ({addSubject}) => {
    const [subject, setSubject] = useState(null);
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> what would you want to focus on?</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={{ flex: 1, marginRight: spacing.lg}}
                    onSubmitEditing={ ({nativeEvent}) => {setSubject(nativeEvent.text)}}/>
                    <RoundedButton size={50} title="+" onPress={()=>{addSubject(subject)}}/>
                </View>
                
            </View>
        
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 0.5,
    },

    titleContainer:{
        flex: 1,
        padding:spacing.md,
        justifyContent:"center",

    },

    title:{
        color: Colors.white,
        fontWeight: "bold",
        fontSize: spacing.md,

    },
    inputContainer:{
        paddingTop: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
    },

});