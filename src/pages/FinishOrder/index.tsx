import React  from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { api } from '../../services/api'
import Routes from '../../routers'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParmsList } from '../../routers/app.routes'

type RouteDetailParams = {
    FinishOrder: {
        number:number | string
        order_id:string
    }

}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){

    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParmsList>>()

async function handleFinish(){
    
   try{
        await api.put('/order/send',{
            order_id: route.params?.order_id
        })

        navigation.popToTop()

   }catch(err){
    console.log('Erro ao finalizar')

   }
}



    //const route = useRoute<FinishOrderRouteProp>()
    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar o pedido?</Text>
            <Text style={styles.title}>
                Mesa {route.params?.number}
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.textButton}>Finalizar Pedido</Text>
            <Feather name="shopping-cart" size={20} color="#1d1d2e"  />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems:'center',
        justifyContent:'center',
        
    },
    alert:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:12,
    },
    title:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold',
        marginBottom:12,  
    },
   button:{
        backgroundColor:'#3fffa3',
        flexDirection:'row',
        width:'65%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4

    },
    textButton:{
        color:'#1d1d2e',
        fontSize:18,
        fontWeight:'bold',
        marginRight:8
    }
})