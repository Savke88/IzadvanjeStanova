import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Prijava from "./components/autehntikacija/prijava";
import Registracija from "./components/autehntikacija/registracija";
import Izdaj from "./components/routes/izdaj/izdaj";
import PrikazNekretnina from "./components/routes/prod-izdavanje-stambenih-objekta/prikaz-nekretnina";
import DetaljiPosebnihNekretnina from "./components/routes/prod-izdavanje-stambenih-objekta/detalji-posebnih-nekretnina";

const App = () => {
  return (
    <>
   
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nekretnine" element={<PrikazNekretnina />} />
        {/* <Route path="/kontact" element={<Kontakt />} />
        <Route path="/Pretraga" element={<Pretraga />} /> */}
        <Route path="/izdaj" element={<Izdaj />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/nekretnine/:id" element={<DetaljiPosebnihNekretnina />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
