import {
  Assembler,
  ClassTransformerAssembler,
} from '@ptc-org/nestjs-query-core';
import { ReferendumEntity } from './referendum.entity';
import { ReferendumStatus } from './referendum-status.enum';

@Assembler(ReferendumEntity, ReferendumEntity)
export class ReferendumAssembler extends ClassTransformerAssembler<
  ReferendumEntity,
  ReferendumEntity
> {
  convertToDTO(entity: ReferendumEntity): ReferendumEntity {
    const dto = super.convertToDTO(entity);
    dto.finalVote = '';
    dto.status = this.getStatus(entity);
    return dto;
  }

  getStatus(dto: ReferendumEntity): ReferendumStatus {
    const currentDate = new Date();
    if (!dto.startDate || currentDate < dto.startDate) {
      return ReferendumStatus.NoStarted;
    } else if (currentDate < dto.endDate) {
      return ReferendumStatus.InProgress;
    } else {
      return ReferendumStatus.Closed;
    }
  }
}
