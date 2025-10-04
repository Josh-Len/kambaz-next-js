import { HashRouter } from "react-router";
import { Route } from "react-router";
import { Routes } from "react-router";
import { Navigate } from "react-router";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
export default function App() {
 return (
  <HashRouter>
   <div>
    <Routes>
     <Route path="/" element={<Navigate to="Kambaz"/>}/>
     <Route path="/Labs/*" element={<Labs />} />
     <Route path="/Kambaz/*" element={<Kambaz />} />
    </Routes>
   </div>
  </HashRouter>
);}
