import{Alert, View, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native"
import {JSX, useEffect, useState} from "react"

import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon"
import {router, useNavigation,useLocalSearchParams} from "expo-router"
import LogOutButton from "../../components/LogOutButton"   
import {collection, onSnapshot, query, orderBy, Timestamp, addDoc, where} from "firebase/firestore"
import{auth, db} from "../../config"
import{type Memo} from '../../../types/memo'
import File from "../../components/File"
import FileButton from "../../components/FileButton"
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads"



const handlePress=():void=>{
    router.push({pathname:"/memo/create"})}

const handlePress1=():void=>{
    router.push({pathname:"/memo/FileCreate"})
}




const List =():JSX.Element=>{
    
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3081540049292546/9684087041';
    const[memos, setMemos]=useState<Memo[]>([])
    const[Files, serFile]=useState<Memo[]>([])
    const navigation = useNavigation()
    useEffect(()=>{
    navigation.setOptions({
        headerRight:()=>{
            return <LogOutButton />
        }})
    },[]) 

    useEffect(()=>{
        if (auth.currentUser==null){return}
        const ref1=collection(db,`users/${auth.currentUser.uid}/File`)
        const q1=query(ref1, orderBy("updatedAt","desc"))
        const unsubscribe1 = onSnapshot(q1,(snapshot)=>{
            const remoteFile:Memo[]=[]
            snapshot.forEach((doc)=>{
                const {bodyText, updatedAt}=doc.data()
                remoteFile.push({
                        fileId:doc.id,
                        bodyText:bodyText,
                        updatedAt:updatedAt
                    })
                })
                serFile(remoteFile)
            })



        const ref = collection(db,`users/${auth.currentUser.uid}/memos`)
        const q=query(ref,where("fileId","==",""), orderBy("updatedAt","desc"))
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
        return ()=>{unsubscribe(); unsubscribe1();}

    },[])

    const combinedData=[
    ...Files.map(item=>({...item, type:"File"})),
    ...memos.map(item=>({...item, type:"memo"}))
]




    return(
    <View style={styles.container}>
    

    <FlatList
    data={combinedData}
    renderItem={({item})=>{
        if(item.type==="File"){
            return <File Files={item} />
        } else if(item.type==="memo"){
            return <MemoListItem memo={item} />
        }
    }}
    />


    <View style={styles.BannerAd}>
    <BannerAd
    unitId={adUnitId}
    size={BannerAdSize.FULL_BANNER}
    requestOptions={{
        requestNonPersonalizedAdsOnly:true,
    }}
    />
    </View>
  


    <CircleButton onPress={handlePress}>
    <Icon name="plus" size={40} color="FFFFFF"  />
    </CircleButton>


    <CircleButton onPress={handlePress1} style={styles.folderButton}>
        <Icon name="folder-plus" size={40} color="FFFFFF"/>
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
    },
    BannerAd:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:10
    }
})

export default List