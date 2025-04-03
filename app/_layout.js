//importa componentes essenciais do react native para estruturaçção da interface do usuario
import { View, Text } from "react-native";

//importa o react e o hock useEffect para gerenciar efeitos colaterais no ciclo de vida do componente
import React, {useEffect} from 'react'

//importa slot para renderizado do conteudo atual, useRouter para navegação e useSegments para moniutorar segmento de rota
import { Slot, useRouter, useSegments } from "expo-router";

//importar o arquivo de estilo CSS para estilizar o app
import '../globaqsl.css'
//importa o contexto da autentiicação e do provider para gerenciar o estado da autenticação do aplicativo 
import {AuthContextProvider, useAuth} from '../context/authContext'

//importa o menu provider para o fornecedor suporte a menus pop-up em todo app
import { MenuProvider } from 'react-native-popup-menu'

//componente principal que gerencia a navegação e autenticação do usuario
const MainLayout = () => {
    //obtem o estaso da autenticação do usuario a partir do contexto da autenticação
    const {isAuthenticated} = useAuth();
    //obtem o segmento rota atuais 
    const segments = useSegments();
    //para navegação entre rotas
    const router = useRouter();

    //useEffect que é executado sempre que o estado muda
    useEffect(() =>{
        //verifica se estado de autenticação está indefinido
        if(typeof isAuthenticated =='undefined') return;

        //verifica se o usuario esta em uma roda dentro da aplicção (app)
        const inApp = segments[0] == '(app)';

        //se o usuario está autenticado e não esta dentro de uma rota dentro da aplicção, redireciona para rota 'home'
        if (isAuthenticated && !inApp){
            router.replace('home');
        }

        //se o usuario não estiver autenticado redireciona para rota de login 
        else if(isAuthenticated==false){
            router.replace('singIn');
        }

    }, {isAuthenticated}) ////hook é executado nobvamente se 'isAuthenticated' mudar

    //retorna o Slot, que renderiza a rota ativa com base no roteamento do Expo Router
    return <Slot />
}

//componente raiz que envolve o app com provedores de cotexto
export default function RootLayout(){
    return(
        //MenuProvider oferece suporte a menus pop-up em todo o aplicativo

        <MenuProvider>
            {/*AuthContextProvider oferece o contexto da autenticação para todo o app */}
            <AuthContextProvider>
                {/* MainLayout oferece contexto de autenticação para todo o app */}
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}