'use strict';
import {
  sequelize
} from '../../sqldb';

/*Get a inventory list*/
export function inventario(req, res){
  let fecha = new Date(req.body.fecha);
  let limit = Number(req.body.limit);
  let fechaInicial = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  sequelize.query('SELECT titulo_libro, precio_venta, (cantidad_disponible - cantidad_vendida) as cantidad from libro as L , venta_libro_diaria as VLD where L.id_libro = VLD.id_libro and VLD.fecha <= ? GROUP BY L.id_libro LIMIT ?', {
    replacements: [fechaInicial, limit],
    type: sequelize.QueryTypes.SELECT
  }).then(function(data) {
   //console.log(projects);
   res.status(200).json(data);
 });

}

/*Report of inventory*/
export function inventarioRep(req, res){
  let fechaInicial = req.query.fecha;
  let limit = Number(req.query.limit);

  sequelize.query('SELECT titulo_libro, precio_venta, (cantidad_disponible - cantidad_vendida) as cantidad from libro as L , venta_libro_diaria as VLD where L.id_libro = VLD.id_libro and VLD.fecha <= ? GROUP BY L.id_libro LIMIT ?', {
    replacements: [fechaInicial, limit],
    type: sequelize.QueryTypes.SELECT
  }).then(function(data) {
   //console.log(projects);
   res.status(200).json(data);
 });
}

/* Buy Order */
export function ordenCompra(req, res){
  let opcion = req.body.opcion;
  let limit = Number(req.body.limit);

  //per year
  if(opcion === '1'){
   sequelize.query('select SUM(cantidad_articulos) as cantidad , year(fecha) as anio from orden_compra  GROUP BY anio ORDER BY anio desc LIMIT ?', {
     replacements: [limit],
     type: sequelize.QueryTypes.SELECT
   }).then(function(sales) {
     res.status(200).json(sales);
   });
  }
  //per quarter
  if(opcion === '2'){
   sequelize.query('select SUM(cantidad_articulos) as cantidad , year(fecha) as anio, QUARTER(fecha) as quarter from orden_compra  GROUP BY anio,quarter ORDER BY anio desc LIMIT ?', {
     replacements: [limit],
     type: sequelize.QueryTypes.SELECT
   }).then(function(sales) {
     res.status(200).json(sales);
   });
  }
  //per month
  if(opcion === '3'){
   sequelize.query('select SUM(cantidad_articulos) as cantidad , year(fecha) as anio, MONTH(fecha) as mes from orden_compra  GROUP BY anio,mes ORDER BY anio desc LIMIT ?', {
     replacements: [limit],
     type: sequelize.QueryTypes.SELECT
   }).then(function(sales) {
     res.status(200).json(sales);
   });
  }

}

export function ordenCompraRep(req, res){

}

export function librosVendidos(req, res){
 let limit = Number(req.body.limit);
 let inicial = new Date(req.body.fechaInicial);
 let final = new Date(req.body.fechaFinal);
 let fechaInicial = inicial.getFullYear() + '-' + (inicial.getMonth() + 1) + '-' + inicial.getDate();
 let fechaFinal = final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();

 sequelize.query('SELECT titulo_libro, SUM(cantidad_vendida) as cantidad from venta_libro_diaria as v, libro as l where v.id_libro = l.id_libro fecha between ? and ?  GROUP BY v.id_libro ORDER BY cantidad DESC LIMIT ?', {
   replacements: [fechaInicial, fechaFinal, limit],
   type: sequelize.QueryTypes.SELECT
 }).then(function(sales) {
   res.status(200).json(sales);
 });
}

export function librosVendidosRep(req, res){

}

export function ventasEditoral(req, res){
  let limit = Number(req.body.limit);
  let inicial = new Date(req.body.fechaInicial);
  let final = new Date(req.body.fechaFinal);
  let fechaInicial = inicial.getFullYear() + '-' + (inicial.getMonth() + 1) + '-' + inicial.getDate();
  let fechaFinal = final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();

  sequelize.query('SELECT nombre_editorial, SUM(cantidad_vendida) as cantidad from venta_libro_diaria as v, libro as l, editorial as e where v.id_libro = l.id_libro  and l.id_editorial = e.id_editorial  and fecha BETWEEN ? and ? GROUP BY nombre_editorial ORDER BY cantidad DESC LIMIT ?', {
    replacements: [fechaInicial, fechaFinal, limit],
    type: sequelize.QueryTypes.SELECT
  }).then(function(sales) {
    res.status(200).json(sales);
  });

}

export function ventasEditorialRep(req, res){

}

export function ventasPorMes(req, res){
 //let limit = Number(req.body.limit);
 let inicial = new Date(req.body.fechaInicial);
 let final = new Date(req.body.fechaFinal);
 let fechaInicial = inicial.getFullYear() + '-' + (inicial.getMonth() + 1) + '-' + inicial.getDate();
 let fechaFinal = final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();

 sequelize.query('SELECT titulo_libro, SUM(cantidad_vendida) cantidad from libro, venta_libro_diaria WHERE libro.id_libro = venta_libro_diaria.id_libro GROUP BY libro.id_libro ORDER BY cantidad LIMIT 25', {
   replacements: [fechaInicial, fechaFinal],
   type: sequelize.QueryTypes.SELECT
 }).then(function(sales) {
   res.status(200).json(sales);
 });
}

export function ventasPorMesRep(req, res){

}

export function ventasPorProveedor(req, res){
 let limit = Number(req.body.limit);
 let inicial = new Date(req.body.fechaInicial);
 let final = new Date(req.body.fechaFinal);
 let fechaInicial = inicial.getFullYear() + '-' + (inicial.getMonth() + 1) + '-' + inicial.getDate();
 let fechaFinal = final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();

 sequelize.query('SELECT nombre_proveedor, SUM(cantidad_articulos) as cantidad from orden_compra as oe, proveedor as p where oe.proveedor = p.id_proveedor and fecha BETWEEN ? AND ? GROUP BY nombre_proveedor ORDER BY cantidad DESC LIMIT ?', {
   replacements: [fechaInicial, fechaFinal, limit],
   type: sequelize.QueryTypes.SELECT
 }).then(function(sales) {
   res.status(200).json(sales);
 });

}

export function ventasPorProveedorRep(req, res){

}