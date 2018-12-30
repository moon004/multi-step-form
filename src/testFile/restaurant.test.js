import React from 'react';
import Restaurant from '../components/SelectRest'
import { mount } from 'enzyme'

describe('<SelectMeal/>', () => {
  const FromParent = {
    step: 2,
    meal: 'breakfast',
    people: '',
    passInput: false,
    passMeal: false,
    restaurant: '',
    passSelectRest: false,
    parentDishes: [],
  }
  const NextHandler = jest.fn();
  const PrevHandler = jest.fn();
  const mealForm = mount(
  <Restaurant
    stateFromParent={FromParent}
    handleNextStep={NextHandler}
    handlePrevStep={PrevHandler}
  />)
  it('Should renders correctly', () => {
    expect(mealForm.find('h4').length).toEqual(1);
    expect(mealForm.find('button').length).toEqual(2);
    expect(mealForm.find('li').at(0).props().value).toBe('Mc Donalds')
    expect(mealForm.find('li').at(1).props().value).toBe('Olive Garden')
    expect(mealForm.find('li').at(2).props().value).toBe('Vege Deli')
  })
  it('Should functions as expected', () => {
    const btnNext = mealForm.find('#buttonNext').at(0);
    const btnPrev = mealForm.find('#buttonPrev').at(0);
    const breakfastLi = mealForm.find('li').at(0);
    const input = mealForm.find('input')
    btnNext.simulate('click')
    expect(NextHandler).toHaveBeenCalled();
    btnPrev.simulate('click')
    expect(PrevHandler).toHaveBeenCalled();
    // test state change
    breakfastLi.simulate('click')
    expect(mealForm.state().restaurantChoice).toBe('Mc Donalds')
    expect(mealForm.state().passSelectRest).toBe(true)
  })
})