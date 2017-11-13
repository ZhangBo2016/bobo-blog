const fs = require('fs');
const rm = require('rimraf');
const path = require('path');
const config = require('../config');
const root = config.build.assetsRoot;
const staticDir = config.build.assetsSubDirectory;

function rename() {
  let dir = path.join(root, './', staticDir, '/js');
  let newDir = path.join(root, '/js');
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.error(err);
    }
    files.forEach(item => {
      const reg = /(hljs\..+\.)(.*\.)(js|\.map)/ig;
      if (reg.test(item) === true) {
        fs.rename(dir + '/' + item, newDir + '/' + item.replace(reg, '$1$3'), err => {
          if (err) console.log(err);
        });
      }
    });
    console.log("移动完成");
  });
}
module.exports = function rebuildHljs() {
  rm(path.join(root, '/js'), err => {
    if (err) {
      return console.error(err);
    }
    fs.mkdir(root + '/js', (err) => {
      if (err) {
        return console.error(err);
      }
      rename(root);
      console.log("目录创建成功。");
    });
  });
};
