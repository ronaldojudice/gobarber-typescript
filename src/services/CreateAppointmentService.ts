import Appointment from '../models/Appointment';
import {startOfHour} from 'date-fns';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import { getCustomRepository} from 'typeorm';

interface Request{
  provider: string,
  date: Date
}

class CreateAppointmentService{

public async execute({date,provider}:Request):Promise<Appointment>{
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointmentDate = startOfHour(date);
  const findAppointmentinSameDate =  await appointmentsRepository.findByDate(
    appointmentDate,
    );
  if(findAppointmentinSameDate){

    throw Error('This appointment is already booked');
  }

const appointment = appointmentsRepository.create({
  provider,
  date:appointmentDate,
});

await appointmentsRepository.save(appointment);

return appointment

}


}

export default CreateAppointmentService;
