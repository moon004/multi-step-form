import React from 'react';
import Review from '../components/Review';
import { mount } from 'enzyme';

describe('<SelectMeal/>', () => {
  const FromParent = {
    step: 1,
    meal: 'breakfast',
    people: '3',
    restaurant: '',
    parentDishes: [
      {name: "Coleslaw Sandwich", quantity: 1},
      {name: "Grilled Sandwich", quantity: 2},
    ],
  }
  const handlerNext = jest.fn();
  const handlerPrev = jest.fn();
  const reviewForm = mount(
  <Review
    stateFromParent={FromParent}
    handlePrevStep={handlerPrev}
    handleNextStep={handlerNext}
  />)
  it('Should renders correctly', () => {
    expect(reviewForm.find('h4').length).toEqual(1);
    expect(reviewForm.find('div').length).toEqual(15);
    expect(reviewForm.find('.left').length).toEqual(1);
    expect(reviewForm.find('.right').length).toEqual(1);
    expect(reviewForm.find('.dishListDiv').length).toEqual(1);
    expect(reviewForm.find('button').length).toEqual(2);
    expect(reviewForm.find('li').length).toEqual(6);
    expect(reviewForm.find('li').at(0).text()).toEqual('Coleslaw Sandwich');
    expect(reviewForm.find('li').at(1).text()).toEqual('Grilled Sandwich');
    expect(reviewForm.find('li').at(4).text()).toEqual("1");
    expect(reviewForm.find('li').at(5).text()).toEqual("2");
  })
  it('Should submit or "previous" as expected', () => {
    const btnSubmit = reviewForm.find('#buttonNext').at(0);
    const btnPrev = reviewForm.find('#buttonPrev').at(0);
    btnSubmit.simulate('click')
    btnPrev.simulate('click')
    expect(handlerNext).toHaveBeenCalled();
    expect(handlerPrev).toHaveBeenCalled();
  })
})