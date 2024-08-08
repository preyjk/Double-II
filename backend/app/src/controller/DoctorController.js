import express from 'express';
import DoctorService from '../service/DoctorService.js';

const router = express.Router();

router.get('/doctors', async (req, res) => {
  try {
    const { workplace } = req.query;
    let result;

    if (workplace) {
      result = await DoctorService.listDoctorsByWorkplace(workplace);
    } else {
      result = await DoctorService.listDoctors();
    }

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

router.post('/doctors', async (req, res) => {
  try {
    const result = await DoctorService.createDoctor(req.body);
    if (result.success) {
      res.status(201).json(result.data);
    } else {
      res.status(500).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.get('/doctors/:doctorId', async (req, res) => {
  try {
    const result = await DoctorService.getDoctorById(req.params.doctorId);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.put('/doctors/:doctorId', async (req, res) => {
  try {
    const result = await DoctorService.updateDoctor({ id: req.params.doctorId, ...req.body });
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

router.delete('/doctors/:doctorId', async (req, res) => {
  try {
    const result = await DoctorService.deleteDoctor(req.params.doctorId);
    if (result.success) {
      res.status(204).json(result.message);
    } else {
      res.status(500).json('Internal server error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

export default router;
