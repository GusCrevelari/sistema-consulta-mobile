import AsyncStorage from "@react-native-async-storage/async-storage";
import { Especialidade } from "../types/especialidade";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";

const KEYS = {
  ESPECIALIDADES: "@consultas:especialidades",
  MEDICOS: "@consultas:medicos",
  CONSULTAS: "@consultas:consultas",
};

export async function salverEspecialidade(especialidades: Especialidade) {
    try {
        await AsyncStorage.setItem(
            KEYS.ESPECIALIDADES, JSON.stringify(especialidades)
        );
    } catch (erro) {
        console.error("Erro ao salvar especialidade:", erro);
    }
}

export async function obterEspecialidades() : Promise<Especialidade[]> {
    try {
        const dados = await AsyncStorage.getItem(KEYS.ESPECIALIDADES);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        console.error("Erro ao obter especialidades:", erro);
        return [];

    }
}

export async function salvarMedico(medicos: Medico[]) {
    try {
        await AsyncStorage.setItem(
            KEYS.MEDICOS, JSON.stringify(medicos)
        );
    } catch (erro) {
        console.error("Erro ao salvar médico:", erro);
    }
}

export async function obterMedicos() : Promise<Medico[]> {
    try {
        const dados = await AsyncStorage.getItem(KEYS.MEDICOS);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        console.error("Erro ao obter médicos:", erro);
        return [];
    }
}


export async function salvarConsulta(consultas: Consulta[]) {
    try {
        await AsyncStorage.setItem(
            KEYS.CONSULTAS, JSON.stringify(consultas)
        );
    } catch (erro) {
        console.error("Erro ao salvar consulta:", erro);
    }
}

export async function obterConsultas() : Promise<Consulta[]> {
    try {
        const dados = await AsyncStorage.getItem(KEYS.CONSULTAS);

    if (dados) {
        const consultas: Consulta[] = JSON.parse(dados);
        // Converter as strings de data para objetos Date
        return consultas.map(consulta => ({
            ...consulta,
            data: consulta.data ? new Date(consulta.data) : undefined,
        }));
    }
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        console.error("Erro ao obter consultas:", erro);
        return [];
    }
}