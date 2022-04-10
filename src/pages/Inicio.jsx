import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const url = `${import.meta.env.VITE_API_URL}`;
      const response = await fetch(url);
      const data = await response.json();
      setClientes(data);
    };
    getClients();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("Deseas Eliminar este cliente?");
    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();

        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {}
    }
  };

  console.log(import.meta.env.VITE_API_URL);

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

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
    </div>
  );
};

export default Inicio;
