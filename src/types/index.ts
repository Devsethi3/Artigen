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

// Add this new interface for AiResultData
export interface AiResultData {
  id: number;
  formData: string; // Assuming this is stored as a JSON string
  aiResponse: string;
  slug: string;
  createdBy: string;
  createdAt: string; // This will be in the format "DD/MM/yyyy"
}

export interface Message {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}
