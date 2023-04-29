import { useEffect, useState } from "react";

import { FloatingButton } from "../../components/FloatingButton";
import { SideBar } from "../../components/SideBar";

import { Wrapper } from "../../components/Wrapper";
import { Table } from "../../components/Table";
// import useApi from "../../utils/useApi";

import "./styles.css";
import { ConsultationRegister } from "../ConsultationRegister";

import { api } from "../../utils/api";

export function ConsultationList() {
  const [data, setData] = useState([]);
  const [typeOfData, setTypeOfData] = useState("consultation");
  const [isFilteredForPacient, setIsFilteredForPacient] = useState(false);
  const [isFilteredForDoctor, setIsFilteredForDoctor] = useState(false);
  const [isFilteredForConsultation, setIsFilteredForConsultation] =
    useState(true);
  const [nameDoctorForSearch, setNameDoctorForSearch] = useState("");

  const [isOpenModalRegisterConsultation, setIsOpenModalRegisterConsultation] =
    useState(false);

  useEffect(() => {
    async function loadData() {
      let response;
      if (isFilteredForPacient) {
        response = await api.get("/paciente/page/1");
        setTypeOfData("pacient");
      } else if (isFilteredForDoctor) {
        response = await api.get("/medico/page/1");
        setTypeOfData("doctor");
      } else if (isFilteredForConsultation) {
        response = await api.get("/consulta/page/1");
        setTypeOfData("consultation");
      }

      setData(response.data);
    }

    loadData();
  }, [isFilteredForPacient, isFilteredForDoctor, isFilteredForConsultation]);

  const handleFilterForPacient = () => {
    setIsFilteredForDoctor(false);
    setIsFilteredForConsultation(false);
    setIsFilteredForPacient(true);
  };

  const handleFilterForDoctor = () => {
    setIsFilteredForPacient(false);
    setIsFilteredForConsultation(false);
    setIsFilteredForDoctor(true);
  };

  const handleFilterForConsultation = () => {
    setIsFilteredForPacient(false);
    setIsFilteredForDoctor(false);
    setIsFilteredForConsultation(true);
  };

  const handleOpenModal = () => {
    setIsOpenModalRegisterConsultation(true);
  };

  const handleSearchForDoctor = async () => {
    const response = await api.get(`/medico/nome/${nameDoctorForSearch}`);
    setTypeOfData("doctor");
    setData([response.data]);
  };

  return (
    <Wrapper>
      {isOpenModalRegisterConsultation && (
        <ConsultationRegister
          onCloseModal={setIsOpenModalRegisterConsultation}
        />
      )}
      <SideBar />
      <section className="content">
        <h2>Be Pacient</h2>
        <main className="tableContainer">
          <section className="tableHeader">
            <div className="containerFilters">
              <p>Filtrar por: </p>
              <span></span>
              <button
                className="btn-filtro"
                type="button"
                onClick={handleFilterForPacient}
              >
                Paciente
              </button>
              <span className="m"></span>
              <button
                className="btn-filtro"
                type="button"
                onClick={handleFilterForDoctor}
              >
                Médico
              </button>
              <span className="c"></span>
              <button
                className="btn-filtro"
                type="button"
                onClick={handleFilterForConsultation}
              >
                Consultas
              </button>
              <div className="search">
                <input
                  type="text"
                  placeholder="nome do médico"
                  value={nameDoctorForSearch}
                  onChange={(e) => setNameDoctorForSearch(e.target.value)}
                />
                <button
                  className="search"
                  type="button"
                  onClick={handleSearchForDoctor}
                >
                  Buscar
                </button>
              </div>
            </div>
          </section>
          <section className="tableContent">
            {data.length <= 0 ? (
              <p>Nenhum item...</p>
            ) : (
              <Table data={data} type={typeOfData} />
            )}
          </section>
          <FloatingButton onClick={handleOpenModal} />
        </main>
      </section>
    </Wrapper>
  );
}
