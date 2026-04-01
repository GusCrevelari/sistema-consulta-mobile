import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ConsultaCard } from "../components";
import { styles } from "../styles/app.styles";
import { Consulta } from "../interfaces/consulta";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { Paciente } from "../types/paciente";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@consultas:consulta_atual";

export default function Home() {
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

  const consultaInicial: Consulta = {
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  };

  const [consulta, setConsulta] = useState<Consulta>(consultaInicial);

  useEffect(() => {
    carregarConsulta();
  }, []);

  async function carregarConsulta() {
    try {
      const consultaSalva = await AsyncStorage.getItem(STORAGE_KEY);
      if (consultaSalva) {
        const consultaObjeto = JSON.parse(consultaSalva);
        consultaObjeto.data = new Date(consultaObjeto.data);
        setConsulta(consultaObjeto);
      }
    } catch (erro) {
      console.error("Erro ao carregar consulta:", erro);
    }
  }

  async function salvarConsulta(consultaAtualizada: Consulta) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(consultaAtualizada)
      );
    } catch (erro) {
      console.error("Erro ao salvar consulta:", erro);
    }
  }

  function confirmarConsulta() {
    const consultaAtualizada = {
      ...consulta,
      status: "confirmada" as const,
    };
    setConsulta(consultaAtualizada);
    salvarConsulta(consultaAtualizada);
  }

  function cancelarConsulta() {
    const consultaAtualizada = {
      ...consulta,
      status: "cancelada" as const,
    };
    setConsulta(consultaAtualizada);
    salvarConsulta(consultaAtualizada);
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

export default function Home({ navigation }: any) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nomePaciente, setNomePaciente] = useState("");
  // Carrega dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
  // Verifica se há paciente logado
  const paciente = await obterPacienteLogado();
  if (!paciente) {
    // Se não houver, redireciona para login
    navigation.replace("Login");
    return;
  }
  setNomePaciente(paciente.nome);
  // Carrega consultas do paciente
  const todasConsultas = await obterConsultas();
  const consultasDoPaciente = todasConsultas.filter(
    (c) => c.paciente.id === paciente.id
  );
  setConsultas(consultasDoPaciente);
}

async function confirmarConsulta(consultaId: number) {
  // Atualiza estado local
  const consultasAtualizadas = consultas.map((c) =>
    c.id === consultaId ? { ...c, status: "confirmada" as const } : c
  );
  setConsultas(consultasAtualizadas);
  
  // Atualiza todas as consultas no storage
  const todasConsultas = await obterConsultas();
  const consultasAtualizadasCompletas = todasConsultas.map((c) =>
    c.id === consultaId ? { ...c, status: "confirmada" as const } : c
  );
  await salvarConsultas(consultasAtualizadasCompletas);
}
async function cancelarConsulta(consultaId: number) {
  // Atualiza estado local
  const consultasAtualizadas = consultas.map((c) =>
    c.id === consultaId ? { ...c, status: "cancelada" as const } : c
  );
  setConsultas(consultasAtualizadas);
  
  // Atualiza todas as consultas no storage
  const todasConsultas = await obterConsultas();
  const consultasAtualizadasCompletas = todasConsultas.map((c) =>
    c.id === consultaId ? { ...c, status: "cancelada" as const } : c
  );
  await salvarConsultas(consultasAtualizadasCompletas);
}

async function handleLogout() {
  Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
    { text: "Cancelar", style: "cancel" },
    {
      text: "Sair",
      onPress: async () => {
        console.log("Fazendo logout...");
        await removerPacienteLogado();
        console.log("Paciente removido, navegando para Login");
        navigation.replace("Login");
      },
    },
  ]);
}