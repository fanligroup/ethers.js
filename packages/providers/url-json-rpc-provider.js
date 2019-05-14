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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors = __importStar(require("@ethersproject/errors"));
var networks_1 = require("@ethersproject/networks");
var properties_1 = require("@ethersproject/properties");
var json_rpc_provider_1 = require("./json-rpc-provider");
var UrlJsonRpcProvider = /** @class */ (function (_super) {
    __extends(UrlJsonRpcProvider, _super);
    function UrlJsonRpcProvider(network, apiKey) {
        var _newTarget = this.constructor;
        var _this = this;
        errors.checkAbstract(_newTarget, UrlJsonRpcProvider);
        network = networks_1.getNetwork((network == null) ? "homestead" : network);
        apiKey = _newTarget.getApiKey(apiKey);
        var url = _newTarget.getUrl(network, apiKey);
        _this = _super.call(this, url, network) || this;
        properties_1.defineReadOnly(_this, "apiKey", apiKey);
        return _this;
    }
    UrlJsonRpcProvider.prototype._startPending = function () {
        errors.warn("WARNING: API provider does not support pending filters");
    };
    UrlJsonRpcProvider.prototype.getSigner = function (address) {
        errors.throwError("API provider does not support signing", errors.UNSUPPORTED_OPERATION, { operation: "getSigner" });
        return null;
    };
    UrlJsonRpcProvider.prototype.listAccounts = function () {
        return Promise.resolve([]);
    };
    // Return a defaultApiKey if null, otherwise validate the API key
    UrlJsonRpcProvider.getApiKey = function (apiKey) {
        return apiKey;
    };
    // Returns the url for the given network and API key
    UrlJsonRpcProvider.getUrl = function (network, apiKey) {
        return errors.throwError("not implemented; sub-classes must override getUrl", errors.NOT_IMPLEMENTED, {
            operation: "getUrl"
        });
    };
    return UrlJsonRpcProvider;
}(json_rpc_provider_1.JsonRpcProvider));
exports.UrlJsonRpcProvider = UrlJsonRpcProvider;
