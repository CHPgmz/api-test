router.post("/api/actividades", (req, res) => {
    const { nom_actividades, horaini, horafin, proyectos, actividades } = req.body;
    
    con.query(
       "INSERT INTO actividades ( nom_actividades, horaini, horafin ) VALUES (?, ?, ?)",
       [nom_actividades, horaini, horafin],
       (error, results) => {
          if (error) {
             res.status(500).json({ message: error.message });
             return;
          }
          /* res.json({
             message: "Actividad creado exitosamente",
             id: results.insertId,
          }); */
          con.query("INSERT INTO catalog (colaboradores, proyectos, actividades) values (?, ?, ?)", [results.insertId, proyectos, actividades], (err, result) => {
             if (!err) {
                res.json({
                   id: result,
                });
             } else {
                console.log(err);
             }
          });
       }
    );
 });



 router.post("/api/actividades", (req, res) => {
    const { nom_actividades, horaini, horafin, proyectos, actividades } = req.body;
    
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
             [results.insertId, proyectos, actividades],
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
 
 
 