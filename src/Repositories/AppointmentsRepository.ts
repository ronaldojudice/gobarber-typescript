import {isEqual} from 'date-fns';
import Appointment from '../models/Appointment';
import {Entity} from 'typeorm';

interface CreateAppointmentDTO{

  provider:string,
  date:Date
}
class AppointmentsRepository {
  public findByDate(date:Date):Appointment | null {
    const findAppointment= this.appointments.find(appointment=>
      isEqual(date, appointment.date),

      );

      return findAppointment || null;
    }

  public create ({provider,date}: CreateAppointmentDTO ):Appointment{
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);


    return appointment
  }

}

export default AppointmentsRepository;
