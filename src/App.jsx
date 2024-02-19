import React, { useEffect, useState } from 'react'
import './App.css';
import { textosPorIdioma } from './textos';
import toast, { Toaster } from 'react-hot-toast';
import { imagenes } from './imagenes';
import Slider from './Slider';

function App() {
  const [menu, setMenu] = useState("");
  const [ocultar, setOcultar] = useState(true);
  const [slide, setSlide] = useState(false);
  const [idioma, setIdioma] = useState('es');
  const [ima, setIma] = useState(imagenes.Autorito);
  useEffect(() => {
    let timeoutId = null;
    const saludo = textosPorIdioma[idioma].saludoInicial;
    const hola = saludo.split("");
    let saludo2 = "";
    function escribir(i) {
      if (i < hola.length) {
        saludo2 += hola[i];
        setMenu(saludo2);
        i++;
        timeoutId = setTimeout(() => {
          escribir(i);
        }, 175);
      }
    }
    escribir(0);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [idioma]);
  const [modo, setModo] = useState(true);

  const slider = () => {
    setOcultar((prevState) => !prevState);
  };
  
  const borrose = () => {
    setSlide((prevState) => !prevState);
  };
  const cambiarModo = () => {
    var root = document.documentElement;
    setModo(!modo);
    if (modo) {
      root.style.setProperty('--fondo', 'linear-gradient(to bottom right, #fff, #F1D8F7)');
      root.style.setProperty('--color-fondo', '#ddd5');
      root.style.setProperty('--color-titulo', '#763AD1');
      root.style.setProperty('--color-texto', '#0E071A');
      root.style.setProperty('--color-tarjeta', '#ddd4');
    } else {
      root.style.setProperty('--fondo', 'linear-gradient(to bottom right, #0F1626, #071738)');
      root.style.setProperty('--color-fondo', '#0F162655');
      root.style.setProperty('--color-titulo', '#01C9FD');
      root.style.setProperty('--color-texto', '#ddf1f6');
      root.style.setProperty('--color-tarjeta', '#1C2834');
    }

  }
  const cambiarIdioma = () => {
    setIdioma(idiomaActual => idiomaActual === 'es' ? 'en' : 'es');
  };

  const textos = textosPorIdioma[idioma]
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {slide && 
      <Slider borroso={borrose} imagenes={ima}></Slider>}
      <header className='encabezado'>
        <div className='icono'>
          <img src="/Imagenes/Icono.webp" alt='Icono de la pagina'/>
          <div>
            <span className='titulo'>{textos.titulo}</span>
            <span className='texto'>{textos.subtitulo}</span>
          </div>
        </div>
        <nav className='menu'>
          <ul>
            <li><a href='#inicio'>{textos.inicio}</a></li>
            <li><a href='#sobre'>{textos.sobreMi}</a></li>
            <li><a href='#Conocimientos'>{textos.conocimientos}</a></li>
            <li><a href='#proyectos'>{textos.proyectos}</a></li>
          </ul>
          <button className={`interruptor `} onClick={cambiarModo}>
            <i className={`nf ${modo ? "" : "nf-md-white_balance_sunny"}`}></i>
            <i className={`nf nf-fa-circle ${modo ? "dia" : "noche"}`}></i>
            <i className={`nf ${modo ? "nf nf-oct-moon" : ""}`}></i>
          </button>
          <button className={`interruptor `} onClick={cambiarIdioma}>
            <i >{idioma === 'es' ? "" : "EN"}</i>
            <i className={`nf nf-fa-circle ${idioma === 'es' ? "dia" : "noche"}`}></i>
            <i >{idioma === 'es' ? "ES" : ""}</i>
          </button>
        </nav>
        <nav className={`slide ${ocultar ? "ocultar" : ""}`}>
          <ul>
            <li><a href='#inicio'>{textos.inicio}</a></li>
            <li><a href='#sobre'>{textos.sobreMi}</a></li>
            <li><a href='#Conocimientos'>{textos.conocimientos}</a></li>
            <li><a href='#proyectos'>{textos.proyectos}</a></li>
          </ul>
          <button className={`interruptor `} onClick={() => { cambiarModo() }}>
            <i className={`nf ${modo ? "" : "nf-md-white_balance_sunny"}`}></i>
            <i className={`nf nf-fa-circle ${modo ? "dia" : "noche"}`}></i>
            <i className={`nf ${modo ? "nf nf-oct-moon" : ""}`}></i>
          </button>
          <button className={`interruptor `} onClick={() => { cambiarIdioma() }}>
            <i >{idioma === 'es' ? "" : "EN"}</i>
            <i className={`nf nf-fa-circle ${idioma === 'es' ? "dia" : "noche"}`}></i>
            <i >{idioma === 'es' ? "ES" : ""}</i>
          </button>
          <div className='iconos2'>
            <a href='https://www.linkedin.com/in/carlos-alonso-sánchez-roano-7b832b2b4' tabIndex="1"><i className="nf nf-md-linkedin" tabIndex="1"></i></a>
            <a href='https://github.com/Alonso-Roano' tabIndex="1"><i className="nf nf-cod-github_inverted" tabIndex="1"></i></a>
            <i className="nf nf-md-email" onClick={() => {
              const textoParaCopiar = "carlosroano201@gmail.com";
              navigator.clipboard.writeText(textoParaCopiar).then(function () {
                toast.success(textos.copiarCorreo)
              }).catch(function (error) {
                console.error('Error al intentar copiar al portapapeles: ', error);
              });
            }} tabIndex="1"></i>
            <i className="nf nf-md-phone" onClick={() => {
              const textoParaCopiar = "+52 235 103 5581";
              navigator.clipboard.writeText(textoParaCopiar).then(function () {
                toast.success(textos.copiarTelefono)
              }).catch(function (error) {
                console.error('Error al intentar copiar al portapapeles: ', error);
              });
            }} tabIndex="1"></i>
          </div>
        </nav>
        <i className={`nf ${ocultar ? "nf-md-menu" : "nf-oct-x"}`} onClick={() => { slider() }}></i>
      </header>
      <div className='scroll-watcher'></div>
      <main className='contenedor'>
        <header id='inicio'>
          <section>
            <div>
              <h1>{textos.h1} </h1>
              <hr />
              <p>{menu}<b className='cursor'>|</b></p>
              <a href='#proyectos' tabIndex="1">{textos.proyectos} </a>
            </div>
            <img src="/Imagenes/foto.webp" alt="foto de perfil" />
          </section>
        </header>
        <section className='sobre' id='sobre'>
          <div>
            <h2>{textos.sobreMi}</h2>
            <p>
              {textos.descripcion}
              <br />
              <br />
              <br></br>{textos.lema}</p>
          </div>
        </section>
        <section className='Conocimientos' id='Conocimientos'>
          <div>
            <h2>{textos.conocimientos}</h2>
            <p>{textos.textoConocimientos}</p>
            <div className='tarjetas'>
              <article>
                <h3>{textos.frontendTitulo}</h3>
                <p>{textos.frontend}</p><div>
                  <i className={`nf nf-dev-html5`}></i>
                  <i className={`nf nf-dev-css3`}></i>
                  <i className={`nf nf-dev-javascript_badge`}></i>
                  <i className={`nf nf-dev-react`}></i>
                  <i className={`nf nf-md-vuetify`}></i>
                  <i className={`nf nf-md-tailwind`}></i>
                </div>
              </article>
              <article>
                <h3>{textos.backendTitulo}</h3>
                <p>{textos.backend}</p><div>
                  <i className={`nf nf-md-nodejs`}></i>
                  <i className={`nf nf-dev-javascript`}></i>
                  <i className={`nf nf-dev-python`}></i>
                  <i className={`nf nf-seti-php`}></i>
                  <i className={`nf nf-dev-sqllite`}></i>
                </div>
              </article>
              <article>
                <h3>{textos.diseñoTitulo}</h3>
                <p>{textos.diseño}</p><div>
                  <i className={`nf nf-md-google_ads`}></i>
                  <i className={`nf nf-seti-photoshop`}></i>
                  <i className={`nf nf-md-google_circles_extended`}></i>
                </div>
              </article>
              <article>
                <h3>{textos.flujoTrabajoTitulo}</h3>
                <p>{textos.flujoTrabajo}</p>
                <div>
                  <i className={`nf nf-dev-git`}></i>
                  <i className={`nf nf-fa-github`}></i>
                  <i className={`nf nf-fa-star`}></i>
                  <i className={`nf nf-md-microsoft_word`}></i>
                  <i className={`nf nf-md-microsoft_powerpoint`}></i>
                  <i className={`nf nf-md-microsoft_excel`}></i>
                </div>
              </article>
            </div>

          </div>
        </section>
        <section className='Proyectos' >
          <div>
            <h2 id='proyectos'>{textos.proyectosTitulo}</h2>
            <p>{textos.proyectosTexto}</p>
            <div className='pantallas'>
              <article style={{ backgroundImage: `url('/Imagenes/Autorito/1.webp')` }} tabIndex="1">
                <span className='fondo' tabIndex="1">
                  <i className={`nf nf-md-eye`} onClick={()=>{setSlide(true),setIma(imagenes.Autorito)}}></i>
                  <div></div>
                  <div className='tecnologias'>
                    <img src="/Imagenes/html-icon.png" alt="HTML" />
                    <img src="/Imagenes/css-icon.png" alt="CSS" />
                    <img src="/Imagenes/php.png" alt="PHP" />
                    <img src="/Imagenes/apache-icon.webp" alt="apache" />
                  </div>
                  <div className='texto'>
                    <h4>Autorito</h4>
                    <p>{textos.Autorito}</p>
                  </div>
                </span>
              </article>
              <article style={{ backgroundImage: `url('/Imagenes/ToDo/1.webp')` }} tabIndex="1">
                <span className='fondo' tabIndex="1">
                  <i className={`nf nf-md-eye`} onClick={()=>{setSlide(true),setIma(imagenes.ToDo)}}></i>
                  <div></div>
                  <div className='tecnologias'>
                    <img src="/Imagenes/react-native.png" alt="React Native" />
                    <img src="/Imagenes/javascript.png" alt="JavaScript" />
                  </div>
                  <div className='texto'>
                    <h4>ToDo</h4>
                    <p>{textos.ToDo}</p>
                  </div>
                </span>
              </article>
              <article style={{ backgroundImage: `url('/Imagenes/Whatsapp/1.webp')` }} tabIndex="1">
                <span className='fondo' tabIndex="1">
                  <i className={`nf nf-md-eye`} onClick={()=>{setSlide(true),setIma(imagenes.WhatsApp)}}></i>
                  <div></div>
                  <div className='tecnologias'>
                    <img src="/Imagenes/flet.png" alt="Flet" />
                    <img src="/Imagenes/Python.png" alt="Python" />
                  </div>
                  <div className='texto'>
                    <h4>Whatsapp clon</h4>
                    <p>{textos.WhatsApp}</p>
                  </div>
                </span>
              </article>
              <article style={{ backgroundImage: `url('/Imagenes/Uturi/1.webp')` }} tabIndex="1">
                <span className='fondo' tabIndex="1">
                  <i className={`nf nf-md-eye`} onClick={()=>{setSlide(true),setIma(imagenes.Uturi)}}></i>
                  <div></div>
                  <div className='tecnologias'>
                    <img src="/Imagenes/react-icon.png" alt="React" />
                    <img src="/Imagenes/css-icon.png" alt="CSS" />
                    <img src="/Imagenes/node-icon.png" alt="Node" />
                    <img src="/Imagenes/mysql-icon.png" alt="MySQL" />
                    <img src="/Imagenes/git-icon.png" alt="MySQL" />
                  </div>
                  <div className='texto'>
                    <h4>Uturi</h4>
                    <p>{textos.Uturi}</p>
                  </div>
                </span>
              </article>
              <article style={{ backgroundImage: `url('/Imagenes/Melomix/1.webp')` }} tabIndex="1">
                <span className='fondo' tabIndex="1">
                  <i className={`nf nf-md-eye`} onClick={()=>{setSlide(true),setIma(imagenes.Melomix)}}></i>
                  <div></div>
                  <div className='tecnologias'>
                    <img src="/Imagenes/vite.svg" alt="Vite" />
                    <img src="/Imagenes/tailwind-icon.png" alt="Tailwind" />
                    <img src="/Imagenes/node-icon.png" alt="Node" />
                    <img src="/Imagenes/mysql-icon.png" alt="MySQL" />
                    <img src="/Imagenes/git-icon.png" alt="MySQL" />
                  </div>
                  <div className='texto'>
                    <h4>Melomix</h4>
                    <p>{textos.Melomix}</p>
                  </div>
                </span>
              </article>
              <article style={{ backgroundImage: `url('/Imagenes/ProyectManager/1.webp')` }} tabIndex="1">
                <span className='fondo' tabIndex="1">
                  <i className={`nf nf-md-eye`} onClick={()=>{setSlide(true),setIma(imagenes.ProjectManager)}}></i>
                  <div></div>
                  <div className='tecnologias'>
                    <img src="/Imagenes/react-icon.png" alt="React" />
                    <img src="/Imagenes/css-icon.png" alt="CSS" />
                    <img src="/Imagenes/node-icon.png" alt="Node" />
                    <img src="/Imagenes/mysql-icon.png" alt="MySQL" />
                    <img src="/Imagenes/git-icon.png" alt="MySQL" />
                  </div>
                  <div className='texto'>
                    <h4>Proyect Manager</h4>
                    <p>{textos.ProjectManager}</p>
                  </div>
                </span>
              </article>
            </div>

          </div>
        </section>
        <div className='iconos'>
          <a href='https://www.linkedin.com/in/carlos-alonso-sánchez-roano-7b832b2b4' tabIndex="1"><i className="nf nf-md-linkedin" tabIndex="1"></i></a>
          <a href='https://github.com/Alonso-Roano' tabIndex="1"><i className="nf nf-cod-github_inverted" tabIndex="1"></i></a>
          <i className="nf nf-md-email" onClick={() => {
            const textoParaCopiar = "carlosroano201@gmail.com";
            navigator.clipboard.writeText(textoParaCopiar).then(function () {
              toast.success(textos.copiarCorreo)
            }).catch(function (error) {
              console.error('Error al intentar copiar al portapapeles: ', error);
            });
          }} tabIndex="1"></i>
          <i className="nf nf-md-phone" onClick={() => {
            const textoParaCopiar = "+52 235 103 5581";
            navigator.clipboard.writeText(textoParaCopiar).then(function () {
              toast.success(textos.copiarTelefono)
            }).catch(function (error) {
              console.error('Error al intentar copiar al portapapeles: ', error);
            });
          }} tabIndex="1"></i>
        </div>

      </main>
      <footer></footer>
    </>
  )
}

export default App
