import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/home/Home";
import MetaSimulator from "./pages/home/meta-simulator/MetaSimulator";


const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meta-simulator" element={<MetaSimulator />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
