import{JSX,useEffect,useState } from "react"
import Icon from "./icon"
import {View, Text,TouchableOpacity, StyleSheet, Alert} from "react-native"
import { prototypejs } from "globals"
import{type Memo} from "../../types/memo"
import{doc, deleteDoc,onSnapshot,collection,query,orderBy} from "firebase/firestore"
import{auth, db} from "../config"
import {router} from "expo-router"

interface Props{
    Files:Memo
}

const handlePress=(id:string):void=>{
    if(auth.currentUser===null){return}
    const ref= doc(db,`users/${auth.currentUser.uid}/File`, id)
    Alert.alert("ファイルを削除します","よろしいですか？",[
        {
            text:"キャンセル"
        },
        {
            text:"削除する",
            onPress:(()=>{
                deleteDoc(ref)
                .catch(()=>{Alert.alert("削除に失敗しました")})
            })
        }
    ]    
)
}

const handlePress1=(fileId:string):void=>{
    router.push({pathname:"/memo/Filedetail", params:{fileId}})
}


const File=(props:Props):JSX.Element|null=>{

    const {Files}=props
    const {bodyText, updatedAt, fileId}=Files
    if (bodyText==null || updatedAt==null){return null}
    const dataString=updatedAt.toDate().toLocaleString("Ja-JP")
    
    return(
    <TouchableOpacity style={styles.FileInner} onPress={()=>{handlePress1(String(Files.fileId))}}>
        <View style={styles.File}>
        <Icon name="folder" size={28} color="rgb(201, 230, 228)" />
        <Text style={styles.bodyText} numberOfLines={1} >{Files.bodyText}</Text>
              
        <TouchableOpacity style={styles.container} onPress={()=>{handlePress(String(Files.fileId))}}>
        <View style={styles.deliteButton}>
        <Icon name="delete" size={40} color="B0B0B0" />
        </View>
        </TouchableOpacity>
        </View>   

        <View>
        <Text style={styles.dataString}>{dataString}</Text> 
        </View> 
      
    </TouchableOpacity>




)
}


const styles=StyleSheet.create({
    File:{
        paddingLeft:0,
        marginRight:12,
        flexDirection:"row",
        alignItems:"center",

       
        },
    FileInner:{
        justifyContent: "space-between",
        paddingHorizontal:16,
        paddingVertical:12,
        borderBottomWidth:1,
        borderColor:"rgba(0,0,0,0.15)",
      },
    dataString:{
        fontSize:12,
        color:"#848484",
        paddingLeft:0,
        lineHeight:16,

    },
    bodyText:{
        fontSize:20,
        lineHeight:30,
        fontWeight:"bold",
        paddingLeft:12
    },
    deliteButton:{
        marginRight:12,
        alignItems:"center"
    },
    container:{
        position:"absolute",
        right:-24,
        top:0,
        bottom:0,
        flex:1,
    }
})




export default File