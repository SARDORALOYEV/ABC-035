const fs = require('fs');
const path = require('path');

const SETTINGS_FILE = path.join(__dirname, '..', 'data', 'settings.json');

function ensureDir() {
  const dir = path.dirname(SETTINGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readSettings() {
  ensureDir();
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeSettings(data) {
  ensureDir();
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

const getAllSettings = async (req, res) => {
  const settings = readSettings();
  res.json({ success: true, data: settings });
};

const getSetting = async (req, res) => {
  const settings = readSettings();
  res.json({ success: true, data: settings[req.params.key] || null });
};

const saveSetting = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  const settings = readSettings();
  settings[key] = value;
  writeSettings(settings);

  res.json({ success: true, message: 'Sozlamalar saqlandi' });
};

const deleteSetting = async (req, res) => {
  const settings = readSettings();
  delete settings[req.params.key];
  writeSettings(settings);

  res.json({ success: true, message: 'Sozlama o\'chirildi' });
};

module.exports = { getAllSettings, getSetting, saveSetting, deleteSetting };
