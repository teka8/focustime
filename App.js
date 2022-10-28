import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Focus } from './src/features/Focus';
import { FocusHistory } from './src/features/FocusHistory';
import { Colors } from './src/utils/Colors';
import { Timer } from './src/features/Timer';


import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED:2,
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState();
  const [focusHistory, setFocusHistory] = useState([]);
  
  const addFocusHistorySubjectWithState = (subject, statuss)=>{
    setFocusHistory([...focusHistory,{ key: String(focusHistory.length +1), subject, statuss }]);
  };

  const onClear = () =>{
    setFocusHistory([]);
  }

  const saveFocusHistory = async () =>{
    try {
      await  AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  }

  const loadFocusHistory = async () =>{
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  },[]);

  useEffect(()=>{
    saveFocusHistory();
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
      <Timer focusSubject= {focusSubject} onTimerEnd = {()=>{
        addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE)
        setFocusSubject(null);
      }} clearSubject={()=>{
        addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED)
        setFocusSubject(null)}}/>
      ) : (
        <>
          <Focus addSubject = {setFocusSubject}/>
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue
  },
});
