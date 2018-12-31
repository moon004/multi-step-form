import React from 'react';
import Meal from '../components/SelectMeal'
import { mount } from 'enzyme'

describe('<SelectMeal/>', () => {
  const FromParent = {
    step: 1,
    meal: '',
    people: '',
    passInput: false,
    passMeal: false,
    restaurant: '',
    passSelectRest: false,
    parentDishes: [],
  }
  const handler = jest.fn();
  const mealForm = mount(
  <Meal
    stateFromParent={FromParent}
    handleNextStep={handler}
  />)
  it('Should renders correctly', () => {
    expect(mealForm.find('h4').length).toEqual(1);
    expect(mealForm.find('ul').length).toEqual(2);
    expect(mealForm.find('input').length).toEqual(1);
    expect(mealForm.find('button').length).toEqual(1);
    expect(mealForm.find('li').at(0).props().value).toBe('breakfast');
    expect(mealForm.find('li').at(1).props().value).toBe('lunch');
    expect(mealForm.find('li').at(2).props().value).toBe('dinner');
  })
  it('Should functions as expected', () => {
    const btn = mealForm.find('#buttonNext').at(0);
    const breakfastLi = mealForm.find('li').at(0);
    const input = mealForm.find('input')
    btn.simulate('click');
    expect(handler).toHaveBeenCalled();
    // test state change
    breakfastLi.simulate('click')
    expect(mealForm.state().meal).toBe('breakfast')
    expect(mealForm.state().passMeal).toBe(true)
    // test Error message
    input.simulate('change', { target: { value: 'hopes' }})
    expect(mealForm.state().errorList).toEqual(['Only Numbers'])
    input.simulate('change', { target: { value: ' ' }})
    expect(mealForm.state().errorList).toEqual(['No Whitespace'])
    input.simulate('change', { target: { value: '12' }})
    expect(mealForm.state().errorList).toEqual(['Number must be between 1-10'])
  })
})