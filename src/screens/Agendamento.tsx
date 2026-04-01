import { useState } from "react";
import { useEffect } from "react";

import type { Especialidade } from "../types/especialidade";
import type { Medico } from "../interfaces/medico";
import type { Consulta } from "../interfaces/consulta";
import { obterEspecialidades } from "../service/storage";
import { obterMedicos } from "../service/storage";
import { obterPacienteLogado } from "../service/storage";
import { obterConsultas } from "../service/storage";
import { salvarConsultas } from "../service/storage";

import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
export default function Agendamento({ navigation }: any) {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState<Medico[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<Especialidade | null>(null);
  const [medicoSelecionado, setMedicoSelecionado] = useState<Medico | null>(null);
  const [dataConsulta, setDataConsulta] = useState("");
  useEffect(() => {
    carregarDados();
  }, []);
  async function carregarDados() {
    const esps = await obterEspecialidades();
    const meds = await obterMedicos();
    setEspecialidades(esps);
    setMedicos(meds);
  }

  // Filtra médicos quando uma especialidade é selecionada
function selecionarEspecialidade(esp: Especialidade) {
  setEspecialidadeSelecionada(esp);
  setMedicoSelecionado(null); // Reseta médico ao mudar especialidade
  // Filtra médicos da especialidade
  const medicosEsp = medicos.filter((m) => m.especialidade.id === esp.id);
  setMedicosFiltrados(medicosEsp);
}
async function agendarConsulta() {
  // Validações
  if (!especialidadeSelecionada) {
    Alert.alert("Atenção", "Selecione uma especialidade");
    return;
  }
  if (!medicoSelecionado) {
    Alert.alert("Atenção", "Selecione um médico");
    return;
  }
  if (!dataConsulta) {
    Alert.alert("Atenção", "Informe a data da consulta");
    return;
  }
  // Valida formato da data
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataConsulta)) {
    Alert.alert("Erro", "Use o formato DD/MM/AAAA para a data");
    return;
  }
  try {
    // Busca paciente logado
    const paciente = await obterPacienteLogado();
    if (!paciente) {
      Alert.alert("Erro", "Você precisa estar logado para agendar");
      navigation.replace("Login");
      return;
    }
    // Converte data
    const [dia, mes, ano] = dataConsulta.split("/");
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
    // Valida se a data não é no passado
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data < hoje) {
      Alert.alert("Erro", "Não é possível agendar consultas no passado");
      return;
    }
    // Cria nova consulta
    const novaConsulta: Consulta = {
      id: Date.now(),
      medico: medicoSelecionado,
      paciente: paciente,
      data: data,
      valor: 350,
      status: "agendada",
      observacoes: `Consulta agendada via app`,
    };
    // Salva consulta
    const consultas = await obterConsultas();
    await salvarConsultas([...consultas, novaConsulta]);
    Alert.alert(
      "Sucesso!",
      `Consulta agendada com ${medicoSelecionado.nome} para ${dataConsulta}`,
      [
        {
          text: "Ver minhas consultas",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
    // Limpa formulário
    setEspecialidadeSelecionada(null);
    setMedicoSelecionado(null);
    setDataConsulta("");
    setMedicosFiltrados([]);
  } catch (erro) {
    console.error("Erro ao agendar:", erro);
    Alert.alert("Erro", "Não foi possível agendar a consulta");
  }
}

return (
  <ScrollView contentContainerStyle={{ padding: 20 }}>
    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Agendar Consulta</Text>
    {/* Especialidade */}
    <Text style={{ fontWeight: "bold", color: "#333", marginBottom: 4 }}>Especialidade</Text>
    {especialidades.map((esp) => (
      <TouchableOpacity
        key={esp.id}
        style={{
          backgroundColor: especialidadeSelecionada?.id === esp.id ? "#4CAF50" : "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: especialidadeSelecionada?.id === esp.id ? "#4CAF50" : "#ccc",
        }}
        onPress={() => selecionarEspecialidade(esp)}
      >
        <Text style={{ color: especialidadeSelecionada?.id === esp.id ? "#fff" : "#333" }}>{esp.nome}</Text>
      </TouchableOpacity>
    ))}
    {/* Médico */}
    <Text style={{ fontWeight: "bold", color: "#333", marginBottom: 4, marginTop: 16 }}>Médico</Text>
    {medicosFiltrados.length === 0 && (
      <Text style={{ color: "#888", marginBottom: 8 }}>Selecione uma especialidade</Text>
    )}
    {medicosFiltrados.map((med) => (
      <TouchableOpacity
        key={med.id}
        style={{
          backgroundColor: medicoSelecionado?.id === med.id ? "#008d8d" : "#fff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: medicoSelecionado?.id === med.id ? "#008d8d" : "#ccc",
        }}
        onPress={() => setMedicoSelecionado(med)}
      >
        <Text style={{ color: medicoSelecionado?.id === med.id ? "#fff" : "#333" }}>{med.nome}</Text>
      </TouchableOpacity>
    ))}
    {/* Data da consulta */}
    <Text style={{ fontWeight: "bold", color: "#333", marginBottom: 4, marginTop: 16 }}>Data da Consulta</Text>
    <TextInput
      placeholder="DD/MM/AAAA"
      value={dataConsulta}
      onChangeText={setDataConsulta}
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
      }}
      keyboardType="numeric"
      maxLength={10}
    />
    <TouchableOpacity
      style={{
        backgroundColor: "#4CAF50",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
      }}
      onPress={agendarConsulta}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
        Agendar Consulta
      </Text>
    </TouchableOpacity>
  </ScrollView>
);
}