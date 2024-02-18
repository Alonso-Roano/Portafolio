import "./App.css";
import React, { useState, useEffect } from "react";

export default function Slider({ borroso, imagenes }) {
    const [tamaño, setTamaño] = useState(0);
    const [contador, setContador] = useState(0);
    const [boton, setBoton] = useState(true);

    useEffect(() => {
        definir(Object.keys(imagenes).length)
    }, []);

    function habilitar() {
        setBoton(true);
    }

    const izquierda = () => {
        if (boton) {
            let newContador = contador - 1;
            if (newContador < 0) {
                newContador = tamaño - 1;
            }
            setContador(newContador);
            setBoton(false);
            setTimeout(habilitar, 750);
        }
    };

    const derecha = () => {
        console.log(boton)
        if (boton) {
            let newContador = contador + 1;
            if (newContador >= tamaño) {
                newContador = 0;
            }
            setContador(newContador);
            setBoton(false);
            setTimeout(habilitar, 750);
        }
    };

    const definir = (tamaños) => {
        setTamaño(tamaños);
    };

    return (
        <>
            <div onClick={() => { borroso(); }} className="borroso"></div>
            <article className="slider">
                <div onClick={izquierda} className="izquierda"><i className="nf nf-fa-chevron_circle_left"></i></div>
                <span style={{width:`calc(100% * ${tamaño})` ,transform: `translate(-${(100 / tamaño) * contador}%)`, transition: "all ease 0.75s" }} className="carril">
                    {Object.keys(imagenes).map((clave, index) => (
                        <section key={index} style={{ width: `calc(100% / ${tamaño})` }} className="mod">
                            <img
                                src={imagenes[clave]}
                                alt={`Imagen ${clave}`}
                            />
                        </section>
                    ))}
                </span>
                <div onClick={derecha} className="derecha"><i className="nf nf-fa-chevron_circle_right"></i></div>
            </article>
            <p className="galeria" onClick={() => { borroso(); }}>Desliza para ver el resto de imagenes</p>
            <article className="slider2">
            <div onClick={derecha} className="derecha"><i className="nf nf-fa-chevron_circle_right"></i></div>
                {Object.keys(imagenes).map((clave, index) => (<img
                                src={imagenes[clave]}
                                alt={`Imagen ${clave}`}
                            />
                    ))}
            </article>
        </>
    );
}
