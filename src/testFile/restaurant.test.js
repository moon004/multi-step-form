import React from 'react';
import Restaurant from '../components/SelectRest'
import { mount } from 'enzyme'

describe('<SelectRest/>', () => {
  const Breakfast = {
    step: 2,
    meal: 'breakfast',
  }
  const Lunch = {
    step: 2,
    meal: 'lunch',
  }
  const Dinner = {
    step: 2,
    meal: 'dinner',
  }
  const NextHandler = jest.fn();
  const PrevHandler = jest.fn();
  const BreakfastForm = mount(
  <Restaurant
    stateFromParent={Breakfast}
    handleNextStep={NextHandler}
    handlePrevStep={PrevHandler}
  />)
  const LunchForm = mount(
  <Restaurant
    stateFromParent={Lunch}
    handleNextStep={NextHandler}
    handlePrevStep={PrevHandler}
  />)
  const DinnerForm = mount(
  <Restaurant
    stateFromParent={Dinner}
    handleNextStep={NextHandler}
    handlePrevStep={PrevHandler}
  />)
  it('Should renders correctly for BreakfastForm', () => {
    expect(BreakfastForm.find('h4').length).toEqual(1);
    expect(BreakfastForm.find('button').length).toEqual(2);
    expect(BreakfastForm.find('li').at(0).props().value).toBe('Mc Donalds')
    expect(BreakfastForm.find('li').at(1).props().value).toBe('Vege Deli')
    expect(BreakfastForm.find('li').at(2).props().value).toBe('Olive Garden')
  })
  it('Should renders correctly for LunchForm', () => {
    expect(LunchForm.find('h4').length).toEqual(1);
    expect(LunchForm.find('button').length).toEqual(2);
    expect(LunchForm.find('li').at(0).props().value).toBe('Mc Donalds')
    expect(LunchForm.find('li').at(1).props().value).toBe('Taco Bell')
    expect(LunchForm.find('li').at(2).props().value).toBe('Vege Deli')
    expect(LunchForm.find('li').at(3).props().value).toBe('Pizzeria')
    expect(LunchForm.find('li').at(4).props().value).toBe('Panda Express')
    expect(LunchForm.find('li').at(5).props().value).toBe('Olive Garden')
  })
  it('Should renders correctly for DinnerForm', () => {
    expect(DinnerForm.find('h4').length).toEqual(1);
    expect(DinnerForm.find('button').length).toEqual(2);
    expect(DinnerForm.find('li').at(0).props().value).toBe('Mc Donalds')
    expect(DinnerForm.find('li').at(1).props().value).toBe('Taco Bell')
    expect(DinnerForm.find('li').at(2).props().value).toBe('BBQ Hut')
    expect(DinnerForm.find('li').at(3).props().value).toBe('Vege Deli')
    expect(DinnerForm.find('li').at(4).props().value).toBe('Pizzeria')
    expect(DinnerForm.find('li').at(5).props().value).toBe('Panda Express')
    expect(DinnerForm.find('li').at(6).props().value).toBe('Olive Garden')
  })

  // Lunch and Dinner should work as expected.
  it('Should functions as expected for breakfast', () => {
    const btnNext = BreakfastForm.find('#buttonNext').at(0);
    const btnPrev = BreakfastForm.find('#buttonPrev').at(0);
    const breakfastLi = BreakfastForm.find('li').at(0);
    btnNext.simulate('click')
    expect(NextHandler).toHaveBeenCalled();
    btnPrev.simulate('click')
    expect(PrevHandler).toHaveBeenCalled();
    // test state change
    breakfastLi.simulate('click')
    expect(BreakfastForm.state().restaurantChoice).toBe('Mc Donalds')
    expect(BreakfastForm.state().passSelectRest).toBe(true)
  })
})