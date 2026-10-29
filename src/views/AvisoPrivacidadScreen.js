import { ScrollView, Text, StyleSheet } from 'react-native';

export default function AvisoPrivacidadScreen() {
    const fechaActual = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <ScrollView contentContainerStyle={s.contenedor}>
            <Text style={s.titulo}>Aviso de privacidad (versión 1.0)</Text>

            <Text style={s.sub}>Responsable</Text>
            <Text>Guillermo Efraín Herrera Anda, proyecto escolar "App de Recetas con Inventario de Despensa", Universidad Tecnológica de Aguascalientes (UTA). Contacto: 211179@utags.edu.mx</Text>

            <Text style={s.sub}>Datos personales que recabamos</Text>
            <Text>Nombre, correo electrónico y contraseña (que no se guarda en texto plano). No recabamos datos personales sensibles.</Text>

            <Text style={s.sub}>Finalidades</Text>
            <Text>Crear y administrar tu cuenta, verificar tu identidad al iniciar sesión y guardar tu inventario de ingredientes y tus recetas. No usamos tus datos con fines publicitarios.</Text>

            <Text style={s.sub}>Transferencias</Text>
            <Text>No compartimos tus datos personales con terceros. Para sugerir recetas, la app envía a una API pública únicamente nombres de ingredientes, sin datos que te identifiquen.</Text>

            <Text style={s.sub}>Derechos ARCO y revocación</Text>
            <Text>Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos, y revocar tu consentimiento en cualquier momento, escribiendo a 211179@utags.edu.mx</Text>

            <Text style={s.sub}>Cambios al aviso</Text>
            <Text>Cualquier cambio se publicará en la aplicación. Última actualización: {fechaActual}.</Text>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    contenedor: { padding: 20, gap: 8 },
    titulo: { fontSize: 20, fontWeight: 'bold' },
    sub: { fontWeight: 'bold', marginTop: 8 },
});