import { Route, Routes } from "react-router-dom";
import {
  ROUTER_ACCESORIOS,
  ROUTER_EPP_ESTRUCTURAL,
  ROUTER_EPP_FORESTAL,
  ROUTER_HERRAMIENTAS,
  ROUTER_INICIO,
  ROUTER_INITIAL,
  ROUTER_INVENTARIO,
  ROUTER_LOGIN_FORM,
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
        {/* <Route path={ROUTER_INICIO} element={<PageVoluntarios Token={Token} />} />
        <Route path={ROUTER_INVENTARIO} element={<PageInventario Token={Token} />} />
        <Route path={ROUTER_PERFIL} element={<PagePerfil Token={Token} />} />
        <Route path={ROUTER_PRODUCTO} element={<PageProduct Token={Token} />} /> */}

        {Token.is_superuser ? (
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
              path={ROUTER_INVENTARIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageInventario Token={Token} />
                </RequireAuth>
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
            <Route
              path={ROUTER_EPP_ESTRUCTURAL}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_EPP_FORESTAL}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_HERRAMIENTAS}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
                </RequireAuth>
              }
            />
            <Route
              path={ROUTER_ACCESORIOS}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PageProduct Token={Token} />
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
              path={ROUTER_REPORTE_INVENTARIO}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                    <ReporteInventario Token={Token} />
                </RequireAuth>
              }
            />
          </>
        ) : (
          <>
            <Route
              path={ROUTER_PERFIL}
              element={
                <RequireAuth Token={Token}>
                  <Header Token={Token} />
                  <PagePerfil Token={Token} />
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
