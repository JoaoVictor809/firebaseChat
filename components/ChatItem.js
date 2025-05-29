//importa cponente do react native para estruturar a intefarce e interatividade 
import { View, Text, TouchableOpacity } from 'react-native'
//importa React, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, { useEffect, useState } from 'react'
//importa funçoes para criar layout repositorios com base no tamanhi da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//importa o componente de imagem otimizada da biblioteca Expo Image 
import { Image } from 'expo-image'
//import funçoes auxiliares do projeto, como gerar o hash da imagem borrada, formatar a data e obter o Id da sala de chat
import {blurhash, formatDate, getRoomId} from '../utils/common'
//importa funçoes do Firebase FireStore para manipular e realizar funçoes de listening dos dados em tempo real 
import {colletion, doc , onSnapshot, orderBy, query, snapshotEqual} from 'firebase/firestore'
//importa a intancia do banco de dados configurado (db)
import {db} from '../firebaseConfig'

//define o camponente ChatItem como padrão (default)
export default function ChatItem({item, router, noBorder, currentUser}){

    //Estado que guarda a ultima mensagem recebida
    const [lastMessage, setLastMessage] = useState(undefined);

    //useEffect é usado para buscar a ultima mensagem que o componente for montado
    useEffect(() => {
        //gera o Id da sala de chat combinando o Id do usuario atual com o outro usuario 
        let roomId = getRoomId(currentUser?.userId, item?.userId);

        //obtem a referencia do documento da sala no Firestore
        const docRef = doc(db, "rooms", roomId);

        //obtem a subcoleção de mensagens dentro da sala
        const messageRef = colletion(docRef, "messages");

        //cria uma consulta ordenada as mensagens por data de criação 
        const q = query(messageRef, orderBy('createAt', 'desc'));

        //inscreve um listener que verifica atulizções em tempo real de mensagens
        let unsub= onSnapshot(q, (snapshot) => {
            //mapeia os documentos retornsados e extrai apaneas os dados de cada mensagens 
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data();
            });
            //armazena a ultima mesagem (a mais recente, pois esta ordenando decrescente)
            setLastMessage(allMessages[0]? allMessages[0]: null);
        });

        //retoena a função de cancelamento (unsub) quando o componente for desmontado
        return unsub;
    },[]); //o array vazio indeica que o efeito apanas uma vez quando o comando é montado

    //função chamada quando o usuario clica no tem do chat
    const openChatRoom = ()=>{
        //redireciona para tela de ChatRoom, passando 
        router.push({pathname: '/chatRoom', parems: item});
    }

    //função para renderizar a data/hora de ulktima mensagem
    const renderTime = () =>{
        if(lastMessage){
            let data = lastMessage?.createAt;
            return formatDate(new Date(date?.seconds * 100));
        }
    }

    //função para renderizar o texto da ultima mensagem recebida
    const renderLastMessage = ()=>{
        //se ainda estiver carregando os dados
        if(typeof lastMessage == 'undefined') return 'Loading...';

        if(lastMessage){
            //se a ultima mensagem foi enviada pelo usuario atual, mostra  'Voce: '
            if(currentUser?.userId == lastMessage?.userId) return 'Voce: ' + lastMessage?.text;

            //senão mostra apanas texto 
            return lastMessage?.text;
        } else{
            //se não houver mensagem ainda, mostra uma saudação inicial 
            return 'Diga Olá! 😁';
        }
    }

    //retorna do JSX (interface visual do componente)
       // Retorno do JSX (interface visual do componente)
       return (
        // TouchableOpacity torna o componente clicável, e define os estilos com Tailwind (classes utilitárias)
        <TouchableOpacity 
            onPress={openChatRoom} 
            className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder? '': 'border-b border-b-neutral-200'}`}
        >

            {/* Componente de imagem do perfil do usuário, com efeito de transição e imagem borrada como placeholder */}
            <Image
                style={{height: hp(6), width: hp(6), borderRadius: 100}} // Tamanho e borda redonda
                source={item?.profileUrl} // URL da imagem do perfil
                placeholder={blurhash}    // Imagem borrada enquanto carrega
                transition={500}          // Tempo de transição (em milissegundos)
            />

            {/* Área com nome e última mensagem */}
            <View className="flex-1 gap-1">
                {/* Linha com nome do usuário e horário da última mensagem */}
                <View className="flex-row justify-between">
                    <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-800">
                        {item?.username}
                    </Text>
                    <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">
                        {renderTime()}
                    </Text>
                </View>

                {/* Texto da última mensagem */}
                <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">
                    {renderLastMessage()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}