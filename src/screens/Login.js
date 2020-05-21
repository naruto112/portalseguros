import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    AsyncStorage,
    ActivityIndicator,
    Keyboard
} from 'react-native'
import LoginInput from '../components/LoginInput'
import Language from '../languages/pt-br'
import Api from '../services/api'



class Login extends Component {
    state = {
        sinistro: '2020-71-28140-0',
        load: false
    }

    loginSinistro = async () => {

        if(this.state.sinistro === ''){
            Alert.alert('AVISO', 'Digite o número de seu sinistro')
            return false
        }

        Keyboard.dismiss()

        this.setState({ load: true })

        const response = await Api.get(`/login/sinistro/${this.state.sinistro}`)

        if(response.data.status){

            try{
                await AsyncStorage.setItem('record', response.data.record)
                
                this.props.navigation.navigate('Home')

                this.setState({ load: false })

            }catch (e) {
                this.setState({ load: false })

                Alert.alert('ERRO 1045', `CAUSA: ${e} `)
            }

        }else{

            this.setState({ load: false })

            Alert.alert('AVISO', 'Sinistro não encontrado ou não existente')

        }
    }
    

    render () {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/img/santander-logo-2.png')}
                />
                <LoginInput 
                    icon='folder-open'
                    placeholder={Language.numSinistro} 
                    style={styles.input}
                    onChangeText={sinistro => this.setState({ sinistro })}
                    value={this.state.sinistro}/>

                <TouchableOpacity onPress={this.loginSinistro} style={styles.buttom}>
                    <Text style={styles.buttomText}>{Language.buttonLogin}</Text>
                </TouchableOpacity>
                <ActivityIndicator animating={this.state.load} size={70} color="#c00" style={styles.loading}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: Platform.OS === 'ios'? 160 : 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        borderRadius: 2,
        width: '90%',
        backgroundColor: '#585858'
    },
    buttonRegister: {
        marginTop: 20,
        color: '#a0a2a2',
    },
    buttomText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFF',
        alignItems: 'flex-end'
    },
    input: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    },
    loading: {
      marginTop: 50  
    }
})


export default Login