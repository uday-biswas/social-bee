import loginImg from "../../assets/login.webp"
import Template from "../../component/core/auth/Template"

function Login() {
    return (
        <Template
            title="Welcome Back"
            description1="Your one stop solution for social media"
            description2="Login to your account to continue"
            image={loginImg}
            formType="login"
        />
    )
}

export default Login