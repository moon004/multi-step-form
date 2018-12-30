import React, { Component } from 'react';
import styled from '@emotion/styled';
import json from '../assets/dishes.json';
import {nonEmptyCounter} from '../components/tools';
/*
  Each Dish is match correspondingly with its
  number of servings, ex: selectedDish[0] is matched
  with inpValue[0], from this logic, this.state.dishes
  is then set when next or prev is clicked.
*/

const ButStyle = styled.button`
  border: 2px solid black;
  color: ${props => props.pass ? '#2d2d2d' : 'white'};
  background: ${props => props.pass ? '#27f943' : '#e70606'};
  padding: 0.4em 1.2em 0.4em 1.2em;
  font-weight: 700;
  border-radius: 0.6em;
  position: relative;
  left: ${props => props.prev ? '-10em' : '4em'};
  font-size: 1em;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${props => props.pass ? '#0bc64d' : '#e70606'};
  }
}
`

const PlusButton = styled.button`
  border: 2px solid black;
  background: #00dd46;
  border-radius: 1em;
  margin: 2em 0;
  &:hover {
    background: #09f253;
  }
  &:focus {
    outline: none;
  }
  &:active {
    background: #02d846;
  }
`

const Option = styled.option`
  display: ${props => props.selectedElem ? 'none' : 'block'};
`

const DishChild = props => {
  const {
    dishList, 
    inpValue, // text value
    textChange, // handler
    id,
    selectedDish,
    handleSelectChange
  } = props;
  const dList = dishList.map(item => {
    const matchSelected = selectedDish.some((element) => {
      return element === item.name;
    })
    return (
      <Option
        key={item.id}
        value={item.name}
        selectedElem={matchSelected}
      >{item.name}</Option>
    )
  })
  return (
  <div id="SelectDish" className="innerDishClass">
    <select
      id={id}
      value={selectedDish[id]}
      onChange={handleSelectChange()}
    >
      <option style={{display: 'none'}}>Select Dish</option>
      {dList}
    </select>
    <input
      style={{
        marginLeft: '3.0em',
        width: '10em',
        padding: '0.3em'
      }}
      className="textInput"
      id={id}
      value={inpValue[id]}
      onChange={textChange()}
      placeholder="No. of servings"
    />
  </div>
  )
}


