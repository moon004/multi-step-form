import React, { Component } from 'react';
import styled from '@emotion/styled';
import json from '../assets/dishes.json';



const ButStyle = styled.button`
  border: 2px solid black;
  color: ${props => props.pass ? '#2d2d2d' : 'white'};
  background: ${props => props.pass ? '#27f943' : '#e70606'};
  padding: 0.4em 1.2em 0.4em 1.2em;
  font-weight: 700;
  border-radius: 0.6em;
  position: relative;
  left: ${props => props.prev ? '-8em' : '2em'};
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
  display: ${props => props.selected ? 'none' : 'block'};
`

const DishChild = props => {
  const {
    dishList, 
    inpValue,
    textChange,
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
        selected={matchSelected}
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
      dishes: [{}],
      dishNservings: [],
      inpValue: [],
      passSelectDish: false,
    }
    const { restaurant, meal } = this.props.stateFromParent;
    const jsonDish = json['dishes'];
    console.log('rest and meal', restaurant, meal)
    Object.keys(jsonDish).forEach((key) => {
      const jsonRest = jsonDish[key]['restaurant']
      const jsonMeals = jsonDish[key]['availableMeals']
      if (jsonDish[key]['name']
      !== jsonDish[Math.max(0,key-1)]['name']
      || this.state.dishList.length === 0) {
        for (let i in jsonMeals) {
          if (jsonRest === restaurant
            && jsonMeals[i] === meal) {
              this.state.dishList.push(jsonDish[key])
              // make sure selectedDish[id] has default value
              this.state.selectedDish.push('')
            }
        }
      }
    });
    this.regNumb = /^(?:[1-9]|0[1-9]|10|^$)$/
    this.regSpace = /\s+/
    this.regAlpha = /^([0-9]|\s+)*$/
  }

  handleTextChange = () => (event) => {
    const { id, value } = event.target;
    this.state.inpValue[id] = value
    this.setState({
      inpValue: this.state.inpValue,
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

  // arrRemover = (array, i) => {
  //   const index = array.map((e) => { return e.name }).indexOf(i);
  //   if (index > -1) {
  //     //delete 1 start from index
  //     array.splice(index, 1)
  //   }
  //   console.log('arrRemover', array, i, index)
  // }

  handleSelectChange = () => (event) => {
    let { selectedDish } = this.state;
    console.log('select value', selectedDish)
    selectedDish[event.target.id] = event.target.value;
    this.setState({
      selectedDish: selectedDish,
    })
  }

  handlePlusClick = () => {
    const { dishNservings } = this.state;
    console.log('Plus Clkicked', dishNservings)
    
    dishNservings.push(DishChild);
    this.setState({
      dishNservings: dishNservings,
    })
  }

  render() {
    const { handleNextStep, handlePrevStep } = this.props;
    const { passSelectDish, dishNservings } = this.state;
    console.log('rendered', dishNservings)
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
          <ButStyle
            id="buttonNext"
            pass={passSelectDish}
            onClick={handleNextStep(allChildState)}
          >Next</ButStyle>
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