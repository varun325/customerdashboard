export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ["js", "json", "ts", "tsx"],
    roots: ["src"],
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s", "**/*.(t|j)sx"],
    coverageDirectory: "../coverage",
    moduleDirectories: ["node_modules", "src", __dirname],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
};