class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishList: [],
      selectedDish: [],
      dishNservings: [],
      inpValue: [1],
      passSelectDish: false,
      errorList: [],
    }
    const {
      restaurant, meal,
      parentDishes, passSelectDish
    } = this.props.stateFromParent;
    const {
      dishList,
      selectedDish,
      inpValue,
      dishNservings,
    } = this.state
    this.state.passSelectDish = passSelectDish;
    const jsonDish = json['dishes'];
    Object.keys(jsonDish).forEach((key) => {
      const jsonRest = jsonDish[key]['restaurant']
      const jsonMeals = jsonDish[key]['availableMeals']
      if (jsonDish[key]['name']
      !== jsonDish[Math.max(0,key-1)]['name']
      || dishList.length === 0) {
        for (let i in jsonMeals) {
          if (jsonRest === restaurant
            && jsonMeals[i] === meal) {
              dishList.push(jsonDish[key])
              // make sure selectedDish[id] has default value
              selectedDish.push('')
            }
        }
      }
    });
    let j = 0;
    for (let i in parentDishes) {
      selectedDish[i] = parentDishes[i].name;
      inpValue[i] = parentDishes[i].quantity;
      if (parentDishes[i].name !== "" ) {
        j++
        if (j > 1) {
          dishNservings.push(DishChild);
        }
      }
    }
    
    this.regNumb = /^(?:[1-9]|0[1-9]|10|^$)$/
    this.regSpace = /\s+/
    this.regAlpha = /^([0-9]|\s+)*$/
  }

  dupChecker = (array, itemToCheck) => {
    const duplicated = array.some(function(elem) {
      return elem === this;
    }, itemToCheck);
    if (duplicated) {
      return array
    }
    array.push(itemToCheck)
    return array
  }

  handleTextChange = () => (event) => {
    const { people } = this.props.stateFromParent;
    const { id, value } = event.target;
    const { inpValue, selectedDish, dishNservings } = this.state;
    let { errorList } = this.state;
    inpValue[id] = value;
    this.setState({
      inpValue: inpValue,
      passSelectDish: true,
      errorList: [],
    });
    errorList = [];
    if (!this.regNumb.test(event.target.value)
      && !this.regSpace.test(event.target.value)
        && this.regAlpha.test(event.target.value)) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 
          'Serving must be between 1-10'),
      });
    }
    if (this.regSpace.test(event.target.value)) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 'No Whitespace'),
      });
    }
    if (!this.regAlpha.test(event.target.value)) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 'Only Numbers'),
      });
    }
    if (event.target.value.length === 0) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 'No Empty Value'),
      });
    }
    const total = inpValue.reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator) + parseInt(currentValue))
    if (total < people) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList,
          `Serving must be more than or equals to ${people}`),
      });
    }
    const counter = nonEmptyCounter(selectedDish);
    if (counter < (dishNservings.length + 1)) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 'No Empty Dish'),
      });
    }
    
  }

  handleSelectChange = () => (event) => {
    let {
      selectedDish,
      errorList,
      inpValue,
      dishNservings,
    } = this.state;
    const { people } = this.props.stateFromParent;
    selectedDish[event.target.id] = event.target.value;
    
    this.setState({
      selectedDish: selectedDish,
      passSelectDish: true,
      errorList: [],
    })
    const total = inpValue.reduce(
      (accumulator, currentValue) =>
        parseInt(accumulator) + parseInt(currentValue))
    if (total < people) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList,
          `Serving must be more than or equals to ${people}`),
      });
    }
    const counter = nonEmptyCounter(selectedDish);
    console.log('counter', counter);
    if (counter < (dishNservings.length + 1)) {
      this.setState({
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 'No Empty Dish'),
      });
    }
  }

  handlePlusClick = () => {
    const { dishNservings, inpValue, selectedDish } = this.state;
    let { errorList } = this.state;
    // Implement max plus
    console.log('plus', dishNservings, selectedDish)
    if ((dishNservings.length + 1) < selectedDish.length) {
      dishNservings.push(DishChild);
      inpValue[dishNservings.length] = 1;
      this.setState({
        inpValue: inpValue,
        dishNservings: dishNservings,
        passSelectDish: false,
        errorList: this.dupChecker(errorList, 'No Empty Dish'),
      })
    }
  }

  handleReset = () => {
    const { dishList, selectedDish } = this.state;
    for (let i in dishList) {
      selectedDish[i] = '';
    }
    this.setState({
      errorList: [],
      passSelectDish: false,
      selectedDish: selectedDish,
      dishNservings: [],
      inpValue: [1],
    })
  }

  render() {
    const { handleNextStep, handlePrevStep } = this.props;
    const { passSelectDish, dishNservings, errorList } = this.state;
    const allChildState = this.state;
    const PlusComponent = dishNservings.map((Component, i) => {
      return (
        <Component
          key={i+1}
          id={i+1}
          {...this.state}
          textChange={this.handleTextChange}
          handleSelectChange={this.handleSelectChange}
        />
      )})
    const errors = errorList.map((err, i) => (
      <li key={i} id="errorLister">{err}</li>
    ))
    return (
      <div>
        <div id="SelectDishDiv">
        {/* Title Column */}
          <div>
            <h5>Please Select a Dish</h5>
            <h5
              style={{marginLeft: '3.2em'}}
            >Number of Servings</h5>
          </div>
          {/* List and Input Column */}
          <DishChild
            id={0}
            {...this.state}
            textChange={this.handleTextChange}
            handleSelectChange={this.handleSelectChange}
          />
          {PlusComponent}
          <PlusButton
            onClick={this.handlePlusClick}
          >+</PlusButton>
        </div>
        <ul id="errorUl">
          {errors}
        </ul>
          <ButStyle
            id="buttonNext"
            pass={passSelectDish}
            onClick={handleNextStep(allChildState)}
          >Next</ButStyle>
          <ButStyle
            id="buttonReset"
            pass
            onClick={this.handleReset}
          >Reset</ButStyle>
          <ButStyle
            id="buttonPrev"
            prev
            pass
            onClick={handlePrevStep(allChildState)}
          >Previous</ButStyle>
      </div>
    )
  }
}

export default SelectDish;