import {JSX} from "react"
import {View, StyleSheet, FlatList} from "react-native"
import {router} from "expo-router"
import CircleButton from "../components/CircleButton"
import Icon from "../components/icon"

const FileButton =():JSX.Element=>{
    return(
    <CircleButton onPress={()=>{router.push("../memo/FileCreate")}} style={styles.folderButton}>
        <Icon name="folder-plus" size={40} color="FFFFFF"/>
    </CircleButton>

    )
}


const styles=StyleSheet.create({
    folderButton:{
        right:120,
        bottom:40
    }
})


export default FileButton