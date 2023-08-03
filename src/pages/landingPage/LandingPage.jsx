/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../../styles/pages/landingPage/landingPage.css";

const LandingPage = () => {
  return (
    <>
      <header>
        <div className="hero">
          <div>
            <a className="inicio_sesion" href="http://localhost:3000/login">Iniciar Sesión</a>
          </div>
          <div>
            <article className="logo-cont">
              <img src={require("../../assets/LOGO1.png")} />
              <img src={require("../../assets/LOGO2.png")} />
              <img src={require("../../assets/LOGO3.png")} />
              <img src={require("../../assets/LOGO4.png")} />
            </article>
          </div>
          <div className="textos-hero">
            <h1>BOMBEROS VOLUNTARIOS</h1>
            <h2>UUBR</h2>
          </div>
          {/* <div className="svg-hero" style={{ height: "150px", overflow: "hidden" }}>
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              style={{ height: "100%", width: "100%" }}
            >
              <path
                d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style={{ stroke: "none", fill: "yellow" }}
              ></path>
            </svg>
          </div> */}
        </div>
      </header>

      <div className="landingPage">
        {/* ¿Quienes Somos? */}
        <section className="wave-contenedor website">
          <img
            src={require("../../assets/landingPage/fondo_inicio.jpg")}
            alt=""
          />
          <div className="contenedor-textos-main">
            <h2 className="titulo left">¿QUÍENES SOMOS?</h2>
            <h3>
              FUNDACIÓN UNIDAD URBANA DE BOMBEROS Y RESCATE (Bomberos
              Voluntarios UUBR)
            </h3>
            <p className="parrafo">
              Es una institución sin fines de lucro netamente voluntaria,
              legalmente constituida, que opera en emergencias desde el año 2007
              en el departamento de Santa Cruz - Bolivia. Además del comando
              central en la ciudad de Santa Cruz, se tienen tres destacamentos:
              uno ubicado en San Jose de Chiquitos, uno en el municipio de
              Camiri y uno en el municipio de Warnes.
            </p>
            <p className="parrafo">
              En la gestión 2022 UUBR atendió más de 450 emergencias entre ellas
              incendios forestales, estructurales, de basural, rescates
              animales, acuáticos y otros. Nuestra unidad está conformada por
              más de 50 voluntarios, hombres y mujeres de distintas edades que
              dedican su tiempo a capacitarse y al servicio de la sociedad sin
              remuneración alguna, todos ellos sirven a su sociedad además de
              seguir con sus actividades cotidianas como el estudio, trabajo o
              familia. En los últimos años participamos de los incendios de la
              Chiquitania y la serranía Sararenda en Camiri además de numerosos
              incendios en la ciudad como el de Normandia, el mercado
              Mutualista, supermercados Fidalga y otros.
            </p>
          </div>
        </section>
        {/* Misión */}
        <section className="info">
          <div className="contenedor">
            <div className="contenedor-textos-main">
              <h2 className="titulo left">MISIÓN</h2>
              <p>
                ASISTIR EN SITUACIONES DE EMERGENCIA DE CARACTER URBANO COMO
                TAMBIEN EN DESASTRES NATURALES, TECNOLOGICOS Y ANTROPICOS.
              </p>
            </div>
          </div>
        </section>
        {/* Especialidades */}
        <section className="galeria">
          <div className="contenedor">
            <h2 className="titulo">ESPECIALIDADES</h2>
            <div className="content-cards">
              <article className="card">
                <img
                  src={require("../../assets/especialidades/incendio.png")}
                ></img>
                <h2>INCENDIO</h2>
                <p className="contenido">
                  ESTRUCTURAL / INDUSTRIAL / FORESTAL / VEHICULAR / AERONÁUTICO
                </p>
              </article>
              <article className="card">
                <img
                  src={require("../../assets/especialidades/rescate.png")}
                ></img>
                <h2>RESCATE</h2>
                <p className="contenido">
                  VEHICULAR / EN ALTURA / ACUÁTICO / ANIMAL / EN ESPACIOS
                  CONFINADOS
                </p>
              </article>
              <article className="card">
                <img src={require("../../assets/especialidades/aph.png")}></img>
                <h2>ATENCIÓN PRE-HOSPITALARIA (APH)</h2>
                <p className="contenido">
                  APH AVANZADO / AGRESTE / MEDICINA TÁCTICA /
                  EVACUACIÓN AEROMEDICA
                </p>
              </article>
              <article className="card">
                <img
                  src={require("../../assets/especialidades/operaciones_especiales.png")}
                ></img>
                <h2>OPERACIONES ESPECIALES</h2>
                <p className="contenido">
                  HAZMAT / BREC / K9 / RESCATE CON CANES / HELITRANSPORTADAS
                </p>
              </article>
            </div>
          </div>
        </section>
        {/* Cursos Que Brindamos */}
        <section className="cards contenedor">
          <div className="contenedor">
            <h2 className="titulo">CURSOS QUE BRINDAMOS</h2>
            <h3 className="parrafoCurso">para cubrir gastos operativos</h3>
            <article className="galeria-slide">
              <img src={require("../../assets/cursos/curso1.jpg")} />
              <img src={require("../../assets/cursos/curso2.jpg")} />
              <img src={require("../../assets/cursos/curso3.jpg")} />
              <img src={require("../../assets/cursos/curso4.jpg")} />
              <img src={require("../../assets/cursos/curso5.jpg")} />
              <img src={require("../../assets/cursos/curso6.jpg")} />
              <img src={require("../../assets/cursos/curso7.jpg")} />
              <img src={require("../../assets/cursos/curso8.jpg")} />
              <img src={require("../../assets/cursos/curso9.jpg")} />
              <img src={require("../../assets/cursos/curso10.jpg")} />
              <img src={require("../../assets/cursos/curso11.jpg")} />
            </article>
          </div>
        </section>
        {/* Novedades */}
        <section className="galeria">
          <div className="contenedor last-section">
            <div className="contenedor-textos-main">
              <h2 className="titulo left">NOVEDADES</h2>
              <div className="contenedor-galeria">
                <div className="contenedor-parrafos">
                  <h3>CarWash - Lavado Automovil</h3>
                  <p className="parrafo">
                    Realizamos lavado y aspirado de tu vehiculo todos los días
                    domingos desde las 10:00hrs hasta las 17:00hrs en nuestra
                    estacion, asi para poder cubrir gastos operativos.
                  </p>
                  <h3>Curso de Buceo Técnico de Rescate</h3>
                  <p className="parrafo">
                    Bomberos Voluntarios UUBR cuenta oficialmente con 8 nuevos
                    buzos de rescate, quienes recibieron su certificación, de
                    acuerdo a las normas NFPA, el sábado 25 de abril en
                    instalaciones del COED departamental. El acto de graduación
                    del primer curso interinstitucional de buceo técnico contó
                    con 26 buzos, 3 nuevos instructores y 4 instructores re
                    certificados entre ellos uno de UUBR.
                  </p>
                  <h3>Firma de Convenio con el Gobierno de Warnes</h3>
                  <p className="parrafo">
                    Pronto Centro de Entrenamiento en la Zona Próxima al
                    Parque Industrial
                  </p>
                  <h3>Campaña Camiri Somos Todos</h3>
                  <p className="parrafo">
                    Nuestro destacamento UUBR Camiri sigue recaudando para
                    comprar su primer camion bomba.
                  </p>
                </div>

                <div className="galeria-novedades">
                  <img src={require("../../assets/novedades/novedad1.jpg")} />
                  <img src={require("../../assets//novedades/warnes.jpg")} />
                  <img src={require("../../assets/novedades/camiri.jpg")} />
                  <img src={require("../../assets/novedades/buceo.jpg")} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="svg-wave" style={{ height: "150px", overflow: "hidden" }}>
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              style={{ height: "100%", width: "100%" }}
            >
              <path
                d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style={{ stroke: "none", fill: "#000000" }}
              ></path>
            </svg>
          </div> */}
        </section>
      </div>

      <footer>
        <section className="cards contenedor">
          <div className="content-cards-info">
            <article className="card_info">
              <h2 className="titulo">CONTÁCTANOS</h2>
              <div className="content-cards-redes">
                <article className="card_redes">
                  <a
                    href="https://www.facebook.com/UUBR.Bolivia/"
                    target="blank"
                  >
                    <i className="fa-brands fa-facebook"></i>
                    <h3>Facebook</h3>
                  </a>
                </article>
                <article className="card_redes">
                  <a
                    href="https://www.instagram.com/uubrbomberos/"
                    target="blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                    <h3>Instagram</h3>
                  </a>
                </article>
                <article className="card_redes">
                  <a
                    href="https://api.whatsapp.com/send?phone=59178187734"
                    target="blank"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <h3>Whatsapp</h3>
                  </a>
                </article>
                <article className="card_redes">
                  <a href="https://www.tiktok.com/@uubrbomberos" target="blank">
                    <i className="fa-brands fa-tiktok"></i>
                    <h3>Tik Tok</h3>
                  </a>
                </article>
                <article className="card_redes">
                  <a
                    href="https://www.youtube.com/channel/UCp4D3bdmFsLE0k84fOLI7xw"
                    target="blank"
                  >
                    <i className="fa-brands fa-youtube"></i>
                    <h3>Youtube</h3>
                  </a>
                </article>
                <article className="card_redes">
                  <a
                    href="https://maps.app.goo.gl/b7T1Kzvgu9QiaBtYA"
                    target="blank"
                  >
                    <i className="fa-solid fa-location-dot"></i>
                    <h3>Ubicación</h3>
                  </a>
                </article>
              </div>
              <div className="content-cards-redes" target="blank">
                <h2 className="emergencia">
                  Llama al 123 en caso de emeregencia
                </h2>
              </div>
            </article>
            <article className="card_donacion">
              <h2>Ayudanos con una Donación</h2>
              <a
                href="https://api.whatsapp.com/send?phone=59178187734"
                target="blank"
              >
                Contactar Aqui
              </a>
            </article>
          </div>
        </section>
      </footer>
    </>
  );
};
export default LandingPage;
