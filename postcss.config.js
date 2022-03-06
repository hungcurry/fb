module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('tailwindcss'),
    // 壓縮postcss
    require('cssnano')({
      preset: 'default',
    }),
    
  ]
}
