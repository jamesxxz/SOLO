import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
interface AthleteQueryParams {
  email: string;
  phone_number: string;
  affiliation_id: string;
}
export class ApiService {
  constructor() {}
  

  static async createCoach(coachData: any) {
    let sentData = {
      name: coachData.name,
      email: coachData.email,
      phone_number: coachData.phoneNumber,
      password: coachData.password,
      profile_pic: coachData.profilePic,
      title: coachData.title,
      affiliation_id: coachData.affiliationId
    };
    return axios.post(`${BASE_URL}/coach/sign-up-coach`, sentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  static async createAffiliate(affiliateData: any) {
    let sentData = {
      name: affiliateData,
      type: "coach",
      affiliation_id: "222"
    };
    return axios.post(`${BASE_URL}/affiliation/register-affiliation`, sentData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  static async createAthlete(athleteData: any) {
    let sentData = {
      name: athleteData.name,
      email: athleteData.email,
      phone_number: athleteData.phoneNumber,
      password: athleteData.password,
      profile_pic: athleteData.profilePic,
      age: parseInt(athleteData.age, 10),
      gender: athleteData.gender,
      height: athleteData.height,
      weight: parseInt(athleteData.weight, 10),
      affiliation_id: parseInt(athleteData.affiliationId, 10)
    };
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

  static async getCoachProfile(query: { id: string }) {
    if (!query.id) {
      throw new Error('Coach ID is required to fetch profile');
    }
    try {
      const response = await axios.get(`${BASE_URL}/coach/coach/${query.id}`);
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

  static async getAthleteProfile(query: { id: string }) {
    try {
      const response = await axios.get(`${BASE_URL}/athlete/athlete/${query.id}`);
      console.log('Athlete profile data:', response.data); // Log the data for verification
      return response.data;
    } catch (error) {
      console.error('Failed to fetch athlete profile:', error);
      throw error;
    }
  }

  static async updateAthleteProfile(athleteId: number, updatedData: any) {
    try {
      const response = await axios.put(`${BASE_URL}/athlete/update-athlete/${athleteId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Failed to update athlete profile:', error);
      throw error;
    }
  }

  static async updateCoachProfile(coachId: number, updatedData: any) {
    try {
      const response = await axios.put(`${BASE_URL}/coach/update-coach/${coachId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Failed to update coach profile:', error);
      throw error;
    }
  }

  static async getAthleteByEmailAndPhoneAndAffiliation({ email, phone_number, affiliation_id }: { email: string; phone_number: string; affiliation_id: string }) {
    try {
      const response = await axios.get(`${BASE_URL}/athlete/search`, {
        params: { email, phone_number, affiliation_id },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch athlete by email, phone, and affiliation:', error);
      throw error;
    }
  }

  static async linkAthleteToCoach(data: { coach_id: number; athlete_id: number }) {
    try {
      const response = await axios.post(`${BASE_URL}/coach/link-athlete-to-coach`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to link athlete to coach:', error);
      throw error;
    }
  }
  static async getLinkedAthletes(coachId: number) {
    try {
      const response = await axios.get(`${BASE_URL}/coach/link-athlete/${coachId}/athletes`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch linked athletes:', error);
      throw error;
    }
  }

  static async uploadMedia(mediaData: FormData) {
    try {
      const response = await axios.post(`${BASE_URL}/media/media-upload`, mediaData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to upload media:', error);
      throw error;
    }
  }

  // start
  static async moveToPast(mediaId: string) {
    try {
      const response = await axios.put(`${BASE_URL}/media/media/${mediaId}/move-to-past`);
      return response.data;
    } catch (error) {
      console.error('Failed to move media to past:', error);
      throw error;
    }
  }
  // end

  static async getMediaByAthleteId(data: { athleteId: string, type: string }) {
    try {
      const response = await axios.get(`${BASE_URL}/media/media/athlete`, {
        params: {
          athlete_id: data.athleteId,
          type: data.type
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch media by athlete ID:', error);
      throw error;
    }
}

static async deleteMediaById(mediaId: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/media/media/${mediaId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete media:', error);
    throw error;
  }
}

static async getAthleteById(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/athlete/athlete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athlete data:', error);
    throw error;
  }
}

static async getMediaByAthleteIdAndCoachId(athleteId: string, coachId: string, type: string) {
  try {
    const response = await axios.get(`${BASE_URL}/media/media/athlete-coach`, {
      params: {
        athlete_id: athleteId,
        coach_id: coachId,
        type: type
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch media by athlete ID and coach ID:', error);
    throw error;
  }
}

// Method to create a new workout type
static async createWorkoutType(workoutTypeData: any) {
  return axios.post(`${BASE_URL}/workout-type/upload-workout-type`, workoutTypeData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

static async getWorkoutsByUserAndType(userId: string, workoutType: string) {
  console.log(workoutType)
  return axios.get(`${BASE_URL}/workout-type/get_workouts/${userId}/${workoutType}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}


// Method to update an existing workout type
static async updateWorkoutType(id: string, workoutTypeData: any) {
  return axios.put(`${BASE_URL}/workout-type/update-workout-type/${id}`, workoutTypeData)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// Method to get a workout type by ID
static async getWorkoutTypeById(id: string) {
  return axios.get(`${BASE_URL}/workout-type/get_workout_type/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

static async getUse(id: string) {
  return axios.get(`${BASE_URL}/workout-type/get_workout_type/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// Method to delete a workout type by ID
static async deleteWorkoutType(id: string) {
  return axios.delete(`${BASE_URL}/workout_type/delete_workout_type/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

static async assignTask(taskData: any) {
  try {
      return axios.post(`${BASE_URL}/workout/assign-task`, taskData);
  } catch (error) {
      console.error('Failed to assign task:', error);
      throw error;
  }
}

static async getTasksByCoachAndAthlete(coachId: string, athleteId: string) {
  try {
      const response = await axios.get(`${BASE_URL}/workout/tasks/${coachId}/${athleteId}`);
      return response.data;
  } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
  }
}
}