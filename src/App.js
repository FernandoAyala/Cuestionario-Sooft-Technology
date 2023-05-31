import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import EditarIdAsignado from './EditarIdAsignado';
import { validaMail, validaNumero } from './Validadores';

const App = () => {
  const [cuestionarios, setCuestionarios] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [selectedCuestionario, setSelectedCuestionario] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    whatsapp: '',
  });
  const [error, setError] = useState('');

  /********* ENDPOINTS NECESARIOS *************/
  /*
1)Endpoint para obtener la lista de cuestionarios disponibles:
Método: GET
URL: /api/cuestionarios
Parámetros de entrada: Ninguno
Respuesta del servidor: Una lista de objetos JSON que contiene la info de los cuestionarios disponibles, incluyendo el id_cuestionario y la descripción_cuestionario.

2)Endpoint para guardar una asignación de cuestionario:
Método: POST
URL: /api/asignaciones
Parámetros de entrada: Un objeto JSON con la info de la asignación, que incluye el id_asignacion, id_cuestionario, nombre, apellido, mail y whatsapp.
Respuesta del servidor: El objeto JSON de la asignación guardada.

3)Endpoint para actualizar una asignación de cuestionario:
Método: PUT
URL: /api/asignaciones/:id
Parámetros de entrada: El id_asignación a actualizar en la URL y en un objeto JSON los cambios del objeto.
Respuesta del servidor: El objeto JSON con la asignación actualizada.

4)Endpoint para eliminar una asignación de cuestionario:
Método: DELETE
URL: /api/asignaciones/:id
Parámetros de entrada: El id de la asignación a eliminar en la URL.
Respuesta del servidor: Un mensaje de que se elimino correctamente o el motivo de por que no.
*/

  useEffect(() => {
    const cuestionariosData = [
      { id: 1, descripcion: 'Cuestionario 1' },
      { id: 2, descripcion: 'Cuestionario 2' },
      { id: 3, descripcion: 'Cuestionario 3' },
    ];
    setCuestionarios(cuestionariosData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifico si tiene algun campo con ''
    const campoVacio = Object.values(datos).includes('');

    if (!selectedCuestionario || campoVacio) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validaMail(datos.mail)) {
      setError('El formato del correo electrónico no es válido.');
      return;
    }

    if (!validaNumero(datos.whatsapp)) {
      setError('El formato del número de WhatsApp no es válido.');
      return;
    }

    const asignacion = {
      id_asignacion: asignaciones.length + 1,
      id_cuestionario: selectedCuestionario,
      nombre: datos.nombre,
      apellido: datos.apellido,
      mail: datos.mail,
      whatsapp: datos.whatsapp,
    };

    setAsignaciones([...asignaciones, asignacion]);

    // Limpiar los campos del formulario después de enviar
    setSelectedCuestionario('');
    setError('');
    setDatos({
      nombre: '',
      apellido: '',
      mail: '',
      whatsapp: '',
    });
  };

  const handleDatos = (e) => {
    const { target } = e;
    const value = target.value;
    const name = target.name;
    setDatos({ ...datos, [name]: value });
  };

  const handleDelete = (id) => {
    const updatedAsignaciones = asignaciones.filter(
      (asignacion) => asignacion.id_asignacion !== id
    );
    setAsignaciones(updatedAsignaciones);
  };

  const onGuardar = (index, datoEditado) => {
    // Creo un nuevo array asi cuando actualizo el campo se refresca la tabla
    const newArray = asignaciones.map((asignacion, i) => {
      if (i === index) {
        return { ...asignacion, ...datoEditado }; // Actualiza solo los campos editados
      }
      return asignacion; // campos sin cambios
    });
    setAsignaciones(newArray);
  };

  return (
    <div className="animated fadeIn">
      <Card className="my-2">
        <Container fluid className="text-center mt-5">
          <h2
            style={{
              fontFamily: 'Arial',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            Sistema de Cuestionarios
          </h2>
        </Container>
        <CardHeader> Cuestionarios </CardHeader>
        <CardBody>
          <Row>
            <Col md={4}>
              <Form>
                <FormGroup>
                  <Label for="cuestionarioSelect">
                    Selecciona un cuestionario
                  </Label>
                  <Input
                    type="select"
                    id="cuestionarioSelect"
                    value={selectedCuestionario}
                    onChange={(e) => setSelectedCuestionario(e.target.value)}
                  >
                    <option value="">Selecciona un cuestionario</option>
                    {cuestionarios.map((cuestionario) => (
                      <option key={cuestionario.id} value={cuestionario.id}>
                        {cuestionario.descripcion}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="my-2">
        <CardHeader>Cargar Personas </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={5}>
                <FormGroup>
                  <Label for="nombre">Nombre</Label>
                  <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={datos.nombre}
                    onChange={handleDatos}
                  />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="apellido">Apellido</Label>
                  <Input
                    type="text"
                    name="apellido"
                    id="apellido"
                    value={datos.apellido}
                    onChange={handleDatos}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <FormGroup>
                  <Label for="mail">Correo electrónico</Label>
                  <Input
                    type="email"
                    name="mail"
                    id="mail"
                    value={datos.mail}
                    onChange={handleDatos}
                  />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="whatsapp">WhatsApp</Label>
                  <Input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    value={datos.whatsapp}
                    onChange={handleDatos}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">
              Guardar
            </Button>
            {error && <Alert color="danger">{error}</Alert>}
          </Form>
        </CardBody>
      </Card>

      <Col>
        {asignaciones.length > 0 ? (
          <div>
            <h2>Cuestionarios asignados</h2>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>Id Cuestionario Asignado</th>
                  <th>Id Cuestionario</th>
                  <th>Nombre y Apellido</th>
                  <th>Correo electrónico</th>
                  <th>WhatsApp</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {asignaciones.map((asignacion, index) => (
                  <tr key={index}>
                    <td>{asignacion.id_asignacion}</td>
                    <td>{asignacion.id_cuestionario}</td>
                    <td>{`${asignacion.nombre} ${asignacion.apellido}`}</td>
                    <td>{asignacion.mail}</td>
                    <td>{asignacion.whatsapp}</td>
                    <td className="text-center">
                      <Button
                        color="danger"
                        onClick={() => handleDelete(asignacion.id_asignacion)}
                        size="sm"
                        style={{ marginRight: '2px' }}
                      >
                        Eliminar
                      </Button>
                      <EditarIdAsignado
                        cuestionarios={cuestionarios}
                        onGuardar={(datoEditado) =>
                          onGuardar(index, datoEditado)
                        }
                        dato={asignacion}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Alert>No hay Personas Asignadas</Alert>
        )}
      </Col>
    </div>
  );
};

export default App;
