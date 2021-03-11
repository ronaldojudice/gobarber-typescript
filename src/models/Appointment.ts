import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';



@Entity('appointments')
class Appointment   {
 @PrimaryGeneratedColumn('uuid')
id: string;
@Column()
provider: string;
@Column('timestamp with zone')
date: Date;


}
}

export default Appointment;


