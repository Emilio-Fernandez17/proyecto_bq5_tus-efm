const express = require("express");
const router = express.Router();
const { query } = require("../db");

// RUTA 1: GET /api/coches - Todos los coches
router.get("/", async (req, res) => {
    try {
        const result = await query(`
            SELECT 
                id AS "id",
                marca AS "marca",
                modelo AS "modelo",
                categoria AS "categoria",
                anio AS "anio",
                precio AS "precio",
                motor AS "motor",
                potencia AS "potencia",
                combustible AS "combustible",
                transmision AS "transmision",
                imagen AS "imagen",
                descripcion AS "descripcion"
            FROM coches
            ORDER BY marca, modelo
        `);

        res.json(result.rows);
    } catch (e) {
        console.error('❌ Error en GET /:', e);
        res.status(500).json({
            error: "Error listando coches",
            details: e.message,
        });
    }
});

// RUTA 2: GET /api/coches/categorias - Lista de categorías
router.get("/categorias", async (req, res) => {
    try {
        const result = await query(`
            SELECT DISTINCT categoria AS "categoria"
            FROM coches
            ORDER BY categoria
        `);

        res.json(result.rows.map(r => r.categoria));
    } catch (e) {
        console.error('❌ Error en /categorias:', e);
        res.status(500).json({
            error: "Error listando categorías",
            details: e.message,
        });
    }
});

// RUTA 3: GET /api/coches/categoria/:categoria - Filtrar por categoría
router.get("/categoria/:categoria", async (req, res) => {
    try {
        const categoria = req.params.categoria;
        console.log('🔍 Buscando categoría:', categoria);

        // ✅ CORREGIDO: Usar :1 en lugar de :categoria
        const result = await query(`
            SELECT 
                id AS "id",
                marca AS "marca",
                modelo AS "modelo",
                categoria AS "categoria",
                anio AS "anio",
                precio AS "precio",
                motor AS "motor",
                potencia AS "potencia",
                combustible AS "combustible",
                transmision AS "transmision",
                imagen AS "imagen",
                descripcion AS "descripcion"
            FROM coches
            WHERE LOWER(categoria) = LOWER(:1)
            ORDER BY marca, modelo
        `, [categoria]);

        console.log('✅ Resultados encontrados:', result.rows.length);
        res.json(result.rows);
    } catch (e) {
        console.error('❌ Error en /categoria:', e);
        res.status(500).json({
            error: "Error filtrando por categoría",
            details: e.message,
        });
    }
});

// RUTA 4: GET /api/coches/marca/:marca - Filtrar por marca
router.get("/marca/:marca", async (req, res) => {
    try {
        const marca = req.params.marca;
        console.log('🔍 Buscando marca:', marca);

        const result = await query(`
            SELECT 
                id AS "id",
                marca AS "marca",
                modelo AS "modelo",
                categoria AS "categoria",
                anio AS "anio",
                precio AS "precio",
                motor AS "motor",
                potencia AS "potencia",
                combustible AS "combustible",
                transmision AS "transmision",
                imagen AS "imagen",
                descripcion AS "descripcion"
            FROM coches
            WHERE LOWER(marca) LIKE LOWER('%' || :1 || '%')
            ORDER BY modelo
        `, [marca]);

        console.log('✅ Resultados encontrados:', result.rows.length);
        res.json(result.rows);
    } catch (e) {
        console.error('❌ Error en /marca:', e);
        res.status(500).json({
            error: "Error filtrando por marca",
            details: e.message,
        });
    }
});

// RUTA 5: GET /api/coches/search?q=:term - Búsqueda por término
router.get("/search", async (req, res) => {
    try {
        const searchTerm = req.query.q;
        console.log('🔎 Término de búsqueda:', searchTerm);

        if (!searchTerm) {
            return res.status(400).json({ error: "Debe proporcionar un término de búsqueda" });
        }

        // ✅ VERSIÓN CORREGIDA - Sin placeholders duplicados
        // Usamos UPPER y concatenamos directamente en la consulta
        const term = searchTerm.toUpperCase();
        
        const result = await query(`
            SELECT 
                id AS "id",
                marca AS "marca",
                modelo AS "modelo",
                categoria AS "categoria",
                anio AS "anio",
                precio AS "precio",
                motor AS "motor",
                potencia AS "potencia",
                combustible AS "combustible",
                transmision AS "transmision",
                imagen AS "imagen",
                descripcion AS "descripcion"
            FROM coches
            WHERE UPPER(marca) LIKE UPPER('%${term}%')
               OR UPPER(modelo) LIKE UPPER('%${term}%')
            ORDER BY marca, modelo
        `);

        console.log('✅ Resultados encontrados:', result.rows.length);
        res.json(result.rows);
    } catch (e) {
        console.error('❌ Error en /search:', e);
        res.status(500).json({
            error: "Error en la búsqueda",
            details: e.message,
        });
    }
});

module.exports = router;