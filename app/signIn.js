//importa cponente do react native para estruturar a intefarce e interatividade 
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
//importa React, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, { useRef, useState } from 'react'
//importa funçoes para criar layout repositorios com base no tamanhi da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//importa o componente Status para controlar a barra de status
import { StatusBar } from 'expo-status-bar'
//importa icones do pacote expo, como icone de email e cadeado para o input de senha 
import { Octicons } from '@expo/vector-icons'
//importa o hook de navegação de expo-router para navegação entre telas 
import { useRouter } from 'expo-router'
//importa componentes personalizados, como o carregamento e o gerenciamento de teclado customizado
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView'
//importa o contexto de auternticação para gerenciar o login 
import { useAuth } from '../context/authContext';

//função de componente para tela de login
export default function SignIn() {
    //hook de navegação para redirecionar o usuario apos o login
    const router = useRouter();
    //useState para gerenciar o estado de carregamento(loading) enquando o login é processado
    const [loading, setLoading] = useState(false);
    //hook do contexto de autenticação, que inclui a função de login
    const { login } = useAuth();

    //useRef cria referencias para os inputs de email e senha 
    const emailRef = useRef("");
    const passwordRef = useRef("");


    //Função que lida com o processo de login 
    const heandleLogin = async () => {
        //verifica se os campos de email e senha estão preenchidos 
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "Por favor, preencha todos os campos");
            return;
        }

        //ativa o estado de crregamento e renta fazer o login com os dados fornecidos
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);

        //se o login falhar, exibe uma menssagem de erro
        if (!response.sucess) {
            Alert.alert('Sign In', response.msg);
        }
    }
    return (
        //View customizada para ajustar o layout do teclado ao campo de entrada de texto
        <CustomKeyboardView>
            {/*Statusbar para configurar o estilo da barra de status */}
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex gap-12">
                {/*Exibe uma imagem de login no topo da tela*/}
                <View className="items-center">
                <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.png')} />
                </View>
            </View>

            {/*Container dos campos de entrada e botoes*/}
            <View className="gap-10">
                {/*titulo da tela de login */}
                <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">
                    Sign In
                </Text>

                {/*Campos de entrada com email e senha */}
                <View className="gap-4">
                    {/*Campo de entrada de email*/}
                    <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-x1">
                        <Octicons name="mail" size={hp(2.7)} color="gray" />
                        <TextInput
                            onChangeText={value => emailRef.current = value}
                            style={{ fontSize: hp(2) }}
                            className="flex-1 font-semibold text-neutral-700"
                            placeholder='E-mail'
                            placeholderTextColor={'gray'}
                        />
                    </View>
                </View>

                {/*Campo de entrada de senha*/}
                <View className="gap-3">
                    <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-x1">
                        <Octicons name="lock" size={hp(2.7)} color="gray" />
                        <TextInput
                            onChangeText={value => passwordRef.current = value}
                            style={{ fontSize: hp(2) }}
                            className="flex-1 font-semibold text-neutral-700"
                            placeholder='Senha'
                            secureTextEntry
                            placeholderTextColor={'gray'}
                        />
                    </View>
                    {/**Link para a funcionalidade de "esqueci a senha" */}
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">
                        Esqueceu a senha?
                    </Text>
                </View>

                {/* Botão de envio do formulario de login */}
                <View>
                    {
                        loading ? (
                            <View className="flex-row justify-center">
                                <Loading size={hp(6.5)} />
                            </View>
                        ) : (
                            <TouchableOpacity onPress={heandleLogin} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-x1 justify-center items-center">
                                <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                {/*Texto para redirecionar para a tela de registro */}
                <View className="flex-row justify-center">
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">
                        Não tem uma conta?
                    </Text>
                    <Pressable onPress={() => router.push('signUp')}>
                        <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">
                            Sign Up
                        </Text>
                    </Pressable>
                </View>
            </View>
        </CustomKeyboardView>
    )
}

