# Installation guide

1. Download the entire repository from the official github website
2. Download xamp from the official website
3. Run the apache and mysql service which is available in the module section at the very top of the application
4. go to http: // localhost: 8080 / phpmyadmin
5. go to the import tab, and then add the previously downloaded service_oreders.sql file
6. for smoother launching of the application, attach to the repository files that normally should be protected. (.env and config / config.ts)
   7.To send an e-mail to the right person you have to change the name of the recipient in line 52.route.ts or 61 order.route.ts
8. In the project directory, you run:

### `npm install`

9.Then, run:

### `npm start`

