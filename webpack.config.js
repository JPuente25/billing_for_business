module.exports = {
   mode: 'production',
   entry: './dist/factura.js',
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
         }
      ]
   },
   resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
   },
   output: {
      filename: 'bundlefactura.js',
   },
}