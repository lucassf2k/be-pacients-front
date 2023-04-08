import { useState } from "react";
import { useNavigate } from "react-router-dom";

import peopleRegisterImg from "../../assets/people-register.svg";

import "../../components/PeopleRegisterForm/styles.css";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { api } from "../../utils/api";

import "./styles.css";

export function RegisterPacient() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressDistrict, setAddressDistrict] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();

  const handleRegisterPacient = async (event) => {
    event.preventDefault();

    if (!name || !cpf || !age || !phone) {
      alert("Nome, cpf, idade e telefone não podem ser vázios!");
      return;
    }

    await api.post("/paciente", {
      nome: name,
      cpf: Number(cpf),
      idade: Number(age),
      telefone: Number(phone),
      endereco: {
        cidade: addressCity,
        bairro: addressDistrict,
        numero: Number(addressNumber),
      },
    });

    navigate("/");
  };

  return (
    <div className="containerRegisterPeople">
      <main className="contentResgisterPeople">
        <form className="containerForm">
          <div className="contentForm">
            <fieldset className="fields">
              <Input
                type="text"
                label="Nome"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                label="CPF"
                id="cpf"
                placeholder="Seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <Input
                type="text"
                label="Idade"
                id="age"
                placeholder="Sua Idade"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Input
                label="Cidade"
                id="address-city"
                placeholder="Sua Cidade"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
              />
              <Input
                label="Bairro"
                id="address-district"
                placeholder="Seu Bairro"
                value={addressDistrict}
                onChange={(e) => setAddressDistrict(e.target.value)}
              />
              <Input
                label="Número da casa"
                id="address-number"
                placeholder="Seu número da casa"
                value={addressNumber}
                onChange={(e) => setAddressNumber(e.target.value)}
              />
              <Input
                type="text"
                label="Telefone"
                id="phone"
                placeholder="Seu Número de telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </fieldset>

            <img src={peopleRegisterImg} alt="Pacientes imagem" />
          </div>

          <div className="buttons">
            <Button title="Cancelar" />
            <Button
              title="Confirmar"
              styleButton="secondary"
              onClick={handleRegisterPacient}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
