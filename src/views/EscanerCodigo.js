import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function EscanerCodigo({ onCodigo, onCerrar }) {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const [leido, setLeido] = useState(false);

  if (!permiso) return <View style={s.centro} />;

  if (!permiso.granted) {
    return (
      <View style={s.centro}>
        <Text style={s.texto}>Necesitamos la cámara para escanear el código de barras.</Text>
        <Button title="Dar permiso" onPress={pedirPermiso} />
        <Button title="Cancelar" onPress={onCerrar} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'] }}
        onBarcodeScanned={
          leido ? undefined : ({ data }) => {
            setLeido(true);
            onCodigo(data);
          }
        }
      />
      <View style={s.barra}>
        <Button title="Cancelar" onPress={onCerrar} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center', padding: 20, gap: 12 },
  texto: { textAlign: 'center' },
  barra: { position: 'absolute', bottom: 40, alignSelf: 'center' },
});