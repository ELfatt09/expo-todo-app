module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [

      // plugin lain kalau kamu pakai (module-resolver, dll)
      'react-native-worklets/plugin',  // **gunakan plugin reanimated**
      // jangan pakai ‘react-native-worklets/plugin’ supaya tidak duplikasi kelas
    ],
  };
};
