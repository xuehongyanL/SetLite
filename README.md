# SetLite
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

------

A lightweight electron app for data processing & visualization

(And now it's a calculator for linear fitting (~,~ ) )

------

[MAYBE A LOGO HERE]

------
## Features

HTML & JS based and (Cross-platform support in the future)
Lightweight

## Get Started

### By Compiling

```shell
npm install
npm run webpack_production
npm run start
```

You may use [electron-packager](https://github.com/electron-userland/electron-packager), [electron-builder](https://github.com/electron-userland/electron-builder) and so-on to pack the source.

But mention that *I have not take these platforms into consideration* :)

### Release Version (For Windows Only)

I have used [miniblink](https://github.com/weolar/miniblink49) as alternative for electron built-in browser kernel, which greatly compressed the release package.

You can just **click** the *SetLite.exe* to run SetLite.

Or you can put copy the whole source code folder into ./resources/ and rename the folder as "app".

## Usage

**1)** Press the "ADD POINT" button. Type the x(or y) value of a point into the X(or Y) box. Then press "Add Point" to add this record.

**2)** Added records are shown on the table below. You can edit the cells below freely and press "UPDATE" to save changes. But mention that if the new value is unvalid, the record will **disappear** after update.

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

### and more

## Contribution
Use [Github issues](https://github.com/xuehongyanL/SetLite/issues) for requests.
If you would like to make pull requests, you may [contact me](mail://shortmund09@gmail.com) at first.

## Acknowledgement

electron/[electron](https://github.com/electron/electron)

weolar/[miniblink49](https://github.com/weolar/miniblink49)

facebook/[react](https://github.com/facebook/react)

react-bootstrap/[react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

FormidableLabs/[victory](https://github.com/FormidableLabs/victory)

handsontable/[react-handsontable](https://github.com/handsontable/react-handsontable)

talyssonoc/[react-katex](https://github.com/talyssonoc/react-katex)

## License

SetLite uses [MIT](https://mit-license.org/) license.