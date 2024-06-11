export interface Affiliation {
    affiliation_id: number;
    name: string;
  }
  export interface Question {
    label: string;
    name: keyof Answers; // Ensure that name matches the keys of the Answers interface
  }
  
  
  export interface Answers {
    age: string;
    gender: string;
    height: string;
    weight: string;
    institute: string;  // Stored by ID as a string
  }
  
  