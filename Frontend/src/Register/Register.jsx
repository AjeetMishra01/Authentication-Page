import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register(){
        const [name,setName]=useState("");
        const [email,setEmail]=useState("");
        const [password,setPassword]=useState("");

        const handleNameCHange=(e)=>{
            setName(e.target.value);
        }
        const handleEmailChange=(e)=>{
            setEmail(e.target.value);
        }
        const handlePasswordChange=(e)=>{
            setPassword(e.target.value);
        }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                const response=await fetch("http://localhost:3000/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({name,email,password}),
                });

                const data = await response.json();

                if(response.ok){
                    alert(data.message);
                    window.location.href="/";
                }else{
                    alert(data.message);
                }
            }catch(err){
                console.log("Registration error:",err);
                alert("Something went wrong. Try again later.")
            }
        };

    return(<>

        <div className="LoginContainer">
            <div className="title">Register</div>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br></br>
                <input placeholder="Enter Name" type="text" value={name} onChange={handleNameCHange}></input><br></br><br></br>

                <label>Email</label><br></br>
                <input placeholder="Enter Email" type="email" value={email} onChange={handleEmailChange}></input><br></br><br></br>

                <label>Password</label><br></br>
                <input placeholder="Enter Password" type="password" value={password} onChange={handlePasswordChange}></input><br></br><br></br>

                <div className="submit">
                    <button type="submit">Register</button>
                    <p className="register-link">Already have an account?<br></br> <Link to="/">Log in</Link></p>
                </div>
            </form>
        </div>


    </>);
}

export default Register;