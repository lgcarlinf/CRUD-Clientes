import { useState, useEffect } from "react";
import Formulario from "../components/Formulario";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";

const EditarCliente = () => {
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

  return (
    <div>
      {" "}
      <h1 className="font-black text-4xl ">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>cliente ID no valido</p>
      )}
    </div>
  );
};

export default EditarCliente;
