import adminRoutes from "@/routes/admin-routes";
import userRoutes from "@/routes/user-routes";
import testRoutes from "@/routes/test-routes";
import formRoutes from "@/routes/form-routes";
import submissionRoutes from "@/routes/submission-routes";
import { createRouter } from "@/utils/create";
import { Router } from "express";

export default createRouter((router: Router) => {
  router.use("/admin", adminRoutes);
  router.use("/user", userRoutes);
  router.use("/test", testRoutes);
  router.use("/form", formRoutes);
  router.use("/submission", submissionRoutes);
});
