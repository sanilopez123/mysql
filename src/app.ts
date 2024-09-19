import express, { Application } from 'express';
import { corsMiddleware } from './middlewares/cors'; // Aquí el archivo cors.ts
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import supplierRoutes from './routes/supplierRoutes';

const app: Application = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/suppliers', supplierRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('Servidor cargado correctamente');
  });

export default app;

