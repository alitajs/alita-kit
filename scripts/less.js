const fs = require('fs');
const path = require('path');
const less = require('less');
const absRoot = path.join(__dirname, '..').replace(/\\/g, '/');
const components = fs
  .readdirSync(`${absRoot}/components`)
  .map(name => `components/${name}/styles`)
  .filter(p => fs.existsSync(`${absRoot}/${p}`));

renderLess(components);

/**
 * @param {string[]} paths
 */
function renderLess(paths) {
  const cwd = process.cwd();
  paths = paths
    .filter(function(p) {
      if (p.includes('node_modules')) return false;
      if (fs.existsSync(p)) return true;
      console.log(`${p} does not exist`);
    })
    .map(p => {
      if (path.isAbsolute(p)) return p;
      return path.join(cwd, p);
    });
  paths.forEach(p => {
    if (path.extname(p) === '.less')
      return fs.readFile(p, { encoding: 'utf8' }, function(err, data) {
        if (err) return console.error(err);
        less.render(data, { paths: [path.join(p, '..')] }).then(
          function(output) {
            fs.writeFile(`${p.slice(0, -4)}css`, output.css, { encoding: 'utf8' }, function(err) {
              if (err) console.error(`${p}\n`, err);
            });
          },
          function(err) {
            console.error(`${p}\n`, err);
          },
        );
      });
    if (!fs.statSync(p).isDirectory()) return;
    renderLess(fs.readdirSync(p).map(sub => path.join(p, sub)), console);
  });
}
