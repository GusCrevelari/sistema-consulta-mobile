import { StatusConsulta, Especialidade } from "../types";

export interface Consulta {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  medicoId: number;
  medicoNome: string;
  especialidade: Especialidade;
  data: string;
  horario: string;
  status: StatusConsulta;
  observacoes?: string;
}