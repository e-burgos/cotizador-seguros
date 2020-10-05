// Obtiene la diferencia de años
export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
};

// Calcular el incremento segun marca
export function calcularMarca(marca) {
    let incremento; 

    switch(marca) {
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        default:
            break;
    }

    return incremento;
}

// Calular el incremento segun plan
export function calcularPlan(plan) {
    let incremento;

    if(plan === 'basico'){
        incremento = 1.20;
    } else {
        incremento = 1.50;
    }

    return incremento;
}

// Muestra la primera letra mayuscula
export function primerMayuscula(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}