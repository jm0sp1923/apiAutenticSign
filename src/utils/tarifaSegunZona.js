// Definir las tarifas para las diferentes zonas
const tarifaZonaCentro = 2.16; // Tarifa para la zona centro (Bogotá D.C.)
const tarifaZonaRegular = 1.72; // Tarifa para la zona regular (otras ciudades)

// Función para calcular la tarifa según la ciudad inmobiliaria
function calcularTarifa(ciudad_inmobiliaria) {
  // Si la ciudad es "Bogotá D.C.", se devuelve la tarifa de la zona centro
  if (ciudad_inmobiliaria == "Bogotá D.C.") {
    return tarifaZonaCentro;
  }
  // Si no es Bogotá D.C., se devuelve la tarifa de la zona regular
  else {
    return tarifaZonaRegular;
  }
}

// Exportar la función para su uso en otros módulos
export default calcularTarifa;
