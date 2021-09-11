<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/satelite-digital/engineer">
    <img src="assets/logo.svg" alt="Logo" height="48px" >
  </a>

  <h3 align="center">Create applications faster</h3>

  <p align="center">
    <br />
    <a href="https://github.com/satelite-digital/engineer"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gitfolder.satelite.digital">View Demo</a>
    ·
    <a href="https://github.com/satelite-digital/engineer/issues">Report Bug</a>
    ·
    <a href="https://github.com/satelite-digital/engineer/issues">Request Feature</a>
  </p>
</p>

## Satelite Engineer

> “Any sufficiently advanced technology is indistinguishable from magic”

> — Arthur C. Clarke

### What is it?

Think Gatsby but language agnostic, much simpler since its only the code generation engine, and while it can also be used as a SSG (Static Site Generator) this is not its main focus or target use.  It is highly extendible and programmable, it can be integrated into modern CI/CD toolchains and can be connected to any data source, or many, via plugins.  

In short, it is a tool that will take template files that you write, and a data structure you provide, to generate new files using the provided data.

### How does it work?

#### First you need to have these installed on your device

- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [GIT](https://git-scm.com/downloads)

#### Then you can install the CLI

Install Satelite Engineer CLI:

```bash
npm i -g @satelite/engineer-cli
```

#### Now you can setup your first project!

Satelite Engineer allows you to adopt it incrementally into any existing project or to start a project from scratch, by running the following in your command line interface:

```bash
mkdir satelite-engineer-demo
cd satelite-engineer-demo
engineer init
```

This command will list all the available (official) templates, but for now just choose "Initialize on current folder"

This will create an `engineer.config.js` file that includes a minimal working configuration at the root of your project.

It will also create an`.satelite/engineer/` folder containing an example `data.json` file and a `files` subfolder.

The latter contains an example `code.js` file that implements template directives, and finally an example `example.plugin.js` to demonstrate how would you add or extend Satelite Engineer features.

```
.
├── engineer.config.js
├── .satelite
│   └── engineer
│        └── data.json
│        └── files
│             └── code.js
│   └── plugins
│       └── example.plugin.js

```

Now you can run:

```
engineer build
node src/index.js

// Hello World!
```

And thats it! you should now see a `src` folder containing an index.js file and you can proudly go add "Satelite Engineer developer" to your bio on every social media platform.

> But Erick, what's so special about it? I could've just wrote a console.log("Hello, World!") myself 🥱

Continue exploring this guide so you'll soon know why this is so much cooler than writing your own static code.

First, let me explain **what just happened.**

### Understanding the configuration file

#### Data sources

Open `engineer.config.js` and you'll notice that the code imports the example `data.json` file that was created on initialization:

```
// ./engineer.config.js
{
    "data" : require("././satelite/engineer/data.json")
}
```
Which right now only contains the following:

```
// ./.satelite/engineer/data.json

{
    "message" : "Hello, World!"
}
```

In short, the **configuration file** should export a configuration `Object` or a `Promise` that will return a configuration `Object`, allowing you to fetch data or configurations asynchronously.

While there aren't (almost) any rules about what goes into a configuration object, your data needs to be put into a `data` key on your configuration object.

Please note that this could be anything you can get into a NodeJS application (be it by using require/import to fetch some file, fs to read a folder full of markdown files or even fetching data from any remote endpoint).

#### Template files

Remember I just said there weren't almost any rules? Well, here is the only other exception.  To add template files that are going to be processed by Satelite Engineer you need to specify their source and destination paths in a `templates` key on your configuration object.

```
// ./engineer.config.js

{
"data" : require("./.satelite/engineer/data.json"),
"templates" : [
    {
        "src" : ".satelite/engineer/files/code.js",
        "dest" : "src/index.js"
    }
]
}
```

A file template is any file which implements a templating engine.  By default, Satelite Engineer will use [Handlebars.js](https://handlebarsjs.com/) to compile your templates, although you can setup any other template engine if you prefer.

```
// ./.satelite/engineer/files/code.js

console.log("{{message}}"); // 😉 this is how we got our "Hello, World!".

```

### Now let's use it to make something cooler 🥶

This time you are going to provide an array as data input to one of our files to demonstrate how you can generate almost any code structure dynamically:

```
// ./.satelite/engineer/data.json

{
    "title":"minimal to do list",
    "schema":[
        {
            "id":"user",
            "fields":[
                {
                    "id":"email",
                    "type":"String"
                },
                {
                    "id":"password",
                    "type":"String"
                }
            ]
        },
        {
            "id":"task",
            "fields":[
                {
                    "id":"text",
                    "type":"String"
                },
                {
                    "id":"isDone",
                    "type":"Boolean"
                }
            ]
        }
    ]
}
```

```
// ./engineer.config.js

{
"data" : require("./.satelite/engineer/data.json"),
    "templates" : [
        {
            "src" : ".satelite/engineer/files/code.js",
            "dest" : "src/index.js",
            "key" : "schema"
        }
    ]
}

```

Each file will get the corresponding key from your data object as input for the template directives. 

Since all the generated files will have the exact same name and route each one will overwrite the previous, which is not what we intend.

So at this point I would recommend taking a step back by running `engineer cleanup` on your current working directory so we let Satelite Engineer clean up the mess for us.

Now, in order to name your files dynamically to avoid the previous situation, you can use any key `[here]` in your destination paths, as follows:

```
// ./engineer.config.js

{
"data" : require("./.satelite/engineer/data.json"),
"templates" : [
    {
        "src" : ".satelite/engineer/files/code.js",
        "dest" : "src/[id]/index.js", // you can place inside the brackets any key of the input this file template will get
        "key" : "schema"
    }
]
}
```

This will output a `src/user/index.js` and a `src/todo/index.js`

> What if I need to transform the data before the files get it?

Satelite Engineer supports functional extension through the use and writing of plugins.  Plugins are just any function that will get the current configuration `Object`, do any work with it and return it back.

```
// ./.satelite/engineer/plugins/yourAwesomePlugin.js
const yourAwesomePlugin = (config)=>{
  return  config.schema.map((obj)=>{
    obj.displayName = `${obj.id[0].toUpperCase()}${obj.id.substring(1)}`
    obj.slug = obj.id.split(" ").join("-")
    return obj
  })
}
```

There are no rules on how to run plugins or where to load them, so you can just do this

```
// ./engineer.config.js
import yourAwesomePlugin from "./.satelite/engineer/plugins/yourAwesomePlugin.js"

const config = {
"data" : require("./.satelite/engineer/data.json"),
"templates" : [
    {
        "src" : ".satelite/engineer/files/code.js",
        "dest" : "src/[id]/index.js", // you can place inside the brackets any key of the input this file template will get
        "key" : "schema"
    }
]
}

config = yourAwesomePlugin(config);
config = yourOtherAwesomePlugin(config);
return config;
```

And now you can do the following:
```
// ./.satelite/engineer/files/code.js

console.log('{{displayName}}')
```

Or even something like
```
// ./engineer.config.js

...
"dest" : "src/[displayName]/index.js
...
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/satelite-digital/engineer/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

Erick Ruano - [@_erickruano](https://twitter.com/_erickruano_) - erick@satelite.digital



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/satelite-digital/engineer.svg?style=for-the-badge
[contributors-url]: https://github.com/satelite-digital/engineer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/satelite-digital/engineer.svg?style=for-the-badge
[forks-url]: https://github.com/satelite-digital/engineer/network/members
[stars-shield]: https://img.shields.io/github/stars/satelite-digital/engineer.svg?style=for-the-badge
[stars-url]: https://github.com/satelite-digital/engineer/stargazers
[issues-shield]: https://img.shields.io/github/issues/satelite-digital/engineer.svg?style=for-the-badge
[issues-url]: https://github.com/satelite-digital/engineer/issues
[license-shield]: https://img.shields.io/github/license/satelite-digital/engineer.svg?style=for-the-badge
[license-url]: https://github.com/satelite-digital/engineer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
