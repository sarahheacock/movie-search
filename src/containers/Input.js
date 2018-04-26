import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { updateInput, updateInputHistory } from '../actions/input.js';
import { searchForMovies } from '../actions/movies.js';
import { Row, Col, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

const mapStateToProps = state => ({ input: state.input })
const mapDispatchToProps = dispatch => ({
  updateInput: input => dispatch(updateInput(input)),
  updateInputHistory: input => dispatch(updateInputHistory(input)),
  searchForMovies: input => dispatch(searchForMovies(input))
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

  render(){
    const { title, year } = this.props.input;
    console.log(this.props.input);

    return (
      <header>
        <div className="">
          <div className="header-content border">
              <h1>IMDB Search</h1>
              <Row className="my-row">
                <Col componentClass={ControlLabel} sm={2} className="lable">
                  Title:
                </Col>
                <Col sm={10}>
                  <FormGroup bsSize="large">
                    <FormControl type="text" name="title" value={title} onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
              </Row>

              <Row className="my-row">
                <Col componentClass={ControlLabel} sm={2} className="lable">
                  Year:
                </Col>
                <Col sm={10}>
                  <FormGroup bsSize="large">
                    <FormControl type="text" name="year" value={year} onChange={this.onInputChange} />
                  </FormGroup>
                </Col>
              </Row>
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

}
