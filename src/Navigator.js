import Login from './screens/Login'
import Home from './screens/Home'
import ListaDocumentos from './screens/ListaDocumentos'
import { StatusBar} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';


StatusBar.setBackgroundColor("#c00")
StatusBar.setBarStyle("light-content")

const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                title: '',
                headerStyle: {
                    backgroundColor: '#c00',
                }
            },
        },
        Home: {
            screen: Home,
            navigationOptions: {
                title: '',
                // headerLeft: null,
                headerTintColor: 'white',
                headerStyle: {

                    backgroundColor: '#c00',
                }
            },
        },
        ListaDocumentos: {
            screen: ListaDocumentos,
            navigationOptions: {
                title: '',
                // headerLeft: null,
                headerTintColor: 'white',
                headerStyle: {

                    backgroundColor: '#c00',
                }
            },
        }  
    })
)

export default Routes

