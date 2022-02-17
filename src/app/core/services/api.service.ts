import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UrlBuilder } from '@utils/url-builder';
import { UrlQueryString } from '@utils/url-query-string';

import { Constants } from '@conf/constants';

@Injectable()
export class ApiService {

  /*
    public getNewsEndpoint(): string {
      return this.createUrl('news');
    }


    public getProductListByCountryAndPostalCodeEndpoint(countryCode: string, postalCode: string): string {
      return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => {
        qs.push('countryCode', countryCode);
        qs.push('postalCode', postalCode);
      });
    }

    public getDataByIdAndCodeEndpoint(id: string, code: number): string {
      return this.createUrlWithPathVariables('data', [id, code]);
    }


    this.apiHttpService
      .get(this.apiService.getNewsEndpoint())
      .subscribe(() => {
        console.log('News loaded'))
      });
   */



  constructor(
    private consts: Constants,
    private http: HttpClient
  ) { }

  private createUrl(endpoint: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.consts.API_ENDPOINT, endpoint);

    return urlBuilder.convertToString();
  }

  private createUrlWithUrlQuery(endpoint: string, queryStringHandler?: (queryStringParameters: UrlQueryString) => void): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.consts.API_ENDPOINT, endpoint);
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.convertToString();
  }

  private createUrlWithPath(endpoint: string, pathArray: string[] = []): string {
    let encodedPathUrl = '';
    for (const pathItem of pathArray) {
      if (pathItem && pathItem.length > 0) {
        encodedPathUrl +=`/${encodeURIComponent(pathItem.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(this.consts.API_ENDPOINT,`${ endpoint }${ encodedPathUrl }`);
    return urlBuilder.convertToString();
  }

  private get(url: string, options?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.http.get(url, options);
  }

  private post(url: string, data: any, options?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.http.post(url, data, options);
  }

  private put(url: string, data: any, options?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.http.put(url, data, options);
  }

  private delete(url: string, options?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.http.delete(url, options);
  }
}
