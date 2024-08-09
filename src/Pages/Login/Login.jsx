import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  let [error, setError] = useState(false);
  let usernameRef = useRef("");
  let passwordRef = useRef("");
  const { setToken } = useContext(AuthContext);

  const handleSubmit = (e) => {

    let data = {
      username: usernameRef.current.input.value,
      password: passwordRef.current.input.value,
    };


    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.token){
            setToken(data.token)
        } else {
            alert("Incorrect password")
        }
        
      });
  };

  return (
    <div className="form__wrapper">
      <div className="form">
        <h1>Log in Dashboard</h1>
        <p>Bu loginimiz reqres in saytidan post qilindi <br /> login: <code>eve.holt@reqres.in</code><br /> password: <code>cityslicka</code></p>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input ref={usernameRef} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{width: "100%"}} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p
            style={{ color: "red", display: error ? "block" : "none" }}
            className="danger"
          >
            Invalid email or password
          </p>
          <p>
            Not registered yet? <Link>Go to sign up.</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
