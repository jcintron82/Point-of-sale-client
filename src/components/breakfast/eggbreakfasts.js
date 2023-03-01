import { useNavigate } from 'react-router-dom';
import { OrderPad, orderPadArr, orderFunc } from '../utility/orderpad.js';
import "../../css/mainscreen/homescreen-styles.css";
export { customizationOptions, EggBreakfasts };

//Find any relevent functions saved in this object in the orderpad component, right above the JSX portion
const customizationOptions = {
    
}
function EggBreakfasts() {
    const queryArr = [];
    
  const navigate = useNavigate();

  const queryProduct = async (input) => {
    queryArr.push(input);
    try {
      // Send data to the backend via POST
      const pull = await fetch ('http://pos-server-bfyv.onrender.com/customizedplates', {
        method: "POST",
        headers: { "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        mode: 'no-cors',  },
        body: JSON.stringify(queryArr),
      });
    //   const data = await pull.json()
      orderFetch();
    queryArr.splice(0)
    } catch (err) {
      console.log(err);
    }
  };
  const orderFetch = async () => {
    try {
      const call = await fetch("http://pos-server-bfyv.onrender.com/customizedplates");
      const data = await call.json();
      console.log(data)
      orderPadArr.push(data);
      orderFunc.newOrder();
      customizationOptions.menuSelection = data;
    } catch (err) {
      console.log(err);
    }
  }

  const onClick = (item) => {
    // let formattedArg = "/" + section;
    queryProduct(item);
    navigate('/customize');
  };

  return (
    <div className='body'>
    <div className="mainwrap">
      <OrderPad />
      <div className="categorybtnswrap">
            <button onClick={(e) => onClick('All Star')} className="categorybtns"><span className='btnimgwrap'><img className='btnimg' src={require('../../images/breakfast/allstar.jpg')}></img></span>
          <h1 className='btnh1'>All Star Special</h1>
            </button>
            </div>
    </div>
      {/* <UtilityBar /> */}
  </div>
  );
}

export default EggBreakfasts;