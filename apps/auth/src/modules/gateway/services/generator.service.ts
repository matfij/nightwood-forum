import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class GeneratorService {
    constructor(private httpService: HttpService) {}

    createProject(dto: unknown): Observable<AxiosResponse<unknown>> {
        return this.httpService.post('http://generator-app:13000/generator/createProject', dto).pipe(
            tap((res) => {
                console.log(res);
            }),
            map((res) => res.data),
        );
    }

    generate(dto: unknown): Observable<AxiosResponse<unknown>> {
        return this.httpService.post('http://generator-app:13000/generator/generate', dto).pipe(
            tap((res) => {
                console.log(res);
            }),
            map((res) => res.data),
        );
    }
}
