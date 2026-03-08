import {View,TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"

import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon"
import{router, useLocalSearchParams} from "expo-router"
import{collection, addDoc, Timestamp} from "firebase/firestore"
import {db,auth} from "../../config"
import {useState} from "react"



const handlePress=(bodyText:string):void=>{
    if(auth.currentUser===null){return}
    const ref=collection(db,`users/${auth.currentUser.uid}/memos`)
    
    
addDoc(ref,{
    bodyText:bodyText,
    updatedAt:Timestamp.fromDate(new Date()),
    fileId:""
})
.then((docRef)=>{
    console.log("success",docRef.id)
    router.back()
})

.catch((error)=>{
    console.log(error)
})

router.back()

}

const Create =():JSX.Element=>{
    const[bodyText,setBodyText]=useState("")
    return(
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          
            <View style={styles.InputContainer}>
                <TextInput 
                 style={styles.Input}
                 value={bodyText}
                 onChangeText={(text)=>{setBodyText(text)}}
                 autoFocus
                  />
            </View>
            <CircleButton onPress={()=>{handlePress(bodyText)}}>
                <Icon name="check" size={40} color="white"/>
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    InputContainer:{
        paddingVertical:32,
        paddingHorizontal:27,
        flex:1,

    },
    Input:{
       flex:1,
       textAlignVertical:"top",
       fontSize:16,
       lineHeight:24
    }
})


export default Create