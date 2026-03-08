import {Text, StyleSheet, type ViewStyle, TouchableOpacity} from "react-native"
import {JSX} from "react"

interface Props{
    children: JSX.Element
    style?: ViewStyle
    onPress?:()=>void
    
}

const CircleButton =(props:Props): JSX.Element =>{
    const {children, style, onPress}= props
    return(
          <TouchableOpacity onPress={onPress} style={[styles.circleButton,style]}>
            <Text style={styles.circleButtonLabel}>{children}</Text>
        </TouchableOpacity>

    )
}   

const styles = StyleSheet.create({
    circleButton:{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#467FD3",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 50,
        bottom: 40,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 8, height: 8 },
        elevation: 8
    },
    circleButtonLabel:{
        color: "#FFFFFF",
        fontSize: 32,
        lineHeight: 32
    }
})

export default CircleButton