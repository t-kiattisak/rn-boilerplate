module.exports = {
  dependency: {
    platforms: {
      android: {
        packageImportPath: 'import com.boilerplate.device.DevicePackage;',
        packageInstance: 'new DevicePackage()',
        sourceDir: './android',
      },
    },
  },
};
