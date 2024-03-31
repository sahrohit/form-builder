import {
	handleCreateNewForm,
	handleDeleteForm,
	handleGetFormById,
	handleGetFormByUser,
} from "@/controllers/form-controllers";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
	router.get("/:formId", handleGetFormById);
	router.get("/", authenticate(), handleGetFormByUser);
	router.post("/create", authenticate(), handleCreateNewForm);
	router.post("/delete", authenticate(), handleDeleteForm);
});
