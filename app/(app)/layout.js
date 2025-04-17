//importa os componentes Viewl e Text da biblioteca 'react-native', que são fundamentais para criar intefaces no
//React Native 
import {View, Text} from 'react-native'
//importa o modulo React, que é necessario para construir componentes funcionais no React Native
import React from 'react'
//importa o componente Stack da biblioteca 'expo-router', que é responssavel por gerenciar a navegação entre telas
//no aplicatvo 
import { Stack } from 'expo-router'
//importa o componente personalizado HomeHeader do dirétorio de componentes, que será utilizado como cabeçalho na
//tela inicial do aplicativo 
import HomeHeader from '../../components/HomeHeader'

//define a função _layout que é esportada como padrão. Esta função representa a estrutura principal de layout da 
//aplicação
export default function _layout(){
    return(
        //o componente Stack organiza as telas em uma pilha de navegação
        //isso permite alterar entre diferentes telas dentro da aplicação, mantendo o historico de navegaçãp
        <Stack>
        {/*Define uma nova tela dentro da pilha de navegação.
    A tela é chamada de 'home' e possui uma configuração personalizada para o cabeçalho  */}
    <Stack.Screen 
    name="home" //nome da tela, que pode ser usada para referencia em outras partes do codigo, como navegação
    option={{
        //o header da tela é personalizado para usar o componente HomeHeader em vez do cabeçalho padrão,
        //isso permite um controle completo sobre o design e compoetamento do cabeçalho.
        header: () => <HomeHeader/>
    }}
    />
        </Stack>
    )
} 