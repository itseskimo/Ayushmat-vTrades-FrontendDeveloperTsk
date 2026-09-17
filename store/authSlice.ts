import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { postJson } from "@/lib/api";

type RequestName =
  | "signIn"
  | "signUp"
  | "forgotPassword"
  | "verifyOtp"
  | "resetPassword";

type RequestFailure = {
  message: string;
  fieldErrors: Record<string, string>;
};

type AuthState = {
  signIn: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  signUp: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  forgotPassword: {
    email: string;
  };
  otp: string[];
  resetPassword: {
    password: string;
    confirmPassword: string;
  };
  request: {
    name: RequestName | null;
    loading: boolean;
    error: string;
    message: string;
    fieldErrors: Record<string, string>;
  };
};

type ThunkConfig = {
  state: {
    auth: AuthState;
  };
  rejectValue: RequestFailure;
};

const emptyRequest: AuthState["request"] = {
  name: null,
  loading: false,
  error: "",
  message: "",
  fieldErrors: {},
};

const initialState: AuthState = {
  signIn: {
    email: "",
    password: "",
    rememberMe: false,
  },
  signUp: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  forgotPassword: {
    email: "",
  },
  otp: ["", "", "", "", "", ""],
  resetPassword: {
    password: "",
    confirmPassword: "",
  },
  request: emptyRequest,
};

function getRequestFailure(
  message: string,
  fieldErrors?: Record<string, string>,
): RequestFailure {
  const errors = fieldErrors ?? {};

  return {
    // Field errors are displayed below their respective inputs.
    message: Object.keys(errors).length > 0 ? "" : message,
    fieldErrors: errors,
  };
}

// Sign in
export const signInUser = createAsyncThunk<string, void, ThunkConfig>(
  "auth/signIn",
  async (_, { getState, rejectWithValue }) => {
    const { email, password } = getState().auth.signIn;

    const result = await postJson("/api/auth/login", {
      email,
      password,
    });

    if (!result.success) {
      return rejectWithValue(
        getRequestFailure(result.message, result.fieldErrors),
      );
    }

    return result.message;
  },
);

// Sign up
export const signUpUser = createAsyncThunk<string, void, ThunkConfig>(
  "auth/signUp",
  async (_, { getState, rejectWithValue }) => {
    const result = await postJson("/api/auth/signup", getState().auth.signUp);

    if (!result.success) {
      return rejectWithValue(
        getRequestFailure(result.message, result.fieldErrors),
      );
    }

    return result.message;
  },
);

// Forgot password
export const sendResetLink = createAsyncThunk<string, void, ThunkConfig>(
  "auth/forgotPassword",
  async (_, { getState, rejectWithValue }) => {
    const result = await postJson(
      "/api/auth/forgot-password",
      getState().auth.forgotPassword,
    );

    if (!result.success) {
      return rejectWithValue(
        getRequestFailure(result.message, result.fieldErrors),
      );
    }

    return result.message;
  },
);

// Verify OTP
export const verifyOtp = createAsyncThunk<string, void, ThunkConfig>(
  "auth/verifyOtp",
  async (_, { getState, rejectWithValue }) => {
    const otp = getState().auth.otp.join("");

    const result = await postJson("/api/auth/verify-otp", {
      otp,
    });

    if (!result.success) {
      return rejectWithValue(
        getRequestFailure(result.message, result.fieldErrors),
      );
    }

    return result.message;
  },
);

// Reset password
export const updatePassword = createAsyncThunk<string, void, ThunkConfig>(
  "auth/resetPassword",
  async (_, { getState, rejectWithValue }) => {
    const result = await postJson(
      "/api/auth/reset-password",
      getState().auth.resetPassword,
    );

    if (!result.success) {
      return rejectWithValue(
        getRequestFailure(result.message, result.fieldErrors),
      );
    }

    return result.message;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setSignInField(
      state,
      action: PayloadAction<{
        field: "email" | "password";
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;

      state.signIn[field] = value;
      state.request.error = "";
      delete state.request.fieldErrors[field];
    },

    setRememberMe(state, action: PayloadAction<boolean>) {
      state.signIn.rememberMe = action.payload;
    },

    setSignUpField(
      state,
      action: PayloadAction<{
        field: keyof AuthState["signUp"];
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;

      state.signUp[field] = value;
      state.request.error = "";
      delete state.request.fieldErrors[field];
    },

    setForgotEmail(state, action: PayloadAction<string>) {
      state.forgotPassword.email = action.payload;
      state.request.error = "";
      delete state.request.fieldErrors.email;
    },

    setOtpDigit(
      state,
      action: PayloadAction<{
        index: number;
        value: string;
      }>,
    ) {
      const { index, value } = action.payload;

      state.otp[index] = value;
      state.request.error = "";
      delete state.request.fieldErrors.otp;
    },

    setResetPasswordField(
      state,
      action: PayloadAction<{
        field: keyof AuthState["resetPassword"];
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;

      state.resetPassword[field] = value;
      state.request.error = "";
      delete state.request.fieldErrors[field];
    },

    clearSensitiveFields(state) {
      state.signIn.password = "";
      state.signUp.password = "";
      state.signUp.confirmPassword = "";
      state.otp = ["", "", "", "", "", ""];
      state.resetPassword = {
        password: "",
        confirmPassword: "",
      };
    },

    clearRequestState(state) {
      state.request = {
        ...emptyRequest,
        fieldErrors: {},
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Sign in
      .addCase(signInUser.pending, (state) => {
        state.request = createPendingRequest("signIn");
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        setRequestSuccess(state, action.payload);
      })
      .addCase(signInUser.rejected, (state, action) => {
        setRequestError(state, action.payload);
      })

      // Sign up
      .addCase(signUpUser.pending, (state) => {
        state.request = createPendingRequest("signUp");
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        setRequestSuccess(state, action.payload);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        setRequestError(state, action.payload);
      })

      // Forgot password
      .addCase(sendResetLink.pending, (state) => {
        state.request = createPendingRequest("forgotPassword");
      })
      .addCase(sendResetLink.fulfilled, (state, action) => {
        setRequestSuccess(state, action.payload);
      })
      .addCase(sendResetLink.rejected, (state, action) => {
        setRequestError(state, action.payload);
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.request = createPendingRequest("verifyOtp");
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        setRequestSuccess(state, action.payload);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        setRequestError(state, action.payload);
      })

      // Reset password
      .addCase(updatePassword.pending, (state) => {
        state.request = createPendingRequest("resetPassword");
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        setRequestSuccess(state, action.payload);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        setRequestError(state, action.payload);
      });
  },
});

function createPendingRequest(name: RequestName): AuthState["request"] {
  return {
    name,
    loading: true,
    error: "",
    message: "",
    fieldErrors: {},
  };
}

function setRequestSuccess(state: AuthState, message: string) {
  state.request.loading = false;
  state.request.error = "";
  state.request.message = message;
  state.request.fieldErrors = {};
}

function setRequestError(state: AuthState, error?: RequestFailure) {
  state.request.loading = false;
  state.request.message = "";
  state.request.error =
    error?.message || "Something went wrong. Please try again.";
  state.request.fieldErrors = error?.fieldErrors ?? {};
}

export const {
  setSignInField,
  setRememberMe,
  setSignUpField,
  setForgotEmail,
  setOtpDigit,
  setResetPasswordField,
  clearSensitiveFields,
  clearRequestState,
} = authSlice.actions;

export default authSlice.reducer;
