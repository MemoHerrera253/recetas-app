import { useState } from 'react';
import { View, Text, TextInput, Button, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import EscanerCodigo from './EscanerCodigo';
import { IngredienteController } from '../controllers/IngredienteController';

const UNIDADES = ['g', 'kg', 'ml', 'l', 'pieza', 'taza'];

export default function AgregarIngredienteScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState('pieza');
  const [codigo, setCodigo] = useState(null);
  const [escaneando, setEscaneando] = useState(false);
  const [error, setError] = useState('');

  const alLeerCodigo = async (data) => {
    setEscaneando(false);
    setCodigo(data);
    const res = await IngredienteController.buscarPorCodigo(data);
    if (res.ok && res.nombre) setNombre(res.nombre);
    else Alert.alert('No se pudo identificar', 'Escribe el nombre manualmente.');
  };

  const guardar = async () => {
    const res = await IngredienteController.agregar({
      nombre, cantidad, unidad, codigoBarras: codigo,
    });
    if (!res.ok) return setError(res.error);
    navigation.goBack();
  };

  return (
    <View style={s.contenedor}>
      <TextInput style={s.input} placeholder="Nombre del ingrediente" value={nombre} onChangeText={setNombre} />
      <Button title="Escanear código de barras" onPress={() => setEscaneando(true)} />
      <TextInput style={s.input} placeholder="Cantidad" value={cantidad}
        onChangeText={setCantidad} keyboardType="numeric" />

      <View style={s.fila}>
        {UNIDADES.map((u) => (
          <Pressable key={u} onPress={() => setUnidad(u)} style={[s.chip, unidad === u && s.chipActivo]}>
            <Text style={unidad === u && s.chipTextoActivo}>{u}</Text>
          </Pressable>
        ))}
      </View>

      {error ? <Text style={s.error}>{error}</Text> : null}
      <Button title="Guardar" onPress={guardar} />

      <Modal visible={escaneando} animationType="slide" onRequestClose={() => setEscaneando(false)}>
        <EscanerCodigo onCodigo={alLeerCodigo} onCerrar={() => setEscaneando(false)} />
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, gap: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  fila: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: '#999', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12 },
  chipActivo: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  chipTextoActivo: { color: '#fff' },
  error: { color: 'crimson' },
});