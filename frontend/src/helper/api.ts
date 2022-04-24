import L from 'leaflet';
import { DrivingDistanceState } from 'ducks/drivingDistanceSlice';
import { POI } from 'components/POIMarker';
import { api_url } from './apiSettings';

interface IApi {
  api_url: string;
}

export default class Api implements IApi {
  // api_url = 'http://geomatikk.ibm.ntnu.no:8006/api';
  // api_url = 'http://localhost:5000/api';
  api_url = api_url;

  //liste er classes
  async fetchPointsOfInterest(liste: any): Promise<POI[]> {
    var text= "/attractions?pointClasses="
    for (let i = 0, len = liste.length; i < len; i++) {
      text += String(liste[i]);
      text +=',';
    }
    text=String(text);
    text=text.substring(0,text.length-1);
    console.log("asdf"+text);
//this.api_url + '/attractions?pointClasses=hospital,bakery'
    const res = await fetch(
      this.api_url + text
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
  // change POICategories

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
