import {View, StyleSheet, Text, TextInput, Alert, TouchableOpacity } from "react-native"

import Button from "../../components/Button"
import{useState} from"react"
import { signInWithEmailAndPassword }  from "firebase/auth"


import {Link, router} from "expo-router"
import{auth} from "../../config"

const handlePress=(email:string, password:string):void=>{
    //ログイン処理
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        console.log(userCredential.user.uid)
        router.replace("/memo/list")
    })
    .catch((error)=>{
        const{code,message}=error
        console.log(code,message)
        Alert.alert(message)
    })
}



const Login=():JSX.Element=>{
    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")

    return(
        <View style={styles.container}>
            
            <View style={styles.Inner}>
                <Text style={styles.Title}>Log In</Text>
                <TextInput 
                 style={styles.Input} 
                 value={email}
                 onChangeText={(text)=>{setEmail(text)}}
                 autoCapitalize="none"
                 placeholder="e-mail address"
                 textContentType="emailAddress"
                 />
                <TextInput 
                    style={styles.Input} 
                    value={password}
                    onChangeText={(text)=>{setPassword(text)}}
                    autoCapitalize="none"
                    secureTextEntry
                    placeholder="password"
                    textContentType="password"
                    />
                <Button label="submit" onPress={()=>{handlePress(email,password)}}/>
                
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered? </Text>
                    <Link href="/auth/sign_up" asChild replace>
                    <TouchableOpacity>
                    <Text style={styles.footerLink}>Sighn up here</Text>
                    </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F0F4F8"
    },
    Title:{
        fontSize:24,
        lineHeight:32,
        fontWeight:"bold",
        marginBottom:24
    },
    Inner:{
        paddingVertical:24,
        paddingHorizontal:27
    },
    Input:{
        borderWidth:1,
        borderColor:"#DDDDDD",
        backgroundColor:"#FFFFFF",
        height:48,
        padding:8,
        fontSize:16,
        marginBottom:12
    },
    footer:{
        flexDirection:"row",

    },
    footerText:{
        fontSize:14,
        lineHeight:24,
        marginRight:8,
        color:"#000000"
    },
    footerLink:{
        fontSize:14,
        lineHeight:24,
        color:"#467FD3"

    }
})

export default Login