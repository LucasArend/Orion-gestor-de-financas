import bcrypt from "bcryptjs";

const password = "password123";
const newHash = bcrypt.hashSync(password, 10);
console.log("Novo hash:", newHash);
