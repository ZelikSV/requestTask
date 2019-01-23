**Getting started**

 In ```src``` folder you have 2 files

1. Based on ```XMLHttpRequest``` create own implementation of ```fetch```

2. after go to second part of this task, see description below

 **to start server**

  - ```npm i```

  - ```npm start``` and open browser on localhost:8000

Using your own implementation follow next steps

1. Add progress bar to upload file to server with graphic indication and percent(10% ... 21% ... 50 ... 100%)

2. Add progress bar to download file from server with only graphic indication(on top of page with width 100% and height 2-3px)

3. if file was downloaded - if it is an image - show it on center of page, else download file to your local machine

PS: remember about SOLID and other principes - KISS, DRY(google it if you don't know)

*Extra task

 1. In file ```server.js``` create edpoint ```/list```, read list of files in dir(see - [fs.readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) )
 and send to webApp like endpoint ```ping``` but use method ```GET```.
 After, add logic to your app for loading list of exist file on server
