import React, { Component } from 'react';
import styled from '@emotion/styled';
import json from '../assets/dishes.json';
import {dupChecker, dupCheckerBool} from '../components/tools';

const LiRestStyle = styled.li`
  font-weight: 600;
  font-size: 0.85em;
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
  top: 2.5em;
  left: ${props => props.prev ? '-10em' : '4em'};
  position: relative;
  font-size: 1em;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${props => props.pass ? '#0bc64d' : '#e70606'};
  }
}
`

class SelectRest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantChoice: '',
      passSelectRest: false,
      arr: [],
    }
    const jsonDish = json['dishes'];
    const { meal } = this.props.stateFromParent;
    Object.keys(jsonDish).forEach((key) => {
      const jsonAVMeal = jsonDish[key]['availableMeals']
        for (let i in jsonAVMeal) {
          if (jsonAVMeal[i] === meal
            && !dupCheckerBool(this.state.arr, jsonDish[key]['restaurant'])) {
            dupChecker(this.state.arr, jsonDish[key]);
          }
        }
        
    });
  }

  componentWillMount() {
    const {
      restaurant,
      passSelectRest,
    } = this.props.stateFromParent;
    this.setState({
      restaurantChoice: restaurant,
      passSelectRest: passSelectRest,
    });
  }

  handleSelectRest = (value) => () => {
    this.setState({
      restaurantChoice: value,
      passSelectRest: true,
    })
  }

  render() {
    const { restaurantChoice, arr, passSelectRest } = this.state;
    
    const RestaurantList = arr.map(item => (
      <div>
        <LiRestStyle
          key={item.id}
          value={item.restaurant}
          clicked={restaurantChoice}
          onClick={this.handleSelectRest(item.restaurant)}
        >{item.restaurant}</LiRestStyle>
        <br/>
      </div>
    ))
    const { handleNextStep, handlePrevStep } = this.props;
    const allChildState = this.state
    return (
      <div>
        <h4>Please Select a Restaurant</h4>
        <div id="SelectRestaurant">
          {RestaurantList}
        </div>
        <ButStyle
          id="buttonNext"
          pass={passSelectRest}
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

export default SelectRest;