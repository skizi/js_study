module.exports = {  
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "@/src/sass/import/_vars.scss";`
  //     }
  //   }
  // }
  sass: {
    includePaths: ["./src/sass/import/_vars.scss"],
    indentedSyntax: true
  }
}

// const path = require('path');

//  module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//        data: '@import "_vars.scss";',
//        includePaths: [path.resolve(__dirname, './src/sass/import/')],
//       }
//     }
//   }
//  }