import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { updateInput } from '../actions/input.js';
import { searchForMovies } from '../actions/movies.js';
import { toggleVisible } from '../actions/favorites.js';
import { Row, Col, ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap';

const mapStateToProps = state => ({
  input: state.input,
  favorites: state.favorites.visible,
  length: state.favorites.list.length
})
const mapDispatchToProps = dispatch => ({
  updateInput: input => dispatch(updateInput(input)),
  searchForMovies: input => dispatch(searchForMovies(input)),
  toggleVisible: value => dispatch(toggleVisible(value))
})

class Input extends React.Component {
  componentDidMount(){
    const { title, year } = this.props.input;

    // retrieve movie list if input fields were retrieved from sessionStorage
    if(title || year){
      this.props.searchForMovies(this.props.input);
    }
  }

  onInputChange = (e) => {
    // update input separate from movieList so there is not a delay
    // in the input box
    this.props.updateInput({[e.target.name]: e.target.value});
    this.props.searchForMovies({...this.props.input, [e.target.name]: e.target.value});
  }

  toggle = (e) => {
    this.props.toggleVisible(!this.props.favorites);
  }

  render(){
    const { title, year } = this.props.input;

    return (
      <header>
        <div className="header-content border">
          <h1>IMDB Search <img className="search-icon" src="/magnifier.svg"/></h1>

          {(!this.props.favorites) ?
            <Row className="my-row">
              <Col sm={6}>
                <div className="lable">Title:</div>
                <FormGroup bsSize="large">
                  <FormControl type="text" name="title" value={title} onChange={this.onInputChange} />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <div className="lable">Year:</div>
                <FormGroup bsSize="large">
                  <FormControl type="text" name="year" value={year} onChange={this.onInputChange} />
                </FormGroup>
              </Col>
            </Row>:
            null
          }
          <div className="text-center">
            <button onClick={this.toggle} className="red-button">
              {(this.props.favorites) ? "Search": <span>My Favorite <b>{this.props.length}</b></span>}
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);

Input.propTypes = {
  input: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }).isRequired,
  updateInput: PropTypes.func.isRequired,
  searchForMovies: PropTypes.func.isRequired,
  toggleVisible: PropTypes.func.isRequired,
  favorites: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired
}
