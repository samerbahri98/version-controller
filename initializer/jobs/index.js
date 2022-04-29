const dbPromise = require("./db")
const { repoInitPromise } = require("./repoInit")
const sshPromise = require("./ssh")

const jobs = [
    // dbPromise,
    // sshPromise,
    repoInitPromise
]


module.exports={jobs}