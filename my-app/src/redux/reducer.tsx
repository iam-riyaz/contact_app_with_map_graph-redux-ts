import { CONTACT_DELETE, CONTACT_EDIT, FORM_SUBMIT } from "./actionType";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

interface FormList {
  list: FormState[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: FormList = {
  list: [],
};

export const formReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FORM_SUBMIT:
      return {
        list: [...state.list, action.payload],
      };
    case CONTACT_DELETE:
      return {
        ...state,
        list: [...state.list.filter((e, i) => i !== action.payload)],
      };
    case CONTACT_EDIT: {
      const { index, formData } = action.payload;
      const updatedArray = [...state.list];
      updatedArray[index] = formData;
      console.log({ updatedArray });

      return {
        ...state,
        list: [...updatedArray],
      };
    }
    default:
      return state;
  }
};
