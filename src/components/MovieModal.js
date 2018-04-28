import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col } from 'react-bootstrap';

import Heart from './Heart.js';

const MyRow = (props) => {
  return (
    <span>{props.arr.map((key, i) => {
      return (typeof props.obj[key] === "object" || key === "Poster" || key === "Response")?
        null:
        <Row key={key} className="my-modal">
          <Col sm={4}>
            <b>{key}</b>:
          </Col>
          <Col sm={8}>
            {props.obj[key]}
          </Col>
        </Row>
    })}</span>
  )
}

const MovieModal = (props) => {
  // title, year, parental guidance rating, plot summary, ratings, and website link
  const ratings = (props.focused.Title) ? props.focused.Ratings.reduce((obj, rating) => {
    obj[rating.Source] = rating.Value;
    return obj;
  }, {}): {}

  return (
    <div>
      {(props.focused.Title) ?
        <Modal show={props.focused.Title !== ''}>
          <Modal.Header closeButton onClick={props.handleClose}>
            <Modal.Title>{`${props.focused.Title} (${props.focused.Year})`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center modal-image">
              <img
                id="-1"
                onError={props.handleImageError}
                src={props.focused.Poster}
              />
            </div>

            <div className="text-center">
              <Heart
                liked={props.favorite}
                index={-1}
                handleFavoriteButton={props.handleFavoriteButton}
              />
            </div>
            <br />

            <div>
              <MyRow
                obj={props.focused}
                arr={["Rated", "Plot"]}
              />
              <Row className="my-modal">
                <Col sm={4}><b>Link</b>:</Col>
                <Col sm={8}><a href={`https://www.imdb.com/title/${props.focused.imdbID}`}>IMDB</a></Col>
              </Row>
              <MyRow
                obj={ratings}
                arr={Object.keys(ratings)}
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
