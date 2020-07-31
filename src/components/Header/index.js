import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Container, ButtonMenu} from './styles';
import {useNavigation} from '@react-navigation/native';
export default function Header() {
 const navigation = useNavigation();
 return (
   <Container>
       <ButtonMenu onPress={()=>navigation.toggleDrawer()}>
        <Icon name="menu" size={30} color="#FFF" />
       </ButtonMenu>
   </Container>
  );
}