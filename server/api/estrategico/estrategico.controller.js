'use strict';
import {
  sequelize
} from '../../sqldb';

/*Get a list of providers order by $ and DESC*/
export function proveedores(req, res) {
  let inicial = new Date(req.body.fechaInicial);
  let final = new Date(req.body.fechaFinal);
  let fechaInicial = inicial.getFullYear() + '-' + (inicial.getMonth() + 1) + '-' + inicial.getDate();
  let fechaFinal = final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();

  sequelize.query('select pv.nombre_proveedor, sum(total_orden) monto from  orden_compra as oc, proveedor as pv where oc.proveedor = pv.id_proveedor and oc.fecha BETWEEN ? and  ? GROUP BY pv.id_proveedor ORDER BY monto DESC', {
    replacements: [fechaInicial, fechaFinal],
    type: sequelize.QueryTypes.SELECT
  }).then(function(projects) {
    //console.log(projects);
    res.status(200).json(projects);
  });

}

export function proveedoresRep(req, res){
  let inicial = req.query.fechaInicial;
  let final = req.query.fechaFinal;
  console.log(req.user);
  sequelize.query('select pv.nombre_proveedor, sum(total_orden) monto from  orden_compra as oc, proveedor as pv where oc.proveedor = pv.id_proveedor and oc.fecha BETWEEN ? and  ? GROUP BY pv.id_proveedor ORDER BY monto DESC', {
    replacements: [inicial, final],
    type: sequelize.QueryTypes.SELECT
  }).then(function(projects) {
      res.render('proveedores', { proveedores: projects, inicial:inicial, final: final, user: req.query.user});
  });
}

