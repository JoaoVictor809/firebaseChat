//importação de componentes basicos do react natives
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
//importação do react
import React from 'react'

//detecta ase o dispositivo esta rodando ios
//esta verificação é importante porque o comportamento do teclado é diferenbte do ios do android
const ios = Platform.OS == 'ios';

/**
 * Componentes CustomKeyboadView
 * 
 * Este componente resolve o problema comum do teclado virtual sombrepondo elementos da interface
 * envolvendo o conteudo em um KeyboardAvoidingView e ScrollView para garantir que o usuario
 * possa acessar todos os elementos memso quando o teclado está fechado
 * 
 * @param {React.ReactNode} childrem -Componentes filhos a serem renderizados dentro do CustomKeyboardView
 * @param {boolean} inChan -Flag que inicia se o coponente esta sendo usado na tela de chat 
 *                          o que requer configuração especifica 
 * @returns {JSX.Element} Componente que ajusta a visibilidade para lidar com o teclado
 */

export default function CustomKeyboardView({childrem, inChan}){
    //configuraçoes condicionais baseadas no contexto de uso (chat ou outros telas)
    let KavConfig = {};
    let ScrollViewConfig = {};

    //Aplica configuraçoes especificas 
    if(inChan){
        //adiciona deslocamento vertical para o teclado na tela de chat
        //isso evita que o teclado cubra a caixa de texto de entrada de mensagem
        KavConfig = {keyboardVerticalOffset:90};

        //define flex:1 para garantir que o ScrollView ocupe tudo o espaço disponivel
        //importa para que o conteudo senja corretamente posicionado na tela de chat
        ScrollViewConfig = {contentContainerStyle: {flex: 1}};
    }
    return(
        // KeyboardAvoidingView é um componente que automaticamente ajusta seu height/position
        // quando o teclado aparece para evitar que ele cubra os inputs
        <KeyboardAvoidingView
            // Define comportamentos diferentes para iOS e Android:
            // - 'padding' (iOS): adiciona padding na parte inferior igual à altura do teclado
            // - 'height' (Android): altera a altura do componente para acomodar o teclado
            behavior={ios? 'padding': 'height'}
            // flex: 1 faz com que o componente ocupe todo o espaço disponível
            style={{flex: 1}}
            // Aplica as configurações adicionais se estiver na tela de chat
            {...kavConfig}
        >
            {/* 
            ScrollView permite que o conteúdo seja rolável
            Isso é essencial para formulários longos ou quando o teclado reduz
            o espaço disponível na tela
            */}
            <ScrollView
                // flex: 1 faz com que o ScrollView ocupe todo o espaço disponível
                style={{flex: 1}}
                // Desativa o efeito de "bounce" ao rolar além dos limites do conteúdo
                bounces={false}
                // Oculta a barra de rolagem vertical para uma interface mais limpa
                showsVerticalScrollIndicator={false}
                // Aplica as configurações adicionais se estiver na tela de chat
                {...scrollViewConfig}
            >
                {/* 
                Renderiza os componentes filhos passados para CustomKeyboardView
                Mantém a estrutura hierárquica da interface
                */}
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    );
}