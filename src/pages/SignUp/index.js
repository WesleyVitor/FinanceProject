import React,{useState,useContext} from 'react';
import {Platform,ActivityIndicator} from 'react-native'
import {Background,Container,Logo,AreaInput,Input,SubmitButton,SubmitButtonText,Link,LinkText} from '../SignIn/styles';
import {AuthContext} from '../../contexts/auth';
export default function SignIn(){
    const {signUp,loadingAuth} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    return(
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''} enable>
                <Logo source={require('../../assets/Logo.png')} />

                <AreaInput>
                <Input 
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="none"
                value={nome}
                onChangeText={(text)=>setNome(text)}/>
                
                </AreaInput>
                
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
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=>setPassword(text)}/>
                </AreaInput>
                
                <SubmitButton onPress={()=>signUp(email,password,nome)}>
                    {loadingAuth 
                    ? 
                    (<ActivityIndicator size={20} color="#222"/>)
                    :
                    (<SubmitButtonText>Cadastrar</SubmitButtonText>)
                }
                    
                </SubmitButton>
                

            </Container>


        </Background>
    )
}