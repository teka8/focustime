import React, { useEffect, useRef, useState } from "react";
import { View , Text, StyleSheet} from "react-native";

export const Test = () =>{
    const [count, setCount] = useState(0);
    const countRef = useRef();

    const Test = () => {
        setCount((counts)=>{
            if (counts === 20) {
                return counts;
            }

            const newCount = counts + 1;
            return newCount;
        })
    }

    useEffect(()=>{
        countRef.current = setInterval(Test, 1000);
        return ()=>clearInterval(countRef.current);
    })
    return(
        <View>
            <Text style={styles.container}>
                {count}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 50,
    },
})