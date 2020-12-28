export const schemas = {
    local: {
        registerName: "local-register",
        loginName: "local-login"
    },

    google: {
        name: "auth-google",
        scope: ["profile", "email"]
    },

    twitter: {
        name: "auth-twitter",
        scope: []
    },

    github: {
        name: "auth-github",
        scope: ["user:email"]
    },

    facebook: {
        name: "auth-facebook",
        scope: []
    }
};