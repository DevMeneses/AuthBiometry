import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

import { styles } from "./styles";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthencation() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAuthentication(){
  const isBiometricEnrolled =  await LocalAuthentication.isEnrolledAsync();
  
  
  if(!isBiometricEnrolled){
   return Alert.alert('Login', 'Nenhuma biometria encontrada. Por Favor, cadastre no dispositivo! ') 
  }

  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'login with biometrics',
    fallbackLabel: 'Biometria não reconhecida'
  });

  setIsAuthenticated(auth.success)


  }

  useEffect(() => {
    verifyAvaiableAuthencation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color: '#fff', marginBottom: 40}}>logged in user: {isAuthenticated ? "Yes" : "Not"}</Text>
     <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
      <Text style={styles.buttonTxt}>Access</Text>
     </TouchableOpacity>
    </View>
  );
}
