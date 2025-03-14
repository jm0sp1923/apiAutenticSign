const tarifaZonaCentro = 2.16
const tarifaZonaRegular = 1.72

function calcularTarifa(ciudad_inmobiliaria) {
  if (ciudad_inmobiliaria == "Bogotá D.C.") {
    return tarifaZonaCentro
  }
    else return tarifaZonaRegular
}

export default calcularTarifa;