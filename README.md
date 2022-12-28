## Youtube Video Download Web/Windows Desktop App
The application is build using NodeJs, Express and ElectronJs
### To build the app locally
> electron-packager . --platform=win32 --arch=x64 ytd
<br>

a new folder should appear (ytd-win32-x64), copy the public folder and temp_vid folder inside that.</br>
Now you can run the ytd.exe file.
<br>
- To build msi installer, under root folder
  > node build_installer.js
#### To run the app locally
> npm run dev (to start the app in development mode) </br>

On excuting the above command the app will load in a browser window using electronjs
- To run just the express server use
  > npm run express
<br/>
#### Note: after installing the app using msi installer, run it in admin mode