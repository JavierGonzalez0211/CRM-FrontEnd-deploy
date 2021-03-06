import Layout from "../components/Layout";
import Producto from "../components/Producto";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Productos = () => {
  // Consultar los productos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  // console.log(data)
  // console.log(loading)
  // console.log(error)

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

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-normal">Productos</h1>

        <Link href="/nuevoproducto">
          <a className="bg-blue-600 py-2 px-5 mt-3 inline-block text-white rounded text-sm mb-3 uppercase font-bold transition duration-700 ease-in-out hover:bg-gray-800 hover:text-gray-200">
            Nuevo Producto
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-700">
            <tr className="text-white">
              <th className="w-1/4 py-2">Nombre</th>
              <th className="w-1/4 py-2">Existencia</th>
              <th className="w-1/4 py-2">Precio</th>
              <th className="w-1/8 py-2">Editar</th>
              <th className="w-1/8 py-2">Eliminar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.obtenerProductos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Productos;
