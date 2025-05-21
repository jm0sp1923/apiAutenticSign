const personaJuridicaTemplate = (datos, tarifa_segun_zona, fecha, firmantes) => (
  {

  sendCompletionNotification: true,
  emailForNotification: "juan.munoz@affi.net",
  processesTemplate: [
    {
      enterpriseId: "9000533702",
      senderEmail: "juan.rodriguez@affi.net",
      senderIdentification: "1144203293",
      idTemplate: "edb43739",
      filenames: [
        "MODELO_CONTRATO_FIANZA_COLECTIVA.pdf",
        "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
      ],
      ensambled: {
        "form-field-s9dds": datos.numero_de_contrato,
        "form-field-63tfk": datos.nombre_inmobiliaria + ",",
        "form-field-po2ah": datos.ciudad_inmobiliaria,
        "form-field-8wx2j": datos.nit_inmobiliaria,
        "form-field-k3vpy": datos.nombre_representante_legal,
        "form-field-b6zar": datos.cedula_representante_legal,
        "form-field-sakn9": datos.ciudad_expedicion,
        "form-field-lysx4": datos.ciudad_inmobiliaria,
        "form-field-4o6kb": datos.ciudad_inmobiliaria + ",",
        "form-field-bttda": tarifa_segun_zona,
        "form-field-l737f": datos.ciudad_inmobiliaria + ".",
        "form-field-yr90k": fecha + ".",
        "form-field-r6938": datos.nombre_representante_legal,
        "form-field-u6w6a": datos.cedula_representante_legal,
        "form-field-tdvui": datos.nombre_inmobiliaria,
        "form-field-jkg8c": datos.nit_inmobiliaria,
      },
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
          name: firmantes.comercial.name, // "Lilian Paola"
          lastName: firmantes.comercial.last_name, // "Holguín Orrego"
          identification: firmantes.comercial.cc.toString(),
          email: firmantes.comercial.email,
          phone: "",
          roleTemplate: "comercial",
          authMethods: ["OTP"],
        },
        {
          name: firmantes.gerencia.name, // "Cesar Augusto"
          lastName: firmantes.gerencia.last_name, // "Tezna Castaño"
          identification: firmantes.gerencia.cc.toString(),
          email: firmantes.gerencia.email,
          phone: "",
          roleTemplate: "gerencia",
          authMethods: ["OTP"],
        },
      ]
    },
  ],
});

export default personaJuridicaTemplate;