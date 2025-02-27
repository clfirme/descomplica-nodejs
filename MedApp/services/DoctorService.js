import doctorRepository from "../repositories/DoctorRepository.js";
import appointmentRepository from "../repositories/AppointmentRepository.js";
import prescriptionRepository from "../repositories/PrescriptionRepository.js";

// Métodos de CRUD básicos
const findAll = async (filters = {}) => {
    return doctorRepository.findAll(filters);
};

const findById = async (id) => {
    return doctorRepository.findById(id);
};

const create = async (doctorData) => {
    // Validar CRM único
    const existingDoctor = await doctorRepository.findAll({ crm: doctorData.crm });
    if (existingDoctor.length > 0) {
        throw new Error('CRM já cadastrado no sistema');
    }
    
    // Validar especialidade
    const validSpecialties = [
        'Clínico Geral', 'Cardiologia', 'Dermatologia', 'Neurologia',
        'Pediatria', 'Ortopedia', 'Ginecologia', 'Oftalmologia',
        'Psiquiatria', 'Urologia', 'Endocrinologia', 'Otorrinolaringologia', 'Geriatria'
    ];
    
    if (doctorData.specialty && !validSpecialties.includes(doctorData.specialty)) {
        throw new Error('Especialidade médica inválida');
    }
    
    return doctorRepository.create(doctorData);
};

const update = async (id, doctorData) => {
    // Verificar se o médico existe
    const doctor = await doctorRepository.findById(id);
    if (!doctor) {
        throw new Error('Médico não encontrado');
    }
    
    // Validar CRM único (se fornecido)
    if (doctorData.crm && doctorData.crm !== doctor.crm) {
        const existingDoctor = await doctorRepository.findAll({ crm: doctorData.crm });
        if (existingDoctor.length > 0) {
            throw new Error('CRM já cadastrado no sistema para outro médico');
        }
    }
    
    // Validar especialidade (se fornecida)
    if (doctorData.specialty) {
        const validSpecialties = [
            'Clínico Geral', 'Cardiologia', 'Dermatologia', 'Neurologia',
            'Pediatria', 'Ortopedia', 'Ginecologia', 'Oftalmologia',
            'Psiquiatria', 'Urologia', 'Endocrinologia', 'Otorrinolaringologia', 'Geriatria'
        ];
        
        if (!validSpecialties.includes(doctorData.specialty)) {
            throw new Error('Especialidade médica inválida');
        }
    }
    
    return doctorRepository.update(id, doctorData);
};

const remove = async (id) => {
    // Verificar se existem agendamentos ou prescrições vinculadas
    const appointments = await appointmentRepository.findByDoctor(id);
    if (appointments.length > 0) {
        throw new Error('Não é possível excluir médico com consultas vinculadas');
    }
    
    // Este código assume que existe um método findByDoctor no prescriptionRepository
    const prescriptions = await prescriptionRepository.findByDoctor(id);
    if (prescriptions.length > 0) {
        throw new Error('Não é possível excluir médico com prescrições vinculadas');
    }
    
    return doctorRepository.remove(id);
};

// Métodos de consulta especializados
const findBySpecialty = async (specialty) => {
    return doctorRepository.findBySpecialty(specialty);
};

const findAvailableByDate = async (date) => {
    return doctorRepository.findAvailableByDate(date);
};

const getAppointments = async (doctorId) => {
    return doctorRepository.getAppointments(doctorId);
};

const authenticate = async (crm, password) => {
    return doctorRepository.authenticate(crm, password);
};

const doctorService = {
    findAll,
    findById,
    create,
    update,
    delete: remove,
    findBySpecialty,
    findAvailableByDate,
    getAppointments,
    authenticate
};

export default doctorService;