import { useEffect, useState } from "react";
import "../../css/orderpad.css";
import { customizationOptions } from "../breakfast/eggbreakfasts";
import UtilityBar from "./utilitybar";
export { OrderPad, orderPadArr, orderFunc, finalOrderArr, orders };

const orderPadArr = [];
const orderFunc = {};
const finalOrderArr = [];
const managementIndexTracker = 0;
const orders = {};
const orderNum = localStorage.getItem("orderNum");
const priceArr = [0, 0, orderNum];
function OrderPad() {
  // const [orderNum, setOrderNum] = useState(1);
  const [num, setnum] = useState(priceArr[2]);
  const [finalSum, setFinalSum] = useState(priceArr[0]);
  const [tips, setTips] = useState(priceArr[1]);
  const [postTip, setPostTip] = useState(parseFloat(finalSum) + parseFloat(tips));
  const [tipsinput, setTipsInput] = useState(false);
  const [deleteIndex, setIndex] = useState();
  const [stately, setStately] = useState(false);
  const [input, setInput] = useState("");
  const [customInput, setCustomInput] = useState(false);
  const [waffleIndex, setWaffleIndex] = useState(false);


  orderFunc.newOrder = () => {
    const preCompedValue = localStorage.getItem('preCompedValue');
    const PRODUCT = orderPadArr[0].message[0];
    finalOrderArr.push(PRODUCT);
    orderPadArr.splice(0);
    totalFinalSum(PRODUCT.Price.$numberDecimal);
    //Next 3 lines ensure non correlated addons show with waffles
    PRODUCT.category === "Waffles"
      ? setWaffleIndex(true)
      : setWaffleIndex(null);
    setDeleteIndex(-1);
    const sum = parseInt(priceArr[0]) + parseInt(PRODUCT.Price.$numberDecimal);
    priceArr.length > 0
      ? (priceArr[0] = sum)
      : priceArr.push(PRODUCT.Price.$numberDecimal);
      const precomp = parseFloat(preCompedValue) + parseFloat(PRODUCT.Price.$numberDecimal)
    localStorage.setItem('preCompedValue', precomp.toFixed(2))
  };
  //Runs on item click and uses the it's placement in the list to get its correlated
  //array placement which the delete index becomes. This is here so we can freely delete and
  //edit items in singularity
  const setDeleteIndex = (index) => {
    deleteIndex === index ? setIndex(-1) : setIndex(index);
    if (deleteIndex === undefined) {
      setIndex(finalOrderArr.length - 1);
    }
    setStately(!stately);
  };

  const deleteItem = () => {
    let sum = 0;
    const price = finalOrderArr[deleteIndex].Price.$numberDecimal
    priceArr[0] = priceArr[0] - price;
    finalOrderArr.splice(deleteIndex, 1);
    const x = finalOrderArr.filter((price) => {
      sum = sum + parseInt(price.Price.$numberDecimal);
      return sum;
    });
    const preComped = parseFloat(localStorage.getItem('preCompedValue'))
    localStorage.setItem('preCompedValue', preComped - parseFloat(price))
    setFinalSum(sum);
    setDeleteIndex(deleteIndex - 1);
    setPostTip(sum + tips);
  };

  const totalFinalSum = (itemPrice) => {
    let sum = parseInt(itemPrice);
    setFinalSum(finalSum + sum);
    setPostTip(finalSum + sum);
  };
  const clearAllValues = () => {
    setFinalSum(0.00);
    setTips(0.00);
    setPostTip(0.00);
    setInput('');
  }
  const submitOrder = (order) => {
    if (finalOrderArr.length > 0) {
      //Next 2 lines of code allow us to track indivdual order post submitting for employee metrics
      //and reports
      const trackedOrder = finalOrderArr.splice(0);
      orders["order" + order] = trackedOrder;
      orders["order" + order].totals= {
        orderNum: orderNum,
        ordersubTotal:finalSum,
        orderTip:tips,
        orderTotal: postTip,
        paymentType:'Cash'
      }
      updateDailySales();
      setFinalSum(0.0);
      priceArr[0] = 0.0;
      const selection = parseInt(priceArr[2]);
      priceArr[2] > 0 ? priceArr[2] = selection + 1 : priceArr[2] = 1
      localStorage.setItem("orderNum", priceArr[2]);
      setnum(priceArr[2]);
      const dailyTips = localStorage.getItem('dailyTips')
      localStorage.setItem('dailyTips',  tips)
      clearAllValues();
    } else {
      console.log("Add Items Please");
    }
  };
  const updateDailySales = () => {
    let currentValue = localStorage.getItem("dailySales");
    const formattedValue = parseFloat(currentValue);
    const final = formattedValue + finalSum;
    localStorage.setItem("dailySales", final.toFixed(2));
  };

  //These next two functions handle the showing/hiding of the customization input
  //and the displaying of the input onto the selected product
  const specificCuztomizations = () => {
    setCustomInput(!customInput);
    customInput ? console.log(customInput) : setInput("");
  };

  const recordChange = (input) => {
    finalOrderArr[deleteIndex].customRequest = input.target.value;
    setInput(input.target.value);
  };

  const recordTip = (input) => {
    setTips(input.target.value);
  };

  //How we're transporting cuztomization data from other components without prop drilling.
  //A calling of this function can be found in any item cuztomization component
  customizationOptions.updateState = (classification, input) => {
    finalOrderArr[deleteIndex][classification] = finalOrderArr[deleteIndex][classification] + input;
    setStately(!stately);
  };

  customizationOptions.compItem = (action, compAmt) => {
    const price = finalOrderArr[deleteIndex].Price.$numberDecimal;
    const divide = price / 100;
    const amtOff = divide * compAmt;
    const final = price - amtOff;
    action === true ? finalOrderArr[deleteIndex].Price.$numberDecimal = managementIndexTracker :
      finalOrderArr[deleteIndex].Price.$numberDecimal = final.toFixed(2)
    priceArr[0] = finalSum - amtOff;
    setFinalSum(priceArr[0]);
    setPostTip(parseFloat(priceArr[0]) + parseFloat(tips));
    setStately(!stately)
    const precomped =  localStorage.getItem('compedValue');
    const compedValue = (parseFloat(precomped) + parseFloat(amtOff))
    localStorage.setItem('compedValue', compedValue.toFixed(2))
  };

  const addTip = () => {
    setTipsInput(!tipsinput);
  };

  const confirmTip = (e) => {
    priceArr[1] = tips;
    const parsedTips = parseFloat(priceArr[1])
    setTips(parsedTips.toFixed(2));
    localStorage.setItem("dailyTips", priceArr[1]);
    const finalPostTip = (parseFloat(finalSum) + parseFloat(tips)).toFixed(2);
    const x = (parseFloat(finalSum).toFixed(2))
   const y = (parseFloat(tips).toFixed(2))
   const a = parseFloat(x) + parseFloat(y)
   setPostTip(parseFloat(priceArr[0] )+ parseFloat(tips));
  };
  const clearCustomization = () => {
    setInput("");
  };

  //The functions below are for tracking the current order and assigning the order 'name' to it
  //for when it's logged. Functionality for this still in progress.
  useEffect(() => {
    priceArr[2] = localStorage.getItem('orderNum');
  });
  orderFunc.trackOrderNum = () => {
    setnum(priceArr[2]);
  };
  return (
    <div className="orderpadwrap">
      <ol className="orderpad-ols-wrap">
        <h1 className="ordernum">Order # {num}</h1>
        <ol className="orderpad-items-wrap">
          {finalOrderArr.map((item, index) => (
            <li
              onClick={(e) => {
                setDeleteIndex(index);
              }}
              className={
                deleteIndex === index ? "highlightselectedproduct" : "priceli"
              }
              key={index}
            >
              {" "}
              <div className="itemwrap">
                <h1 className="itemnamewrap">{item.Item}</h1>
                <ul className="customizationslist">
                  <li>
                    {item.Eggs}
                    <br></br>
                  </li>
                  <li>
                    {item.Protein}
                    <br></br>
                    {item.steakTemp}
                  </li>
                  <li>
                    {item.Toast}
                    <br></br>
                  </li>
                  <li>
                    {item.Side}
                    <br></br>
                  </li>
                  
                </ul>
                <h3 className="lipricewrap"><div className="addinswrap">
                 {item.category === 'Waffles'  ? <div></div> : <div>Add | {item.AddIns}</div>}
                    <br></br>
                  </div>${item.Price.$numberDecimal}</h3>
                <h6 className="customrequestwrap">
                  Special<br></br> Instructions: {item.customRequest}
                </h6>
              </div>
            </li>
          ))}
        </ol>
      </ol>
      <h5 className="subtotalWrap">Order Subtotal: ${finalSum.toFixed(2)}</h5>
      <h5 className="subtotalWrap">
        <label className={tipsinput ? "tipwrap" : "hide"}>
          <span className="dollarsvg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>currency-usd</title>
              <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
            </svg>
          </span>
          <input
            className={tipsinput ? "tipinput" : "hide"}
            type="number"
            onChange={recordTip}
            placeholder='7.10'
          ></input>
          <button className="tipbtn" onClick={confirmTip}>
          <svg  className="checkmarksvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>confirm-tip</title><path  className="checkmarksvg" stroke="000000" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" /></svg>
          </button>
        </label>
        Tip: ${tips}
      </h5>
      <h5 className="subtotalWrap">Order Total: ${postTip.toFixed(2)}</h5>
      <span className="btnswrap">
      <button
          className="deletebtn"
          onClick={(e) => deleteItem({ deleteIndex })}
        >
          Delete Item
        </button>
        <button
          className="customizebtn"
          onClick={(e) => specificCuztomizations({ deleteIndex })}
        >
          Item Customization Request
        </button>
        <button className="addtipbtn" onClick={addTip}>
          Add Tip
        </button>
        {customInput ? <label className={customInput ? "customizationinput" : "hide"}>
        <input
          className="customizationinput"
          value={input}
          onChange={recordChange}
        ></input>
        <button className="clearbtn" onClick={clearCustomization}>
          Clear
        </button>
      </label> :<button className="submitbtn" onClick={() => submitOrder(num)}>
          Submit Order
        </button>}
      </span>
      <UtilityBar />
    </div>
  );
}

export default OrderPad;
