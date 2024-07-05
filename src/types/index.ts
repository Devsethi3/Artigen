export interface FormField {
  label: string;
  field: string;
  name: string;
  required?: boolean;
  placeholder: string;
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

export interface AiResultData {
  id: number;
  formData: string; 
  aiResponse: string;
  slug: string;
  createdBy: string;
  createdAt: string;
}

export interface Message {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}
