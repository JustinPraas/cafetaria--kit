import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { API_ADAPTION_URL } from '../constants';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class AdaptionService {
    constructor(
        private httpClient: HttpClient,
        private dataService: DataService,
        private toastr: ToastrService
    ) {}

    fetchAdaptions() {
        this.httpClient
            .get<AdaptionFullDto[]>(API_ADAPTION_URL)
            .subscribe((afds: AdaptionFullDto[]) => {
                this.dataService.setAdaptionFullDtos(afds);
            });
    }

    getAllNonArchivedAdaptions() {
        return this.dataService.getAdaptionFullDtos().filter(afd => !afd.archived);
    }

    createAdaption(
        adaptionCreateUpdateDto: AdaptionCreateUpdateDto,
        callback: () => void
    ) {
        this.httpClient
            .post<AdaptionFullDto>(API_ADAPTION_URL, adaptionCreateUpdateDto)
            .subscribe((afd: AdaptionFullDto) => {
                this.dataService.insertAdaptionIntoAdaptionFullDtos(afd);
                callback()
                this.toastr.success('Aanpassing aangemaakt', "Gelukt!");
            });
    }

    updateAdaption(
        id: number,
        adaptionCreateUpdateDto: AdaptionCreateUpdateDto,
        callback: () => void
    ) {
        this.httpClient
            .put<AdaptionFullDto>(API_ADAPTION_URL + `/${id}`, adaptionCreateUpdateDto)
            .subscribe((afd: AdaptionFullDto) => {
                this.dataService.updateAdaption(afd);
                callback()
                this.toastr.success('Aanpassing geüpdate', "Gelukt!");
            });
    }

    archiveAdaption(adaptionToArchive: AdaptionFullDto, callback: () => void) {
        this.httpClient
            .delete<boolean>(`${API_ADAPTION_URL}/${adaptionToArchive.id}`)
            .subscribe((result: boolean) => {
                if (result) {
                    this.dataService.archiveAdaption(adaptionToArchive);
                    callback();
                    this.toastr.success('Aanpassing gearchiveerd', "Gelukt!");
                }
            });
    }
}
