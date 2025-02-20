import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  // Estados para manejar el monto del consumo, el porcentaje de propina y los cálculos
  const [consumo, setConsumo] = useState('');
  const [porcentaje, setPorcentaje] = useState(0);
  const [propina, setPropina] = useState(0);
  const [total, setTotal] = useState(0);

  // Función para calcular la propina y el total a pagar
  const calcularPropina = (porcentajeSeleccionado: number) => {
    const montoConsumo = parseFloat(consumo);
    if (isNaN(montoConsumo)) {
      alert('Por favor, ingrese un monto de consumo válido.');
      return;
    }

    const montoPropina = (montoConsumo * porcentajeSeleccionado) / 100;
    const totalPagar = montoConsumo + montoPropina;

    setPropina(montoPropina);
    setTotal(totalPagar);
    setPorcentaje(porcentajeSeleccionado);
  };

  // Función para manejar el porcentaje personalizado ingresado por el usuario
  const handlePorcentajePersonalizado = (text: string) => {
    const porcentajePersonalizado = parseFloat(text);
    if (!isNaN(porcentajePersonalizado)) {
      calcularPropina(porcentajePersonalizado);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>
      {/* Sección para ingresar el monto de consumo */}
      <Text style={styles.label}>Consumo</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto de consumo"
        keyboardType="numeric"
        value={consumo}
        onChangeText={(text) => setConsumo(text.replace(/[^0-9.]/g, ''))} // Solo números y punto decimal
      />

      {/* Sección para seleccionar el porcentaje de propina */}
      <Text style={styles.label}>Propina</Text>
      <View style={styles.buttonContainer}>
        <Button title="10%" onPress={() => calcularPropina(10)} />
        <Button title="15%" onPress={() => calcularPropina(15)} />
        <Button title="20%" onPress={() => calcularPropina(20)} />
      </View>

      {/* Sección para ingresar un porcentaje personalizado */}
      <Text style={styles.label}>Porcentaje personalizado</Text>
      <TextInput
        style={styles.input}
        placeholder="Porcentaje personalizado"
        keyboardType="numeric"
        onChangeText={handlePorcentajePersonalizado}
      />

      {/* Sección para mostrar los resultados */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultado}>Consumo: ${consumo}</Text>
        <Text style={styles.resultado}>Propina: ${propina.toFixed(2)}</Text>
        <Text style={styles.resultado}>Total a pagar: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

// Estilos para la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', // Centra los elementos en la pantalla
    marginTop: -160, // Ajusta este valor según lo necesites (-10, -20, -30, etc.)
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },
  resultado: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default App;
