import { JSX } from "react"
import {View, Text, StyleSheet} from "react-native"

const Header = (): JSX.Element =>{
    return(
        <View style={styles.Header}>
            <View style={styles.headerInner}>
                <Text style={styles.headerTitle}>Memo App</Text>
                <Text style={styles.headerRight}>ログアウト</Text>
            </View>
        </View>
    )
}

 

const styles= StyleSheet.create({
    Header:{
        backgroundColor:"#467FD3",
        height:104,
        justifyContent:"flex-end"
    },
    headerInner:{
        alignItems:"center"
    },
    headerRight:{
        position:"absolute",
        right:19,
        bottom:16,
        color:"rgba(255,255,255)"
    },
    headerTitle:{
        marginBottom:8,
        fontSize:22,
        lineHeight:32,
        fontWeight:"bold",
        color:"#FFFFFF"
    }
})

export default Header
