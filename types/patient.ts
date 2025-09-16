export interface Patient {
  id?: string;
  name?: string;
  dob?: string;
  gender?: string;
  address?: string;
  phone_no?: string;
  tags?: Tag[];
  error?: string;
}

export interface Tag {
  name: string;
  tag_category: string;
  notes: string;
  date_applied: string;
}