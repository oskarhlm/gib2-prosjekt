import L from 'leaflet';
import { PolygonState } from 'ducks/polygonSlice';
import { POI } from 'components/POIMarker';
import { api_url } from './apiSettings';

interface IApi {
  api_url: string;
}

export default class Api implements IApi {
  // api_url = 'http://geomatikk.ibm.ntnu.no:8006/api';
  // api_url = 'http://localhost:5000/api';
  api_url = api_url;

  async fetchPointsOfInterest(): Promise<POI[]> {
    const res = await fetch(
      this.api_url + '/attractions?pointClasses=hospital,bakery'
    );
    const data = await res.json();
    return data;
  }

  async addPointOfInterest(params: {
    title: string;
    category: string;
    geography: [number, number];
  }) {
    const res = await fetch(this.api_url + '/attractions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `${JSON.stringify(params)}`,
    });
    const data = await res.json();
    return data;
  }

  async fetchPOICategories(): Promise<string[]> {
    const res = await fetch(this.api_url + '/pointOfInterestCategories');
    const data = await res.json();
    return data;
  }

  async fetchDrivingDistancePolygon(settings: PolygonState['settings']) {
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
