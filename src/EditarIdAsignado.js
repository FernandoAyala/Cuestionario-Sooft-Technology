import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
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

const EditarIdAsignado = ({ cuestionarios, onGuardar, dato }) => {
  const [modal, setModal] = useState(false);
  const [selectedCuestionario, setSelectedCuestionario] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    whatsapp: '',
  });

  const handleDatos = (e) => {
    const { target } = e;
    const value = target.value;
    const name = target.name;
    setDatos({ ...datos, [name]: value });
  };

  const toggle = () => {
    setModal(!modal);
    setSelectedCuestionario('')
  };

  const handleSave = (idCuestionario) => {

    onGuardar(idCuestionario, datos);
    toggle();
  };

  console.log('cuies', cuestionarios);

  return (
    <>
      <Button color="secondary" onClick={toggle} size="sm" style={{marginLeft: '2px'}}>
        Editar
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Cuestionario</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="cuestionario">Cuestionario:</Label>
              <Input
                type="select"
                name="cuestionario"
                id="cuestionario"
                value={selectedCuestionario}
                onChange={(e) => setSelectedCuestionario(e.target.value)}
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
                    value={dato.nombre}
                    onChange={handleDatos}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="apellido">Apellido</Label>
                  <Input
                    type="text"
                    name="apellido"
                    id="apellido"
                    value={dato.apellido}
                    onChange={handleDatos}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="mail">Correo electrónico</Label>
                  <Input
                    type="email"
                    name="mail"
                    id="mail"
                    value={dato.mail}
                    onChange={handleDatos}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="whatsapp">WhatsApp</Label>
                  <Input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    value={dato.whatsapp}
                    onChange={handleDatos}
                  />
                </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleSave(selectedCuestionario);
            }}
          >
            Guardar
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

EditarIdAsignado.propTypes = {
    cuestionarios: PropTypes.array.isRequired,
    onGuardar: PropTypes.func.isRequired
  };
  

export default EditarIdAsignado;
