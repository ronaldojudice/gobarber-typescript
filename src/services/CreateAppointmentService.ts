import Appointment from '../models/Appointment';
import {parseISO, startOfHour} from 'date-fns';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

interface Request{
  provider: string,
  date: Date
}

class CreateAppointmentService{

  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository:AppointmentsRepository){

    this.appointmentsRepository = appointmentsRepository;
  }
public execute({date,provider}:Request):Appointment{
  const appointmentDate = startOfHour(date);
  const findAppointmentinSameDate = this.appointmentsRepository.findByDate(
    appointmentDate,
    );
  if(findAppointmentinSameDate){

    throw Error('This appointment is already booked');
  }

const appointment = this.appointmentsRepository.create({
  provider,
  date:appointmentDate,
});

return appointment

}


}

export default CreateAppointmentService;
