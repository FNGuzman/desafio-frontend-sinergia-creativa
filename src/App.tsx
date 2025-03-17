import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";

import { SimuladorProvider } from "./context/SimuladorContext";
import Home from "./pages/home/Home";
import MetaSimulator from "./pages/meta-simulator/MetaSimulator";
import Metas from "./pages/metas/Metas";
import VerMes from "./pages/metas/VerMes";
import IniciarMeta from "./pages/metas/IniciarMeta";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <DashboardLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/meta-simulator"
          element={
            <SimuladorProvider>
              <MetaSimulator />
            </SimuladorProvider>
          }
        />
        <Route path="/metas" element={<Metas />} />
        <Route path="/ver-mes/:anio/:mesId" element={
          <SimuladorProvider>
            <VerMes />
          </SimuladorProvider>
        } />

        <Route path="/iniciar-meta" element={<IniciarMeta />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
