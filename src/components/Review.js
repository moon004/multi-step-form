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

class Review extends Component {

  render() {
    const {
      meal,
      people,
      restaurant,
      parentDishes,
    } = this.props.stateFromParent;
    
    const DishListName = parentDishes.map((object) => (
      <li>{object.name}</li>
    ))
    const DIshListQuantity = parentDishes.map((object) => (
      <li>{object.quantity}</li>
    ))
    const dash = parentDishes.map((object) => {
      if (object.name !== '') {
        return (
          <li>{' - '}</li>
        )
      }
    })
    
    const { handleNextStep, handlePrevStep } = this.props;
    const allChildState = this.state
    return (
      <div>
        <h4>Review</h4>
        <div id="reviewDiv">
          <div className="left">
            <div>Meal</div><br/>
            <div>People</div><br/>
            <div>Restaurant</div><br/>
            <div>Dishes</div><br/>
          </div>
          <div className="right">
            <div>{meal.charAt(0).toUpperCase() + meal.substring(1,meal.length)
              || 'Empty'}</div><br/>
            <div>{people || 'No People'}</div><br/>
            <div>{restaurant || 'Havent Decide'}</div><br/>
            <div className="dishListDiv">
              <div style={{textAlign: 'right'}}>
                {DishListName}
              </div>
              <div id="dashDiv">
                {dash}
              </div>
              <div>
                {DIshListQuantity}
              </div>
            </div><br/>
          </div>
        </div>
        <ButStyle
          id="buttonNext"
          pass
          onClick={handleNextStep(allChildState)}
        >Submit</ButStyle>
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

export default Review;