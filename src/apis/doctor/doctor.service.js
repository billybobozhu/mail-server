/**
 * DoctorService
 */

import doctorDao from './doctor.dao';
import Doctor from './doctor.model';

class DoctorService {
    constructor() {}

    insertDoctor(doctor, callback) {
        var dct = new Doctor({
            name: doctor.name,
            picUrl: null,
            regNo: doctor.regNo,
            briefDescription: {
                speciality: doctor.speciality,
                experience: doctor.experience,
                description: doctor.description
            },
            contact: {
                email: doctor.email,
                phone: doctor.phone
            },
            status: null,
            waitingTime: null,
            rating: null,
            videoUrl: null,
            appearUrl: null,
            thumbnailUrl: null,
            lastUpdateTime: Date.now(),
            termsAccepted: doctor.termsAccepted
        });
        doctorDao.insert(dct, callback);
    }

    getAllDoctors(callback) {
        doctorDao.getAll(callback);
    }

    getDoctorById(id, callback) {
        doctorDao.getById(id, callback);
    }

    deleteDoctor(id, callback) {
        doctorDao.delete(id, callback);
    }

    updateDoctor(doctor, callback) {
        doctorDao.update(doctor, callback);
    }
}

export default DoctorService;