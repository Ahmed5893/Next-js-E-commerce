"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./config/db.js":
/*!**********************!*\
  !*** ./config/db.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectDB = async ()=>{\n    try {\n        const connect = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGO_URI, {\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        });\n        console.log(`MongoDB Connect On ${connect.connection.host}`);\n    } catch (err) {\n        console.error(`Error: ${err.message}`);\n    // process.exit(1);\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9jb25maWcvZGIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLFlBQVksVUFBWTtJQUM1QixJQUFJO1FBQ0YsTUFBTUMsVUFBVSxNQUFNRix1REFBZ0IsQ0FBQ0csUUFBUUMsR0FBRyxDQUFDQyxTQUFTLEVBQUU7WUFDNURDLGlCQUFpQixJQUFJO1lBQ3JCQyxvQkFBb0IsSUFBSTtRQUMxQjtRQUNBQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxtQkFBbUIsRUFBRVAsUUFBUVEsVUFBVSxDQUFDQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxFQUFFLE9BQU9DLEtBQUs7UUFDWkosUUFBUUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFRCxJQUFJRSxPQUFPLENBQUMsQ0FBQztJQUNyQyxtQkFBbUI7SUFDckI7QUFDRjtBQUVBLGlFQUFlYixTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZS1jb21tZXJjZS8uL2NvbmZpZy9kYi5qcz9iNDkzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgY29ubmVjdERCID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbm5lY3QgPSBhd2FpdCBtb25nb29zZS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPX1VSSSwge1xuICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLFxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGBNb25nb0RCIENvbm5lY3QgT24gJHtjb25uZWN0LmNvbm5lY3Rpb24uaG9zdH1gKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgLy8gcHJvY2Vzcy5leGl0KDEpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0REI7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjb25uZWN0REIiLCJjb25uZWN0IiwicHJvY2VzcyIsImVudiIsIk1PTkdPX1VSSSIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0aW9uIiwiaG9zdCIsImVyciIsImVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./config/db.js\n");

/***/ }),

