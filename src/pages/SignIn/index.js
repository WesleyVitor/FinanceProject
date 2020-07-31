import React,{useState,useContext} from 'react';
import {Platform,ActivityIndicator} from 'react-native'
import {Background,Container,Logo,AreaInput,Input,SubmitButton,SubmitButtonText,Link,LinkText} from './styles';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';

export default function SignIn(){
    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signIn,loadingAuth} = useContext(AuthContext);

    function handleLogin(){
        signIn(email,password);
    }

    return(
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''} enable>
                <Logo source={require('../../assets/Logo.png')} />

                <AreaInput>
                <Input 
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={(text)=>setEmail(text)}/>
                
                </AreaInput>

                <AreaInput>
                <Input 
                placeholder="Password"
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={(text)=>setPassword(text)}/>
                </AreaInput>
                
                <SubmitButton onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#222"/>
                    ):
                        
                    (<SubmitButtonText>Acessar</SubmitButtonText>)
                    
                    }
                </SubmitButton>
                <Link onPress={()=>navigation.navigate('SignUp')}>
                    <LinkText>Criar Nova Conta!</LinkText>
                </Link>

            </Container>


        </Background>
    )
}