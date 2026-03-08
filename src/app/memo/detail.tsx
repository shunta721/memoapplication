import {View, Text, ScrollView, StyleSheet} from "react-native"
import {router, useLocalSearchParams} from 'expo-router'
import{onSnapshot, doc} from "firebase/firestore"
import{auth,db} from "../../config"
import{Memo, type memo} from "../../../types/memo"
import {useEffect, useState} from "react"

import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon"
import { formatDiagnostic } from "typescript"



const handlePress=(id):void=>{
    router.push({pathname:"/memo/edit", params:{id}})
}



const detail =()=>{
    const id=String(useLocalSearchParams().id)
    console.log(id)
    const[memo, setmemo]=useState<Memo | null>(null)
    useEffect(()=>{
        if (auth.currentUser==null){return}
        const ref=doc(db, `users/${auth.currentUser.uid}/memos`, String(id))
        const unsubscribe=onSnapshot(ref,(memoDoc)=>{
            const{bodyText, updatedAt}=memoDoc.data() as Memo
            setmemo({
                id:memoDoc.id,
                bodyText,
                updatedAt
            })
        })
        return unsubscribe
    },[])
    return(
        <View style={styles.container}>
       
        <View style={styles.memoHeader}>
            <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText} </Text>
            <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString("ja-JP")}</Text>
        </View>
        
        <ScrollView style={styles.memoBody}>
            <Text style={styles.memoBodyText}>
                {memo?.bodyText}
            </Text>
        </ScrollView>
        <CircleButton onPress={()=>{handlePress(id)}} style={styles.positionButton}  >
            <Icon name="pencil" size={40} color="FFFFFF"/>
        </CircleButton>
        </View>

    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    memoHeader:{
        backgroundColor:"#467FD3",
        height:96,
        justifyContent:"center",
        paddingVertical:24,
        paddingHorizontal:19
    },
    memoTitle:{
        color:"#FFFFFF",
        fontSize:20,
        lineHeight:32,
        fontWeight:"bold"
    },
    memoDate:{
        color:"#FFFFFF",
        fontSize:14,
        lineHeight:19
    },
    memoBody:{
        
        paddingHorizontal:27

    },
    memoBodyText:{
        paddingVertical:32,
        fontSize:16,
        lineHeight:24,
        color:"#000000"

    },
    positionButton:{
        top: 60
    }
})
export default detail