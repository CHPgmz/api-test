const express = require("express");
const router = express.Router();

const con = require("../db");

router.get("/api/actividades", (req, res) => {
   con.query(" SELECT * FROM actividades", (err, result1) => {
      if (err) {
         res.json(err);
      } else {
        /*  console.log(err); */
        con.query("SELECT id_colaborador, nom_colaborador FROM colaboradores", (err, result2) => {
         if (err) {
            res.json(err);
         } else {
           /*  console.log(err); */
           con.query(" SELECT id_proyecto, nombre_proyecto FROM proyectos", (err, result3) => {
            if (err) {
               res.json(err);
            } else {
              /*  console.log(err); */
              res.json({
               actividades: result1,
               colaboradores: result2,
               proyectos: result3
              })
            }
         });
         }
      });
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

//Ruta para insertar una nueva actividad
router.post("/api/actividades", (req, res) => {
   const { nom_actividades, horaini, horafin,colaboradores, proyectos } = req.body;
   
   con.query(
      "INSERT INTO actividades ( nom_actividades, horaini, horafin ) VALUES (?, ?, ?)",
      [nom_actividades, horaini, horafin],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         
         con.query(
            "INSERT INTO catalog (colaboradores, proyectos, actividades) values (?, ?, ?)",
            [colaboradores, proyectos, results.insertId],
            (err, result) => {
               if (err) {
                  console.log(err);
                  res.status(500).json({ message: err.message });
                  return;
               }
               res.json({
                  id: result,
                  message: "Se registró exitosamente"
               });
            }
         );
         
      }
   );
}); 


/* res.json({
            message: "Actividad creado exitosamente",
            id: results.insertId,
            proyectos,
            actividades
         }); */

//Para actualizar los datos de un una actividad
router.put("/api/actividades/:id", (req, res) => {
   const id = req.params.id;
   const {nom_actividades, horaini, horafin } = req.body;
   con.query(
      "UPDATE actividades SET nom_actividades = ?, horaini = ?, horafin = ? WHERE id_actividad = ?",
      [nom_actividades, horaini, horafin, id],
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
