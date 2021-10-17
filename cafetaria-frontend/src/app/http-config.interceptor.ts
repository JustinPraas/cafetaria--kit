import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                headers: request.headers.set(
                    'Content-Type',
                    'application/json'
                ),
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
        });

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.toastr.error(error.error.message, "Er is een fout opgetreden")
                return throwError(error);
            })
        );
    }
}
