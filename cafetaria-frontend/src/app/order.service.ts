import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { API_ORDER_URL } from './constants';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(
        private httpClient: HttpClient,
        private dataService: DataService,
        private toastrService: ToastrService,
    ) {}

    fetchAllOrderFullDtos() {
        this.httpClient
            .get<OrderFullDto[]>(`${API_ORDER_URL}`)
            .subscribe((ofds) => {
                this.dataService.setOrderFullDtos(ofds);
            });
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
            .post<ProductShortDto>(`${API_ORDER_URL}`, orderCreateDto)
            .subscribe((psd: ProductShortDto) => {
                this.toastrService.success("Bestelling geplaatst", "Gelukt!");
                // TODO this.dataService.insertProductIntoCategory(psd.categoryId, psd);
                callback ? callback() : null;
            });
    }

    updateOrder(
        orderId: number,
        orderCreateDto: OrderCreateUpdateDto,
        callback?: () => void
    ) {
        this.httpClient
            .put<ProductShortDto>(`${API_ORDER_URL}/${orderId}`, orderCreateDto)
            .subscribe((psd: ProductShortDto) => {
                this.toastrService.success("Bestelling geüpdate", "Gelukt!");
                // TODO this.dataService.insertProductIntoCategory(psd.categoryId, psd);
                callback ? callback() : null;
            });
    }
}
