import React,{useContext} from 'react';
import { View,Text } from 'react-native';
import {Container,Nome,NewLink,NewLinkText,Logout,LogoutText} from './styles';
import {AuthContext} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

export default function Profile() {

  const {user,signOut} = useContext(AuthContext);
  const navigation = useNavigation();

 return (
   <Container>
     <Header/>
     <Nome>{user.nome}</Nome>
     <NewLink onPress={()=>navigation.navigate('New')}>
       <NewLinkText>Registrar Gastos</NewLinkText>
     </NewLink>
     <Logout onPress={()=>signOut()}>
       <LogoutText>Sair</LogoutText>
     </Logout>
   </Container>
  );
}