//Função do Arquivo
/* 
Verificar se existe usuario logado
Caso exista mostrará a rota para aqueles com login
Caso Não exista mostrará a rota para aqueles sem login



*/

import React,{useContext} from 'react';
import AppRoutes from './approutes';
import SignInRoutes from './authroutes';
import {AuthContext} from '../contexts/auth';
import {View,ActivityIndicator} from 'react-native';

function Routes(){
    //Utilizando o useContext utiliza-se o contexto criado
    //Passando para esta função o Nome do COntexto criado
  
    const {signed,loading} = useContext(AuthContext);

    if(loading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <ActivityIndicator size='large' color="green"/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <SignInRoutes/>
    )
}
export default Routes;
