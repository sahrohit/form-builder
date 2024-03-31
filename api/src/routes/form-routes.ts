import {
	handleCreateNewForm,
	handleDeleteForm,
	handleGetFormById,
	handleGetFormByUser,
	handleUpdateForm,
} from "@/controllers/form-controllers";
import { authenticate } from "@/middlewares/auth";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
	router.get("/:formId", handleGetFormById);
	router.get("/", authenticate(), handleGetFormByUser);
	router.post("/", authenticate(), handleCreateNewForm);
	router.put("/", authenticate(), handleUpdateForm);
	router.delete("/", authenticate(), handleDeleteForm);
});
