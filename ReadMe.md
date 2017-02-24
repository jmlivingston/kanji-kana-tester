# Kanji Quiz

## Creating a Release Build - This allows you to fully install without debugging. Debugging mode requires phone to be connected via USB

### Create Certificate

Follow all the instructions here:
https://facebook.github.io/react-native/docs/signed-apk-android.html

Notes:

 1. I had to run the following:
    `npm install xcode --save-dev`
 2. If you installed already, you need to go to your device Settings --> Applications. Select app, click More, and Uninstall for All Users.


## WikiPedia - Japanese Font References

https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji#cite_note-2

http://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/pdf/joyokanjihyo_20101130.pdf

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

font-family:'ヒラギノ角ゴ ProN W3','ヒラギノ角ゴ ProN','Hiragino Kaku Gothic ProN','メイリオ',Meiryo,'新ゴ Pr6N R','A-OTF 新ゴ Pr6N R','小塚ゴシック Pr6N M','IPAexゴシック','Takaoゴシック','XANO明朝U32','XANO明朝','和田研中丸ゴシック2004絵文字','和田研中丸ゴシック2004ARIB','和田研中丸ゴシック2004P4','和田研細丸ゴシック2004絵文字','和田研細丸ゴシック2004ARIB','和田研細丸ゴシック2004P4','和田研細丸ゴシックProN','IPA Pゴシック','MS Pゴシック';