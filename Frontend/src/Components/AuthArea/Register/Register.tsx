import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    
    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/home");
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Register Box">
			
            <h2><FontAwesomeIcon icon={faUser} /> Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First Name: </label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{ formState.errors.firstName?.message }</span>

                <br />

                <label>Last Name: </label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{ formState.errors.lastName?.message }</span>

                <br />

                <label>Email: </label>
                <input type="email" {...register("email", UserModel.emailValidation)} />
                <span className="Err">{ formState.errors.email?.message }</span>

                <br />

                <label>Password: </label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{ formState.errors.password?.message }</span>

                <br />

                <button>Register</button>

                <br />

                <span>
                    Already a member? <NavLink to="/login">Login</NavLink>
                </span>

            </form>

        </div>
    );
}

export default Register;
