import { Request, Response } from 'express';
import db from '../config/db';
import { QueryTypes } from 'sequelize';

export const getAllSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await db.query('SELECT * FROM supplier', {
            type: QueryTypes.SELECT
        });
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching suppliers' });
    }
};

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await db.query('SELECT * FROM supplier WHERE id = ?', {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching supplier' });
    }
};

export const createSupplier = async (req: Request, res: Response) => {
    const { nombre, direccion, telefono } = req.body; // Corrige 'dirrecion' a 'direccion'
    try {
        await db.query('INSERT INTO supplier (nombre, direccion, telefono) VALUES (?, ?, ?)', {
            replacements: [nombre, direccion, telefono],
            type: QueryTypes.RAW
        });
        res.json({ message: 'Supplier created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating supplier' });
    }
};

export const updateSupplier = async (req: Request, res: Response) => {
    const { nombre, direccion, telefono } = req.body; // Corrige 'dirrecion' a 'direccion'
    try {
        await db.query('UPDATE supplier SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', {
            replacements: [nombre, direccion, telefono, req.params.id],
            type: QueryTypes.RAW
        });
        res.json({ message: 'Supplier updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating supplier' });
    }
};

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        await db.query('DELETE FROM supplier WHERE id = ?', {
            replacements: [req.params.id],
            type: QueryTypes.RAW
        });
        res.json({ message: 'Supplier deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting supplier' });
    }
};
