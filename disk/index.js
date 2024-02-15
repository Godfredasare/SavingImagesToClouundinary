"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 3000;
const products_1 = __importDefault(require("./routes/products"));
mongoose_1.default
    .connect(`mongodb://127.0.0.1:27017/Practic`)
    .then(() => console.log("mongodb is connected sucessfully"))
    .catch((e) => console.log("Error connecting to mongodb", e));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, compression_1.default)());
app.use("/", products_1.default);
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
