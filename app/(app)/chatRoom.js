//importa cponente do react native para estruturar a intefarce e interatividade 
import { View, Text,TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
//importa React, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, { useEffect, useState, useRef } from 'react';
//importa hooks do 'expo router' para parametros de navegação e manipular rotas 
import {useLocalSearchParams, useRouter} from 'expo-router';
//importa o componente Status para controlar a barra de status
import { StatusBar } from 'expo-status-bar';
//importa componentes personalizados usados na tela do chat
import ChatRoomHeader from '../../components/ChatRoomHeader'; //cabeçalho personalizado da sala de chat
import MessageList from '../../components/MessageList'; //componente para listar mensagem
//importa funçoes para criar layout repositorios com base no tamanhi da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//importa o ícone 'send' da biblioteca Feather Icons, utilizado no botão de envio de mensagem
import { Feather } from '@expo/vector-icons';
//componente que ajusta a interface do teclado
import CustomKeyboardView from '../../components/CustomKeyboardView';
//importa o contexto de auternticação para gerenciar o login 
import { useAuth } from '../context/authContext';
//importa uma função utilizada  que retorna um id de sala único base usuarios envolvidos 
import { getRoomId } from'../../utils/common';
//importa dunçoes de firebase firestore para buscar documento e atualizar consultas, para lidar com banco de dados 
import {Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc} from 'firebase/firestore';
//importa a configuração do FireBase para acessar o banco de dados 
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
    //Pega os parametros de navegação, neste caso, o suario com que o chat esta acontecendo
    const item = useLocalSearchParams(); //segundop usuario
    //Acessa o usuario logado atraves do contexto de autenticação 
    const {user} = useState(); //usuario logado 
    const router = useRouter(); //hook que permite navegação programatico
    //Estado para armazenar as mensagens do chat
    const [menssages, setMessages] = useState([]);
    //refencias para armazenar o texto de mensagem, o campo de input, e a lista de mensagem
    const textRef = useRef(''); //armazena o conteudo digitado palo usuario
    const input = useRef(null); //referencia para o campo de input (caixa de texto)
    const scrollViewRef = useRef(null); //referencia para scrollView (lista de mensagem)

    //useEffect que é exuctado ao carregar o componente, inicializando o chat e configurando a listagem para novas mensagens
    useEffect(() => {
        createRoomIfNotExists() //cria a sala de chat se ela não existir 

        //gerar o Id único para sala com base no id dos dois usuarios 
        let roomId = getRoomId(user?.userId, item?.userId);
        //refere-se ao documento da sala no Firestore
        const docRef = doc(db, "rooms", roomId);
        ////refere-se á coleção de mensagens dentro dessa sala 
        const messagesRef = collection(docRef, "messages");
        //cria uma query ordenar as mensagens por data da criação (ascendente)
        const q = query(messagesRef, orderBy('createAt', 'asc'));

        //Listener em tempo real para atualizações na coleção de mensagens 
        let unsub = onSnapshot(q, (snapshot)=>{
            //mapea os documentos retornados para extarir os dados de cada mensagem
            let allMessages = snapshot.doc.map(doc=>{
                return doc.data();
            });
            //atualiza o estado com novas mensagens 
            setMessages([...allMessages]);
        });

        //adiciona um listener para eventos de exibição do teclado, e atuliza a lista de mensagem
        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        //Cleanup : remove o listener de mensagem e do teclado ao desmontar o componente 
        return ()=>{
            unsub();
            KeyboardDidShowListener.remove();
        }
    },[]);

    //useEffect que é 
    useEffect(() =>{
        updateScrollView();
    }, [menssages])

    //função que rola a lista de mensagens para o final quando uma nova mensagens é adicionada ou o teclado aparece
    const upadateScrollView = ()=>{
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true}) //rola lista de mensagens até o fim
        },100)
    }

    //função que cria a sala de chat no firestore se ela ainda não existir 
    const createRoomIfNotExists = async () => {
        //Gera um Id unico para a sala com base nos dois usuarios 
        let roomId = getRoomId(user?.userId, item?.userId);
        //Crie um documento na coleção 'rooms' com o id da sala e a dara de criação
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }
    //função para eviar uma nova mensagem
    const handleSendMessage = async ()=>{
        if(!message) return; 
        try{
            //gera td da sala 
            let roomId = getRoomId(user?.userId, item?.userId);
            //refere-se ao documento de sala no firebase
            const docRef = doc(db, 'rooms', roomId);
            //refere-se a coleção de mensagens dessa sala
            const messagesRef = collection(docRef, "messages");
            //limpa o campo de texto
            textRef.current = "";
            if(inputRef) inputRef?.current?.clear();
            //add a nova mesagem a coleção
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });

            //console.log('new message id: ', newDoc.id);
        } catch(err) {
            //mostra um alerta caso ocorre 
            Alert.alert('Message', err.message);
        }
    }
    
}