import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";
import { useState } from 'react';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ac8da',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
  descricao: "Cuidados com o coração",
};

const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};

const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
  telefone: "(11) 98765-4321",
};

const [consulta, setConsulta] = useState<Consulta>({
  id: 1,
  medico: medico1,
  paciente: paciente1,
  data: new Date(2026, 2, 10),
  valor: 350,
  status: "agendada",
  observacoes: "Consulta de rotina",
});