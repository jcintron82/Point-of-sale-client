import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/mainscreen/loginscreen.css";
import { orderFunc } from "../utility/orderpad";
export {employeeMetrics, LoginScreen}

const employeeMetrics = {
    name:'',
    lifetimeSales:'',
}
 function LoginScreen() {
    const [usernameInput, setUsernmae] = useState('');
    const [passwordInput, setPassword] = useState('');
    const [incorrectPasswordMessage, setMessage] = useState(true);
    
    const credentials = {
        username: usernameInput,
        password: passwordInput
    }
  const navigate = useNavigate();

  const receiveSuccessfulLogin = async () => {
    const call = await fetch("https://pos-server-bfyv.onrender.com/login");
        const data = await call.json();
        if(!data.employeeName){
            setMessage('Incorrect Username/Password')
        }
        else{
        employeeMetrics.name = data.employeeName
        employeeMetrics.lifetimeSales = data.lifetimeSales;
        localStorage.setItem("name", data.employeeName);

        //Parses and formats lifetime sales number
        const parsedPrice = JSON.stringify(data.lifetimeSales);
        const productPrice = JSON.parse(parsedPrice);
        let numberDecimal = productPrice["$numberDecimal"];
        const finalFormattedNum = parseFloat(numberDecimal)
        const orderNum = localStorage.getItem('orderNum')
        localStorage.setItem("lifetimeSales",finalFormattedNum.toFixed(2));
        localStorage.setItem("employeeID", data.employeeID);
        localStorage.setItem("dailyTips", 0.00);
        localStorage.setItem("dailySales", 0.00);
        localStorage.setItem("compedValue", 0);
        localStorage.setItem("preCompedValue", 0);
        localStorage.setItem("orderNum", 1);
        navigate(data.code);
        // orderFunc.trackOrderNum();
        }
}

  const login = async () => {
    try {
        // Send data to the backend via POST
        const push = await fetch("https://pos-server-bfyv.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const data = await push.json();
      } catch (err) {
        console.log(err + 'ERROR');
      }
      receiveSuccessfulLogin();
};

  return (
    <div className='loginbody'>
        <h1 className="incorrectpasswordwrapper">{incorrectPasswordMessage}</h1>
        <label className="loginwraplabels">Employee ID (Demo Employee ID: 12345)
            <input required type='number' onChange={(e) => setUsernmae(e.target.value)}></input>
        </label>
        <label className="loginwraplabels">Password<br></br> (Demo Password: employee) Case-sensitive
            <input required type='password' onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <button className="loginbtn" onClick={(e) => {login(); receiveSuccessfulLogin()}}>Log-In</button>
    </div>

  );
}

export default LoginScreen;