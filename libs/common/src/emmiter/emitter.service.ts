import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { EmitParamsDto } from './dto/emit.dto'

@Injectable()
export class EmitterService {
  constructor(private eventEmitter: EventEmitter2) {}

  public emit<T>(key: string, value: T, params?: EmitParamsDto) {
    params.async = false
    const { async } = params

    if (!async) return this.eventEmitter.emit(key, value)
    if (async) return this.eventEmitter.emitAsync(key, value)
  }
}
