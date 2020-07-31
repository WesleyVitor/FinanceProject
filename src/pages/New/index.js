import React,{useState,useContext} from 'react';
import { SafeAreaView,Keyboard,TouchableWithoutFeedback,Alert } from 'react-native';
import Header from '../../components/Header';
import {Background,Input,SubmitButton,SubmitButtonText} from './styles';
import Picker from '../../components/Picker';
import firebase from '../../service/firebaseConnection';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';
export default function New() {
  const [valor,setValor] = useState('');
  const [tipo,setTipo] = useState(null);
  const navigation= useNavigation();
  const {user:usuario} = useContext(AuthContext);

  function handleNew(){
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || tipo ===null){
      alert("Preencha Todos os campos");
      return;
    }

    Alert.alert(
      'Confirmando Dados',
      `Tipo ${tipo} - Valor ${parseFloat(valor)}`,
      [
        {
          text:'Cancelar',
          style:'cancel',
        },
        {
          text:'Confirmar',
          onPress:()=>handleAdd(),
        }
      ]
    )

  }
  
  function handleAddd(){
    alert('Alguma coisa')
  }
  async function handleAdd(){
    let uid = usuario.uid
    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo:tipo,
      valor:parseFloat(valor),
      date: format(new Date(),"dd/MM/yyyy")
    })

    //Atualizar Saldo
    let us = firebase.database().ref('user').child(uid);
    await us.once('value').then((snapshot)=>{
      let saldo = parseFloat(snapshot.val().saldo);
      
      tipo === 'receita' ? saldo += parseFloat(valor) : saldo-= parseFloat(valor);

      us.child('saldo').set(saldo);

    })
    setValor('');
    navigation.navigate('Home');
    

  }

 return (
   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <Background>
     <Header/>
     <SafeAreaView style={{alignItems:"center"}}>
        
        <Input
        placeholder="Valor Desejado"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={()=>Keyboard.dismiss()}
        value={valor}
        onChangeText={(texto)=>setValor(texto)}
        />

        <Picker onChange={setTipo} />
        <SubmitButton onPress={handleNew}>
          <SubmitButtonText>Registrar</SubmitButtonText>
        </SubmitButton>

     </SafeAreaView>
   </Background>
   </TouchableWithoutFeedback>
   
  );
}