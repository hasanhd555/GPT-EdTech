
  import {SignUpData}from "../../constant"
  
  const handleLogin = async (email: any, password: any,role:String) => {
    // Make a POST request to the student login endpoint
    const fetch_url="http://localhost:5001/api/" + role + "/login"
    const response = await fetch(fetch_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("response.bosy student:", response.body);

    return response;
  };

  const handleSignup =(data:SignUpData,role:string): Promise<any> =>{
    const fetch_url="http://localhost:5001/api/"+role+"/signup"
    return fetch(fetch_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error:Error) => {return error});

  }
  export { handleLogin,handleSignup };