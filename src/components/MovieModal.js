import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'react-bootstrap';

import Heart from './Heart.js';

const MovieModal = (props) => {
  return (
    <div>
      {(props.focused.Title) ?
        <Modal show={props.focused.Title !== ''}>
          <Modal.Header closeButton onClick={props.handleClose}>
            <Modal.Title>{props.focused.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center modal-image">
              <img
                id="-1"
                onError={props.handleImageError}
                src={props.focused.Poster}
              />
            </div>
            <div>
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
            </div>
            <div className="text-center">
              <Heart
                liked={props.favorite}
                index={-1}
                handleFavoriteButton={props.handleFavoriteButton}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="red-button" onClick={props.handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>:
        null
      }
    </div>
  )
}

export default MovieModal;

MovieModal.propTypes = {
  focused: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  handleFavoriteButton: PropTypes.func.isRequired
}
