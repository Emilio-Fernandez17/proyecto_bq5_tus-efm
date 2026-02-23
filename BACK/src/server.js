require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 API funcionando en http://localhost:${PORT}`);
    console.log(`🔍 Health: http://localhost:${PORT}/api/health`);
    console.log(`🚗 Coches: http://localhost:${PORT}/api/coches`);
    console.log(`📸 Imágenes servidas en: http://localhost:${PORT}/img/`);
});