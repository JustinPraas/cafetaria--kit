import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { API_ORDER_URL } from '../constants';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(
        private httpClient: HttpClient,
        private dataService: DataService,
        private toastrService: ToastrService
    ) {}

    fetchAllOrderFullDtos() {
        this.httpClient
            .get<OrderFullDto[]>(`${API_ORDER_URL}`)
            .subscribe((ofds) => {
                this.dataService.setOrderFullDtos(ofds);
            });
    }

    getNonPaidOrders() {
        return this.dataService.getOrderFullDtos().filter(ofd => ofd.paidOn == null);
    }

    getOrderFullDtoById(orderId: any): Observable<OrderFullDto> {
        return new Observable<OrderFullDto>((observer) => {
            const orderFullDto = this.dataService
                .getOrderFullDtos()
                .find((ofd) => ofd.id == orderId);

            if (orderFullDto) {
                observer.next(orderFullDto);
            } else {
                observer.error('OrderFullDto niet beschikbaar');
            }

            return {
                unsubscribe() {},
            };
        });
    }

    createOrder(orderCreateDto: OrderCreateUpdateDto, callback?: () => void) {
        this.httpClient
            .post<ProductFullDto>(`${API_ORDER_URL}`, orderCreateDto)
            .subscribe((psd: ProductFullDto) => {
                this.toastrService.success('Bestelling geplaatst', 'Gelukt!');
                callback ? callback() : null;
            });
    }

    updateOrder(
        orderId: number,
        orderCreateDto: OrderCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .put<ProductFullDto>(`${API_ORDER_URL}/${orderId}`, orderCreateDto)
            .subscribe((psd: ProductFullDto) => {
                this.toastrService.success('Bestelling geüpdate', 'Gelukt!');
                callback ? callback() : null;
            });
    }

    payOrder(
        orderFullDto: OrderFullDto,
        paymentType: string,
        callback: () => void
    ) {
        this.httpClient
            .put<OrderFullDto>(`${API_ORDER_URL}/pay/${orderFullDto.id}`, null, {params : {'paymentType': paymentType}})
            .subscribe((ofd: OrderFullDto) => {
                this.toastrService.success('Bestelling betaald', 'Gelukt!');
                this.dataService.updateOrder(ofd);
                callback ? callback() : null;
            });
    }
}
