import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminService from "../../../Services/AdminService";
import notify from "../../../Utils/Notify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {

            if(new Date(vacation.startDate).getTime() > new Date(vacation.endDate).getTime()) {
                notify.error("You cannot select a date that precedes start date");
                return;
            }

            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminService.addVacation(vacation);
            notify.success("Vacation added successfully");
            navigate("/home");

        }
        catch (err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="AddVacation Box">

            <h2><FontAwesomeIcon icon={faPlusSquare} /> Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination:</label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <br />

                <label>Description:</label>
                <textarea {...register("description", VacationModel.descriptionValidation)}></textarea>
                <span className="Err">{formState.errors.description?.message}</span>

                <br />

                <label>Start date:</label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} min={new Date().toISOString().slice(0, -14)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <br />

                <label>End date:</label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} min={new Date().toISOString().slice(0, -14)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <br />

                <label>Price:</label>
                <input type="number" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <br />

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <br />
                <br />

                <button>Add</button>

                <br />
                <br />

            </form>

        </div>
    );
}

export default AddVacation;
