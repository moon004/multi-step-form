import React, { Component } from 'react';
import styled from '@emotion/styled';

const UlStyle = styled.ul`
  align-items: center;
  margin-bottom: 2em;
  padding: 0;
`
const LiStyle = styled.li`
  font-weight: 600;
  background: ${props => props.clicked === props.value ?
    '#f21313' : 'white' };
  color: ${props => props.clicked === props.value ?
    '#ededed' : 'black' };
  &:hover {
    background: ${props => props.clicked === props.value ?
      '#f21313' : 'rgb(206, 206, 206)' };
}
`

const ButStyle = styled.button`
  border: 2px solid black;
  color: ${props => props.pass ? '#2d2d2d' : 'white'};
  background: ${props => props.pass ? '#27f943' : '#e70606'};
  padding: 0.4em 1.2em 0.4em 1.2em;
  font-weight: 700;
  border-radius: 0.6em;
  position: relative;
  right: 7.5em;
  font-size: 1em;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${props => props.pass ? '#0bc64d' : '#e70606'};
  }
}
`

class SelectMeal extends Component {
  constructor() {
    super();
    this.state = {
      inpValue: '',
      meal: '',
      passInput: false,
      passMeal: false,
    }
    this.regNumb = /^(?:[1-9]|0[1-9]|10|^$)$/
    this.regSpace = /\s+/
    this.regAlpha = /^([0-9]|\s+)*$/
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMealChange = this.handleMealChange.bind(this);
  }

  componentWillMount() {
    const {
      meal,
      people,
      passInput,
      passMeal,
    } = this.props.stateFromParent;
    console.log('componentwillmount', meal, people, passInput, passMeal);
    this.setState({
      inpValue: people,
      meal: meal,
      passInput: passInput,
      passMeal: passMeal,
    });
  }

  handleTextChange = () => (event) => {
    console.log('handleTextChange', event.target.value)
    this.setState({
      inpValue: event.target.value,
      passInput: true,
    })
    if (!this.regNumb.test(event.target.value)
      && !this.regSpace.test(event.target.value)
        && this.regAlpha.test(event.target.value)) {
      console.log('Must be less than 10!', event.target.value);
      this.setState({
        passInput: false,
      });
    }
    if (this.regSpace.test(event.target.value)) {
      console.log('no whitespace!', event.target.value);
      this.setState({
        passInput: false,
      });
    }
    if (!this.regAlpha.test(event.target.value)) {
      console.log('no alphabet or special characters!', event.target.value);
      this.setState({
        passInput: false,
      });
    }
    if (event.target.value.length === 0) {
      console.log('Must be between 1 to 10 people')
      this.setState({
        passInput: false,
      })
    }
  }

  handleMealChange = (value) => () => {
    console.log('meal CHange', value)
    this.setState({
      meal: value,
      passMeal: true,
    })
  }


  render() {
    const {
      handleNextStep,
    } = this.props
    const {
      inpValue,
      meal,
      passInput,
      passMeal
    } = this.state;
    const allChildState = this.state;
    return (
      <div>
        <div className="custom-select">
          <h4>Please Select a Meal</h4>
            <UlStyle>
              <LiStyle
                value="breakfast"
                clicked={meal}
                onClick={this.handleMealChange('breakfast')}
              >Breakfast</LiStyle><br/>
              <LiStyle
                value="lunch"
                clicked={meal}
                onClick={this.handleMealChange('lunch')}
              >Lunch</LiStyle><br/>
              <LiStyle
                value="dinner"
                clicked={meal}
                onClick={this.handleMealChange('dinner')}
              >Dinner</LiStyle><br/>
            </UlStyle>
            <input
              className="textInput"
              value={inpValue}
              onChange={this.handleTextChange(inpValue)}
              placeholder="Number of People"
            />
        </div>
          <ButStyle
            id="buttonNext"
            pass={passInput*passMeal}
            onClick={handleNextStep(allChildState)}
          >Next</ButStyle>
      </div>
    )
  }
}

export default SelectMeal;