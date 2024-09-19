import { Request, Response } from 'express';
import db from '../config/db';
import { QueryTypes } from 'sequelize';

// Obtener todos los productos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await db.query('SELECT * FROM products', {
      type: QueryTypes.SELECT
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id); // Convertir el ID a número
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const product = await db.query('SELECT * FROM products WHERE id = ?', {
      replacements: [id],
      type: QueryTypes.SELECT
    });

    if (product.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product[0]); // Retornar el primer elemento
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { descripcion, unid_medida, id_categoria, id_provedor, costo, precio, stock } = req.body;

    const result = await db.query(
      'INSERT INTO products (descripcion, unid_medida, id_categoria, id_provedor, costo, precio, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
      {
        replacements: [descripcion, unid_medida, id_categoria, id_provedor, costo, precio, stock],
        type: QueryTypes.RAW
      }
    );

    res.status(201).json({ message: 'Producto creado', productId: (result as any).insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creando el producto' });
  }
};

// Actualizar un producto existente
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const { descripcion, unid_medida, id_categoria, id_provedor, costo, precio, stock } = req.body;

    const [result] = await db.query(
      'UPDATE products SET descripcion = ?, unid_medida = ?, id_categoria = ?, id_provedor = ?, costo = ?, precio = ?, stock = ? WHERE id = ?',
      {
        replacements: [descripcion, unid_medida, id_categoria, id_provedor, costo, precio, stock, id],
        type: QueryTypes.RAW
      }
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado' });
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando el producto' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const [result] = await db.query('DELETE FROM products WHERE id = ?', {
      replacements: [id],
      type: QueryTypes.RAW
    });

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando el producto' });
  }
};
