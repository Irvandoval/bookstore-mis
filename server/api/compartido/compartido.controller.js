'use strict';
import {
  sequelize
} from '../../sqldb';

export function aniosVentas(req, res){
  sequelize.query('SELECT year(fecha) as anio from venta_libro_diaria GROUP BY anio ORDER BY anio DESC', {
    replacements: [],
    type: sequelize.QueryTypes.SELECT
  }).then(function(anios) {
    //console.log(projects);
    res.status(200).json(anios);
  });
}
