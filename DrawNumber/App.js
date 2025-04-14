import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';

export default function App() {
  const [numeroSorteado, setNumeroSorteado] = useState(null);
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [historico, setHistorico] = useState([]);

  // Sorteia o número quando o app inicia
  useEffect(() => {
    reiniciarJogo();
  }, []);

  const reiniciarJogo = () => {
    const novoNumero = Math.floor(Math.random() * 100) + 1;
    setNumeroSorteado(novoNumero);
    setPalpite('');
    setTentativas(0);
    setHistorico([]);
    console.log('Número sorteado:', novoNumero); // Para teste
  };

  const verificarPalpite = () => {
    const num = parseInt(palpite);

    if (isNaN(num) || num < 1 || num > 100) {
      Alert.alert('Por favor, digite um número entre 1 e 100');
      return;
    }

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);
    setHistorico([...historico, num]);

    if (num === numeroSorteado) {
      Alert.alert(`Parabéns! Você acertou em ${novasTentativas} tentativas!`);
      reiniciarJogo();
    } else if (novasTentativas >= 5) {
      Alert.alert(`Game Over! O número era ${numeroSorteado}`);
      reiniciarJogo();
    } else {
      const dica = num < numeroSorteado ? 'maior' : 'menor';
      Alert.alert(`Errou! O número é ${dica} que ${num}`);
    }

    setPalpite('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual o número de 1 a 100?</Text>
      <Text>Tentativas: {tentativas}/5</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={palpite}
        onChangeText={setPalpite}
        placeholder="Digite seu palpite"
        placeholderTextColor="#999"
        cursorColor="#4A7BFF"
      />

      <View style={{ gap: 15 }}>
      <Button title="Enviar" onPress={verificarPalpite} color="#4A7BFF" />
      <Button title="Reiniciar" onPress={reiniciarJogo} color="gray" />
      </View>

      <Text style={styles.historico}>
        Histórico: {historico.join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#4A7BFF',
    borderWidth: 2,
    marginVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  historico: {
  marginTop: 30,
  color: 'gray',
},

});