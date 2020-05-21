import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Button,
    TextInput,
    Image,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Platform,
    Alert,
    AsyncStorage
} from 'react-native'
import FormInput from '../components/FormInput'
import Language from '../languages/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import Api from '../services/api'


class Home extends Component {

    state = {
        value: '',
        scroll: false
    }


    //OBJETO DATA NA QUAL É PARAMETRO PARA A CRIAÇÃO DO FORMINPUT
    data = [
        {
            icon: 'folder-open',
            key: 'Nº Sinistro',
            value: ''
        },
        {
            icon: 'user',
            key: 'Segurado',
            value: ''
        },
        {
            icon: 'user',
            key: 'Notificante',
            value: ''
        },
        {
            icon: 'user',
            key: 'Sinistrado',
            value: ''
        },
        {
            icon: 'id-card',
            key: 'CPF Segurado',
            value: ''
        },
        {
            icon: 'id-card',
            key: 'CPF Notificante',
            value: ''
        },
        {
            icon: 'id-card',
            key: 'CPF Sinistrado',
            value: ''
        },
        {
            icon: 'at',
            key: 'E-mail',
            value: ''
        },
        {
            icon: 'phone',
            key: 'Contato',
            value: ''
        },
        {
            icon: 'clipboard',
            key: 'Cobertura',
            value: ''
        },
        {
            icon: 'clipboard',
            key: 'Apólice',
            value: ''
        },
        {
            icon: '',
            key: '',
            value: ''
        }
    ]

    

    componentDidMount = async () => {
        try{
            const record = await AsyncStorage.getItem('record')

            const response = await Api.get(`/documento/${record}`)

            //SETA OS VALORES APÓS A CRIAÇÃO DO OBJETO DATA
            this.data[0].value = response.data[0].num_sinistro
            this.data[1].value = response.data[0].nome_segurado
            this.data[2].value = response.data[0].nome_notificante
            this.data[3].value = response.data[0].nome_sinistrado
            this.data[4].value = response.data[0].cpf_segurado
            this.data[5].value = response.data[0].cpf_notificante
            this.data[6].value = response.data[0].cpf_sinistrado
            this.data[7].value = response.data[0].email_notificante
            this.data[8].value = response.data[0].telefone
            this.data[9].value = response.data[0].cobertura_reclamada
            this.data[10].value = response.data[0].apolice


        }catch (e){
            Alert.alert('ERRO 1046', `Erro causado: ${e}`)
        }
        
    }
   

    _onRefresh = () => {

        this.componentDidMount.call(this)
                
        this.setState({refreshing: true})
        const reload = true
        if (reload){
            this.setState({refreshing: false})   
        }
    }

    listaDocumento = () => {
        this.props.navigation.navigate('ListaDocumentos')
    }
    
    finalLista = () => {
        this.setState({scroll: true})
    }
    

    render () {

        return (
            <View style={styles.container}>
                <Image
                style={styles.logo}
                source={require('../../assets/img/santander-logo-2.png')}
                />
                <Text style={styles.welcome}>{Language.welcome}</Text>
                <Text style={styles.you}>{Language.welcomerTwo}</Text>
                <FlatList
                    onEndReached={this.finalLista}
                    showsVerticalScrollIndicator={false}
                    refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }
                    data={this.data}
                    renderItem={({item}) =>  <FormInput icon={item.icon}
                                                        textinput={item.key}
                                                        editable={false}
                                                        placeholder={item.key} 
                                                        style={styles.input} 
                                                        value={item.value} 
                                                        text="ENTROU"/>}

                />
                { this.state.scroll === false ? <Icon name='angle-down' size={20}></Icon> : <Icon name='angle-up' size={20}></Icon>}
                
                <TouchableOpacity onPress={this.listaDocumento} style={styles.buttom}>
                    <Text style={styles.buttomText}>DOCUMENTOS</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'OpenSans-Regular',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    },
    welcome: {
        paddingBottom: 5,
        fontSize: 18,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
    },
    you: {
        fontSize: 18,
        fontFamily: 'OpenSans-Regular',
    },
    input: {
        fontFamily: 'OpenSans-Regular',
        marginTop: 30,
        width: Platform.OS === 'ios' ? 350 : 400,
        bottom: 10
    },
    buttom: {
        marginTop: Platform.OS === 'ios' ? 40 : 60,
        padding: 10,
        borderRadius: 3,
        borderWidth: 0.9,
        width: '90%',
        backgroundColor: '#FFF',
        borderColor: '#c00',
        marginBottom: 40
    },
    buttomText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#c00',
        alignItems: 'flex-end'
    },
})

export default Home