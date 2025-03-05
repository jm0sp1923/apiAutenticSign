import axios from "axios";
import fs from "fs";
import path from "path";

async function descargarArchivos(archivos) {
  for (const archivo of archivos) {
    const { name, url } = archivo;

    try {
      console.log(`Descargando: ${name}`);
      const response = await axios.get(url, { responseType: "stream" });

      const filePath = path.join(process.cwd(), "..", name);
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      console.log(`Descarga completa: ${filePath}`);
    } catch (error) {
      console.error(`Error al descargar ${name}:`, error.message);
    }
  }
}

// Supongamos que esta es la respuesta de `consultarArchivo()`
const archivos = [
  {
    idFile: "671bffde-9a41-4790-8649-5b2f2d5d23be",
    name: "MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf",
    url: "https://autentic-sign-signed-docs-test.s3.us-west-2.amazonaws.com/1109184891/191be6d1/MODELO_CONTRATO_FIANZA_COLECTIVA_PERSONA_JURIDICA.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjvONutLyeO23wKdTmJXVI6yWNOQMfeTwgoftmwsFRGgIhAIMM1dnUlFSeolObarH3m58q2ildUwpeMVfYjOlbtq7tKvYCCBoQAxoMMjM3MDMyMTM5ODM3IgylvJrMbqy3t3TH%2Fdcq0wLq4KvG74SRa4DCXTuJ3z62361iLX7vPaC1VLwhZjVMkGh7BdLW17%2FKmZasGQVB0vD9FSfUshz%2Fs1%2BdRIl8mRPsr59NhZoWe4zWMPCdz479pRGJdINC9joFRH06HVGZKl%2F%2BLQWjsSxBwkT9gcZh9wo8ZMkLlP11VBFNTfJD6cVCht%2FzL%2F7mWyAsQO5hhUNJgXbyx0rxfStS%2BUaynDN3p3tkYCdJRq0%2BIw24IRFJP2RutLu8pqANPeYbSfOicOkaIoUpxh47IYENSGqGDUD9FB1LaXeJltRdF9xIGDvZ9Jrgb2XjWewfJXDpLYX5INjapc%2FGn12cJDBkZ%2FAhJwHS7DmBtvWECQkKGWnpbOgJ5ajg%2FEAyYFtfHmRN29DZT4H6gwNDPrZwZx2VtuIPqInynu47BieMjGVuT29%2BDKlg23it2Q4IXVPvJJhfIZoqUZmzviAhk%2BIw%2FYCivgY6nQE3hviVn581gqtz6nrPdvYDgPForbL2nKxn9E2yRBe9F7nz232TAfsHmI5R2WxdDOIXEKQT7SC%2BGCJr%2B4vGF3pF4XqsOu6JTGh6gV93SNDf9HTiVvl8WVmf7A6U2OYFgKwvN1CZlTQjB6wXvxi3sxOauta%2BKCR95WUit4RnyFdZSdbPs2DGnEinS96i32cE9vEwv0ETBOHjem23pnnk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250305T174824Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATOMBXNQ6ZENZNIK2%2F20250305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=17d1069bba5e306a17c4ac8800c2c2df8b2ed0e2282645354f82df992bdc98eb", 
    status: "Firmado",
  },
  {
    idFile: "28a71a41-73ad-4d1c-bb24-2e023d61aed2",
    name: "REGLAMENTO_DE_FIANZA_AFFI_8.pdf",
    url: "https://autentic-sign-signed-docs-test.s3.us-west-2.amazonaws.com/1109184891/191be6d1/REGLAMENTO_DE_FIANZA_AFFI_8.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDjvONutLyeO23wKdTmJXVI6yWNOQMfeTwgoftmwsFRGgIhAIMM1dnUlFSeolObarH3m58q2ildUwpeMVfYjOlbtq7tKvYCCBoQAxoMMjM3MDMyMTM5ODM3IgylvJrMbqy3t3TH%2Fdcq0wLq4KvG74SRa4DCXTuJ3z62361iLX7vPaC1VLwhZjVMkGh7BdLW17%2FKmZasGQVB0vD9FSfUshz%2Fs1%2BdRIl8mRPsr59NhZoWe4zWMPCdz479pRGJdINC9joFRH06HVGZKl%2F%2BLQWjsSxBwkT9gcZh9wo8ZMkLlP11VBFNTfJD6cVCht%2FzL%2F7mWyAsQO5hhUNJgXbyx0rxfStS%2BUaynDN3p3tkYCdJRq0%2BIw24IRFJP2RutLu8pqANPeYbSfOicOkaIoUpxh47IYENSGqGDUD9FB1LaXeJltRdF9xIGDvZ9Jrgb2XjWewfJXDpLYX5INjapc%2FGn12cJDBkZ%2FAhJwHS7DmBtvWECQkKGWnpbOgJ5ajg%2FEAyYFtfHmRN29DZT4H6gwNDPrZwZx2VtuIPqInynu47BieMjGVuT29%2BDKlg23it2Q4IXVPvJJhfIZoqUZmzviAhk%2BIw%2FYCivgY6nQE3hviVn581gqtz6nrPdvYDgPForbL2nKxn9E2yRBe9F7nz232TAfsHmI5R2WxdDOIXEKQT7SC%2BGCJr%2B4vGF3pF4XqsOu6JTGh6gV93SNDf9HTiVvl8WVmf7A6U2OYFgKwvN1CZlTQjB6wXvxi3sxOauta%2BKCR95WUit4RnyFdZSdbPs2DGnEinS96i32cE9vEwv0ETBOHjem23pnnk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250305T174824Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATOMBXNQ6ZENZNIK2%2F20250305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=4187697b48231bb01286b8e463ebe58b0f9b5315c49eee6e325293281aabcc80",
    status: "Firmado",
  },
];

// Llamar la función para descargar los archivos
descargarArchivos(archivos);
