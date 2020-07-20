const path = require("path");

module.exports = {
  entry: {
    "./dist/iamport.react" : "./src/react/index.js",
  },
  output: {
    path: path.resolve(__dirname),
    filename: "[name].js"
  },
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
					loader: 'babel-loader',
					options: {
						// @remove-on-eject-begin
						babelrc: false,
						presets: [ require.resolve( 'babel-preset-cgb' ) ],
						// @remove-on-eject-end
						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
					},
				},
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
};
