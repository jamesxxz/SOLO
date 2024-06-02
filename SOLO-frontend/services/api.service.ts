import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export class ApiService {

  constructor() {}

  static async createCoach(coachData: any) {
    let sentData = {
      "name": coachData.name,
      "email": coachData.email,
      "phone_number": coachData.phoneNumber,
      "password": coachData.password,
      "profile_pic": "fdsa",
      "title": coachData.title,
      "affiliation_id": coachData.affiliationId
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

  static async getCoachProfile(query: { email?: string, phoneNumber?: string, id?: number }) {
    if (!query.id) {
      throw new Error('Coach ID is required to fetch profile');
    }
    try {
      const response = await axios.get(`${BASE_URL}/coach/${query.id}`);
      console.log('Coach profile data:', response.data); // Log the data for verification
      return response.data;
    } catch (error) {
      console.error('Failed to fetch coach profile:', error);
      throw error;
    }
  }

  static async loginCoach(email: string, password: string) {
    return axios.post(`${BASE_URL}/coach/login-coach`, { email, password })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  static async loginAthlete(email: string, password: string) {
    return axios.post(`${BASE_URL}/athlete/login-athlete`, { email, password })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }


  static async getAthleteProfile(query: { id: number }) {
    try {
      const response = await axios.get(`${BASE_URL}/athlete/${query.id}`);
      console.log('Athlete profile data:', response.data); // Log the data for verification
      return response.data;
    } catch (error) {
      console.error('Failed to fetch athlete profile:', error);
      throw error;
    }
  }
  

  static async updateAthleteProfile(athleteId: number, updatedData: any) {
    try {
      const response = await axios.put(`${BASE_URL}/athlete/profile/${athleteId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Failed to update athlete profile:', error);
      throw error;
    }
  }
}