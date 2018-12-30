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
      parentDishes: [],

    }
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handlePrevStep = this.handlePrevStep.bind(this);
  }

  handleNextStep = (childState) => () => {
    const {
      step,
      parentDishes,
      people,
      restaurant,
      meal } = this.state;
    console.log('next clicked', step);
    if (step === 1) {
      const {
        inpValue,
        meal,
        passInput,
        passMeal,
      } = childState;
      if (passInput*passMeal) {
        this.setState({
          step: step + 1,
          people: inpValue,
          meal: meal,
          passInput: passInput,
          passMeal: passMeal,
        });
        if (this.state.meal !== childState.meal) {
          this.setState({
            parentDishes: [],
          })
        }
      }
    }
    if (step === 2) {
      const { restaurantChoice, passSelectRest } = childState;
      if (passSelectRest) {
        this.setState({
          step: step + 1,
          restaurant: restaurantChoice,
          passSelectRest: passSelectRest,
        });
        console.log('restChoice', restaurant, restaurantChoice)
        if (restaurant !== restaurantChoice) {
          this.setState({
            parentDishes: [],
            passSelectDish: false
          });
        }
      }    
    }
    if (step === 3) {
      const { passSelectDish, inpValue, selectedDish } = childState;
      if (passSelectDish) {
        const dishes = selectedDish.map((item, i) => {
          return {
            name: item,
            quantity: inpValue[i],
          }
        });
        this.setState({
          step: step + 1,
          parentDishes: dishes,
          passSelectDish: passSelectDish,
        });
      }
    }
    if (step === 4) {
      console.log('Submited!, Data collected here!',
        meal, people, restaurant, parentDishes);
      this.setState({
        step: step + 1,
      });
    }

  }
  handlePrevStep = (childState) => () => {
    const { step } = this.state;
    
    // avoid reading null value by segmenting
    // each step and childState value retrieval.
    if (step === 2) {
      const {
        restaurantChoice,
        passSelectRest,
      } = childState;
      this.setState({
        step: step - 1,
        restaurant: restaurantChoice,
        passSelectRest: passSelectRest,
      });
    }
    if (step === 3) {
      const {
        selectedDish,
        inpValue,
        passSelectDish
      } = childState;
      const dishes = selectedDish.map((item, i) => {
        return {
          name: item,
          quantity: inpValue[i],
        }
      })
      this.setState({
        step: step - 1,
        parentDishes: dishes,
        passSelectDish: passSelectDish,
      });
    }
    if (step === 4) {
      this.setState({
        step: step - 1,
      });
    }
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
              handleNextStep={this.handleNextStep}
              handlePrevStep={this.handlePrevStep}
              stateFromParent={this.state}
            />
          </div>
        )
        case 5:
        return (
          <div className="FormDiv">
            <h4>Your booking has been received!</h4>
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
