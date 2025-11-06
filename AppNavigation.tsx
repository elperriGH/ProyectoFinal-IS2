import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './pantallas/InicioScreen';
import ProductosScreen from './pantallas/ProductosScreen';
import InfoProductoScreen from './pantallas/InfoProductoScreen';
import EditarProductoScreen from './pantallas/EditarProductoScreen';
import NuevoProductoScreen from './pantallas/NuevoProductoScreen';
import EliminarProductoScreen from './pantallas/EliminarProductoScreen';


export type RootStackParamList = {
  Home: undefined;
  ListaProductos: undefined;
  Detalle: { id: number };
  Modificar: { id: number };
  Crear: undefined;
  Borrar: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={InicioScreen} />
        <Stack.Screen name="ListaProductos" component={ProductosScreen} />
        <Stack.Screen name="Detalle" component={InfoProductoScreen} />
        <Stack.Screen name="Modificar" component={EditarProductoScreen} />
        <Stack.Screen name="Crear" component={NuevoProductoScreen} />
        <Stack.Screen name="Borrar" component={EliminarProductoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}