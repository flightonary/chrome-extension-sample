# chrome-extension-sample

## description

ボタンがクリックされるたびに、設定したURLにポストする処理を追加するChrome Extensionのサンプル。
Chromeのタブの外でフックする方法とタブ内にjavascriptをinjectionする方法の２つを試してみる。

## テスト

1. chrome://extensions をChromeで開いてデベロッパーモードを有効にする。
1. ./extension から拡張機能を読み込む
1. テスト用ページをロードする

```
$ python3 ./testpage/httpserver.py &
$ open http://localhost:8080
```

