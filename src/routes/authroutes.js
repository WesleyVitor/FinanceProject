import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
const SignInStack = createStackNavigator();

function SignInRoutes(){
    return(
        <SignInStack.Navigator>
            <SignInStack.Screen 
            name="SignIn" 
            component={SignIn} 
            options={{headerShown:false}} />
            <SignInStack.Screen 
            name="SignUp" 
            component={SignUp} 
            options={{
                headerTitle:"Voltar",
                headerStyle:{
                    backgroundColor:'#131313',
                    borderBottomWidth:1,
                    borderBottomColor:'#00b94a',
                },
                headerTintColor:'#FFFFFF'
            }} />
        </SignInStack.Navigator>
    )
}

export default SignInRoutes;
