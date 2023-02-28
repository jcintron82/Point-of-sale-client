import { useNavigate } from 'react-router-dom'
import { customizationOptions } from './eggbreakfasts.js';
import { OrderPad } from '../utility/orderpad.js'

import "../../css/mainscreen/homescreen-styles.css";

export function CustomizationPanel() {

    const addSelectedCustomization = (classification, selection) => {
        customizationOptions.updateState(classification,selection);
    }


  const navigate = useNavigate();

  const onClick = (section) => {
    let formattedArg = "/" + section;
      navigate(formattedArg);
  };

  return (
    <div className='body'>
    <div className="mainwrap">
      <OrderPad />
      <div className="categorybtnswrap">
      <h6>Egg Style</h6>
      <ul className='buttonswrap'>
        <button onClick={(e) => addSelectedCustomization('Eggs', 'Egg Style: Over Easy |')} className="categorybtns">Over-Easy</button>
        <button onClick={(e) => addSelectedCustomization('Eggs', 'Egg Style: Medium')} className="categorybtns">Medium</button>
        <button onClick={(e) => addSelectedCustomization('Eggs', 'Egg Style: Scrambled')} className="categorybtns">Scrambled</button>
        <button onClick={(e) => addSelectedCustomization('Eggs', 'Egg Style: Boiled')} className="categorybtns">Boiled</button>
        </ul>
        <h6>Protein</h6>
        <ul className='buttonswrap'>
        <button onClick={(e) => addSelectedCustomization('Protein', 'Protein: Bacon |')} className="categorybtns">Bacon</button>
        <button onClick={(e) => addSelectedCustomization('Protein', 'Protein: Sausage |')} className="categorybtns">Sausage</button>
        <button onClick={(e) => addSelectedCustomization('Protein', 'Protein: Chicken |')} className="categorybtns">Chicken</button>
        <button onClick={(e) => addSelectedCustomization('Protein', 'Protein: Ham |')} className="categorybtns">Ham</button>
        </ul>
        <h6>Toast Type</h6>
        <ul className='buttonswrap'>
            <button onClick={(e) => addSelectedCustomization('Toast', 'Toast: White |')} className="categorybtns">White</button>
            <button onClick={(e) => addSelectedCustomization('Toast', 'Toast: Wheat |')} className="categorybtns">Wheat</button>
            <button onClick={(e) => addSelectedCustomization('Toast', 'Toast: Raisin |')} className="categorybtns">Raisin</button>
        </ul>
        <h6>Side</h6>
        <ul className='buttonswrap'>
            <button onClick={(e) => addSelectedCustomization('Side', 'Side: Hashbrowns')} className="categorybtns">Hashbrowns</button>
          <button onClick={(e) => addSelectedCustomization('Side', 'Side: Grits')} className="categorybtns">Grits</button>
        </ul>
        <h6>Add Ons</h6>
          <ul className="buttonswrap">
            <button
              onClick={(e) =>
                addSelectedCustomization("AddIns", "Cheese, ")
              }
              className="categorybtns"
            >
              Cheese
            </button>
            <button
              onClick={(e) => addSelectedCustomization("AddIns", "LTO, ")}
              className="categorybtns"
            >
            LTO
            </button>
            <button
              onClick={(e) => addSelectedCustomization("AddIns", "Bacon, ")}
              className="categorybtns"
            >
            Bacon
            </button>
            <button
              onClick={(e) => addSelectedCustomization("AddIns", "Peppers, ")}
              className="categorybtns"
            >
            Peppers
            </button>
            <button
              onClick={(e) => addSelectedCustomization("AddIns", "Mushrooms, ")}
              className="categorybtns"
            >
            Mushrooms
            </button>
          </ul>
            </div>
    </div>
      {/* <UtilityBar /> */}
  </div>
  );
}

export default CustomizationPanel;