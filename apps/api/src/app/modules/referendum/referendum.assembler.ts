import {
  Assembler,
  ClassTransformerAssembler,
} from '@ptc-org/nestjs-query-core';

import { Referendum } from './referendum.entity';
import { ReferendumStatus } from './referendum-status.enum';

@Assembler(Referendum, Referendum)
export class ReferendumAssembler extends ClassTransformerAssembler<
  Referendum,
  Referendum
> {
  convertToDTO(entity: Referendum): Referendum {
    const dto = super.convertToDTO(entity);
    dto.finalVote = '';
    dto.status = this.getStatus(entity);
    return dto;
  }

  getStatus(dto: Referendum): ReferendumStatus {
    const currentDate = new Date();

    if (!dto.startDate || currentDate < dto.startDate) {
      return ReferendumStatus.NoStarted;
    } else if (currentDate < dto.endDate) {
      return ReferendumStatus.InProgress;
    }

    return ReferendumStatus.Closed;
  }
}
