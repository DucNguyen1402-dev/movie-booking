import Dashboard from "./Dashboard";
import {Routes , Route, Navigate} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";


export default function App() {
  return (
    <Routes>
      <Route path ="/" element = {<MainLayout/>}>
       <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      
    </Routes>
  );
}


