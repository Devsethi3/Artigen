export interface FormField {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

export interface TEMPLATE {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  slug: string;
  form: FormField[];
}
