# Kanji Kana Tester

## Creating a Release Build - This allows you to fully install without debugging. Debugging mode requires phone to be connected via USB

### Create Certificate

Follow all the instructions [here](https://facebook.github.io/react-native/docs/signed-apk-android.html).

Notes:

- I had to run the following: `npm install xcode --save-dev`
- For some devices, if you installed already, you need to go to your device Settings --> Applications. Select app, click More, and Uninstall for All Users.
- For any new dependencies (non-dev), be sure to run `react-native link [package-name]`
- Build cool Android icons here. They go in android/app/src/main/res https://romannurik.github.io/AndroidAssetStudio/index.html
- Add .vscode/.react/ to .gitignore
- For Visual Studio Code, use the React Native Tools extension.
- Tweaked android/app/build.gradle with sdk version.
- Added signed key based on cert instructions above. Required tweak to android/app/build.gradle.
- Change app name in android/app/src/main/res/values/strings.xml
- Changed name in package.json to be more package.json friendly with dashes. IMPORTANT! Leave the folder structure as is.
- index.android.js and index.ios.js point to src/Index.js. Same code base for both platforms.
- Added native-base and redux, but also a number of dev dependencies for better linting in VS Code.

## Japanese Font References

- [WikiPedia](https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji#cite_note-2)
- [Japan - Agency for Cultural Affairs](http://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/pdf/joyokanjihyo_20101130.pdf)

```javascript
function tableToJson(table) {
    var data = [];
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerText.toLowerCase().replace(/ /gi,'');
    }
    for (var i=1; i<table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = {};
        for (var j=0; j<tableRow.cells.length; j++) {
            rowData[ headers[j] ] = tableRow.cells[j].innerText;
        }
        data.push(rowData);
    }
    return data;
}
copy(tableToJson(document.querySelector('.wikitable')))
```

Font Families:

font-family:'ヒラギノ角ゴ ProN W3','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','メイリオ',Meiryo,'新ゴ Pr6N R','A-OTF 新ゴ Pr6N R','小塚ゴシック Pr6N M','IPAexゴシック','Takaoゴシック','XANO明朝U32','XANO明朝','和田研中丸ゴシック2004絵文字','和田研中丸ゴシック2004ARIB','和田研中丸ゴシック2004P4','和田研細丸ゴシック2004絵文字','和田研細丸ゴシック2004ARIB','和田研細丸ゴシック2004P4','和田研細丸ゴシックProN','IPA Pゴシック','MS Pゴシック';