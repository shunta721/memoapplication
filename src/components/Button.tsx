import {View, Text, StyleSheet, TouchableOpacity} from "react-native"

interface Props{
    label?:string
    onPress?: () => void
}

const Button = (props:Props):JSX.Element =>{
    const{label, onPress} = props
    return(
    <TouchableOpacity onPress={onPress} style={styles.Botton}>
        <Text style={styles.BottonLabel}>{label}</Text>
    </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    Botton:{
        backgroundColor:"#467FD3",
        borderRadius:8,
        alignSelf:"flex-start",
        marginBottom:24
    },
    BottonLabel:{
        fontSize:16,
        lineHeight:32,
        color:"#FFFFFF",
        paddingVertical:8,
        paddingHorizontal:24,
    }
})

export default Button