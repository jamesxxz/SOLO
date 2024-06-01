import axios from 'axios';
//import { AnswersProvider } from '../src/contexts/CreateAccountAnswersContext';


const BASE_URL = 'http://localhost:3000';

export class ApiService {

  constructor() {}

  static async createCoach(affiliateData: any) {
    let sentData = {
      "coachID": 1,
      "name": affiliateData.name,
      "email": affiliateData.email,
      "phone_number": affiliateData.phoneNumber,
      "password": affiliateData.password,
      "profile_pic": "fdsa",
      "title": affiliateData.title,
      "affiliation_id": "222"
    }
    return axios.post(`${BASE_URL}/coach/sign-up-coach`, sentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  static async createAffiliate(affiliateData: any) {
    let sentData = {
        "name": affiliateData,
      "type": "coach",
      "affiliation_id": "222"
    }
    return axios.post(`${BASE_URL}/affiliation/register-affiliation`, sentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
  

  static async createAthlete(athleteData: any) {
    let sentData = {
      "name": athleteData.name,
      "email": athleteData.email,
      "phone_number": athleteData.phoneNumber,
      "password": athleteData.password,
      "profile_pic": "fdsa",
      "age": parseInt(athleteData.age, 10),
      "gender": athleteData.gender,
      "height": athleteData.height,
      "weight": parseInt(athleteData.weight, 10),
      "affiliation_id": parseInt(athleteData.affiliationId, 10)
    }
    return axios.post(`${BASE_URL}/athlete/sign-up-athlete`, sentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
}


static async getAffiliations() {
  try {
      const response = await axios.get(`${BASE_URL}/affiliation`);
      return response.data;
  } catch (error) {
      console.error('Failed to fetch affiliations:', error);
      throw error;
  }
}
}

