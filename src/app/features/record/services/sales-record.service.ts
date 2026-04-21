import { Injectable } from '@angular/core';
import { SaleRecord } from '../models/sale-record.model';

@Injectable({
    providedIn: 'root'
})
export class SalesRecordService {
    addSale(sale: SaleRecord) {
        console.log('Sale added to record:', sale);
    }
}
