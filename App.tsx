import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

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

export default function App() {
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Detalhes da Consulta</Text>
        <Text style={styles.subtitulo}>Paciente: {consulta.paciente.nome}</Text>
      </View>
      <View style={styles.card}>
        <View style={
          [
            styles.statusBadge,
            consulta.status === "confirmada"
              ? styles.statusConfirmada
              : consulta.status === "cancelada"
              ? styles.statusCancelada
              : null,
          ]
        }>
          <Text style={styles.statusTexto}>{consulta.status.toUpperCase()}</Text>
        </View>
        <View style={styles.secao}>
          <Text style={styles.label}>Médico</Text>
          <Text style={styles.valor}>{consulta.medico.nome}</Text>
          <Text style={styles.info}>Especialidade: {consulta.medico.especialidade.nome}</Text>
        </View>
        <View style={styles.secao}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.valor}>{formatarData(consulta.data)}</Text>
        </View>
        <View style={styles.secao}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.valor}>{formatarValor(consulta.valor)}</Text>
        </View>
        <View style={styles.secao}>
          <Text style={styles.label}>Observações</Text>
          <Text style={styles.observacoes}>{consulta.observacoes}</Text>
        </View>
        <View style={styles.acoes}>
          {consulta.status === "agendada" && (
            <>
              <View style={styles.botaoContainer}>
                <Button title="Confirmar Consulta" color="#2057be" onPress={confirmarConsulta} />
              </View>
              <View style={styles.botaoContainer}>
                <Button title="Cancelar Consulta" color="#F44336" onPress={cancelarConsulta} />
              </View>
            </>
          )}
          {consulta.status === "confirmada" && (
            <View style={styles.botaoContainer}>
              <Button title="Cancelar Consulta" color="#F44336" onPress={cancelarConsulta} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Sistema de Consultas Médicas - {new Date().getFullYear()}</Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2057be",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statusBadge: {
    backgroundColor: "#FFA500",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusConfirmada: {
    backgroundColor: "#4CAF50",
  },
  statusCancelada: {
    backgroundColor: "#F44336",
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  secao: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2057be",
    marginBottom: 8,
  },
  valor: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  observacoes: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
  },
  acoes: {
    marginTop: 10,
  },
  botaoContainer: {
    marginBottom: 12,
  },
  mensagem: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  mensagemCancelada: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  mensagemTexto: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    lineHeight: 18,
  },
});