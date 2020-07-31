import styled from 'styled-components';

export const Background = styled.View`
flex:1;
background-color:#131313;

`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor:"#222"
})`
height:50px;
width:90%;
font-size:17px;
margin-top:15px;
padding:5px;
margin-bottom:10px;
background-color:rgba(255,255,255,0.7);
`;

export const SubmitButton = styled.TouchableOpacity`
height:50px;
width:90%;
justify-content:center;
align-items:center;
border-radius:5px;
background-color:#00b94a;

`;

export const SubmitButtonText = styled.Text`
font-size:17px;

`;