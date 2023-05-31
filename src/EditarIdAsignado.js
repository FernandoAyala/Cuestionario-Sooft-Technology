import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { validaMail, validaNumero } from './Validadores';

const EditarIdAsignado = ({ cuestionarios, onGuardar, dato }) => {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [datos, setDatos] = useState(null);

  const handleDatos = (e) => {
    const { target } = e;
    const value = target.value;
    const name = target.name;
    setDatos({ ...datos, [name]: value });
  };

  const toggle = () => {
    setModal(!modal);
    setDatos({
      id_cuestionario: dato.id_cuestionario,
      nombre: dato.nombre,
      apellido: dato.apellido,
      mail: dato.mail,
      whatsapp: dato.whatsapp,
    });
  };

  const handleSave = () => {
    // Verifico si tiene algun campo con ''
    const campoVacio = Object.values(datos).includes('');

    if (campoVacio) {
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
    onGuardar(datos);
    toggle();
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={toggle}
        size="sm"
        style={{ marginLeft: '2px' }}
      >
        Editar
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Cuestionario</ModalHeader>
        <ModalBody>
          {datos && (
            <Form>
              <FormGroup>
                <Label for="id_cuestionario">Cuestionario:</Label>
                <Input
                  type="select"
                  name="id_cuestionario"
                  id="id_cuestionario"
                  value={datos.id_cuestionario}
                  onChange={handleDatos}
                >
                  <option value="">Seleccione un cuestionario</option>
                  {cuestionarios &&
                    cuestionarios.map((cuestionario) => (
                      <option key={cuestionario.id} value={cuestionario.id}>
                        {cuestionario.descripcion}
                      </option>
                    ))}
                </Input>
              </FormGroup>
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
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleSave();
            }}
          >
            Guardar
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
          {error && <Alert color="danger">{error}</Alert>}
        </ModalFooter>
      </Modal>
    </>
  );
};

EditarIdAsignado.propTypes = {
  cuestionarios: PropTypes.array.isRequired,
  onGuardar: PropTypes.func.isRequired,
  dato: PropTypes.object.isRequired,
};

export default EditarIdAsignado;
