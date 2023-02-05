import express, { Request, Response, NextFunction } from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import adminService from "../5-services/admin-service";

const router = express.Router();

// GET http://localhost:4000/api/admin/vacations
router.get("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await adminService.getAllVacationsForAdmin();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/admin/vacations
router.post("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await adminService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/admin/vacations/:vacationId
router.get("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await adminService.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch(err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/admin/vacations/:vacationId
router.put("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await adminService.updateVacation(vacation);

        response.status(200).json(updatedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/admin/vacations/:vacationId
router.delete("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await adminService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/admin/vacations-report
router.get("/admin/vacations-report", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const report = await adminService.getVacationsReport();
        response.json(report);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;