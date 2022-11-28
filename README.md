# **Lista de enpoints públicos**:

## **ENDPOINTS USERS**:

◾ **[POST]/user/register** ➡ Recibe datos al registrar a un usuario.

    ✅ STATUS 201

◾ **[POST]/user/login** ➡ Recibe datos del usuario para comprobar si está creado en la BD.

    ✅ STATUS 200
    
◾ **[PATCH]/user/addrecipes/:id** ➡ Actualiza la propiedad recipes del usuario añadiendo la receta recogida por id

    ✅ STATUS 200
    
◾ **[PATCH]/user/deleterecipes/:id** ➡ Actualiza la propiedad recipes del usuario borrando la receta recogida por id

    ✅ STATUS 200
## ** ENDPOINTS RECIPE**:

◾ **[GET]/recipe**➡ Devuelve un array con todas las recetas.

    ✅ STATUS: 200

◾ **[GET]/recipe/:id**➡ Devuelve un objeto con la receta que contiene el id de la query.

    ✅ STATUS: 200

◾ **[POST]/recipe/**➡ Recibe un objeto recipe sin id para crearlo en la BD y devuelve el mismo objeto con id creada.

    ✅ STATUS: 201


◾ **[DELETE]/recipe/:id**➡ elimina de la BD la receta por id y devuelve un objeto vacio.

    ✅ STATUS: 200
## **2. ENDPOINTS INGREDIENT**:

◾ **[GET]/ingredient**➡ Devuelve un array con todos los ingredientes.

    ✅ STATUS: 200

◾ **[GET]/ingredient/:id**➡ Devuelve un objeto con el ingrediente que contiene el id de la query.

    ✅ STATUS: 200

◾

# STATUS ERRORES:

❌ **400** ➡ Bad Request.

❌ **401** ➡ Unauthorized.

❌ **403** ➡ Forbbiden.

❌ **404** ➡ Not found.

❌ **409** ➡ Conflicts.

❌ **500** ➡ Internal Server Error.
