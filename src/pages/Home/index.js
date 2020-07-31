import React,{useContext,useState,useEffect} from 'react';
import {AuthContext} from '../../contexts/auth';
import {Alert,TouchableOpacity,Platform} from 'react-native'
import Header from '../../components/Header';
import firebase from '../../service/firebaseConnection';
import {Background,Container,Nome,Saldo,Title,List,Area} from './styles';
import HistoricoList from '../../components/HistoricoList';
import {format,isBefore} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';
export default function Home(){
    const {user, signOut} = useContext(AuthContext);
    const [historico, setHistorico] = useState([]);
    const [saldo,setSaldo] = useState(0);
    const uid = user.uid;

    const [show,setShow] = useState(false);
    const [newDate,setNewDate] = useState(new Date());

    //Obejtivo da função:
    /*
    Pegar o saldo no firebase e atualiza-lo no app
    Pegar as 10 transações da data atual, pegando o velho e o novo
    */
    useEffect(()=>{
        async function loadSaldo(){
            await firebase.database().ref('user').child(uid).on('value',(snapshot)=>{
                setSaldo(snapshot.val().saldo);
            })  ;
        
            //Pegar o historico e orderar de acordo com uma data expecificada
            await firebase.database().ref('historico')
            .child(uid)
            .orderByChild('date').equalTo(format(newDate,'dd/MM/yyyy'))
            .limitToLast(10)
            .on('value',(snapshot)=>{
                //É necessário fazer a limpeza para não duplicar
                setHistorico([]);
                snapshot.forEach((childItem)=>{

                    let dados = {
                        key:childItem.key,
                        tipo:childItem.val().tipo,
                        valor:childItem.val().valor,
                        date:childItem.val().date,
                    }
                    //Pega o array antigo e adiciona o novo
                    setHistorico(oldArray => [...oldArray,dados].reverse());
                })
            })
    }
        loadSaldo();
    },[newDate])

    //Obejtivo da função:
    /*
    Verificar se a operação foi feita na data atual
    
    */
    function handleDelete(data){
        //Pegar e formatar data do item
        const [diaItem,mesItem,anoItem] = data.date.split('/');
        const dataItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

        //Pegar Data de hoje
        const formatData = format(new Date(),'dd/MM/yyyy')
        const [diaHoje,mesHoje,anoHoje] = formatData.split('/');
        const dataHoje = new Date(`${diaHoje}/${mesHoje}/${anoHoje}`);

        
        if(isBefore(dataItem,dataHoje)){
            alert('Operação Inválida, Você não pode excluir esta operação!')
            return;
        }
        Alert.alert(
            'Cuidado Atenção',
            `Tem Certeza que quer excluir 
            Tipo:${data.tipo} 
            Valor:${data.valor}
            `,
            [
                {
                    text:'Cancelar',
                    style:'cancel',
                },
                {
                    text:'Confirmar',
                    onPress:()=>handleDeleteSucess(data),
                }
            ]
        )


    }
    
    //Obejtivo da função:
    /*
    Remover a operação
    Atualizar o saldo
    */
    async function handleDeleteSucess(data){
        let saldoAtual = saldo;
        data.tipo === 'receita' 
        ? saldoAtual-= parseFloat(data.valor) 
        : saldoAtual+=parseFloat(data.valor)

        await firebase.database().ref('historico').child(uid).child(data.key).remove()
        .then(async ()=>{
            await firebase.database().ref('user').child(uid).child('saldo').set(saldoAtual)
        })


        
    }
    function handleShowPicker(){
        setShow(true);
    }
    function handleClose(){
        setShow(false);
    }
    function onChange(date){
        setShow(Platform.OS === 'ios');
        setNewDate(date);
    }
    return(
        <Background>
            <Header/>
            <Container>
            <Nome>{user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2)}</Saldo>
            </Container>
            
            <Area>
            <TouchableOpacity onPress={handleShowPicker}>
                <Icon size={30} color="#FFF" name="event" />
            </TouchableOpacity>
            <Title>Últimas Movimentações</Title>
            </Area>
            
            <List
            showsVerticalScrollIndicator={false}
            data={historico}
            keyExtractor={item=>item.key}
            renderItem={({item})=>(<HistoricoList data={item} deleteItem={handleDelete} />)}
            />

            {show &&(
                <DatePicker
                onClose={handleClose}
                date={newDate}
                onChange={onChange}

                />
            )}
        </Background>
    )
}