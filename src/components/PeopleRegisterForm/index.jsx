import { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "../Button";
import { Input } from "../Input";

import peopleRegisterImg from "../../assets/people-register.svg";

import "./styles.css";

// import useApi from '../../utils/useApi';
import { api } from "../../utils/api";

export function PeopleRegisterForm({ buttonText, isConsultation = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthDay] = useState(0);
  const [birthYear, setBirthYear] = useState(0);
  const [birthMonth, setBirthMonth] = useState(0);
  const [consultationHours, setConsultationHours] = useState("");
  const [consultationMinutes, setConsultationMinutes] = useState("");

  const handleRegisterPeople = async (event) => {
    event.preventDefault();

    if (!name || !email || !address) return;
    if (birthDay < 1 || birthDay > 31) return;
    if (birthMonth < 1 || birthMonth > 12) return;
    if (!consultationHours || consultationMinutes) return;

    try {
      if (isConsultation) {
        await api.post("/consulta", {
          name,
          email,
          gender,
          address,
          consultationHours,
          consultationMinutes,
        });
        return;
      }

      await api.post("/medico", {
        name,
        email,
        gender,
        address,
        birthDay,
        birthMonth,
        birthYear,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="containerRegisterPeople">
      <main className="contentResgisterPeople">
        <form className="containerForm">
          <div className="contentForm">
            <fieldset className="fields">
              <Input
                label="Nome"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="E-mail"
                id="email"
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Gênero"
                id="gender"
                placeholder="Seu Gênero"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <Input
                label="Endereço"
                id="address"
                placeholder="Seu Endereço"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              {isConsultation ? (
                <>
                  <p>Horário</p>
                  <div className="groupFieldConsultation">
                    <Input
                      label="Hora"
                      type="text"
                      id="hours"
                      classname="registerField"
                      placeholder="06"
                      value={consultationHours}
                      onChange={(e) => setConsultationHours(e.target.value)}
                    />
                    <Input
                      label="minutes"
                      id="minutes"
                      classname="registerField"
                      type="text"
                      placeholder="30"
                      value={consultationMinutes}
                      onChange={(e) => setConsultationMinutes(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>Data de nascimento</p>
                  <div className="groupField">
                    <Input
                      label="Dia"
                      id="day"
                      classname="registerField"
                      type="number"
                      onChange={(e) => setBirthDay(e.target.value)}
                    />
                    <Input
                      label="Mês"
                      type="number"
                      id="monthy"
                      classname="registerField"
                      onChange={(e) => setBirthMonth(e.target.value)}
                    />
                    <Input
                      label="Ano"
                      id="year"
                      classname="registerField"
                      type="number"
                      onChange={(e) => setBirthYear(e.target.value)}
                    />
                  </div>
                </>
              )}
            </fieldset>

            <img src={peopleRegisterImg} alt="Pacientes imagem" />
          </div>

          <div className="buttons">
            <Button title="Cancelar" />
            <Button
              title={buttonText}
              styleButton="secondary"
              onClick={handleRegisterPeople}
            />
          </div>
        </form>
      </main>
    </div>
  );
}

PeopleRegisterForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  isConsultation: PropTypes.bool,
};
