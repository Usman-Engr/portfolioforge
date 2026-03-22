const fs = require('fs');
const path = require('path');

const dir = 'd:/portfolioforge/src/components/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const p = path.join(dir, file);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/variants=\{([a-zA-Z0-9_]+)\}/g, 'variants={$1 as any}');
  fs.writeFileSync(p, c);
}
console.log('Fixed variants.');
