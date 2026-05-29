const fs   = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const dir     = path.join(process.cwd(), 'music');
  const allowed = ['.mp3', '.ogg', '.wav', '.m4a', '.aac'];
  let files = [];

  try {
    files = fs.readdirSync(dir)
      .filter(f => !f.startsWith('.') && allowed.includes(path.extname(f).toLowerCase()))
      .map(f => ({
        src:  '/music/' + encodeURIComponent(f),
        name: f.replace(/\.[^/.]+$/, ''),
      }));
  } catch (e) {
    files = [];
  }

  res.status(200).json(files);
};
