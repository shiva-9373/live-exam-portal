import React, { useState,  } from "react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from "axios";

function Login() {
  const { executeRecaptcha } = useGoogleReCaptcha();
    // const url = "http://admin.liveexamcenter.in/api/auth/login";

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    reCaptchaToken: "",
  });

 async function onSubmitHandle(e) {
    e.preventDefault();
    console.log("hello")

    let response;
    try {
        if (!executeRecaptcha) {
            console.log('execute recaptcha is not available');
            return;
        }
        
            let captchaResponse = await executeRecaptcha('Action_Name');//it is token
            console.log(captchaResponse);
          
        
        response = await axios.post(" https://admin.liveexamcenter.in/api/auth/login", { email:credentials.email, password:credentials.password, reCaptchaToken: captchaResponse })

        console.log(response);




} catch (e) {
// setEmail('');
// setPassword('');
// toast.error(`Enter Valid Email ID And Password!`, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
// });
}
  }

  

  console.log(credentials);
  return (
    <div>
      
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-xl-9 mx-auto">
            <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div class="card-img-left d-none d-md-flex"></div>
              <div class="card-body p-4 p-sm-5">
                <h4 className=" font-weight-bold card-title text-center mb-5  ">
                  {" "}
                  Login to your account
                </h4>
                <form onSubmit={(e) => onSubmitHandle(e)}>
                 
                  <div class="form-floating mb-3">
                    <input
                      value={credentials.email}
                      type="email"
                      class="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      onChange={(event) => {
                        setCredentials({
                          ...credentials,
                          email: event.target.value,
                        });
                      }}
                    />
                    <label for="floatingInputEmail">Email address</label>
                  </div>

                  <hr />

                  <div class="form-floating mb-3">
                    <input
                      value={credentials.password}
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={(event) => {
                        setCredentials({
                          ...credentials,
                          password: event.target.value,
                        });
                      }}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <p class="d-block  mt-2 small text-start" href="#">
                    forgot password ?{" "}
                  </p>

                  <div class="d-grid mb-2">
                    <button
                      class="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      Log in
                    </button>
                  </div>

                  <p class="d-block text-center mt-2 small" href="#">
                    or{" "}
                  </p>

                  <div class="d-grid mb-2">
                    <button
                      class="btn btn-lg btn-google btn-login fw-bold text-uppercase"
                      type="submit"


                    >
                      <i class="fab fa-google me-2"></i> Log in with google
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p className="text-primary text-center ">
          Don't have account, signup now{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
