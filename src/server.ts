import app from './app';
import './config/db'; // Importamos la configuración de la base de datos

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
