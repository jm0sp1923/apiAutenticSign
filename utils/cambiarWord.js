import { spawn } from "child_process";

function cambiarWord(data) {
    return new Promise((resolve, reject) => {
      try {
        // Convertimos a JSON
        const jsonData = JSON.stringify(data);
  
        // Ejecutamos el script Python
        const pythonProcess = spawn("python3", ["utils/cambiarWord.py"]);
  
        // Enviar los datos a Python a través de `stdin`
        pythonProcess.stdin.write(jsonData);
        pythonProcess.stdin.end();
  
        // Capturar la salida de `stdout`
        let base64Data = "";
        let errorData = "";
  
        pythonProcess.stdout.on("data", (data) => {
          base64Data += data.toString();
        });
  
        pythonProcess.stderr.on("data", (data) => {
          errorData += data.toString();
        });
  
        pythonProcess.on("close", (code) => {
          if (errorData) {
            console.error("Python Error:", errorData.trim());  // Log Python errors
            reject(`Error en Python: ${errorData.trim()}`);
          } else if (code === 0) {
            resolve(base64Data.trim()); // ✅ Resuelve la promesa con el PDF en Base64
          } else {
            reject(`Python salió con código ${code}`);
          }
        });
      } catch (error) {
        console.error("Error in cambiarWord:", error.message);  // Log the error in cambiarWord
        reject(`Error en cambiarWord: ${error.message}`);
      }
    });
  }
  

export default cambiarWord;
