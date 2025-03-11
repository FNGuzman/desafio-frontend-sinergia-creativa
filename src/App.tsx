import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/home/Home";
import MetaSimulator from "./pages/home/meta-simulator/MetaSimulator";
import MetaSimulatorSimplificado from "./pages/home/meta-simulator/MetaSimulatorSimplificado";
import SimuladorVentaPersonal from "./pages/home/meta-simulator/SimuladorVentaPersonal";
import MetaTable from "./pages/home/meta-simulator/MetaTable";


const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meta-simulator" element={<MetaSimulator />} />
        <Route path="/meta-simulator-simplic" element={<MetaSimulatorSimplificado />} />
        <Route path="/meta-simulator-personal" element={<SimuladorVentaPersonal />} />
        <Route path="/meta-simulator-table" element={<MetaTable />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
