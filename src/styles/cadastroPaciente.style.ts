import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#79059C",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  icone: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
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
  form: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  inputDesabilitado: {
    backgroundColor: "#eee",
    color: "#aaa",
  },
  botao: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  botaoDesabilitado: {
    backgroundColor: "#a5d6a7",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  erroContainer: {
    backgroundColor: "#ffebee",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  erroTexto: {
    color: "#c62828",
    fontWeight: "bold",
    textAlign: "center",
  },
  botaoCadastro: {
    marginTop: 8,
    padding: 8,
  },
  botaoCadastroTexto: {
    color: "#008d8d",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  infoContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  infoTexto: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
  },
  botaoVoltar: {
    marginTop: 10,
    padding: 8,
  },
  botaoVoltarTexto: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});