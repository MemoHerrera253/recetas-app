import { View, Text, Button } from 'react-native';
import { AuthController } from '../controllers/AuthController';

export default function HomeScreen({ route, navigation }) {
  const { usuario } = route.params;

  const salir = async () => {
    await AuthController.cerrarSesion();
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 20 }}>Hola, {usuario.nombre}</Text>
      <Button title="Cerrar sesión" onPress={salir} />
      <Button title="Agregar ingrediente" onPress={() => navigation.navigate('AgregarIngrediente')} />
    </View>
  );
}