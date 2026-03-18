import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import { Consulta } from "../interfaces/consulta";

export default function Home() {
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    status: "agendada",
    medico: {
      id: 1,
      nome: "Dr. Roberto Silva",
      crm: "12345-SP",
      especialidade: {
        id: 1,
        nome: "Cardiologia",
        descricao: "Especialista em coração",
      },
      ativo: true,
    },
    paciente: {
      id: 1,
      nome: "Carlos Andrade",
      cpf: "123.456.789-00",
      email: "carlos@email.com",
      telefone: "(11) 99999-9999",
    },
    data: new Date("2026-03-20"),
    valor: 350,
    observacoes: "Paciente com retorno agendado.",
  });

  function confirmarConsulta() {
  const novaConsulta = {
    ...consulta,
    status: "confirmada" as const,
  };
  setConsulta(novaConsulta);
}

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

        <ConsultaCard
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />
      </ScrollView>
    </View>
  );
}