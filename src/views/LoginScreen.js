import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthController } from '../controllers/AuthController';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const entrar = async () => {
    const res = await AuthController.iniciarSesion({ correo, password });
    if (!res.ok) return setError(res.error);
    navigation.replace('Home', { usuario: res.usuario });
  };

  return (
    <View style={s.contenedor}>
      <TextInput style={s.input} placeholder="Correo" value={correo} onChangeText={setCorreo}
        autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={s.input} placeholder="Contraseña" value={password}
        onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={s.error}>{error}</Text> : null}
      <Button title="Iniciar sesión" onPress={entrar} />
      <Text style={s.link} onPress={() => navigation.navigate('Registro')}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, gap: 12, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  link: { color: '#1a73e8', textDecorationLine: 'underline' },
  error: { color: 'crimson' },
});