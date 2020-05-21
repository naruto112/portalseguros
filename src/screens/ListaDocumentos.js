import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker'
import Language from '../languages/pt-br'
import Api from '../services/api'


class ListaDocumentos extends Component {

    state = {
        upload_img: false,
        upload_btn: false,
        upload: false,
        image: null,
        numeric: 0,
        doc: '',
        status: '',
        next: true,
        load: false
    }


    componentDidMount = async () => {

        try{

            const record = await AsyncStorage.getItem('record')

            const response = await Api.get(`/documentomobile/${record}`)  

            const array_doc    = []
            const array_noteid = []
            const array_status = []

            response.data.map((item) => {
                
                array_doc.push(item.tipo_doc)
                array_noteid.push(item.noteid)
                array_status.push(item.status_evento)
    
            })

            this.setState({ 
                            doc: array_doc, 
                            noteid: array_noteid, 
                            ticketid: response.data[0].ticketid,
                            status: array_status
                          }) 


            
        }catch (e){
            Alert.alert('ERRO 1047', `CAUSA: ${e} `)
        }
    }

    proximoDocumento = async () => {

        const total = this.state.doc.length - 1
        
        if(this.state.numeric === total - 1){

            const result = this.state.numeric + 1
    
            this.setState({ numeric: result})

            this.setState({ next: false})

        }else{

            const result = this.state.numeric + 1
    
            this.setState({ numeric: result})
        }
        
        
    }

    voltarDocumento = async () => {
        
        if(this.state.numeric === 1){

            const result = this.state.numeric - 1
    
            this.setState({ numeric: result})

            this.setState({ next: true})

        }else{

            const result = this.state.numeric - 1
    
            this.setState({ numeric: result})
        }

    }

    PictureCamera = () => {
        ImagePicker.launchCamera({
            maxHeight: 600,
            maxWidth: 800,
        }, res => {
            if(res.data){
                this.setState({ image: { base64: res.data }, upload_btn: true, upload_img: true })

            }
        })
    }

    PictureGalery = () => {
        ImagePicker.launchImageLibrary({
            maxHeight: 600,
            maxWidth: 800,
        },res => {
            if(res.data){
                this.setState({ image: { base64: res.data }, upload_btn: true, upload_img: true })
            }
        });
    }

    EnviarDocumento = () => {

        this.setState({ load: true })

        Api.post('/mobile-attachemnt', {
            image: this.state.image.base64,
            documento: this.state.doc[this.state.numeric],
            notesid: this.state.noteid[this.state.numeric],
            status: this.state.status[this.state.numeric],
            ticketid: this.state.ticketid
        }).then( response => {
            
            if(response.data.status === 'sucesso') {
                this.setState({ upload: true })
                this.setState({ load: false })
            }else{
                Alert.alert('AVISO', 'Erro ao enviar o documento, tente mais tarde')
            }
        }).catch(error => {console.log(error)}) 
    }

    clickProximo = () => {
        // this.proximoDocumento.call(this)
        this.setState({ upload: false })
        this.setState({ upload_btn: false })
        this.setState({ upload_img: false })
        this.props.navigation.navigate('Home')
    }
    
    render () {
        let button;
        

        let buttonOk =
            <TouchableOpacity onPress={this.clickProximo} style={styles.buttom}>
                    <Text style={styles.buttomText}>
                        <Icon name='check' size={20} /><Text style={{ fontFamily: 'OpenSans-Bold' }}> {Language.check}</Text>
                    </Text>
            </TouchableOpacity>

        if(!this.state.upload_btn){
            if(this.state.status[this.state.numeric] !== 'CONCLUIDO'){
                button = <>
                <TouchableOpacity onPress={this.PictureCamera} style={styles.buttom}>
                    <Text style={styles.buttomText}>
                        <Icon name='camera' size={20} />  <Text style={{ fontFamily: 'OpenSans-Bold' }}>{Language.photo}</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.PictureGalery} style={styles.buttom}>
                    <Text style={styles.buttomText}>
                        <Icon name='photo' size={20} />  <Text style={{ fontFamily: 'OpenSans-Bold' }}>{Language.galery}</Text>
                    </Text>
                </TouchableOpacity></>
            }
            
        }else{
            button =
            <TouchableOpacity onPress={this.EnviarDocumento} style={styles.buttom}>
                    <Text style={styles.buttomText}>
                        <Icon name='upload' size={20} /><Text style={{ fontFamily: 'OpenSans-Bold' }}> {Language.upload}</Text>
                    </Text>
            </TouchableOpacity>

        }

        return (
            <View style={styles.container}>
                {this.state.next === true ? <TouchableOpacity onPress={this.proximoDocumento}>
                                                <Text style={styles.nextPage}>Próxima ></Text>
                                            </TouchableOpacity> : 
                                            <TouchableOpacity  onPress={this.voltarDocumento}>
                                                <Text style={styles.previousPage}>{'<'} Voltar</Text>
                                            </TouchableOpacity>}
                                            
                <Text style={styles.informativo}>{this.state.status[this.state.numeric] === 'CONCLUIDO'?'':Language.MsgListDoc1}
                    <Text style={styles.textdoc}> {this.state.doc[this.state.numeric]} </Text>
                    {this.state.status[this.state.numeric] === 'CONCLUIDO'? Language.MsgListDocOk:Language.MsgListDoc2}
                </Text>
                <View style={styles.imageContainer}>
                    {this.state.status[this.state.numeric] === 'CONCLUIDO'? 
                        <Image source={require('../../assets/img/ico_document_ok.png')} style={styles.image}></Image> :
                        <Image source={this.state.upload_img === false ? require('../../assets/img/document_up.png') : require('../../assets/img/ico_document_ok.png')} style={styles.image}></Image>
                    }
                    
                </View>
                {this.state.upload === false ? button : buttonOk}
                <ActivityIndicator animating={this.state.load} size={70} color="#c00" style={styles.loading}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    informativo:{
        fontFamily: 'OpenSans-Light',
        paddingLeft: 35,
        paddingRight: 30,
        textAlign: 'auto',
        fontSize: 15,
        color: '#222',
        marginTop: Platform.OS === 'ios' ? 60 : 20,
    },
    textdoc: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
        color: '#c00',
        marginTop: Platform.OS === 'ios' ? 100 : 60,
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 1.5,
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 1.5,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    },
    buttom: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        width: '90%',
        backgroundColor: '#FFF',
        borderColor: '#c00',
        marginBottom: 20
    },
    buttomText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#c00',
        alignItems: 'flex-end'
    },
    nextPage: {
        fontFamily: 'OpenSans-Light',
        fontSize: 20,
        color: '#c00',
        marginLeft: 260,
        marginTop: 20

    },
    previousPage: {
        fontFamily: 'OpenSans-Light',
        fontSize: 20,
        color: '#c00',
        marginRight: 270,
        marginTop: 20

    }
})

export default ListaDocumentos