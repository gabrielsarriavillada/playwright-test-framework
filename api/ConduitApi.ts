import type { APIRequestContext } from "@playwright/test";

type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

export class ConduitApi {
  constructor(
    private request: APIRequestContext,
    private baseURL: string,
  ) {}

  async registerUser(data: RegisterUserData) {
    return this.request.post(`${this.baseURL}/users`, {
      data: { user: data },
    });
  }

  async loginUser(data: LoginUserData) {
    return this.request.post(`${this.baseURL}/users/login`, {
      data: { user: data },
    });
  }

  async getCurrentUser(token: string) {
    return this.request.get(`${this.baseURL}/user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  async createUserAndGetToken() {
    const timestamp = Date.now();
    const user = {
      username: `gsv_${timestamp}`,
      email: `gsv_${timestamp}@test.com`,
      password: `Testing1234!`,
    };

    const response = await this.registerUser(user);

    if (!response.ok()) {
      throw new Error(
        `User registration failed: ${response.status()} ${await response.text()}`,
      );
    }

    const body = await response.json();

    if (!body.user?.token) {
      throw new Error(
        `Unexpected registration response: ${JSON.stringify(body)}`,
      );
    }

    console.log(`USER CREATED ${user.username} with email ${user.email}.`);

    return {
      user,
      token: body.user.token,
    };
  }
}
