const axios = require("axios");
const { expect } = require("chai");
const envVariables = require("../../config/env.json");
const { saveAccessToken } = require("../../utils/helper");
const authPayload = require("../../fixtures/auth-data.json");

describe("Authenticate user", async () =>  {
    
    // get a valid url
    const url = envVariables.baseUrl + "/auth/login";

    // make api call using axios
    const response = axios.post(url, authPayload);

    // store access store
    saveAccessToken(response);

    it("should contain expected keys such as accessToken, tokenType, emailVerified and refreshToken", async () => {
        const res = await response;
        expect(res.data).to.have.keys("accessToken", "tokenType", "emailVerified", "refreshToken");
    });

    it("should verify access token is not empty, null and undefined", async () => {
        const res = await response;
        expect(res.data.accessToken).not.equal("").and.not.equal(null).and.not.equal(undefined);
    });

    it("should verify refresh token is not empty, null and undefined", async () => {
        const res = await response;
        expect(res.data.refreshToken).not.equal("").and.not.equal(null).and.not.equal(undefined);
    });

    it("should verify token type is JWT", async () => {
        const res = await response;
        expect(res.data.tokenType).equal("JWT");
    });

    it("should verify authenticated user email is verified", async () => {
        const res = await response;
        expect(res.data.emailVerified).equal(true);
    });
})