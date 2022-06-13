import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SmartMeter } from './SmartMeter.entity';

@Entity('measurements')
class Measurement {
  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(() => SmartMeter, (SmartMeter) => SmartMeter.id)
  @JoinColumn({name: 'muid'})
  muid: SmartMeter;

  @Column()
  measurement: string;

  @Column()
  '0100011D00FF': number;

  @Column()
  '0100021D00FF': number;

  @Column()
  timestamp: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Measurement };
