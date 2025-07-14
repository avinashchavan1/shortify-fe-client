export type TFormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
};

export type TResponseSaveUser = {
  id: string;
  name: string;
  email: string;
};
