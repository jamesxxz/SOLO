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
      "title": affiliateData.title,
      "affiliation_id": 1,
      "profile_pic": "fdsa",
      "phone_number": affiliateData.phoneNumber,
      "athletes": "asdf",
      "password": affiliateData.password
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
  }
