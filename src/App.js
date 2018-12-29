import React, { Component } from 'react';
import SelectMeal from './components/SelectMeal';
import SelectRest from './components/SelectRest';
import SelectDish from './components/SelectDish';
import Review from './components/Review';
import styled from '@emotion/styled';
import './App.css';

const SpanStyle = styled.span`
  border: '1px solid green';
  background-color: ${props => props.step === props.name ? '#93ff95' : 'white'};
  font-size: 0.8em;
  font-weight: 700;
  padding: 0.8em 1.6em 0.8em 1.6em;
`

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      meal: '',
      people: '',
      passInput: false,
      passMeal: false,
      restaurant: '',
      passSelectRest: false,
      dishes: [{}],

    }
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePrevStep = this.handlePrevStep.bind(this);
  }

  handleNextStep = (childState) => () => {
    console.log('next clicked', childState);
    const { step } = this.state;
    const {
      inpValue,
      meal,
      passInput,
      passMeal,
      restaurantChoice,
      passSelectRest,
    } = childState;
    if (passInput*passMeal) {
      this.setState({
        step: step + 1,
        people: inpValue,
        meal: meal,
        passInput: passInput,
        passMeal: passMeal,
      });
    }
    if (passSelectRest) {
      this.setState({
        step: step + 1,
        restaurant: restaurantChoice,
        passSelectRest: passSelectRest,
      })
    }
  }
  handlePrevStep = () => () => {
    const { step, restaurant } = this.state;
    this.setState({
      step: step - 1,
      restaurant: restaurant,
    });
  }


  render() { 
    const { step } = this.state;
    console.log('step', step)
    const InnerForm = (props) => {
      const { step } = props;
      switch(step) {
        case 1:
        return (
          <div className="FormDiv">
            <SelectMeal
              handleNextStep={this.handleNextStep}
              stateFromParent={this.state}
            />
          </div>
        )
        case 2:
        return (
          <div className="FormDiv">
            <SelectRest
              handleNextStep={this.handleNextStep}
              handlePrevStep={this.handlePrevStep}
              stateFromParent={this.state}
            />
          </div>
        )
        case 3:
        return (
          <div className="FormDiv3">
            <SelectDish
              handleNextStep={this.handleNextStep}
              handlePrevStep={this.handlePrevStep}
              stateFromParent={this.state}
            />
          </div>
        )
        case 4:
        return (
          <div className="FormDiv">
            <Review
              stateFromParent={this.state}
            />
          </div>
        )
      }
    }
    return (
      <div className="App">
        <div className="stepDiv">
          <SpanStyle name={1} step={step}>Step One</SpanStyle>
          <SpanStyle name={2} step={step}>Step Two</SpanStyle>
          <SpanStyle name={3} step={step}>Step Three</SpanStyle>
          <SpanStyle name={4} step={step}>Review</SpanStyle>
        </div>
        <InnerForm
          step={step}
        />
      </div>
    )
  }
}

export default App;
