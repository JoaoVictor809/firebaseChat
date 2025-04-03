//importa cponente do react native para estruturar a intefarce e interatividade 
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
//importa React, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, {  useState } from 'react'
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