import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";
import Spinner from "../components/Spinner";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const getClients = async () => {
    try {
      const data = await getDocs(collection(db, "clientes"));
      setClientes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = confirm("Deseas Eliminar este cliente?");

    if (confirmar) {
      try {
        await deleteDoc(doc(db, "clientes", id));
        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (clientes.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [clientes]);

  return (
    <>
      {!isEmpty ? (
        <div>
          <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
          <p className="mt-3">Administra tus clientes</p>
          {clientes.length > 0 ? (
            <table className="table-auto w-full mt-5 shadow bg-white">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Contacto</th>
                  <th className="p-2">Empresa</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <Cliente
                    key={cliente.id}
                    cliente={cliente}
                    handleEliminar={handleEliminar}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <h2 className="font-black text-4xl text-blue-900">No hay Clientes</h2>
      )}
    </>
  );
};

export default Inicio;
