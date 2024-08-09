import "./App.css";
import Aside from "./Components/Aside/Aside";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Login from "./Pages/Login/Login";
import AddProducts from "./Pages/AddProducts/AddProducts";

function App() {
  const { token } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="App">
      {token ? (
        <>
          <Aside />
          <div className="content">
            <Header />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addProducts" element={<AddProducts />} />
              <Route path="*" element={<h1> {t("not_found")} </h1>} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<h1> {t("not_found")} </h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
