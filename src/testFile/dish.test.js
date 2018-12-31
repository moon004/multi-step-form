import React from 'react';
import Dish, { DishChild } from '../components/SelectDish'
import { mount, render } from 'enzyme'

describe('<SelectDish/>', () => {
  
  const FromParent = {
    meal: 'breakfast',
    people: 3,
    restaurant: 'Vege Deli'
  }
  const NextHandler = jest.fn();
  const PrevHandler = jest.fn();
  
  const MountDish = mount(
  <Dish
    stateFromParent={FromParent}
    handleNextStep={NextHandler}
    handlePrevStep={PrevHandler}
  />)
  it('Should Serve the right Dish', () => {
    expect(MountDish.find('option').length).toEqual(3); //Include 1st hidden option
    expect(MountDish.find('option').at(0).instance().value).toEqual('Select Dish')
    expect(MountDish.find('option').at(1).instance().value).toEqual('Coleslaw Sandwich')
    expect(MountDish.find('option').at(2).instance().value).toEqual('Grilled Sandwich')
  })

  // Lunch and Dinner should work as expected.
  it('Should work for plus button', () => {
    const btnPlus = MountDish.find('#plusButton').at(0);
    btnPlus.simulate('click')
    // test state change
    expect(MountDish.state().dishNservings.length).toBe(1)

  })

  it('Should give the correct error', () => {
    const input = MountDish.find('input').at(0);
    input.simulate('change', { target: { value: 'hopes' }})
    expect(MountDish.state().errorList).toEqual(
      [
      "Only Numbers",
      "Serving must be more than or equals to 3",
      "No Empty Dish"
    ]
    )
    input.simulate('change', { target: { value: ' ' }})
    expect(MountDish.state().errorList).toEqual(
      [
      "No Whitespace",
      "Serving must be more than or equals to 3",
      "No Empty Dish"
    ]
    )
    input.simulate('change', { target: { value: '12' }})
    expect(MountDish.state().errorList).toEqual(
      [
      "Serving must be between 1-10",
      "Serving must be more than or equals to 3",
      "No Empty Dish"
    ]
      )
  })

  it('Should call handler correctly', () => {
    const selectChange = jest.fn();
    const textChange = jest.fn();
    const state = {
      dishList: [
        {"availableMeals": ["breakfast"],
        "id": 14, "name": "Coleslaw Sandwich",
        "restaurant": "Vege Deli"},
        {"availableMeals": ["breakfast"],
        "id": 15, "name": "Grilled Sandwich",
        "restaurant": "Vege Deli"}
      ],
      inpValue: '',
      selectedDish: ['',''],
    }
    const mountChildren = mount(
      <DishChild
        id={0}
        {...state}
        textChange={textChange}
        handleSelectChange={selectChange}
      />)
    const input = mountChildren.find('input').at(0);
    const select = mountChildren.find('select').at(0);
    
    input.simulate('change', { target: { value: '5' }});
    select.simulate('change', { target: { value: 'Coleslaw Sandwich'}});
    expect(selectChange).toHaveBeenCalled();
    expect(textChange).toHaveBeenCalled();
  })
})