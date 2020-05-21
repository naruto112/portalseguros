import React from 'react'
import { StyleSheet, View, TextInput, Text, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    
    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.label}>
                <Icon name={props.icon} size={20} style={styles.icon} />
                <Text name={props.textinput} style={styles.textLabel}>{`${props.textinput}`}</Text>
                </View>
            <TextInput {...props} style={styles.TextValue} />
                        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#909396',
        borderRadius: 10,
        
    },
    label: {
        marginTop: Platform.OS === 'ios'? 5 : 15,
        padding: Platform.OS === 'ios' ? 8 : 1,
        flexDirection: 'row',
    },
    textLabel: {
        color: '#4e4e4e',
        fontFamily: 'OpenSans-Bold',
        marginLeft: Platform.OS === 'ios'? 15 : 15
    },
    icon: {
        color: '#333',
        marginLeft: 15
    },
    TextValue: {
        marginLeft: 15,
        width: '70%',
        color: '#828282',
        fontSize: 12
    }
})