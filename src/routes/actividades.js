const express = require("express");
const router = express.Router();

const con = require("../db");

router.get("/api/actividades", (req, res) => {
   con.query(" SELECT * FROM actividades", (err, rows, fields) => {
      if (!err) {
         res.json(rows);
      } else {
         console.log(err);
      }
   });
});

router.get("/api/actividades/:id", (req, res) => {
   const id = req.params.id;
   con.query(
      " SELECT * FROM actividades WHERE id_actividad= ?",
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
router.post("/api/actividades", (req, res) => {
   const { nom_actividades, fecha, hora, id_proyecto, id_colaborador } = req.body;
   con.query(
      "INSERT INTO actividades (nom_actividades, fecha, hora, id_proyecto, id_colaborador) VALUES (?, ?, ?, ?, ?)",
      [nom_actividades, fecha, hora, id_proyecto, id_colaborador],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({
            message: "Actividad creado exitosamente",
            id: results.insertId,
         }); */
         con.query(" SELECT * FROM actividades", (err, rows, fields) => {
            if (!err) {
               res.json({
                  actividades: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

//Para actualizar los datos de un una actividad
router.put("/api/actividades/:id", (req, res) => {
   const id = req.params.id;
   const { nom_actividades, fecha, hora, id_proyecto, id_colaborador} = req.body;
   con.query(
      "UPDATE actividades SET nom_actividades = ?, fecha = ?, hora = ?, id_proyecto = ?, id_colaborador = ? WHERE id_actividad = ?",
      [
         nom_actividades, fecha, hora, id_proyecto, id_colaborador, id,
      ],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({ message: "Actividad actualizado exitosamente" }); */
         con.query(" SELECT * FROM actividades", (err, rows, fields) => {
            if (!err) {
               res.json({
                  actividades: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

//Ruta para eliminar una actividad
router.delete("/api/actividades/:id", (req, res) => {
   const id = req.params.id;
   con.query(
      "DELETE FROM actividades WHERE id_actividad = ?",
      [id],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({ message: "Actividad eliminado exitosamente" }); */
         con.query(" SELECT * FROM actividades", (err, rows, fields) => {
            if (!err) {
               res.json({
                  actividades: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

module.exports = router;
