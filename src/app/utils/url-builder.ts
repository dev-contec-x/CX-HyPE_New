import { UrlQueryString } from '@utils/url-query-string';

export class UrlBuilder {
  url: string;
  queryString: UrlQueryString;

  constructor(
    private baseUrl: string,
    private endpoint: string,
    queryString?: UrlQueryString
  ) {
    this.url = [this.baseUrl, this.endpoint].join('/');
    this.queryString = queryString || new UrlQueryString();
  }

  public convertToString(): string {
    const qString: string = this.queryString ? this.queryString.toString() : '';
    return qString ? `${ this.url }?${ qString }` : this.url;
  }
}
