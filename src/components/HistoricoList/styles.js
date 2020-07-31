import styled from 'styled-components';

export const Container = styled.View`
margin-bottom:5px;
background-color:rgba(0,0,0,0.02);
box-shadow:2px 2px rgba(0,0,0,0.40);
padding:10px;
`;

export const Tipo = styled.View`
flex-direction:row;`;

export const IconView = styled.View`
flex-direction:row;
padding-left:8px;
padding-right:8px;
padding-top:5px;
padding-bottom:5px;
margin-bottom:3px;
border-radius:10px;
background-color:${props => props.tipo === 'receita' ? "#00b94a" : "#c62c36"};`;

export const TipoText = styled.Text`
margin-left:5px;
font-size:16px;
font-style:italic;
`;

export const ValorText = styled.Text`
font-size:18px;
font-weight:bold;
color:#131313

`;


