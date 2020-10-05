import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helpers';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    -webkit-appearance: none;
`;

const ImputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    margin-top: 2rem;
    transition: background-color .3s ease-in-out;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    border-radius: 5px;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    // Inicializamos State de datos de formulario
    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });
    // Inicializamos State de error para validacion de formulario
    const [ error, guardarError ] = useState(false);

    // extraemos los datos del State
    const { marca, year, plan } = datos;

    // Obtener informacion del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    // Validamos cuando el usuario presiona submit 
    const cotizarSeguro = e => {
        e.preventDefault();

        // Validamos que ningun campo este vacio
        if( marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }

        // Cambiamos el State en caso que todos los campos esten con datos
        guardarError(false);

        // Asignamos una base al valor del seguro
        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        // Por cada año hay que restar un 3%
        resultado -= (( diferencia * 3 ) * resultado) / 100;

        // Calcular incremento segun marca Asiatico 5%, Americano 15%, Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        
        // Calular incremento segun plan, Básico: 20% y Completo: 50%
        const incrementoPlan = calcularPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
        
        // Al hacer un nuevo calculo se muestra el Spinner ya que guardarCargando para a true
        guardarCargando(true);

        setTimeout(() => {

            // Luego de 2 seg desactivamos el Spinner asignando false a guardarCargando
            guardarCargando(false);

            // Colocamos los datos obtenidos donde es state guardarResumen 
            guardarResumen({
                cotizacion: Number(resultado),
                datos // datos ya es un objeto que contiene los datos del formulario
            });
        }, 2000);

    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="asiatico">Asiatico</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Tipo</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                <option value="">Seleccione un opción</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <ImputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Básico
                <ImputRadio 
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>
            <Button type="submit">Cotizar</Button>
        </form>
    );
}

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;