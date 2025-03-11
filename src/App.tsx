import { Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import DashboardLayout from "./components/layout/DashboardLayout";


const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;
