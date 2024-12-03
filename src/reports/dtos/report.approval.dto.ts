import { Expose } from 'class-transformer';

export class ReportApprovalDto {
  @Expose()
  approved: boolean;
}
