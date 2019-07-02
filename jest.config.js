module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['app/**/*.js'],
    "coveragePathIgnorePatterns" : [
        "app/index.js",
        "app/app.js",
        "app/routes",
        "app/controllers"
    ],
    testPathIgnorePatterns : [
      "__tests__/stub",
    ]
  };