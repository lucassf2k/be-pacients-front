import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RegisterPacient } from "../pages/RegisterPacient";
import { RegisterDoctor } from "../pages/RegisterDoctor";
import { ConsultationRegister } from "../pages/ConsultationRegister";
import { ConsultationList } from "../pages/ConsultationList";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConsultationList />} />
        <Route path="/register/pacients" element={<RegisterPacient />} />
        <Route path="/register/doctors" element={<RegisterDoctor />} />
        {/* <Route path="/register/consultations" element={<ConsultationRegister />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
