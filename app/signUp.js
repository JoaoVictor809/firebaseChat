//importa cponente do react native para estruturar a intefarce e interatividade 
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
//importa React, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, { useState } from 'react'
//importa funçoes para criar layout repositorios com base no tamanhi da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//importa o componente Status para controlar a barra de status
import { StatusBar } from 'expo-status-bar'
//importa icones do pacote expo, como icone de email e cadeado para o input de senha 
import { Octicons, Feather } from '@expo/vector-icons'
//importa o hook de navegação de expo-router para navegação entre telas 
import { useRouter } from 'expo-router'
//importa componentes personalizados, como o carregamento e o gerenciamento de teclado customizado
import Loading from '../components/Loading'
import CustomKeyboardView from '../components/CustomKeyboardView'
//importa o contexto de auternticação para gerenciar o login 
import { useAuth } from '../context/authContext';

export default function signUp() {
    //inicializa o router para navegação
    const router = useRouter();
    ////extrai a funçãoi register do contexto de autenticação
    const { register } = useAuth();
    //estado para controlar o indicador de carregamento 
    const { loading, setLoading } = useState(false);

    //Estados para gerenciar todos os campos do formulario em um unico objeto
    //Isso facilita a atualização e o envio dos dados
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        profile: ''
    });

    //função generica para atualizar campo de usuario(apenas o campo que esta criando)
    //usa computação do nome de propiedade para atualizar o campo especifico
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev, //matem os valores anteriores
            [field]: value //atualiza apenas o campo desejado
        }));
    };
    //validação completa do formulario antes de enviar os dados 
    const validateForm = () => {
        //verifica se todos os campos estão preenchidos 
        if (!formData.email || !formData.password || !formData.username || !formData.profile) {
            Alert.alert('Sign Up', "Por favor preencha os campos");
            return false;
        }
        //validação de formato de email usando expressão regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Sign Up', "Por favor insira um email válido");
            return false;
        }

        //verifica requisito minimo de segurança para a senha 
        if (formData.password.length < 6) {
            Alert.alert('Sign Up', "A senha deve ter pelo menos 6 caracteres");
            return false;
        }
        return true; //retorna true apenas se todos as validações passarem 
    };

}