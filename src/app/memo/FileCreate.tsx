import{Alert, View, StyleSheet, TextInput, FlatList, TouchableOpacity} from "react-native"
import {JSX, useEffect, useState} from "react"

import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon"
import {router, useNavigation} from "expo-router"
import LogOutButton from "../../components/LogOutButton"   
import {collection, onSnapshot, query, orderBy, Timestamp, addDoc} from "firebase/firestore"
import{auth, db} from "../../config"
import{type Memo} from '../../../types/memo'
import File from "../../components/File"


const handlePress1=async(bodyText:string)=>{
    if (auth.currentUser===null){return}  
    if(bodyText==null){return Alert.alert("エラー","ファイル名を入力してください") }
    try {const ref=collection(db, `users/${auth.currentUser.uid}/File`)

    const docref = await addDoc(ref,{
        bodyText:bodyText,
        updatedAt:Timestamp.fromDate(new Date()),
    })
        console.log("ファイル作成成功", docref.id)
        router.push("/memo/list")
    } catch(error){
        console.log("ファイル作成失敗", error)
    }
    

}


    const CreateFile=():JSX.Element=>{
        const[bodyText, setbodyText]=useState("")
        
        return(
            <View style={styles.container}>
                <TextInput
                value={bodyText}
                onChangeText={(text)=>{setbodyText(text)}}
                autoFocus
                placeholder="ファイル名を入力してください"
                />           

            <CircleButton onPress={()=>{handlePress1(bodyText)}} >
                <Icon name="check" size={40} color="White"/>
            </CircleButton>

            </View>
        )
    }




    const styles = StyleSheet.create({
        container:{
            flex:1,
        },
    })



    export default CreateFile