import { Patient, Tag } from "../types/patient";

export class PatientService {
  private base_url: string;

  constructor() {
    this.base_url = process.env.NEXT_PUBLIC_FHIR_URI || "";
  }

  private getCredentials(api_key: string, username: string): string {
    return Buffer.from(`${username}:${api_key}`).toString("base64");
  }

  async getPatientById(id: string, api_key: string, username: string): Promise<Patient> {
    try {
      const creds = this.getCredentials(api_key, username);
      const response = await fetch(`${this.base_url}/patients/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${creds}`,
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
    } catch (error) {
      throw error;
    }
  }

  async createPatient(data: { first_name: string, last_name: string, dob: string, sex: string }, api_key: string, username: string): Promise<Patient> {
    try {
      const creds = this.getCredentials(api_key, username);
      const response = await fetch(`${this.base_url}/patients`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${creds}`,
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
    } catch (error) {
      throw error;
    }
  }

  async updatePatient(id: string, data: { first_name: string, last_name: string, dob: string, sex: string }, api_key: string, username: string): Promise<Patient> {
    try {
      const creds = this.getCredentials(api_key, username);
      const response = await fetch(`${this.base_url}/patients/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Basic ${creds}`,
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
    } catch (error) {
      throw error;
    }
  }
}

export const patientService = new PatientService();
