import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notify.success("Welcome Back!");
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login Box">

            <h2><FontAwesomeIcon icon={faUser} /> Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email: </label>
                <input type="email" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{ formState.errors.email?.message }</span>

                <br />

                <label>Password: </label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{ formState.errors.password?.message }</span>

                <br />

                <button>Login</button>

                <br />

                <span>
                    Don't have account? <NavLink to="/register">Register</NavLink>
                </span>

            </form>

        </div>
    );
}

export default Login;
