import React,{useState} from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        try{
            const response=await fetch('http://localhost:3000/login',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,password})
            });

            const data=await response.json();

            if(response.ok){
                navigate("/dashboard");
            }else{
                alert(data.message);
            }
        }catch(error){
            console.error("Error from fetch:".error);
            alert("SOmething went wrong. Try again later");
        }

        setEmail("");
        setPassword("");
    }

    return(<>
        <div className="LoginContainer">
            <div className="title">Log in</div>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br></br>
                <input placeholder="Enter Email" type="email" value={email} onChange={handleEmailChange}></input><br></br><br></br>

                <label>Password</label><br></br>
                <input placeholder="Enter Password" type="password" value={password} onChange={handlePasswordChange}></input><br></br><br></br>

                <div className="submit">
                    <button type="submit">Login</button>
                    <p className="register-link">Don't have an account?<br></br> <Link to="/Register">Register</Link></p>
                </div>
            </form>
        </div>
    </>);
}

export default Login;