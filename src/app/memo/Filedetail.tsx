import { JSX, useState, useEffect} from "react"
import {View, Text, StyleSheet, TouchableOpacity,Alert, FlatList} from "react-native"
import {Link} from "expo-router"
import Icon from "../../components/icon"
import { PropsRef } from "react-native-gesture-handler/lib/typescript/web/interfaces"
import {type Memo} from "../../types/memo"
import{deleteDoc, doc} from "firebase/firestore"
import{auth,db} from "../../config"
import MemoLIstItem from "../../components/MemoListItem"
import File from "../../components/File"
import {router, useNavigation, useLocalSearchParams} from "expo-router"
import {collection, onSnapshot, query, orderBy, Timestamp, addDoc,where} from "firebase/firestore"
import LogOutButton from "../../components/LogOutButton"   
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"




const handlePress=(fileId:string):void=>{
    router.push({pathname:"/memo/create_file", params:{fileId}})
}


const FileDetail =():JSX.Element=>{
    const[memos, setMemos]=useState<Memo[]>([])
    const navigation = useNavigation()
    const {fileId} = useLocalSearchParams<{fileId:string}>()
    useEffect(()=>{
    navigation.setOptions({
        headerRight:()=>{
            return <LogOutButton />
        }})
    },[]) 


    useEffect(()=>{
        if (auth.currentUser==null){return}
        const ref = collection(db,`users/${auth.currentUser.uid}/memos`)
        const q=query(ref,where("fileId","==",fileId), orderBy("updatedAt","desc"))
        const unsubscribe = onSnapshot(q,(snapshot)=>{
            const remoteMemos:Memo[]=[]
            snapshot.forEach((doc)=>{
                console.log("メモアプリ",doc.data())
                const {bodyText, updatedAt}=doc.data()
                remoteMemos.push({
                    id:doc.id,
                    bodyText:bodyText,
                    updatedAt:updatedAt
                })
            })
            setMemos(remoteMemos)
        })
        return unsubscribe

    },[])

    const combinedData=[
    ...memos.map(item=>({...item, type:"memo"}))
]




    return(
    <View style={styles.container}>
    

    <FlatList
    data={combinedData}
    renderItem={({item})=>{
        if(item.type==="memo"){
            return <MemoListItem memo={item} />
        }
    }}
    />
  


    <CircleButton onPress={()=>{handlePress(fileId)}}>
    <Icon name="plus" size={40} color="FFFFFF"  />
    </CircleButton>


      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "FFFFFF"
    },
     folderButton:{
        right:120,
        bottom:40
    }
})


export default FileDetail
