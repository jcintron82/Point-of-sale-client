import { OrderPad } from "../../utility/orderpad.js";
import { UtilityBar } from "../../utility/utilitybar";
import { customizationOptions } from "../../breakfast/eggbreakfasts";
import "../../../css/mainscreen/homescreen-styles.css";

export function BLT() {
  const addSelectedCustomization = (classification, selection) => {
    // customizationOptions.options = customizationsArr;
    customizationOptions.updateState(classification, selection);
  };
  return (
    <div className="body">
      <div className="mainwrap">
        <OrderPad />
        <div className="categorybtnswrap">
          <h6>Toast Type</h6>
          <ul className="buttonswrap">
            <button
              onClick={(e) => addSelectedCustomization("Toast", "Toast: White |")}
              className="categorybtns"
            >
              White
            </button>
            <button
              onClick={(e) => addSelectedCustomization("Toast", "Toast: Wheat |")}
              className="categorybtns"
            >
              Wheat
            </button>
            <button
              onClick={(e) => addSelectedCustomization("Toast", "Toast: Texas |")}
              className="categorybtns"
            >
              Texas
            </button>
            <button
              onClick={(e) =>
                addSelectedCustomization("Toast", "Toast: Raisin |")
              }
              className="categorybtns"
            >
              Raisin
            </button>
          </ul>
          <h6>Side</h6>
          <ul className="buttonswrap">
            <button
              onClick={(e) =>
                addSelectedCustomization("Side", "Side: Hashbrowns")
              }
              className="categorybtns"
            >
              Hashbrowns
            </button>
            <button
              onClick={(e) => addSelectedCustomization("Side", "Side: Grits")}
              className="categorybtns"
            >
              Grits
            </button>
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
    </div>
  );
}

export default BLT;
