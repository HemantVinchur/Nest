import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
export declare class ReportsService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
    createEstimates({ make, model, lat, lng, year, mileage }: {
        make: any;
        model: any;
        lat: any;
        lng: any;
        year: any;
        mileage: any;
    }): Promise<any>;
}
