import adminRoutes from '@/routes/admin-routes';
import userRoutes from '@/routes/user-routes';
import testRoutes from '@/routes/test-routes';
import { createRouter } from '@/utils/create';
import { Router } from 'express';

export default createRouter((router: Router) => {
  router.use('/admin', adminRoutes);
  router.use('/user', userRoutes);
  router.use('/test', testRoutes);
});
