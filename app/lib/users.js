export async function signUpUser(userData) {
  const url = "http://localhost:3004/users";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData)
  };
  const user = await signInUser()
  const validUser = user.find((item)=>item.username === userData.username)
  
  if(validUser){
    return validUser
  }

  try {
    const data = await fetch(url, options);
    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error during sign up:", error.message);
    return { error: error.message };
  }
}
export async function signInUser() {
  const url = "http://localhost:3004/users";

  try {
    const data = await fetch(url);
    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error during sign up:", error.message);
    return { error: error.message };
  }
}
