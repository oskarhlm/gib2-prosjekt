import L from 'leaflet';
import { DrivingDistanceState } from 'ducks/drivingDistanceSlice';

interface IApi {
  api_url: string;
}

export default class Api implements IApi {
  api_url = 'http://geomatikk.ibm.ntnu.no:8006/api';

  async fetchAttractions() {
    const res = await fetch(this.api_url + '/attractions');
    const data = await res.json();
    return data;
  }

  async fetchDrivingDistancePolygon(settings: DrivingDistanceState) {
    const res = await fetch(this.api_url + '/driving-distance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `${JSON.stringify(settings)}`,
    });
    const data = await res.json();
    return data;
  }

  async fetchShortestPath(startLatLng: L.LatLng, endLatLng: L.LatLng) {
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
