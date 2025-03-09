import pacientService from '../services/PacientService.js';

class PacientController {
  async listAll(req, res) {
    try {
      const pacients = await pacientService.findAll();
      return res.status(200).json(pacients);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const pacient = await pacientService.findById(id);
      
      if (!pacient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      
      return res.status(200).json(pacient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const pacientData = req.body;
      const newPacient = await pacientService.create(pacientData);
      return res.status(201).json(newPacient);
    } catch (error) {
      if (error.message.includes('CPF já cadastrado') || 
          error.message.includes('Formato de CPF inválido') ||
          error.message.includes('Data de nascimento') ||
          error.message.includes('obrigatório')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const pacientData = req.body;
      
      const updatedPacient = await pacientService.update(id, pacientData);
      
      if (!updatedPacient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      
      return res.status(200).json(updatedPacient);
    } catch (error) {
      if (error.message.includes('CPF já cadastrado') || 
          error.message.includes('Formato de CPF inválido') ||
          error.message.includes('Data de nascimento') ||
          error.message.includes('obrigatório')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedPacient = await pacientService.delete(id);
      
      if (!deletedPacient) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
      }
      
      return res.status(200).json({ message: 'Paciente excluído com sucesso' });
    } catch (error) {
      if (error.message.includes('Não é possível excluir paciente com consultas')) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async getMedicalHistory(req, res) {
    try {
      const pacientId = req.params.id;
      const history = await pacientService.getMedicalHistory(pacientId);
      return res.status(200).json(history);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getPrescriptions(req, res) {
    try {
      const pacientId = req.params.id;
      const prescriptions = await pacientService.getPrescriptions(pacientId);
      return res.status(200).json(prescriptions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAppointments(req, res) {
    try {
      const pacientId = req.params.id;
      const appointments = await pacientService.getAppointments(pacientId);
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async search(req, res) {
    try {
      const { name, cpf } = req.query;
      
      if (!name && !cpf) {
        return res.status(400).json({ error: 'É necessário fornecer um nome ou CPF para pesquisa' });
      }
      
      let results;
      
      if (cpf) {
        results = await pacientService.findByCpf(cpf);
      } else {
        results = await pacientService.findByName(name);
      }
      
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new PacientController();