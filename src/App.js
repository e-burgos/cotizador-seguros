import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
  border-radius: 0 0 10px 10px;
`;

function App() {

  // Inicializamos un state para guardar la cotizacion y ls datos obtenido (dentro de un objeto)
  const [ resumen, guardarResumen ] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  const [ cargando, guardarCargando ] = useState(false);

  // Extraer datos 
  const {cotizacion, datos} = resumen;
  

  return (
    <Contenedor>
      <Header 
        titulo='Cotizador de Seguros'
      />
      <ContenedorFormulario>
        <Formulario
        guardarResumen={guardarResumen}
        guardarCargando={guardarCargando}
        />
        <Resumen
        datos={datos}
        />
        { cargando ? <Spinner/> : null }
        { !cargando ?
            <Resultado
            cotizacion={cotizacion}
            />
          : null 
        }
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
