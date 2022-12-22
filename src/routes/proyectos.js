const express = require("express");
const router = express.Router();

const con = require("../db");

router.get("/api/proyectos", (req, res) => {
   con.query(" SELECT * FROM proyectos", (err, rows, fields) => {
      if (!err) {
         res.json(rows);
      } else {
         console.log(err);
      }
   });
});

router.get("/api/proyectos/:id", (req, res) => {
   const id = req.params.id;
   con.query(
      " SELECT * FROM proyectos WHERE id_proyecto= ?",
      [id],
      (err, result) => {
         if (!err) {
            res.json(result[0]);
         } else {
            console.log(err);
         }
      }
   );
});

//Ruta para insertar un nuevo poryecto
router.post("/api/proyectos", (req, res) => {
   const {
      nombre_proyecto,
      tipo_proyecto,
      descripcion_proyecto,
      fechaini,
      fechafin
   } = req.body;
   con.query(
      "INSERT INTO proyectos (nombre_proyecto, tipo_proyecto, descripcion_proyecto, fechaini, fechafin) VALUES (?, ?, ?, ?, ?)",
      [
         nombre_proyecto, tipo_proyecto, descripcion_proyecto, fechaini, fechafin
      ],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({
            message: "Proyecto creado exitosamente",
            id: results.insertId,
         }); */
         con.query(" SELECT * FROM proyectos", (err, rows, fields) => {
            if (!err) {
               res.json({
                  proyectos: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

//Para actualizar los datos de un proyecto
router.put("/api/proyectos/:id", (req, res) => {
   const id = req.params.id;
   const {
      nombre_proyecto, tipo_proyecto, descripcion_proyecto, fechaini, fechafin
   } = req.body;
   con.query(
      "UPDATE proyectos SET nombre_proyecto = ?, tipo_proyecto = ?, descripcion_proyecto = ?, fechaini = ?, fechafin = ? WHERE id_proyecto = ?",
      [
         nombre_proyecto, tipo_proyecto, descripcion_proyecto, fechaini, fechafin, id
      ],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({ message: "Proyecto actualizado exitosamente" }); */
         con.query(" SELECT * FROM proyectos", (err, rows, fields) => {
            if (!err) {
               res.json({
                  proyectos: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

//Ruta para eliminar un proyect
router.delete("/api/proyectos/:id", (req, res) => {
   const id = req.params.id;
   con.query("DELETE FROM proyectos WHERE id_proyecto = ?", [id], (error, results) => {
      if (error) {
         res.status(500).json({ message: error.message });
         return;
      }
      /* res.json({ message: "Proyecto eliminado exitosamente" }); */
      con.query(" SELECT * FROM proyectos", (err, rows) => {
         if (!err) {
            res.json({
               message: "Proyecto eliminado exitosamente",
               proyectos: rows
            });
         } else {
            console.log(err);
         }
      });
   });
});

module.exports = router;
