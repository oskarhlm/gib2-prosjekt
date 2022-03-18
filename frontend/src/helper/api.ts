import L from 'leaflet';

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

  async fetchDrivingDistancePolygon() {
    const res = await fetch(this.api_url + '/driving-distance');
    const data = await res.json();
    return data;
  }

  async fetchShortestPath(startLatLng: L.LatLng, endLatLng: L.LatLng) {
    // const res = await fetch(this.api_url + '/path');
    // const data = await res.json();
    // return data;
    const res = await fetch(this.api_url + '/path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{
        "startLat": ${startLatLng.lat},
        "startLng": ${startLatLng.lng},
        "endLat": ${endLatLng.lat},
        "endLng": ${endLatLng.lng}
      }`,
    });
    const data = await res.json();
    return data;
  }
}
