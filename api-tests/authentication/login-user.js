const axios = require("axios");
const { expect } = require("chai");
const envVariables = require("../../config/env.json");
const { saveAccessToken, saveRefreshToken } = require("../../utils/helper");
const authPayload = require("../../fixtures/auth-data.json");

describe("Authenticate user", async () =>  {
    
    // get a valid url
    const url = envVariables.baseUrl + "/auth/login";

    // make api call using axios
    const response = axios.post(url, authPayload);

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

    it("should save access token if it exist in the environment variable", async () => {
        // store access token
        const res = await saveAccessToken(response);
        expect(res).equal(true);
    });

    it("should save refresh token if it exist in the environment variable", async () => {
        // store refresh token
        const res = await saveRefreshToken(response);
        expect(res).equal(true);
    });
})