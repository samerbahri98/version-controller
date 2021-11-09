"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSubscriber = exports.redisClient = void 0;
const redis_1 = __importDefault(require("redis"));
exports.redisClient = redis_1.default
    .createClient(Number(process.env.REDIS_PORT), process.env.REDIS_URL)
    .on("error", (err) => {
    console.log("error", err);
})
    .on("connect", (err) => {
    console.log("connect");
})
    .on("ready", (err) => {
    console.log("ready");
});
exports.redisSubscriber = redis_1.default
    .createClient(Number(process.env.REDIS_PORT), process.env.REDIS_URL)
    .on("error", (err) => {
    console.log("error", err);
})
    .on("connect", (err) => {
    console.log("connect");
})
    .on("ready", (err) => {
    console.log("ready");
});
