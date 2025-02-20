import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  //estados para manejar el monto del consumo, el porcentaje de propina y los cálculos
  const [consumo, setConsumo] = useState('');
  const [porcentaje, setPorcentaje] = useState(0);
  const [propina, setPropina] = useState(0);
  const [total, setTotal] = useState(0);

  //calcular la propina y el total a pagar
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

  //porcentaje personalizado ingresado por el usuario
  const handlePorcentajePersonalizado = (text: string) => {
    const porcentajePersonalizado = parseFloat(text);
    if (!isNaN(porcentajePersonalizado)) {
      calcularPropina(porcentajePersonalizado);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>
      {/* monto de consumo */}
      <Text style={styles.label}>Consumo</Text>
      <TextInput
        style={styles.input}
        placeholder="Monto de consumo"
        keyboardType="numeric"
        value={consumo}
        onChangeText={(text) => setConsumo(text.replace(/[^0-9.]/g, ''))} //para ingresar solo números y punto decimal
      />

      {/* porcentaje de la propina */}
      <Text style={styles.label}>Propina</Text>
      <View style={styles.buttonContainer}>
        <Button title="10%" onPress={() => calcularPropina(10)} />
        <Button title="15%" onPress={() => calcularPropina(15)} />
        <Button title="20%" onPress={() => calcularPropina(20)} />
      </View>

      {/* porcentaje personalizado */}
      <Text style={styles.label}>Porcentaje personalizado</Text>
      <TextInput
        style={styles.input}
        placeholder="Porcentaje personalizado"
        keyboardType="numeric"
        onChangeText={handlePorcentajePersonalizado}
      />

      {/* resultados */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultado}>Consumo: ${consumo}</Text>
        <Text style={styles.resultado}>Propina: ${propina.toFixed(2)}</Text>
        <Text style={styles.resultado}>Total a pagar: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    marginTop: -160,
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
    elevation: 3, 
  },
  resultado: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default App;
