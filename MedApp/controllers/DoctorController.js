import doctorService from '../services/DoctorService.js';

class DoctorController {
  async listAll(req, res) {
    try {
      const { specialty, active } = req.query;
      const filters = {};
      
      if (specialty) filters.specialty = specialty;
      if (active !== undefined) filters.active = active === 'true';
      
      const doctors = await doctorService.findAll(filters);
      return res.status(200).json(doctors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const doctor = await doctorService.findById(id);
      
      if (!doctor) {
        return res.status(404).json({ message: 'Médico não encontrado' });
      }
      
      return res.status(200).json(doctor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const doctorData = req.body;
      const newDoctor = await doctorService.create(doctorData);
      return res.status(201).json(newDoctor);
    } catch (error) {
      if (error.message.includes('CRM já cadastrado') || 
          error.message.includes('Formato de CRM inválido') ||
          error.message.includes('Especialidade médica inválida') ||
          error.message.includes('obrigatório')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const doctorData = req.body;
      
      const updatedDoctor = await doctorService.update(id, doctorData);
      
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Médico não encontrado' });
      }
      
      return res.status(200).json(updatedDoctor);
    } catch (error) {
      if (error.message.includes('CRM já cadastrado') || 
          error.message.includes('Formato de CRM inválido') ||
          error.message.includes('Especialidade médica inválida') ||
          error.message.includes('obrigatório')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedDoctor = await doctorService.delete(id);
      
      if (!deletedDoctor) {
        return res.status(404).json({ message: 'Médico não encontrado' });
      }
      
      return res.status(200).json({ message: 'Médico excluído com sucesso' });
    } catch (error) {
      if (error.message.includes('Não é possível excluir médico com consultas')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async findBySpecialty(req, res) {
    try {
      const specialty = req.params.specialty;
      const doctors = await doctorService.findBySpecialty(specialty);
      return res.status(200).json(doctors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAvailableByDate(req, res) {
    try {
      const date = req.params.date;
      const availableDoctors = await doctorService.findAvailableByDate(date);
      return res.status(200).json(availableDoctors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAppointments(req, res) {
    try {
      const doctorId = req.params.id;
      const appointments = await doctorService.getAppointments(doctorId);
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async authenticate(req, res) {
    try {
      const { crm, password } = req.body;
      
      if (!crm || !password) {
        return res.status(400).json({ error: 'CRM e senha são obrigatórios' });
      }
      
      const result = await doctorService.authenticate(crm, password);
      
      if (!result.success) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      return res.status(200).json({
        message: 'Autenticação bem-sucedida',
        doctor: result.doctor
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new DoctorController();