import express from "express";
import authenticate from "../middlewares/authenticate";
import courseCtrl from "../controller/course";
const courseRouter = express.Router();

courseRouter.post("/api/course", authenticate, courseCtrl.create);
courseRouter.get("/api/courses", courseCtrl.list);
courseRouter.get("/api/course/:id", courseCtrl.view);
courseRouter.delete("/api/course/:id", courseCtrl.deleteCourse);


export default courseRouter;
