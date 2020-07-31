import styled from 'styled-components';

export const Background = styled.View`
flex:1;
background-color:#333;
`;

export const Container = styled.KeyboardAvoidingView`
flex:1;
align-items:center;
justify-content:center;
`;

export const Logo = styled.Image`
margin-bottom:15px;
`;

export const AreaInput = styled.View`
flex-direction:row;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: "rgba(255,255,255,0.20)"
})`
width:90%;
padding:10px;
font-size:17px;
margin-bottom:15px;
background:rgba(0,0,0,0.20);
border-radius:7px;
color:#FFF ;

`;

export const SubmitButton = styled.TouchableOpacity`
align-items:center;
justify-content:center;
background-color:#00b94a;
width:90%;
height:45px;
margin-Top:5px;
border-radius:7px;
`;

export const SubmitButtonText = styled.Text`
font-size:20px;
color:#333; 
`;

export const Link = styled.TouchableOpacity`
margin-top:30px;
margin-bottom:9px;
`;

export const LinkText = styled.Text`
font-size:15px;
color:#FFF; 
`;



