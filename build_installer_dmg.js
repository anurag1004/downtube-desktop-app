const installer = require('electron-installer-dmg');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './ytd-darwin-x64');
const OUT_DIR = path.resolve(__dirname, './mac_installer');

installer({
    appPath: APP_DIR,
    out: OUT_DIR,
    name: 'Downtubelive',
    overwrite: true, // Overwrite existing files
    icon: path.resolve(__dirname, './icons/youtube.ico'), // Path to your application icon
}, (err) => {
    if (err) {
        console.error(err, err.stack);
        process.exit(1);
    }
    console.log('DMG installer created successfully!');
});

