#!/usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var repl_1 = __importDefault(require("repl"));
var util_1 = __importDefault(require("util"));
var vm_1 = __importDefault(require("vm"));
var ethers_1 = require("ethers");
var cli_1 = require("../cli");
var prompt_1 = require("../prompt");
var solc_1 = require("../solc");
function setupContext(context, plugin) {
    context.provider = plugin.provider;
    context.accounts = plugin.accounts;
    if (!context.console) {
        context.console = console;
    }
    if (!context.require) {
        context.require = require;
    }
    if (!context.process) {
        context.process = process;
    }
    context.ethers = ethers_1.ethers;
    context.version = ethers_1.ethers.version;
    context.Contract = ethers_1.ethers.Contract;
    context.ContractFactory = ethers_1.ethers.ContractFactory;
    context.Wallet = ethers_1.ethers.Wallet;
    context.providers = ethers_1.ethers.providers;
    context.utils = ethers_1.ethers.utils;
    context.abiCoder = ethers_1.ethers.utils.defaultAbiCoder;
    context.BN = ethers_1.ethers.BigNumber;
    context.BigNumber = ethers_1.ethers.BigNumber;
    context.FixedNumber = ethers_1.ethers.FixedNumber;
    context.getAddress = ethers_1.ethers.utils.getAddress;
    context.getContractAddress = ethers_1.ethers.utils.getContractAddress;
    context.getIcapAddress = ethers_1.ethers.utils.getIcapAddress;
    context.arrayify = ethers_1.ethers.utils.arrayify;
    context.hexlify = ethers_1.ethers.utils.hexlify;
    context.joinSignature = ethers_1.ethers.utils.joinSignature;
    context.splitSignature = ethers_1.ethers.utils.splitSignature;
    context.id = ethers_1.ethers.utils.id;
    context.keccak256 = ethers_1.ethers.utils.keccak256;
    context.namehash = ethers_1.ethers.utils.namehash;
    context.sha256 = ethers_1.ethers.utils.sha256;
    context.parseEther = ethers_1.ethers.utils.parseEther;
    context.parseUnits = ethers_1.ethers.utils.parseUnits;
    context.formatEther = ethers_1.ethers.utils.formatEther;
    context.formatUnits = ethers_1.ethers.utils.formatUnits;
    context.randomBytes = ethers_1.ethers.utils.randomBytes;
    context.constants = ethers_1.ethers.constants;
    context.parseTransaction = ethers_1.ethers.utils.parseTransaction;
    context.serializeTransaction = ethers_1.ethers.utils.serializeTransaction;
    context.toUtf8Bytes = ethers_1.ethers.utils.toUtf8Bytes;
    context.toUtf8String = ethers_1.ethers.utils.toUtf8String;
}
var cli = new cli_1.CLI("sandbox");
var SandboxPlugin = /** @class */ (function (_super) {
    __extends(SandboxPlugin, _super);
    function SandboxPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SandboxPlugin.getHelp = function () {
        return {
            name: "sandbox",
            help: "Run a REPL VM environment with ethers"
        };
    };
    SandboxPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SandboxPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 0) {
                            this.throwUsageError("Unexpected argument - " + JSON.stringify(args[0]));
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this.accounts.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.accounts[i].unlock()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SandboxPlugin.prototype.run = function () {
        console.log("network: " + this.network.name + " (chainId: " + this.network.chainId + ")");
        var nextPromiseId = 0;
        function promiseWriter(output) {
            if (output instanceof Promise) {
                repl.context._p = output;
                var promiseId_1 = nextPromiseId++;
                output.then(function (result) {
                    console.log("\n<Promise id=" + promiseId_1 + " resolved>");
                    console.log(util_1.default.inspect(result));
                    repl.context._r = result;
                    repl.displayPrompt(true);
                }, function (error) {
                    console.log("\n<Promise id=" + promiseId_1 + " rejected>");
                    console.log(util_1.default.inspect(error));
                    repl.displayPrompt(true);
                });
                return "<Promise id=" + promiseId_1 + " pending>";
            }
            return util_1.default.inspect(output);
        }
        var repl = repl_1.default.start({
            input: process.stdin,
            output: process.stdout,
            prompt: (this.provider ? this.network.name : "no-network") + "> ",
            writer: promiseWriter
        });
        setupContext(repl.context, this);
        return new Promise(function (resolve) {
            repl.on("exit", function () {
                console.log("");
                resolve(null);
            });
        });
    };
    return SandboxPlugin;
}(cli_1.Plugin));
cli.addPlugin("sandbox", SandboxPlugin);
var InitPlugin = /** @class */ (function (_super) {
    __extends(InitPlugin, _super);
    function InitPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitPlugin.getHelp = function () {
        return {
            name: "init FILENAME",
            help: "Create a new JSON wallet"
        };
    };
    InitPlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --force ]",
                help: "Overwrite any existing files"
            }
        ];
    };
    InitPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        this.force = argParser.consumeFlag("force");
                        return [2 /*return*/];
                }
            });
        });
    };
    InitPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwUsageError("init requires FILENAME");
                        }
                        this.filename = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    InitPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var password, confirm, wallet, progressBar, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.force && fs_1.default.existsSync(this.filename)) {
                            this.throwError('File already exists (use --force to overwrite)');
                        }
                        console.log("Creating a new JSON Wallet - " + this.filename);
                        console.log('Keep this password and file SAFE!! If lost or forgotten');
                        console.log('it CANNOT be recovered, by ANYone, EVER.');
                        return [4 /*yield*/, prompt_1.getPassword("Choose a password: ")];
                    case 1:
                        password = _a.sent();
                        return [4 /*yield*/, prompt_1.getPassword("Confirm password: ")];
                    case 2:
                        confirm = _a.sent();
                        if (password !== confirm) {
                            this.throwError("Passwords do not match");
                        }
                        wallet = ethers_1.ethers.Wallet.createRandom();
                        return [4 /*yield*/, prompt_1.getProgressBar("Encrypting")];
                    case 3:
                        progressBar = _a.sent();
                        return [4 /*yield*/, wallet.encrypt(password, {}, progressBar)];
                    case 4:
                        json = _a.sent();
                        try {
                            if (this.force) {
                                fs_1.default.writeFileSync(this.filename, json);
                            }
                            else {
                                fs_1.default.writeFileSync(this.filename, json, { flag: 'wx' });
                            }
                            console.log('New account address: ' + wallet.address);
                            console.log('Saved:               ' + this.filename);
                        }
                        catch (error) {
                            if (error.code === 'EEXIST') {
                                this.throwError('File already exists (use --force to overwrite)');
                            }
                            this.throwError('Unknown Error: ' + error.message);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return InitPlugin;
}(cli_1.Plugin));
cli.addPlugin("init", InitPlugin);
var FundPlugin = /** @class */ (function (_super) {
    __extends(FundPlugin, _super);
    function FundPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FundPlugin.getHelp = function () {
        return {
            name: "fund TARGET",
            help: "Fund TARGET with testnet ether"
        };
    };
    FundPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _b.sent();
                        if (this.network.name !== "ropsten") {
                            this.throwError("Funding requires --network ropsten");
                        }
                        if (args.length !== 1) {
                            this.throwUsageError("fund requires ADDRESS");
                        }
                        _a = this;
                        return [4 /*yield*/, this.getAddress(args[0], "Cannot fund ZERO address", false)];
                    case 2:
                        _a.toAddress = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FundPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "https:/" + "/api.ethers.io/api/v1/?action=fundAccount&address=" + this.toAddress.toLowerCase();
                return [2 /*return*/, ethers_1.ethers.utils.fetchJson(url).then(function (data) {
                        console.log("Transaction Hash: " + data.hash);
                    })];
            });
        });
    };
    return FundPlugin;
}(cli_1.Plugin));
cli.addPlugin("fund", FundPlugin);
var InfoPlugin = /** @class */ (function (_super) {
    __extends(InfoPlugin, _super);
    function InfoPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InfoPlugin.getHelp = function () {
        return {
            name: "info [ TARGET ... ]",
            help: "Dump info for accounts, addresses and ENS names"
        };
    };
    InfoPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var runners, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _b.sent();
                        this.queries = [];
                        runners = [];
                        this.accounts.forEach(function (account, index) {
                            _this.queries.push("Account #" + index);
                            runners.push(account.getAddress());
                        });
                        args.forEach(function (arg) {
                            if (ethers_1.ethers.utils.isAddress(arg)) {
                                _this.queries.push("Address: " + arg);
                            }
                            else {
                                _this.queries.push("ENS Name: " + arg);
                            }
                            runners.push(_this.provider.resolveName(arg));
                        });
                        _a = this;
                        return [4 /*yield*/, Promise.all(runners)];
                    case 2:
                        _a.addresses = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InfoPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, address, _a, balance, nonce, code, reverse, info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < this.addresses.length)) return [3 /*break*/, 4];
                        address = this.addresses[i];
                        return [4 /*yield*/, ethers_1.ethers.utils.resolveProperties({
                                balance: this.provider.getBalance(address),
                                nonce: this.provider.getTransactionCount(address),
                                code: this.provider.getCode(address),
                                reverse: this.provider.lookupAddress(address)
                            })];
                    case 2:
                        _a = _b.sent(), balance = _a.balance, nonce = _a.nonce, code = _a.code, reverse = _a.reverse;
                        info = {
                            "Address": address,
                            "Balance": (ethers_1.ethers.utils.formatEther(balance) + " ether"),
                            "Transaction Count": nonce
                        };
                        if (code != "0x") {
                            info["Code"] = code;
                        }
                        if (reverse) {
                            info["Reverse Lookup"] = reverse;
                        }
                        cli_1.dump(this.queries[i], info);
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return InfoPlugin;
}(cli_1.Plugin));
cli.addPlugin("info", InfoPlugin);
var SendPlugin = /** @class */ (function (_super) {
    __extends(SendPlugin, _super);
    function SendPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SendPlugin.getHelp = function () {
        return {
            name: "send TARGET ETHER",
            help: "Send ETHER ether to TARGET form accounts[0]"
        };
    };
    SendPlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --allow-zero ]",
                help: "Allow sending to the address zero"
            }
        ];
    };
    SendPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        if (this.accounts.length !== 1) {
                            this.throwUsageError("send requires exacly one account");
                        }
                        this.allowZero = argParser.consumeFlag("allow-zero");
                        return [2 /*return*/];
                }
            });
        });
    };
    SendPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _b.sent();
                        if (args.length !== 2) {
                            this.throwUsageError("send requires exactly ADDRESS and AMOUNT");
                        }
                        _a = this;
                        return [4 /*yield*/, this.getAddress(args[0], "Cannot send to the zero address (use --allow-zero to override)", this.allowZero)];
                    case 2:
                        _a.toAddress = _b.sent();
                        this.value = ethers_1.ethers.utils.parseEther(args[1]);
                        return [2 /*return*/];
                }
            });
        });
    };
    SendPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accounts[0].sendTransaction({
                            to: this.toAddress,
                            value: this.value
                        })];
                    case 1:
                        _a.sent();
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    return SendPlugin;
}(cli_1.Plugin));
cli.addPlugin("send", SendPlugin);
var SweepPlugin = /** @class */ (function (_super) {
    __extends(SweepPlugin, _super);
    function SweepPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SweepPlugin.getHelp = function () {
        return {
            name: "sweep TARGET",
            help: "Send all ether from accounts[0] to TARGET"
        };
    };
    SweepPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        if (this.accounts.length !== 1) {
                            this.throwUsageError("sweep requires exacly one account");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SweepPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _b.sent();
                        if (args.length !== 1) {
                            this.throwUsageError("sweep requires exactly ADDRESS");
                        }
                        _a = this;
                        return [4 /*yield*/, this.getAddress(args[0])];
                    case 2:
                        _a.toAddress = _b.sent();
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    SweepPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, balance, gasPrice, code, maxSpendable;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ethers_1.ethers.utils.resolveProperties({
                            balance: this.provider.getBalance(this.accounts[0].getAddress()),
                            gasPrice: (this.gasPrice || this.provider.getGasPrice()),
                            code: this.provider.getCode(this.toAddress)
                        })];
                    case 1:
                        _a = _b.sent(), balance = _a.balance, gasPrice = _a.gasPrice, code = _a.code;
                        if (code !== "0x") {
                            this.throwError("Cannot sweep to a contract address");
                        }
                        maxSpendable = balance.sub(gasPrice.mul(21000));
                        if (maxSpendable.lte(0)) {
                            this.throwError("Insufficient funds to sweep");
                        }
                        return [4 /*yield*/, this.accounts[0].sendTransaction({
                                to: this.toAddress,
                                gasLimit: 21000,
                                gasPrice: gasPrice,
                                value: maxSpendable
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SweepPlugin;
}(cli_1.Plugin));
cli.addPlugin("sweep", SweepPlugin);
var SignMessagePlugin = /** @class */ (function (_super) {
    __extends(SignMessagePlugin, _super);
    function SignMessagePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignMessagePlugin.getHelp = function () {
        return {
            name: "sign-message MESSAGE",
            help: "Sign a MESSAGE with accounts[0]"
        };
    };
    SignMessagePlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --hex ]",
                help: "The message content is hex encoded"
            }
        ];
    };
    SignMessagePlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        if (this.accounts.length !== 1) {
                            this.throwError("sign-message requires exacly one account");
                        }
                        this.hex = argParser.consumeFlag("hex");
                        return [2 /*return*/];
                }
            });
        });
    };
    SignMessagePlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwError("send requires exactly MESSAGE");
                        }
                        this.message = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    SignMessagePlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accounts[0].signMessage(this.message)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SignMessagePlugin;
}(cli_1.Plugin));
cli.addPlugin("sign-message", SignMessagePlugin);
var EvalPlugin = /** @class */ (function (_super) {
    __extends(EvalPlugin, _super);
    function EvalPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EvalPlugin.getHelp = function () {
        return {
            name: "eval CODE",
            help: "Run CODE in a VM with ethers"
        };
    };
    EvalPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwError("eval requires exactly CODE");
                        }
                        this.code = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    EvalPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contextObject, context, script, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contextObject = {};
                        setupContext(contextObject, this);
                        context = vm_1.default.createContext(contextObject);
                        script = new vm_1.default.Script(this.code, { filename: "-" });
                        result = script.runInContext(context);
                        if (!(result instanceof Promise)) return [3 /*break*/, 2];
                        return [4 /*yield*/, result];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    return EvalPlugin;
}(cli_1.Plugin));
cli.addPlugin("eval", EvalPlugin);
var RunPlugin = /** @class */ (function (_super) {
    __extends(RunPlugin, _super);
    function RunPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RunPlugin.getHelp = function () {
        return {
            name: "run FILENAME",
            help: "Run FILENAME in a VM with ethers"
        };
    };
    RunPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwError("run requires exactly FILENAME");
                        }
                        this.filename = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    RunPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contextObject, context, script, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contextObject = {};
                        setupContext(contextObject, this);
                        context = vm_1.default.createContext(contextObject);
                        script = new vm_1.default.Script(fs_1.default.readFileSync(this.filename).toString(), { filename: this.filename });
                        result = script.runInContext(context);
                        if (!(result instanceof Promise)) return [3 /*break*/, 2];
                        return [4 /*yield*/, result];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    return RunPlugin;
}(cli_1.Plugin));
cli.addPlugin("run", RunPlugin);
var WaitPlugin = /** @class */ (function (_super) {
    __extends(WaitPlugin, _super);
    function WaitPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitPlugin.getHelp = function () {
        return {
            name: "wait HASH",
            help: "Wait for a transaction HASH to be mined"
        };
    };
    WaitPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwError("wait requires exactly HASH");
                        }
                        this.hash = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    WaitPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Waiting for Transaction:", this.hash);
                        return [4 /*yield*/, this.provider.waitForTransaction(this.hash)];
                    case 1:
                        receipt = _a.sent();
                        cli_1.dump("Response:", {
                            "Block": receipt.blockNumber,
                            "Block Hash": receipt.blockHash,
                            "Status": (receipt.status ? "ok" : "failed")
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return WaitPlugin;
}(cli_1.Plugin));
cli.addPlugin("wait", WaitPlugin);
var CompilePlugin = /** @class */ (function (_super) {
    __extends(CompilePlugin, _super);
    function CompilePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompilePlugin.getHelp = function () {
        return {
            name: "compile FILENAME",
            help: "Compiles a Solidity contract"
        };
    };
    CompilePlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --no-optimize ]",
                help: "Do not optimize the compiled output"
            },
            {
                name: "[ --warnings ]",
                help: "Error on any warning"
            }
        ];
    };
    CompilePlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        this.noOptimize = argParser.consumeFlag("no-optimize");
                        this.warnings = argParser.consumeFlag("warnings");
                        return [2 /*return*/];
                }
            });
        });
    };
    CompilePlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwError("compile requires exactly FILENAME");
                        }
                        this.filename = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    CompilePlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var source, result, output;
            return __generator(this, function (_a) {
                source = fs_1.default.readFileSync(this.filename).toString();
                result = solc_1.compile(source, {
                    filename: this.filename,
                    optimize: (!this.noOptimize)
                });
                output = {};
                result.forEach(function (contract, index) {
                    output[contract.name] = {
                        bytecode: contract.bytecode,
                        runtime: contract.runtime,
                        interface: contract.interface.fragments.map(function (f) { return f.format(true); })
                    };
                });
                console.log(JSON.stringify(output, null, 4));
                return [2 /*return*/];
            });
        });
    };
    return CompilePlugin;
}(cli_1.Plugin));
cli.addPlugin("compile", CompilePlugin);
var DeployPlugin = /** @class */ (function (_super) {
    __extends(DeployPlugin, _super);
    function DeployPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeployPlugin.getHelp = function () {
        return {
            name: "deploy FILENAME",
            help: "Compile and deploy a Solidity contract"
        };
    };
    DeployPlugin.getOptionHelp = function () {
        return [
            {
                name: "[ --no-optimize ]",
                help: "Do not optimize the compiled output"
            },
            {
                name: "[ --contract NAME ]",
                help: "Specify the contract to deploy"
            }
        ];
    };
    DeployPlugin.prototype.prepareOptions = function (argParser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareOptions.call(this, argParser)];
                    case 1:
                        _a.sent();
                        if (this.accounts.length !== 1) {
                            this.throwError("deploy requires exactly one account");
                        }
                        this.noOptimize = argParser.consumeFlag("no-optimize");
                        this.contractName = argParser.consumeOption("contract");
                        return [2 /*return*/];
                }
            });
        });
    };
    DeployPlugin.prototype.prepareArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.prepareArgs.call(this, args)];
                    case 1:
                        _a.sent();
                        if (args.length !== 1) {
                            this.throwError("deploy requires exactly FILENAME");
                        }
                        this.filename = args[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    DeployPlugin.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var source, result, codes, factory, contract;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = fs_1.default.readFileSync(this.filename).toString();
                        result = solc_1.compile(source, {
                            filename: this.filename,
                            optimize: (!this.noOptimize)
                        });
                        codes = result.filter(function (c) { return (c.bytecode !== "0x" && (_this.contractName == null || _this.contractName == c.name)); });
                        if (codes.length > 1) {
                            this.throwError("Please specify a contract with --contract NAME");
                        }
                        if (codes.length === 0) {
                            this.throwError("No contract found");
                        }
                        factory = new ethers_1.ethers.ContractFactory(codes[0].interface, codes[0].bytecode, this.accounts[0]);
                        return [4 /*yield*/, factory.deploy()];
                    case 1:
                        contract = _a.sent();
                        cli_1.dump("Deployed:", {
                            Contract: codes[0].name,
                            Address: contract.address,
                            Bytecode: codes[0].bytecode,
                            Interface: codes[0].interface.fragments.map(function (f) { return f.format(true); })
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return DeployPlugin;
}(cli_1.Plugin));
cli.addPlugin("deploy", DeployPlugin);
cli.run(process.argv.slice(2));
