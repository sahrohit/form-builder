import {
  handleSubmissionCreate,
  handleSubmissionList,
} from "@/controllers/submission-controller";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
  router.post("/list", authenticate(), handleSubmissionList);
  router.post("/create", handleSubmissionCreate);
});
