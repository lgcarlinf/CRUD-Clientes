import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";
import { db } from "../firebase/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();
  const { id } = cliente;

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre es obligatorio"),
    empresa: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("El teléfono no es válido")
      .integer("El teléfono no es válido")
      .typeError("El teléfono no es válido"),
  });

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await updateClient(id, values);
      } else {
        await createClient(values);
      }

      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  const createClient = async (values) => {
    try {
      const data = await addDoc(collection(db, "clientes"), values);
    } catch (error) {
      console.log(error);
    }
  };

  const updateClient = async (id, values) => {
    try {
      const clientId = doc(db, "clientes", id);
      await updateDoc(clientId, values);
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          telefono: cliente?.telefono ?? "",
          email: cliente?.email ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
          navigate("/clientes");
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="email">
                  Email:{" "}
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="telefono">
                  Telefono:{" "}
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  id="telefono"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
                {errors.notas && touched.notas ? (
                  <Alerta>{errors.notas}</Alerta>
                ) : (
                  ""
                )}
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 uppercase text-white font-bold text-lg cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
