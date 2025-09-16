import { Patient, Tag} from "../types/patient";

export class PatientService {
  private api_key: string;
  private username: string;
  private base_url: string;
  private creds: string;

  constructor(){
    this.api_key = process.env.NEXT_PUBLIC_SECRET_KEY || "";
    this.username = process.env.NEXT_PUBLIC_USERNAME || "";
    this.base_url = process.env.NEXT_PUBLIC_FHIR_URI || "";
    this.creds = Buffer.from(`${this.username}:${this.api_key}`).toString("base64");
  }

  async getPatientById(id: string): Promise<Patient> {
      try{
          const response = await fetch(`${this.base_url}/patients/${id}`, {
              method: "GET",
              headers: {
                "Authorization": `Basic ${this.creds}`,
                "Content-Type": "application/json",
              },
          });
    
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const raw = await response.json();
    
          return {
              id: raw.id,
              name: [raw.first_name, raw.middle_name, raw.last_name].filter(Boolean).join(" "),
              dob: raw.dob,
              gender: raw.sex,
              address: raw.address1,
              phone_no: raw.phone_mobile,
              tags: (raw.tags || []).map((t: any) => ({
                name: t.name,
                tag_category: t.tag_category,
                notes: t.notes,
                date_applied: t.date_applied,
              })) as Tag[],
          };
      }catch(error){
        throw error;
      }
  }

  async createPatient(data: {first_name: string, last_name: string, dob: string, sex: string}) : Promise<Patient>{
    try{
        const response = await fetch(`${this.base_url}/patients`, {
            method: "POST",
            headers: {
              "Authorization": `Basic ${this.creds}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const raw = await response.json();

        return {
          id: raw.id,
          name: [raw.first_name, raw.middle_name, raw.last_name].filter(Boolean).join(" "),
          dob: raw.dob,
          gender: raw.sex,
          address: raw.address1,
          phone_no: raw.phone_mobile,
          tags: (raw.tags || []).map((t: any) => ({
            name: t.name,
            tag_category: t.tag_category,
            notes: t.notes,
            date_applied: t.date_applied,
          })) as Tag[],
        };
    }catch(error){
      throw error;
    }
  }

  async updatePatient(id: string, data: {first_name: string, last_name: string, dob: string, sex: string}) : Promise<Patient>{
    try{
      const response = await fetch(`${this.base_url}/patients/${id}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Basic ${this.creds}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const raw = await response.json();

      return {
        id: raw.id,
        name: [raw.first_name, raw.middle_name, raw.last_name].filter(Boolean).join(" "),
        dob: raw.dob,
        gender: raw.sex,
        address: raw.address1,
        phone_no: raw.phone_mobile,
        tags: (raw.tags || []).map((t: any) => ({
          name: t.name,
          tag_category: t.tag_category,
          notes: t.notes,
          date_applied: t.date_applied,
        })) as Tag[],
      };
    }catch(error){
      throw error;
    }
  }
}

export const patientService = new PatientService();
