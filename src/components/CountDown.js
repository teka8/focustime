import React, {useEffect, useState} from "react";
import { View, Text ,StyleSheet} from "react-native";
import { spacing, fontSizes } from "../utils/Sizes";
import { Colors } from "../utils/Colors";

const mintomils =(min)=> min *1000*60;
const formatTime = (time)=> time < 10 ? `0${time}` : time;

export const CountDown = ({ 
    minutes = 2,
    isPaused,
    onProgress,
    onEnd,
    })=>{
        const [millis, setMillis] = useState(mintomils(minutes));
        const minute = Math.floor((millis/1000/60)%60);
        const second = Math.floor((millis/1000)%60);

        const interval = React.useRef(null);
        const countdown = () => {
            setMillis((timesss) =>{
                if(timesss === 0){
                    clearInterval(interval.current)
                    return timesss;
                }
                const timeLeft = timesss - 1000;
                return timeLeft;
            })
        }

        useEffect(()=>{
            setMillis(mintomils(minutes))
        },[minutes]);

        useEffect(()=> {
            onProgress (millis/mintomils(minutes));
            if(millis === 0){
                onEnd();
            }
        }, [millis]);

        useEffect(()=>{
            if (isPaused) {
                if(interval.current) clearInterval(interval.current);
                return;
            }
            interval.current = setInterval(countdown, 1000);
            return () => clearInterval(interval.current)
        }, [isPaused])

        
    return(
        <View >
            <Text style={styles.text}> { formatTime(minute) }:{ formatTime(second) } </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    
    text:{
        fontSize: fontSizes.xxxl,
        fontWeight: 'bold',
        color: Colors.white,
        padding: spacing.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)',

    }
});