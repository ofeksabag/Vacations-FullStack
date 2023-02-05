import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import vacationService from "../5-services/vacation-service";

const router = express.Router();

// GET http://localhost:4000/api/users/vacations
router.get("/users/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacations = await vacationService.getAllVacations(user);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/users/follow/:vacationId
router.post("/users/follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        
        const isFollowing = await vacationService.follow(user.userId, vacationId);
        response.json(isFollowing);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/users/unfollow/:vacationId
router.delete("/users/unfollow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        
        const isFollowing = await vacationService.unfollow(user.userId, vacationId);
        response.json(isFollowing);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/users/vacations/images/:imageFile
router.get("/users/vacations/images/:imageFile", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageFile = request.params.imageFile;
        const absolutePath = imageHandler.getAbsolutePath("vacations", imageFile);
        response.sendFile(absolutePath);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;