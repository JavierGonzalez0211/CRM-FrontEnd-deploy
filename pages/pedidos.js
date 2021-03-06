import Layout from "../components/Layout";
import Pedido from "../components/Pedido";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        cantidad
        nombre
      }
      cliente {
        id
        nombre
        apellido
        empresa
        email
        telefono
        vendedor
      }
      vendedor
      total
      estado
    }
  }
`;

const Pedidos = () => {
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

  // if (loading) return "Cargando...";
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div
          className="
          animate-spin
          rounded-full
          h-32
          w-32
          border-t-2 border-b-2 border-purple-500"
        ></div>
      </div>
    );
  }

  const { obtenerPedidosVendedor } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-normal">Pedidos</h1>

        <Link href="/nuevopedido">
          <a className="bg-blue-600 py-2 px-5 mt-3 inline-block text-white rounded text-sm mb-3 uppercase font-bold transition duration-700 ease-in-out hover:bg-gray-800 hover:text-gray-200">
            Nuevo Pedido
          </a>
        </Link>

        {obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos</p>
        ) : (
          obtenerPedidosVendedor.map((pedido) => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default Pedidos;
