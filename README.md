# SetLite
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

------

A lightweight electron app for data processing & visualization

------

[A LOGO HERE]

------
## Features

HTML & JS based and (Cross-platform support in the future)
Lightweight

## Get Started

### macOS or Linux

You may use [*electron-packager*](https://github.com/electron-userland/electron-packager), [*electron-builder*](https://github.com/electron-userland/electron-builder) and so-on to pack the source.

But mention that *I have not take these platforms into consideration* :)

### Windows

I have used [miniblink](https://github.com/weolar/miniblink49) as alternative for electron built-in browser kernel, which greatly compressed the release package.

You can just **click** the *SetLite.exe* to run SetLite.

Or you can put copy the whole source code folder into ./resources/ and rename it as "app".

## Usage

**1)** Type the x(or y) value of a point into the X(or Y) box

**2)** Press the "ADD POINT" button.

**3)** When there is enough points to fit, press the "线性拟合"(LInearFit) button or "正比例拟合"(DirectProportionFit) button. 

If the data is valid, a plot of the fit function with the scatter of points will be shown.  

## Todo

### More functions

more statistics of data

### More data resources

csv,Excel,SQL,NoSQL,... 

### Modularization

A plugin manager is under development.

### Remote computing

### LintingLintingLinting!!!

### and more

## Contribution
Use [Github issues](https://github.com/xuehongyanL/SetLite/issues) for requests.
If you would like to make pull requests, you may [contact me](mail://shortmund09@gmail.com) at first.

## Acknowledgement

electron/[electron](https://github.com/electron/electron)

weolar/[miniblink49](https://github.com/weolar/miniblink49)

facebook/[react](https://github.com/facebook/react)

react-bootstrap/[react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

plotly/[plotly.js](https://github.com/plotly/plotly.js)

## License

SetLite uses [MIT](https://mit-license.org/) license.