/*Get a list of earnings per year, month or quarter*/
export function ingresos(req,res){
 //per year
 console.log(req.body.opcion);
  if(req.body.opcion === '1'){
   sequelize.query('select SUM(precio_venta - costo_venta) as ingreso , year(fecha) as anio from venta_libro_diaria  GROUP BY anio ORDER BY anio desc LIMIT ?', {
     replacements: [Number(req.body.limit)],
     type: sequelize.QueryTypes.SELECT
   }).then(function(sales) {
     //console.log(projects);
     res.status(200).json(sales);
   });
  }
 //per quarter
 if(req.body.opcion === '2'){
  sequelize.query('select SUM(precio_venta - costo_venta) as ingreso , year(fecha) as anio, QUARTER(fecha) as quarter from venta_libro_diaria GROUP BY anio, quarter ORDER BY anio DESC LIMIT ?', {
    replacements: [Number(req.body.limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(sales) {
    //console.log(projects);
    res.status(200).json(sales);
  });
 }

 //per month
 if(req.body.opcion === '3'){
  sequelize.query('select SUM(precio_venta - costo_venta) as ingreso , year(fecha) as anio, MONTH(fecha) as mes from venta_libro_diaria GROUP BY anio, mes ORDER BY anio DESC LIMIT ?', {
    replacements: [Number(req.body.limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(sales) {
    console.log(sales);
    res.status(200).json(sales);
  });
 }


}

export function ingresosRep(req, res){
 let opcion = req.query.opcion;
 let limit = req.query.limit;
 let user = req.query.user;
 //per year
 console.log(req.body.opcion);
  if(opcion === '1'){
   sequelize.query('select SUM(precio_venta - costo_venta) as ingreso , year(fecha) as anio from venta_libro_diaria  GROUP BY anio ORDER BY anio desc LIMIT ?', {
     replacements: [Number(limit)],
     type: sequelize.QueryTypes.SELECT
   }).then(function(ingresos) {
        res.render('ingresos', { ingresos: ingresos, user: user, opcion: req.query.opcion});
   });
  }
 //per quarter
 if(opcion === '2'){
  sequelize.query('select SUM(precio_venta - costo_venta) as ingreso , year(fecha) as anio, QUARTER(fecha) as quarter from venta_libro_diaria GROUP BY anio, quarter ORDER BY anio DESC LIMIT ?', {
    replacements: [Number(limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(ingresos) {
    //console.log(projects);
      res.render('ingresos', { ingresos: ingresos, user: user, opcion: req.query.opcion});
  });
 }

 //per month
 if(opcion === '3'){
  sequelize.query('select SUM(precio_venta - costo_venta) as ingreso , year(fecha) as anio, MONTH(fecha) as mes from venta_libro_diaria GROUP BY anio, mes ORDER BY anio DESC LIMIT ?', {
    replacements: [Number(limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(ingresos) {
    res.render('ingresos', { ingresos: ingresos, user: user, opcion: req.query.opcion});
  });
 }
}

// get a list of buys per year, month and quarter

export function compras(req,res){
 //per year
  if(req.body.opcion === '1'){
   sequelize.query('select SUM(total_orden) as compras, year(fecha) as anio from orden_compra group by anio ORDER BY anio desc LIMIT ?', {
     replacements: [Number(req.body.limit)],
     type: sequelize.QueryTypes.SELECT
   }).then(function(sales) {
     //console.log(projects);
     res.status(200).json(sales);
   });
  }
 //per quarter
 if(req.body.opcion === '2'){
  sequelize.query('select SUM(total_orden) as compras, year(fecha) as anio, QUARTER(fecha) as quarter from orden_compra group by anio,quarter ORDER BY anio desc LIMIT ?', {
    replacements: [Number(req.body.limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(buys) {
    //console.log(projects);
    res.status(200).json(buys);
  });
 }

 //per month
 if(req.body.opcion === '3'){
  sequelize.query('select SUM(total_orden) as compras, year(fecha) as anio, month(fecha) as mes from orden_compra group by anio,mes ORDER BY anio desc LIMIT ?', {
    replacements: [Number(req.body.limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(sales) {

    res.status(200).json(sales);
  });
 }

}

export function comprasRep(req, res){
 let opcion = req.query.opcion;
 let limit = req.query.limit;
 let user = req.query.user;
 //per year
  if(opcion === '1'){
   sequelize.query('select SUM(total_orden) as compras, year(fecha) as anio from orden_compra group by anio ORDER BY anio desc LIMIT ?', {
     replacements: [Number(limit)],
     type: sequelize.QueryTypes.SELECT
   }).then(function(ingresos) {
        res.render('compras', { ingresos: ingresos, user: user, opcion: req.query.opcion});
   });
  }
 //per quarter
 if(opcion === '2'){
  sequelize.query('select SUM(total_orden) as compras, year(fecha) as anio, QUARTER(fecha) as quarter from orden_compra group by anio,quarter ORDER BY anio desc LIMIT ?', {
    replacements: [Number(limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(ingresos) {

      res.render('compras', { ingresos: ingresos, user: user, opcion: req.query.opcion});
  });
 }

 //per month
 if(opcion === '3'){
  sequelize.query('select SUM(total_orden) as compras, year(fecha) as anio, month(fecha) as mes from orden_compra group by anio,mes ORDER BY anio desc LIMIT ?', {
    replacements: [Number(limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(ingresos) {
    res.render('compras', { ingresos: ingresos, user: user, opcion: req.query.opcion});
  });
 }
}

//get a list of buys per categhory  and per year, month or quarter
export function categoriasCompra(req, res){
 console.log(req.body);
 //per year
  if(req.body.opcion === '1'){
   sequelize.query('select nombre_categoria, SUM(precio_venta) as venta ,YEAR(fecha) as anio from venta_libro_diaria NATURAL JOIN libro  natural join categoria GROUP BY  nombre_categoria, anio order by anio desc LIMIT ?', {
     replacements: [Number(req.body.limit)],
     type: sequelize.QueryTypes.SELECT
   }).then(function(sales) {
     //console.log(projects);
     res.status(200).json(sales);
   });
  }

  //per quarter
   if(req.body.opcion === '2'){
    sequelize.query('select nombre_categoria, SUM(precio_venta) as venta ,YEAR(fecha) as anio, quarter(fecha) as quarter from  venta_libro_diaria NATURAL JOIN libro  natural join categoria  where YEAR(fecha) = ? AND QUARTER(fecha) = ? GROUP BY  nombre_categoria, anio, quarter  order by venta LIMIT ?', {
      replacements: [Number(req.body.anio), Number(req.body.trimestre), Number(req.body.limit)],
      type: sequelize.QueryTypes.SELECT
    }).then(function(sales) {
      //console.log(projects);
      res.status(200).json(sales);
    });
   }

   //per month
    if(req.body.opcion === '3'){
     sequelize.query('select nombre_categoria, SUM(precio_venta) as venta ,YEAR(fecha) as anio, month(fecha) as mes from  venta_libro_diaria NATURAL JOIN libro  natural join categoria  where YEAR(fecha) = ? AND month(fecha) = ? GROUP BY  nombre_categoria, anio, mes  order by venta DESC LIMIT ?', {
       replacements: [Number(req.body.anio), Number(req.body.mes), Number(req.body.limit)],
       type: sequelize.QueryTypes.SELECT
     }).then(function(sales) {
       //console.log(projects);
       res.status(200).json(sales);
     });
    }
}

export function categoriasCompraRep(req, res){
 let opcion = req.query.opcion;
 let limit = req.query.limit;
 let user = req.query.user;
 //per year
 console.log(req.body.opcion);
  if(opcion === '1'){
   sequelize.query('select nombre_categoria, SUM(precio_venta) as venta ,YEAR(fecha) as anio from venta_libro_diaria NATURAL JOIN libro  natural join categoria GROUP BY  nombre_categoria, anio order by anio desc LIMIT ?', {
     replacements: [Number(limit)],
     type: sequelize.QueryTypes.SELECT
   }).then(function(ingresos) {
        res.render('comprascategoria', { ingresos: ingresos, user: user, opcion: req.query.opcion});
   });
  }
 //per quarter
 if(opcion === '2'){
  sequelize.query('select nombre_categoria, SUM(precio_venta) as venta ,YEAR(fecha) as anio, quarter(fecha) as quarter from  venta_libro_diaria NATURAL JOIN libro  natural join categoria  where YEAR(fecha) = ? AND QUARTER(fecha) = ? GROUP BY  nombre_categoria, anio, quarter  order by venta LIMIT ?', {
    replacements: [Number(req.query.anio), Number(req.query.trimestre), Number(req.query.limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(ingresos) {
    //console.log(projects);
      res.render('comprascategoria', { ingresos: ingresos, user: user, opcion: req.query.opcion});
  });
 }

 //per month
 if(opcion === '3'){
  sequelize.query('select nombre_categoria, SUM(precio_venta) as venta ,YEAR(fecha) as anio, month(fecha) as mes from  venta_libro_diaria NATURAL JOIN libro  natural join categoria  where YEAR(fecha) = ? AND month(fecha) = ? GROUP BY  nombre_categoria, anio, mes  order by venta DESC LIMIT ?', {
        replacements: [Number(req.query.anio), Number(req.query.mes), Number(req.query.limit)],
    type: sequelize.QueryTypes.SELECT
  }).then(function(ingresos) {
    res.render('comprascategoria', { ingresos: ingresos, user: user, opcion: req.query.opcion});
  });
 }
}

// get top sales BETWEEN dates
export function topLibros(req, res){
 let inicial = new Date(req.body.fechaInicial);
 let final = new Date(req.body.fechaFinal);
 let fechaInicial = inicial.getFullYear() + '-' + (inicial.getMonth() + 1) + '-' + inicial.getDate();
 let fechaFinal = final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();

 sequelize.query('SELECT titulo_libro, sum(precio_venta) as monto from venta_libro_diaria natural join libro where fecha between ? and ? group by titulo_libro  ORDER BY monto DESC LIMIT ?', {
   replacements: [fechaInicial, fechaFinal, Number(req.body.limit)],
   type: sequelize.QueryTypes.SELECT
 }).then(function(projects) {
   //console.log(projects);
   res.status(200).json(projects);
 });
}

export function topLibrosRep(req, res){
  let inicial = req.query.fechaInicial;
  let final = req.query.fechaFinal;
  let limit = Number(req.query.limit);
  console.log(req.user);
  sequelize.query('SELECT titulo_libro, sum(precio_venta) as monto from venta_libro_diaria natural join libro where fecha between ? and ? group by titulo_libro  ORDER BY monto DESC LIMIT ?', {
    replacements: [inicial, final, limit],
    type: sequelize.QueryTypes.SELECT
  })
  .then(function(projects) {
      res.render('topventas', { proveedores: projects, inicial:inicial, final: final, user: req.query.user});
  });
}
