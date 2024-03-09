export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ["js", "json", "ts"],
    roots: ["src"],
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    moduleDirectories: ["node_modules", "src", __dirname],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
};
