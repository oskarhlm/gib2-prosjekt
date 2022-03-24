interface IApi {
  api_url: string;
}

export default class Api implements IApi {
  api_url = 'http://localhost:5000';

  async fetchAttractions() {
    const res = await fetch(this.api_url + '/attractions');
    const data = await res.json();
    return data;
  }
}
