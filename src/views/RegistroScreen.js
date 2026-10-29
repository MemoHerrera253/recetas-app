import { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import { AuthController } from '../controllers/AuthController';

export default function RegistroScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [aceptoAviso, setAceptoAviso] = useState(false);
  const [error, setError] = useState('');

  const registrar = async () => {
    const res = await AuthController.registrar({ nombre, correo, password, confirmar, aceptoAviso });
    if (!res.ok) return setError(res.error);
    Alert.alert('Registro exitoso', 'Ya puedes iniciar sesión.');
    navigation.navigate('Login');
  };

  return (
    <View style={s.contenedor}>
      <TextInput style={s.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={s.input} placeholder="Correo" value={correo} onChangeText={setCorreo}
        autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={s.input} placeholder="Contraseña (mín. 8 caracteres)" value={password}
        onChangeText={setPassword} secureTextEntry />
      <TextInput style={s.input} placeholder="Confirmar contraseña" value={confirmar}
        onChangeText={setConfirmar} secureTextEntry />

      <View style={s.fila}>
        <Switch value={aceptoAviso} onValueChange={setAceptoAviso} />
        <Text style={s.texto}>
          He leído y acepto el{' '}
          <Text style={s.link} onPress={() => navigation.navigate('AvisoPrivacidad')}>
            aviso de privacidad
          </Text>
        </Text>
      </View>

      {error ? <Text style={s.error}>{error}</Text> : null}
      <Button title="Registrarme" onPress={registrar} disabled={!aceptoAviso} />
      <Text style={s.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, gap: 12, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  texto: { flex: 1 },
  link: { color: '#1a73e8', textDecorationLine: 'underline' },
  error: { color: 'crimson' },
});