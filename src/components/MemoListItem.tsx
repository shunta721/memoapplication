import { JSX } from "react"
import {View, Text, StyleSheet, TouchableOpacity,Alert} from "react-native"
import {Link} from "expo-router"
import Icon from "./icon"
import { PropsRef } from "react-native-gesture-handler/lib/typescript/web/interfaces"
import {type Memo} from "../../types/memo"
import{deleteDoc, doc} from "firebase/firestore"
import{auth,db} from "../config"


interface Props{
    memo:Memo
}

const handlePress=(id:string):void=>{
    if(auth.currentUser==null){return}
    const ref=doc(db,`users/${auth.currentUser.uid}/memos`,id)
    Alert.alert("メモを削除します","よろしいですか？",[
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

const MemoListItem = (props:Props): JSX.Element| null =>{
     const {memo} = props
    const {bodyText, updatedAt}=memo
    if(bodyText==null || updatedAt== null){return null}
    const dataString=memo.updatedAt.toDate().toLocaleString("Ja-JP")
    return(
        <Link 
        href={{pathname:"/memo/detail", params:{id:memo.id}}}
        asChild>
            <TouchableOpacity style={styles.MemoListItem}>
                    <View style={styles.memoinner}>
                        <View style={styles.memolistItemTitleContainer}>
                            <Icon name='file-text2' size={24} color="FFFFFF" />
                            <View style={styles.punch}>
                            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.memoListItemTitle}>{memo.bodyText}</Text>
                            </View>
                    </View>
                    <Text style={styles.memoListItemDate}>{dataString}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{handlePress(memo.id)}}>
                    <View style={styles.deliteButton}>
                    <Icon name="delete" size={40} color="B0B0B0" />
                    </View>
                    </TouchableOpacity>
            </TouchableOpacity>
        </Link>

    )
        
}
   


const styles = StyleSheet.create({
    MemoListItem:{
        backgroundColor:"#FFFFFF",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:15,
        paddingHorizontal:16,
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:"rgba(0,0,0,0.15)",
    },
    memoListItemTitle:{
        fontSize:20,
        lineHeight:32,
        fontWeight: "bold",
    },
    memoListItemDate:{
        fontSize:12,
        lineHeight:16,
        color:"#848484"
    },
    memolistItemTitleContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1
    },
    punch:{
        marginLeft:10,
        flex:1
    },
    deliteButton:{
        marginRight:0
    },
    memoinner:{
        flex:1
    }
})

export default MemoListItem