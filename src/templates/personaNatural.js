const personaNaturalTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => ({
  sendCompletionNotification: true,
  emailForNotification: "juan.rodriguez@affi.net",
  processesTemplate: [
    {
      enterpriseId: "9000533702",
      senderEmail: "juan.rodriguez@affi.net",
      senderIdentification: "1144203293",
      idTemplate: "14ec0252",
      filenames: [
        "CONTRATO_FIANZA_COLECTIVA.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf"
      ],
      ensambled: {
        "form-field-i3ehg": datos.numero_de_contrato,
        "form-field-vuogh": datos.nombre_persona_natural + ",",
        "form-field-t9d0g": datos.ciudad_inmobiliaria,
        "form-field-ve1uv": datos.cedula + ",",
        "form-field-bow9n": datos.ciudad_inmobiliaria + ",",
        "form-field-gpx3i": datos.ciudad_inmobiliaria + ",",
        "form-field-e5v0q": tarifa_segun_zona,
        "form-field-hx0we": datos.ciudad_inmobiliaria + ".",
        "form-field-cupmr": fecha + ".",
        "form-field-73t4d": datos.nombre_representante_legal,
        "form-field-9tkjk": datos.cedula_representante_legal,
        "form-field-7a6yv": datos.nombre_establecimiento_comercio,
      },
      message: "",
      signers: [
        {
          name: datos.nombre_representante_legal,
          lastName: "",
          identification: datos.cedula_representante_legal,
          email: datos.correo,
          phone: datos.numero_celular || "",
          roleTemplate: "cliente",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.comercial.name,
          lastName: firmantes.comercial.last_name,
          identification: firmantes.comercial.cc.toString(),
          email: firmantes.comercial.email,
          phone: "",
          roleTemplate: "comercial",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.gerencia.name,
          lastName: firmantes.gerencia.last_name,
          identification: firmantes.gerencia.cc.toString(),
          email: firmantes.gerencia.email,
          phone: "",
          roleTemplate: "gerencia",
          authMethods: ["OTP"],
        }
      ]
    },
  ],
});

export default personaNaturalTemplate;

