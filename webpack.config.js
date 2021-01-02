// Import modules
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
     mode: process.env.NODE_ENV,

     entry: {
          index: {
               import: path.join(__dirname, "src/app/public/js/index.js"),
               filename: "js/index.js"
          },

          socket: {
               import: path.join(__dirname, "src/app/public/js/socket.js"),
               filename: "js/socket.js"
          },

          sw: {
               import: path.join(__dirname, "src/app/public/js/sw.js"),
               filename: "sw.js"
          }
     },

     output: {
          path: path.join(__dirname, "dist/app/public")
     },

     plugins: [
          new MiniCssExtractPlugin({
               filename: "css/styles.css"
          }),

          new CopyWebpackPlugin({
               patterns: [
                    {
                         from: path.join(__dirname, "src/app/public/icons"),
                         to: path.join(__dirname, "dist/app/public/icons")
                    },
                    {
                         from: path.join(__dirname, "src/app/public/images"),
                         to: path.join(__dirname, "dist/app/public/images")
                    },
                    {
                         from: path.join(__dirname, "src/app/public/json/manifest.json"),
                         to: path.join(__dirname, "dist/app/public/manifest.json")
                    },
                    {
                         from: path.join(__dirname, "src/app/public/pages"),
                         to: path.join(__dirname, "dist/app/public/pages")
                    }
               ]
          })
     ],

     module: {
          rules: [
               {
                    test: /.css$/i,
                    use: [
                         MiniCssExtractPlugin.loader,
                         "css-loader"
                    ]
               }
          ]
     }
};
