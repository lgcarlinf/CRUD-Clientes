import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";

const VerClientes = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);

    getClientforId(id);
  }, []);

  const getClientforId = async (id) => {
    try {
      const clientId = await getDoc(doc(db, "clientes", id));
      setCliente({ id: clientId.id, ...clientId.data() });
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No Hay Resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className="mt-3">Informacion del Cliente</p>
      {cliente.notas && (
        <p className="text-4xl text-gray-600 mt-10">
          <span className=" text-gray-800 uppercase font-bold "> Cliente:</span>
          {cliente.nombre}
        </p>
      )}
      {cliente.notas && (
        <p className="text-4xl text-gray-600 ">
          <span className=" text-gray-800 uppercase font-bold ">
            {" "}
            Telefono:
          </span>
          {cliente.telefono}
        </p>
      )}
      {cliente.notas && (
        <p className="text-4xl text-gray-600 ">
          <span className=" text-gray-800 uppercase font-bold "> Email:</span>
          {cliente.email}
        </p>
      )}
      {cliente.notas && (
        <p className="text-4xl text-gray-600 ">
          <span className=" text-gray-800 uppercase font-bold "> Empresa:</span>
          {cliente.empresa}
        </p>
      )}
      {cliente.notas && (
        <p className="text-4xl text-gray-600 ">
          <span className=" text-gray-800 uppercase font-bold "> Notas:</span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};

export default VerClientes;
