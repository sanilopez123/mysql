import { Request, Response } from 'express';
import db from '../config/db';
import { QueryTypes } from 'sequelize';

export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await db.query('SELECT * FROM category', {
            type: QueryTypes.SELECT
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await db.query('SELECT * FROM category WHERE id_categoria = ?', {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    const { categoria } = req.body;
    try {
        await db.query('INSERT INTO category (categoria) VALUES (?)', {
            replacements: [categoria],
            type: QueryTypes.RAW
        });
        res.json({ message: 'Category created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating category' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { categoria } = req.body;
    try {
        await db.query('UPDATE category SET categoria = ? WHERE id_categoria = ?', {
            replacements: [categoria, req.params.id],
            type: QueryTypes.RAW
        });
        res.json({ message: 'Category updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating category' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await db.query('DELETE FROM category WHERE id_categoria = ?', {
            replacements: [req.params.id],
            type: QueryTypes.RAW
        });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category' });
    }
};
