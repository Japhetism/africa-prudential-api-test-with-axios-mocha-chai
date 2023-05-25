const fs = require("fs");
const envVariables = require("../config/env.json");

async function saveAccessToken (response) {
    const res = await response;
    if (res.data.accessToken) {
        envVariables.accessToken = res.data.accessToken;
        fs.writeFileSync("config/env.json", JSON.stringify(envVariables));
    }
}

module.exports  = {
    saveAccessToken
}