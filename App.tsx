import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/HomeScreen";
import Admin from "./src/screens/Admin";
import CadastroPaciente from "./src/screens/CadastroPaciente";
import Agendamento from "../sistema-consulta-mobile/src/screens/Agendamento";
import { inicializarDados } from "../sistema-consulta-mobile/src/service/storage";


const Stack = createNativeStackNavigator();
export default function App() {
  // Inicializa dados quando o app carrega
  useEffect(() => {
    inicializarDados();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"  // Começa no login
        screenOptions={{
          headerStyle: { backgroundColor: "#79059C" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={CadastroPaciente}
          options={{ title: "Entrar / Cadastrar", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Minhas Consultas" }}
        />
        <Stack.Screen
          name="Agendamento"
          component={Agendamento}
          options={{ title: "Agendar Consulta" }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ title: "Painel Administrativo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}