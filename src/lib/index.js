"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Storage = exports.HandColor = exports.ServiceType = void 0;
var storage_1 = require("./storage");
Object.defineProperty(exports, "ServiceType", { enumerable: true, get: function () { return storage_1.ServiceType; } });
Object.defineProperty(exports, "HandColor", { enumerable: true, get: function () { return storage_1.HandColor; } });
var storage_2 = require("./storage");
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return __importDefault(storage_2).default; } });
var game_1 = require("./game");
Object.defineProperty(exports, "Game", { enumerable: true, get: function () { return __importDefault(game_1).default; } });
