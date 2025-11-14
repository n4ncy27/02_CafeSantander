/*
  Modelo ligero: no usa ORM, solo define campos para uso en controladores.
  Campos: id (AUTO_INCREMENT), nombre, precio, disponible
*/
module.exports = {
  tableName: 'productos',
  fields: ['id','nombre','precio','disponible']
};
