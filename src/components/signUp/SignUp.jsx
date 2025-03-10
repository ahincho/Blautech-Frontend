import React, { useState } from "react";
import { assets } from "../../assets/assets";
import useCreateUser from "../../hooks/UseCreateUser";
import useSignIn from "../../hooks/UseSignIn";
import { toast } from "react-toastify";
import "./SignUp.css";

const SignUp = ({ setShowSignUp }) => {
  const { createUser, loading: creatingUser } = useCreateUser();
  const { signIn, loading: signingIn } = useSignIn(); 
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    birthday: "",
  });
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      // Validar campos vacíos
      const emptyField = Object.values(formData).some((field) => !field);
      if (emptyField) {
        toast.error("Please fill in all fields.");
        return;
      }
      try {
        await createUser(formData);
        toast.success("User created successfully!");
        setCurrentState("Sign In"); // Cambia a la vista de inicio de sesión
      } catch (err) {
        toast.error("Failed to create user.");
      }
    } else {
      // Inicio de sesión
      try {
        const userData = await signIn({ email: formData.email, password: formData.password });
        toast.success("Login successful!");
        setShowSignUp(false); // Cierra el modal al iniciar sesión
      } catch (err) {
        toast.error("Invalid email or password.");
      }
    }
  };
  return (
    <div className="sign-up">
      <form onSubmit={handleSubmit} className="sign-up-container">
        {/* Header */}
        <div className="sign-up-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowSignUp(false)} src={assets.cross_icon} alt="close" />
        </div>
        {/* Input Fields */}
        <div className="sign-up-inputs">
          {currentState === "Sign Up" && (
            <>
              <input type="text" placeholder="First name" name="firstname" value={formData.firstname} onChange={handleChange} required />
              <input type="text" placeholder="Last name" name="lastname" value={formData.lastname} onChange={handleChange} required />
              <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
              <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
            </>
          )}
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {/* Submit Button */}
        <button type="submit" disabled={creatingUser || signingIn}>
          {creatingUser || signingIn ? "Processing..." : currentState === "Sign Up" ? "Create Account" : "Go to your Account"}
        </button>
        {/* Terms & Conditions */}
        {currentState === "Sign Up" && (
          <div className="sign-up-acknowledge">
            <input type="checkbox" name="acknowledge" id="acknowledge" required />
            <p>By continuing, I agree to the terms of use and privacy policy.</p>
          </div>
        )}
        {/* Switch between Sign Up / Sign In */}
        {currentState === "Sign In" ? (
          <p>
            Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here!</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState("Sign In")}>Sign in here!</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
