import signupImg from "../../assets/signup.webp";
import Template from "../core/auth/Template";

function Signup() {
  return (
    <Template
      title="Join the millions hanging out in Social bee"
      description1=""
      description2="Stay updated about the world"
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
