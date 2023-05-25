const fs = require("fs");
const envVariables = require("../config/env.json");

async function saveAccessToken (response) {
    const res = await response;
    if (res.data.accessToken) {
        envVariables.accessToken = res.data.accessToken;
        fs.writeFileSync("config/env.json", JSON.stringify(envVariables));
        return true;
    } else {
        return false;
    }
}

async function saveRefreshToken (response) {
    const res = await response;
    if (res.data.refreshToken) {
        envVariables.refreshToken = res.data.refreshToken;
        fs.writeFileSync("config/env.json", JSON.stringify(envVariables));
        return true;
    } else {
        return false;
    }
}

module.exports  = {
    saveAccessToken,
    saveRefreshToken
}