// Responsabilidade deste Arquivo
/* 
 Criar um contexto para mandar informações para as rotas
 Criar Usuario e mandar informação de criação
 Logar Usuario e mandar Informação de login
 Cadastrar AsyncStorage com informações de Login e Cadastro
 Procurar um AsyncStorage com informações do usuario logado
 Deslogar Usuario

*/


import React,{useState,createContext, useEffect} from 'react';
import firebase from '../service/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
//Utiizando a função createContext e a exportando como não default temos a criação de 
//um contexto
export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [loadingAuth,setLoadingAuth] = useState(false);
    //Criando O Provider, todos as rotas que tiverem dentro deste component poderá acessar 
    // o valor do contexto

    useEffect(()=>{
        async function loadStorage(){
            //Verfica se existe um item no AsyncStorage com a key 'Auth_user'
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage()
    },[])

    //Login
    async function signIn(email,password){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then(async(value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('user').child(uid).once('value')
            .then((snapshot)=>{
                let data = {
                    uid:uid,
                    nome:snapshot.val().nome,
                    email:value.user.email,
                };
                setUser(data);
                //Passa Informação de cadastro para o AsyncStorage
                storageUser(data);
                setLoadingAuth(false)
            })
        })
        .catch((err)=>{
            alert('Error:'+err)
            setLoadingAuth(false)
        })
    }

    //Cadastro
    async function signUp(email,password, nome){
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async(value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('user').child(uid).set({
                saldo:0,
                nome:nome
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome:nome,
                    email: value.user.email,
                }
                setUser(data);
                storageUser(data);
                setLoadingAuth(false)
            })
        })
    }

    //Função de AsyncStorage para cadastrar a informacao
    async function storageUser(data){
        //Cria um AsyncStorage com uma key e um valor em string
        await AsyncStorage.setItem('Auth_user',JSON.stringify(data));
    }

    //Deslogar Usuario
    async function signOut(){
        await firebase.auth().signOut()
        .then(()=>{
            AsyncStorage.clear()
            .then(()=>{
                setUser(null)
            })
        })
    }
    
    return(
        <AuthContext.Provider value={{signed: !!user ,user, signUp,signIn,signOut, loading,loadingAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;