import { users } from '@/schema';
import { createRouter } from '@/utils/create';
import { db } from '@/utils/db';
import { createId } from '@paralleldrive/cuid2';
import { Router } from 'express';

export default createRouter((router: Router) => {
  router.get('/test', async (_req, res) => {
    console.log('Test Requested');

    const userId = createId();

    const insertRes = await db.insert(users).values({
      id: userId,
      code: 'test',
      email: 'dummy@gmail.com',
      name: 'Dummy',
      password: 'dummy',
      salt: 'dummy',
    });

    console.log('Insert Res', insertRes);

    const insertedUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });

    console.log('Insert Res', insertedUser);

    res.status(200).json({
      success: true,
    });
  });
});
