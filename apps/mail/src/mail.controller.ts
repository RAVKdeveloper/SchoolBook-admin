import { Controller } from '@nestjs/common';

import {
  CreateLoginMail,
  CreateOneAuthCode,
  MailServiceController,
  MailServiceControllerMethods,
  MailSuccessfulCreateClassDto,
  OkSendMailRes,
} from '@app/common';

import { Observable } from 'rxjs';
import { MailService } from './mail.service';

@Controller()
@MailServiceControllerMethods()
export class MailController implements MailServiceController {
  constructor(private readonly mailService: MailService) {}

  sendOtpCode(
    dto: CreateOneAuthCode,
  ): OkSendMailRes | Promise<OkSendMailRes> | Observable<OkSendMailRes> {
    return this.mailService.sendAuthOneCod(dto);
  }

  sendLoginMail(
    dto: CreateLoginMail,
  ): OkSendMailRes | Promise<OkSendMailRes> | Observable<OkSendMailRes> {
    return this.mailService.loginMail(dto);
  }

  sendCreateClassMail(
    dto: MailSuccessfulCreateClassDto,
  ): OkSendMailRes | Promise<OkSendMailRes> | Observable<OkSendMailRes> {
    return this.mailService.successfulCreateClass(dto);
  }
}