/***/ "(api)/./models/userModels.js":
/*!******************************!*\
  !*** ./models/userModels.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userSchema = mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema({\n    name: {\n        type: String,\n        required: \"true\"\n    },\n    email: {\n        type: String,\n        required: \"true\",\n        unique: \"true\"\n    },\n    password: {\n        type: String,\n        required: \"true\"\n    },\n    isAdmin: {\n        type: Boolean,\n        required: \"true\",\n        default: false\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.User) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvdXNlck1vZGVscy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsYUFBYUQsc0RBQWUsQ0FDaEM7SUFDRUcsTUFBTTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO0lBQU87SUFDdkNDLE9BQU87UUFBRUgsTUFBTUM7UUFBUUMsVUFBVTtRQUFRRSxRQUFRO0lBQU87SUFDeERDLFVBQVU7UUFBRUwsTUFBTUM7UUFBUUMsVUFBVTtJQUFPO0lBQzNDSSxTQUFTO1FBQUVOLE1BQU1PO1FBQVNMLFVBQVU7UUFBUU0sU0FBUyxLQUFLO0lBQUM7QUFDN0QsR0FDQTtJQUFFQyxZQUFZLElBQUk7QUFBQztBQUdyQixNQUFNQyxPQUFPZCw2REFBb0IsSUFBSUEscURBQWMsQ0FBQyxRQUFRQztBQUM1RCxpRUFBZWEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2UtY29tbWVyY2UvLi9tb2RlbHMvdXNlck1vZGVscy5qcz9mODdkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgdXNlclNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYShcbiAge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogXCJ0cnVlXCIgfSxcbiAgICBlbWFpbDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiBcInRydWVcIiwgdW5pcXVlOiBcInRydWVcIiB9LFxuICAgIHBhc3N3b3JkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IFwidHJ1ZVwiIH0sXG4gICAgaXNBZG1pbjogeyB0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogXCJ0cnVlXCIsIGRlZmF1bHQ6IGZhbHNlIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XG4pO1xuXG5jb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWwoXCJVc2VyXCIsIHVzZXJTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsInVzZXJTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwiZW1haWwiLCJ1bmlxdWUiLCJwYXNzd29yZCIsImlzQWRtaW4iLCJCb29sZWFuIiwiZGVmYXVsdCIsInRpbWVzdGFtcHMiLCJVc2VyIiwibW9kZWxzIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./models/userModels.js\n");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config/db */ \"(api)/./config/db.js\");\n/* harmony import */ var _models_userModels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/userModels */ \"(api)/./models/userModels.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_2___default()({\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ user , token  }) {\n            if (user?._id) token._id = user._id;\n            if (user?.isAdmin) token.isAdmin = user.isAdmin;\n            return token;\n        },\n        async session ({ session , token  }) {\n            if (token?._id) session.user._id = token._id;\n            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;\n            return session;\n        }\n    },\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_4___default()({\n            async authorize (credentials) {\n                await (0,_config_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n                const user = await _models_userModels__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOne({\n                    email: credentials.email\n                });\n                console.log(\"data\", user.password);\n                if (user && bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password)) {\n                    return {\n                        _id: user._id,\n                        name: user.name,\n                        email: user.email,\n                        image: \"f\",\n                        isAdmin: user.isAdmin\n                    };\n                }\n                throw new Error(\"Invalid Email Or Password\");\n            }\n        })\n    ]\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFvQztBQUNHO0FBQ047QUFDRDtBQUNrQztBQUVsRSxpRUFBZUUsZ0RBQVFBLENBQUM7SUFDdEJHLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUksRUFBRUMsTUFBSyxFQUFFLEVBQUU7WUFDekIsSUFBSUQsTUFBTUUsS0FBS0QsTUFBTUMsR0FBRyxHQUFHRixLQUFLRSxHQUFHO1lBQ25DLElBQUlGLE1BQU1HLFNBQVNGLE1BQU1FLE9BQU8sR0FBR0gsS0FBS0csT0FBTztZQUMvQyxPQUFPRjtRQUNUO1FBQ0EsTUFBTUwsU0FBUSxFQUFFQSxRQUFPLEVBQUVLLE1BQUssRUFBRSxFQUFFO1lBQ2hDLElBQUlBLE9BQU9DLEtBQUtOLFFBQVFJLElBQUksQ0FBQ0UsR0FBRyxHQUFHRCxNQUFNQyxHQUFHO1lBQzVDLElBQUlELE9BQU9FLFNBQVNQLFFBQVFJLElBQUksQ0FBQ0csT0FBTyxHQUFHRixNQUFNRSxPQUFPO1lBQ3hELE9BQU9QO1FBQ1Q7SUFDRjtJQUNBUSxXQUFXO1FBQ1RULHNFQUFtQkEsQ0FBQztZQUNsQixNQUFNVSxXQUFVQyxXQUFXLEVBQUU7Z0JBQzNCLE1BQU1mLHNEQUFTQTtnQkFDZixNQUFNUyxPQUFPLE1BQU1SLGtFQUFZLENBQUM7b0JBQzlCZ0IsT0FBT0YsWUFBWUUsS0FBSztnQkFDMUI7Z0JBQ0FDLFFBQVFDLEdBQUcsQ0FBQyxRQUFRVixLQUFLVyxRQUFRO2dCQUVqQyxJQUFJWCxRQUFTTix1REFBZ0IsQ0FBQ1ksWUFBWUssUUFBUSxFQUFFWCxLQUFLVyxRQUFRLEdBQUc7b0JBQ2xFLE9BQU87d0JBQ0xULEtBQUtGLEtBQUtFLEdBQUc7d0JBQ2JXLE1BQU1iLEtBQUthLElBQUk7d0JBQ2ZMLE9BQU9SLEtBQUtRLEtBQUs7d0JBQ2pCTSxPQUFPO3dCQUNQWCxTQUFTSCxLQUFLRyxPQUFPO29CQUN2QjtnQkFDRixDQUFDO2dCQUNELE1BQU0sSUFBSVksTUFBTSw2QkFBNkI7WUFDL0M7UUFDRjtLQUNEO0FBQ0gsRUFBRSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZS1jb21tZXJjZS8uL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0uanM/NTI3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29ubmVjdERCIGZyb20gXCJAL2NvbmZpZy9kYlwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWxzL3VzZXJNb2RlbHNcIjtcbmltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgYmNyeXB0anMgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdXNlciwgdG9rZW4gfSkge1xuICAgICAgaWYgKHVzZXI/Ll9pZCkgdG9rZW4uX2lkID0gdXNlci5faWQ7XG4gICAgICBpZiAodXNlcj8uaXNBZG1pbikgdG9rZW4uaXNBZG1pbiA9IHVzZXIuaXNBZG1pbjtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4/Ll9pZCkgc2Vzc2lvbi51c2VyLl9pZCA9IHRva2VuLl9pZDtcbiAgICAgIGlmICh0b2tlbj8uaXNBZG1pbikgc2Vzc2lvbi51c2VyLmlzQWRtaW4gPSB0b2tlbi5pc0FkbWluO1xuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgYXdhaXQgY29ubmVjdERCKCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe1xuICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhJywgdXNlci5wYXNzd29yZClcblxuICAgICAgICBpZiAodXNlciAmJiAgYmNyeXB0anMuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX2lkOiB1c2VyLl9pZCxcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgaW1hZ2U6IFwiZlwiLFxuICAgICAgICAgICAgaXNBZG1pbjogdXNlci5pc0FkbWluLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBFbWFpbCBPciBQYXNzd29yZFwiKTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLCJuYW1lcyI6WyJjb25uZWN0REIiLCJVc2VyIiwiTmV4dEF1dGgiLCJiY3J5cHRqcyIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ1c2VyIiwidG9rZW4iLCJfaWQiLCJpc0FkbWluIiwicHJvdmlkZXJzIiwiYXV0aG9yaXplIiwiY3JlZGVudGlhbHMiLCJmaW5kT25lIiwiZW1haWwiLCJjb25zb2xlIiwibG9nIiwicGFzc3dvcmQiLCJjb21wYXJlIiwibmFtZSIsImltYWdlIiwiRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();