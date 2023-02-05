import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminService from "../../../Services/AdminService";
import appConfig from "../../../Utils/AppConfig";
import notify from "../../../Utils/Notify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [image, setImage] = useState<string>("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        adminService.getOneVacation(+params.vacationId)
            .then(v => {
                    setValue("vacationId", v.vacationId);
                    setValue("destination", v.destination);
                    setValue("description", v.description);
                    setValue("startDate", new Date(v.startDate).toISOString().slice(0, -14));
                    setValue("endDate", new Date(v.endDate).toISOString().slice(0, -14));
                    setValue("price", v.price);
                    setImage(appConfig.userVacationsImagesUrl + v.imageFile);
            })
            .catch(err => notify.error(err.message));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation Box">

			<h2><FontAwesomeIcon icon={faPenToSquare} /> Edit</h2>

            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId", )} />

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

                <label>Current image:</label>
                <img src={image} />

                <br />
                <br />

                <label>Change image:</label>
                <input type="file" accept="image/*" {...register("image")} />

                <br />
                <br />

                <button>Update</button>

                <br />
                <br />

            </form>

        </div>
    );
}

export default EditVacation;
