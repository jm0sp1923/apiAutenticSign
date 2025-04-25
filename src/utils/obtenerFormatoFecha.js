// Función que obtiene la fecha en un formato personalizado
function obtenerFechaFormato() {
    // Arreglo con los nombres de los meses en español
    const meses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    // Arreglo con los nombres de los números del 0 al 31 en texto
    const numerosTexto = [
        "Cero", "Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve",
        "Diez", "Once", "Doce", "Trece", "Catorce", "Quince", "Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve",
        "Veinte", "Veintiuno", "Veintidós", "Veintitrés", "Veinticuatro", "Veinticinco", "Veintiséis", "Veintisiete", "Veintiocho", "Veintinueve",
        "Treinta", "Treinta y uno"
    ];

    // Obtener la fecha actual
    const hoy = new Date();
    // Obtener el día del mes (número)
    const dia = hoy.getDate();
    // Obtener el mes actual (en texto)
    const mes = meses[hoy.getMonth()];
    // Obtener el año actual
    const año = hoy.getFullYear();

    // Convertir el día en número a su texto correspondiente
    const diaTexto = numerosTexto[dia];

    // Retornar la fecha en el formato "Día en texto (Día en número) Mes de Año"
    return `${diaTexto} (${dia}) ${mes} de ${año}`;
}

// Exportar la función para ser utilizada en otros archivos
export default obtenerFechaFormato;
