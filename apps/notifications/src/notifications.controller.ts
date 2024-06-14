import { Controller } from '@nestjs/common'

import { NotificationsServiceController, NotificationsServiceControllerMethods } from '@app/common'

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {}
