import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { EmitterService } from './emitter.service'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      verboseMemoryLeak: true,
    }),
  ],
  providers: [EmitterService],
  exports: [EmitterService],
})
export class EmitterModule {}
