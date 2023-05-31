# Cuestionario Sooft Technology

Desarrollo de una prueba técnica.

 /********* ENDPOINTS NECESARIOS *************/
  /*
1-Endpoint para obtener la lista de cuestionarios disponibles:
Método: GET
URL: /api/cuestionarios
Parámetros de entrada: Ninguno
Respuesta del servidor: Una lista de objetos JSON que contiene la info de los cuestionarios disponibles, incluyendo el id_cuestionario y la descripción_cuestionario.

2-Endpoint para guardar una asignación de cuestionario:
Método: POST
URL: /api/asignaciones
Parámetros de entrada: Un objeto JSON con la info de la asignación, que incluye el id_asignacion, id_cuestionario, nombre, apellido, mail y whatsapp.
Respuesta del servidor: El objeto JSON de la asignación guardada.

3-Endpoint para actualizar una asignación de cuestionario:
Método: PUT
URL: /api/asignaciones/:id
Parámetros de entrada: El id_asignación a actualizar en la URL y en un objeto JSON los cambios del objeto.
Respuesta del servidor: El objeto JSON con la asignación actualizada.

4-Endpoint para eliminar una asignación de cuestionario:
Método: DELETE
URL: /api/asignaciones/:id
Parámetros de entrada: El id de la asignación a eliminar en la URL.
Respuesta del servidor: Un mensaje de que se elimino correctamente o el motivo de por que no.
*/