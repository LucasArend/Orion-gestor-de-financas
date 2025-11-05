const { exec } = require("child_process");
const path = require("path");
const os = require("os");

const backendPath = path.join(__dirname, "../backend/cadastroUsuario");
const isWin = os.platform() === "win32";
const mvnCommand = isWin ? "mvnw.cmd" : "./mvnw";

const child = exec(`${mvnCommand} spring-boot:run`, { cwd: backendPath });

child.stdout.on("data", (data) => console.log(`[BACKEND]: ${data}`));
child.stderr.on("data", (data) => console.error(`[BACKEND ERROR]: ${data}`));

child.on("close", (code) => {
  console.log(`[BACKEND] Processo finalizado com código ${code}`);
});
