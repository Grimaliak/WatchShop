import { Router } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../../db/models'; 
import generateTokens from '../../utils/generateTokens';
import cookieConfig from '../../config/cookieConfig';

const apiAdminsRouter = Router();

apiAdminsRouter.post('/api/admin-login', async (req, res) => {
  const { login, password } = req.body;

  if (!(login && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const admin = await Admin.findOne({ where: { login } });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const correctPassword = await bcrypt.compare(password, admin.password);

    if (!correctPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const adminInfo = { id: admin.id, login: admin.login };
    const { access, refresh } = generateTokens({ admin: adminInfo });

    res
      .cookie('accessToken', access, cookieConfig.access)
      .cookie('refreshToken', refresh, cookieConfig.refresh)
      .sendStatus(200);
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

apiAdminsRouter.get('/api/admin-logoutadmin-logout', (req, res) => {
  res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
});

export default apiAdminsRouter;
