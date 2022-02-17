export class UrlQueryString {
  private paramsAndValues: string[];

  constructor() {
    this.paramsAndValues = [];
  }

  push(key: string, value: object): void {
    const newValue = encodeURIComponent(value.toString());
    this.paramsAndValues.push([key, newValue].join('='));
  }
  public toString = (): string => this.paramsAndValues.join('&');
}
