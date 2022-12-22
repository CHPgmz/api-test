const express = require("express");
const router = express.Router();

const con = require("../db");


//select tabla1.*,tabla2.*  from tabla1,tabla2 where tabla1.id = tabla2.id;
router.get("/api/colaboradores", (req, res) => {
   con.query(" SELECT * FROM colaboradores", (err, rows, fields) => {
      if (!err) {
         res.json(rows);
      } else {
         console.log(err);
      }
   });
});

router.get("/api/colaboradores/:id", (req, res) => {
   const id = req.params.id;
   con.query(
      " SELECT * FROM colaboradores WHERE id_colaborador= ?",
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
router.post("/api/colaboradores", (req, res) => {
   
   const { nom_colaborador, apellido, cargo_colaborador, fechaini, fechafin } = req.body;
   const fecha1 = new Date(fechaini);
   const fecha2 = new Date(fechafin);

   con.query(
      "INSERT INTO colaboradores (nom_colaborador, apellido, cargo_colaborador, fechaini, fechafin) VALUES (?, ?, ?, ?, ?)",
      [nom_colaborador, apellido, cargo_colaborador, /* fecha1.toLocaleString() */fechaini, /* fecha2.toLocaleString() */fechafin],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({
            message: "Colaborador creado exitosamente",
            id: results.insertId,
         }); */
         con.query(" SELECT * FROM colaboradores", (err, rows, fields) => {
            if (!err) {
               res.json({
                  colaboradores: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

//Para actualizar los datos de un una actividad
router.put("/api/colaboradores/:id", (req, res) => {
   const id = req.params.id;
   const { nom_colaborador, apellido, cargo_colaborador, fechaini, fechafin } = req.body;

   con.query(
      "UPDATE colaboradores SET nom_colaborador = ?, apellido = ?, cargo_colaborador = ?, fechaini = ?, fechafin = ? WHERE id_colaborador = ?",
      [nom_colaborador, apellido, cargo_colaborador, fechaini, fechafin, id],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({ message: "Datos actualizados :)" }); */
         con.query(" SELECT * FROM colaboradores", (err, rows, fields) => {
            if (!err) {
               res.json({
                  colaboradores: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

//Ruta para eliminar una actividad
router.delete("/api/colaboradores/:id", (req, res) => {
   const id = req.params.id;
   con.query(
      "DELETE FROM colaboradores WHERE id_colaborador = ?",
      [id],
      (error, results) => {
         if (error) {
            res.status(500).json({ message: error.message });
            return;
         }
         /* res.json({ message: "Colaborador eliminado exitosamente" }); */
         con.query(" SELECT * FROM colaboradores", (err, rows, fields) => {
            if (!err) {
               res.json({
                  colaboradores: rows
               });
            } else {
               console.log(err);
            }
         });
      }
   );
});

router.get("/api/colaboradores/select", (req, res) => {
   con.query(
      "SELECT actividades.id_actividad, proyectos.id_proyecto FROM actividades INNER JOIN proyectos",
      (error, results) => {
        if (error) throw error;
  
        // enviar resultados en formato JSON
        res.json({
         id_proyecto: results[0],
         id_activid: results[1],
         message: 'Nada'
        });
      }
    );
});

module.exports = router;
