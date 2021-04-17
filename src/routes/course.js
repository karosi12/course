import express from "express";
import authenticate from "../middlewares/authenticate";
import courseCtrl from "../controller/course";
const courseRouter = express.Router();

courseRouter.post("/api/course", authenticate, courseCtrl.create);
courseRouter.get("/api/courses",authenticate, courseCtrl.list);
courseRouter.get("/api/course/:id",authenticate, courseCtrl.view);
courseRouter.delete("/api/course/:courseId",authenticate, courseCtrl.deleteCourse);


export default courseRouter;
