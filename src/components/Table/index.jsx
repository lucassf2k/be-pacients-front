import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

import { api } from "../../utils/api";

export function Table({ data, type }) {
  const [especificateData, setEspecificateData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      let response;

      if (type === "consultation") {
        response = await api.get(`/medico/${type.id_medico}`);
        setEspecificateData(response.data);
      }
    }

    loadData();
  }, []);

  const handleDeletePacient = (uuid) => {
    return async () => {
      await api.delete(`/paciente/${uuid}`);
      window.location.reload(true);
    };
  };

  const handleDeleteDoctor = (uuid) => {
    return async () => {
      await api.delete(`/medico/${uuid}`);
      window.location.reload(true);
    };
  };

  const handleDeleteAppointment = (uuid) => {
    return async () => {
      await api.delete(`/consulta/${uuid}`);
      window.location.reload(true);
    };
  };

  return (
    <ul className="list-ind">
      {data.map((item) => {
        if (type === "consultation") {
          return (
            <li key={item.uuid} className="list-hd">
              <span className="list-field name">Sala: {item.sala}</span>
              <span className="list-field">Data: {item.data}</span>
              <span className="list-field">Situação: {item.situacao}</span>
              <span className="list-field">
                Nome do Médico: {item.medico.nome}
              </span>
              <span className="list-field">
                Telefone do Médico: {item.medico.telefone}
              </span>
              <button
                type="button"
                onClick={handleDeleteAppointment(item.uuid)}
              >
                Apagar
              </button>
            </li>
          );
        } else if (type === "doctor") {
          return (
            <li key={item.uuid} className="list-hd">
              <span className="list-field name">Nome: {item.nome}</span>
              <span className="list-field">CPF: {item.cpf}</span>
              <span className="list-field">Tel: {item.telefone}</span>
              <span className="list-field">Cidade: {item.endereco.cidade}</span>
              <button type="button" onClick={handleDeleteDoctor(item.uuid)}>
                Apagar
              </button>
            </li>
          );
        } else if (type === "pacient") {
          return (
            <li key={item.uuid} className="list-hd">
              <span className="list-field name">ID: {item.uuid}</span>
              <span className="list-field name">Nome: {item.nome}</span>
              <span className="list-field">CPF: {item.cpf}</span>
              <span className="list-field">Idade: {item.cpf}</span>
              <span className="list-field">Tel: {item.telefone}</span>
              <span className="list-field">Cidade: {item.endereco.cidade}</span>
              <button type="button" onClick={handleDeletePacient(item.uuid)}>
                Apagar
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
}
