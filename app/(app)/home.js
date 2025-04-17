//importa cponente do react native para estruturar a intefarce e interatividade 
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
//importa React, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, { useEffect, useState } from 'react'
//importa o contexto de auternticação para gerenciar o login 
import { useAuth } from '../context/authContext';
//importa o componente Status para controlar a barra de status
import { StatusBar } from 'expo-status-bar'
//importa funçoes para criar layout repositorios com base no tamanhi da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//importa um comnente personalizada que renderiza a lista de chats disponiveis
import ChatList from '../../components/ChatList';
//importa um componete o carregamento personalizado 
import Loading from '../../components/Loading';
//importa dunçoes de firebase firestore para buscar documento e atualizar consultas 
import {getDocs, query, where} from 'firebase/firestore' 
//referencia a coleção de usuario no firebase configurada no arquivo firebaseconfig
import {usersRef} from '../../firebaseConfig';

export default function Home(){
    //Dessestrutura funçoes e dados do contexto de autenticação
    //'logout' : função para deslogar o usuario 
    //'user' : dados do usuario atualmente 
    const {logout, user} = useAuth();

    //estado local para armazenar a lista de usuarios que serão exibidos na lista de chats 
    const [users, setUsers] = useState([]);

    //hook useEffect que é executado quando o componente é montado
    //verifica se o ID usuario está disponivel e então chama a função para buscar os outros usuarios
    useEffect(() => {
        if(user?.uid)
        getUsers();
    }, [])

    //função assincrona para buscar os outros usuarios no firebase, exeto o suario logado
    const getUsers = async () => {
        //cria uma query para buscar todos os usrarios cujo 'userId' seja diferente do ID do usuario logado
        const q = query(usersRef, where('userId', '!=', user?.uid));

        //executa a query no Firebase e obtem os documentos  correspondentes 
        const querySnapshot = await getDocs(q);
        //array temporario para armazenar ps dados dos usuarios 
        let data = [];
        //intera sobre cada documento retornando e extrai os dados
        querySnapshot.forEach(doc=>{
            data.push({...doc.data()});
        });

        //atualiza o estado com a lista de usuario 
        setUsers(data);
    }
    return(
        // View principal que define a estrutura visual da tela Home
    <View className="flex-1 bg-white">
    {/* Configura a barra de status com um tema claro */}
    <StatusBar style="light" />

    {
      // Se a lista de usuários não estiver vazia, renderiza o componente ChatList com a lista de usuários
      users.length>0? (
          <ChatList currentUser={user} users={users} />
      ) : (
          // Caso contrário, exibe um indicador de carregamento enquanto a lista de usuários é buscada
          <View className="flex items-center" style={{top: hp(30)}}>
              {/* Exibe um spinner de carregamento (ActivityIndicator) */}
              <ActivityIndicator size="large" />
              {/* <Loading size={hp(10)} /> */}
              {/* Comentado: Loading é um componente customizado que poderia ser usado para exibir animação de carregamento */}
          </View>
      )
    }
    
  </View>
    )
}

