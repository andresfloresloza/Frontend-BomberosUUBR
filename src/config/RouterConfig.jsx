import { Route, Routes } from "react-router-dom";
import {
  ROUTER_EPP,
  ROUTER_INICIO,
  ROUTER_INITIAL,
  ROUTER_INVENTARIO,
  ROUTER_LOGIN_FORM,
  ROUTER_OTROS,
  ROUTER_PERFIL,
  ROUTER_REPORTE_INVENTARIO,
  ROUTER_REPORTE_VOLUNTARIOS,
} from "./Constant";
import NoRequireAuth from "./NoRequireAuth";
import LandingPage from "../pages/landingPage/LandingPage";
import LoginForm from "../pages/auth/LoginForm";
import PageVoluntarios from "../pages/home/views/PageVoluntarios";
import PageInventario from "../pages/home/views/PageInventario";
import PagePerfil from "../pages/home/views/PagePerfil";
import RequireAuth from "./RequireAuth";
import Header from "../components/Header";
import PageProduct from "../pages/home/views/PageProducts";
import ReporteVoluntarios from "../pages/reports/ReporteVoluntarios";
import ReporteInventario from "../pages/reports/ReporteInventario";

const RouterConfig = ({ Token }) => {
  return (
    <>
      <Routes>
        <Route path={ROUTER_INITIAL} element={<LandingPage />} />
        <Route
          path={ROUTER_LOGIN_FORM}
          element={
            <NoRequireAuth Token={Token}>
              <LoginForm />
            </NoRequireAuth>
          }
        />
        <Route
          path={ROUTER_PERFIL}
          element={
            <RequireAuth Token={Token}>
              <Header Token={Token} />
              <PagePerfil Token={Token} />
            </RequireAuth>
          }
        />
        {Token.position === "Administrador" && (
          <>
            <Route
              path={ROUTER_INICIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageVoluntarios Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_REPORTE_VOLUNTARIOS}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <ReporteVoluntarios Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_INVENTARIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageInventario Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_REPORTE_INVENTARIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <ReporteInventario Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_EPP}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_EPP}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_OTROS}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
          </>
        )}

        {Token.position === "Personal" && (
          <>
            <Route
              path={ROUTER_INICIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageVoluntarios Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_REPORTE_VOLUNTARIOS}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <ReporteVoluntarios Token={Token} />
                </RequireAuth>
              }
            />
          </>
        )}
        {Token.position === "Inventario" && (
          <>
            <Route
              path={ROUTER_INVENTARIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageInventario Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_REPORTE_INVENTARIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <ReporteInventario Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_EPP}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_EPP}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_OTROS}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
};
export default RouterConfig;
