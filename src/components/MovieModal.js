import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const MovieModal = (props) => {
  console.log(props);
  // const {movie} = props.focused;

  return (
    <div>
      {(props.focused.Title) ?
        <Modal show={props.focused.Title !== ''}>
          <Modal.Header closeButton onClick={props.handleClose}>
            <Modal.Title className="modal-title">{props.focused.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="text-center modal-image" src={props.focused.Poster}/>
            {Object.keys(props.focused).map((key, i) => {
              return (typeof props.focused[key] === "object" || key === "Poster" || key === "Response")?
                null:
                <Row key={key} className="my-modal">
                  <Col sm={4}>
                    <b>{key}</b>:
                  </Col>
                  <Col sm={8}>
                    {props.focused[key]}
                  </Col>
                </Row>
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.handleClose} bsStyle="danger">Close</Button>
          </Modal.Footer>
        </Modal>:
        null
      }

    </div>
  )
}

export default MovieModal;
