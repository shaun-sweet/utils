# What is it?

This is a client that hits a config storage server called [config hub](https://www.confighub.com/)

It pulls in configuration files managed thru config hub.  As such, you'll probably want to have a config hub instance running and be reasonably familiar with using it before trying this client.

# Installation
`npm install config-hub-helper --save-dev`

OR

`yarn add config-hub-helper -D`

# Usage
Inside a package.json script command...
```bash
config-hub-helper --token=<token here> --context=local --url=<url> --file=config.js --appName=ts-sr
```