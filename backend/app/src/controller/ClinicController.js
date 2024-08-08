import express from 'express';
import ClinicService from '../service/ClinicService.js';

const router = express.Router();

router.get('/clinics', async (req, res) => {
  try {
    const result = await ClinicService.listClinics();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

export default router;
