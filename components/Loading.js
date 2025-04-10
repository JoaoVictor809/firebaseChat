//importação de componentes basicos do react natives
import { View, Text } from 'react-native'
//importação do react
import React from 'react'
//importação da biblioteca lottie para animações
//Lottie permite usar animaçoes JSON criando no figma/ after Effects
import LottieView from 'lottie-react-native';


/** 
*Componetes Loading
* Este compionete redenriza uma animação de carregamento usando lottie
*
* @param {number} size - Tamanho do indicador de carregam,ento(altura em unidade de medida do React Native)
* @returns {JSX.Element} componente de Loading com animação 
*/
export default function Loading({ size }) {
    return (
        //container que envolve a animação
        //usa a propiedade siza para definir a altura
        //aspectRadio 1 garante que o comnente seja um quadrado perfeito
        <View style={{ height: size, aspectRatio: 1 }}>
            {/*
            Componente Lottieview que exibe a animação
            -style={{flex:1}} faz com que animação ocupe todo espço dispnivel do container
            -source carrega o arquivo JSOn da animação da pasta assets/images
            -autoplay inicia a animação automatica quando o componente é montado
            -loop faz com que animação se repita indefinidamente 
            */}
            <LottieView style={{ flex: 1 }} source={require('../assets/images/loading.json')} autoPlay loop />
        </View>
    )
}