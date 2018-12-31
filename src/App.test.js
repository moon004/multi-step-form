import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import SelectMeal from './components/SelectMeal';
import SelectRest from './components/SelectRest';
import SelectDish from './components/SelectDish';
import Review from './components/Review';
import App from './App';

describe('<App/>', () => {
  // childState1 = child state for step 1
  const childState1 = {
    passInput: true,
    passMeal: true,
  }
  const childState2 = {
    passSelectRest: true,
  }
  const childState3 = {
    passSelectDish: true,
    selectedDish: [],
    meal: '',
  }
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
  const mountApp = mount(
    <App/>
  )
  const instance = mountApp.instance();
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('Renders all without error and test the next button', () => {
    const mountMeal = mount(
      <SelectMeal
        stateFromParent={FromParent}
        handleNextStep={instance.handleNextStep(childState1)}
      />)
    expect(mountApp.state().step).toEqual(2);
    const mountRest = mount(<SelectRest
      handleNextStep={instance.handleNextStep(childState2)}
      handlePrevStep={instance.handlePrevStep} //prevent calling prev
      stateFromParent={FromParent}
    />)
    // IMPORTANT!! comment out line 61 to 62 before uncomment below to avoid error.
    // expect(mountApp.state().step).toEqual(3);
    // const mountDish = shallow(<SelectDish
    //   handleNextStep={instance.handleNextStep(childState3)}
    //   handlePrevStep={instance.handlePrevStep}
    //   stateFromParent={FromParent}
    // />)
    // expect(mountApp.state().step).toEqual(4);
  });

});

