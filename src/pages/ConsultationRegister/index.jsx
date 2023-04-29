import { useState } from "react";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import "./styles.css";

import { api } from "../../utils/api";

export function ConsultationRegister({ onCloseModal }) {
  const [room, setRoom] = useState("");
  const [situation, setSituation] = useState("");
  const [nameOfDoctor, setNameOfDoctor] = useState("");
  const [idOfPacient, setIdOfPacient] = useState("");
  const [dateOfAppointment, setDateOfAppointment] = useState("");

  const handleCloseModal = () => {
    onCloseModal(false);
  };

  const handleCreateConsultation = async (event) => {
    event.preventDefault();

    const [responseDoctor, responsePacient] = await Promise.all([
      api.get(`/medico/nome/${nameOfDoctor}`),
      api.get(`/paciente/${idOfPacient}`),
    ]);

    await api.post("/consulta", {
      sala: Number(room),
      data: Number(dateOfAppointment),
      situacao: Number(situation),
      id_medico: responseDoctor.data.uuid,
      id_paciente: idOfPacient,
      medico: responseDoctor.data,
      paciente: responsePacient.data,
    });

    onCloseModal(false);
  };

  return (
    <div className="containerConsultationRegisterModal">
      <main className="content">
        <button type="button" onClick={handleCloseModal}>
          X
        </button>
        <h2>Cadastrar nova consulta</h2>
        <form action="#">
          <fieldset className="fields">
            <Input
              type="text"
              label="Sala"
              id="room"
              placeholder="Sala do médico"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Input
              type="text"
              label="Situação"
              id="situation"
              placeholder="Situação da consulta"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
            <Input
              type="text"
              label="Nome do médico"
              id="name-of-doctor"
              placeholder="Nome do médico"
              value={nameOfDoctor}
              onChange={(e) => setNameOfDoctor(e.target.value)}
            />
            <Input
              type="text"
              label="ID do paciente"
              id="id-of-pacient"
              placeholder="Nome do paciente"
              value={idOfPacient}
              onChange={(e) => setIdOfPacient(e.target.value)}
            />
            <Input
              type="text"
              label="Data da consulta"
              id="date"
              placeholder="Data da consulta"
              value={dateOfAppointment}
              onChange={(e) => setDateOfAppointment(e.target.value)}
            />
          </fieldset>
          <Button
            title="Confirmar"
            styleButton="primary"
            onClick={handleCreateConsultation}
          />
        </form>
      </main>
    </div>
  );
}
