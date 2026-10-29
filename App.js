import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { Usuario } from './src/models/Usuario';
import LoginScreen from './src/views/LoginScreen';
import RegistroScreen from './src/views/RegistroScreen';
import AvisoPrivacidadScreen from './src/views/AvisoPrivacidadScreen';
import HomeScreen from './src/views/HomeScreen';

import AgregarIngredienteScreen from './src/views/AgregarIngredienteScreen';

// dentro del Stack.Navigator:
<Stack.Screen name="AgregarIngrediente" component={AgregarIngredienteScreen}
  options={{ title: 'Agregar ingrediente' }} />

const Stack = createNativeStackNavigator();

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let nombre = '';
        try {
          const perfil = await Usuario.obtenerPerfil(user.uid);
          nombre = perfil?.nombre ?? '';
        } catch {
          // Sin conexión o error de lectura: se entra igual con el correo
        }
        setUsuario({ id: user.uid, nombre, correo: user.email });
      } else {
        setUsuario(null);
      }
      setCargando(false);
    });
    return cancelar;
  }, []);

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={usuario ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Crear cuenta' }} />
        <Stack.Screen name="AvisoPrivacidad" component={AvisoPrivacidadScreen} options={{ title: 'Aviso de privacidad' }} />
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ usuario }}
          options={{ title: 'Inicio', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}