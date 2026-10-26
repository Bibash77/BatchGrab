# Chrome Web Store submission draft — 0.4.0, free

Status: ready for owner review/upload; not submitted, approved or publicly listed.

Name: Batch Grab (matches the localized manifest)

Short description: Preview and download webpage images and documents. Review filenames, organize folders, and check actual download results.

Category suggestion: Workflow & Planning / Productivity, subject to the live dashboard categories.

## English description

Collect the useful files from the webpage you have open.

Batch Grab is a free Chrome extension for two everyday tasks: selecting webpage images and collecting organized web documents. No account or subscription.

1. Open a normal webpage and click Batch Grab.
2. Preview images or switch to Documents. Select the files you need.
3. Review filenames in Details & name, then Download Selected.
4. Check completed, pending and failed outcomes and actual saved paths.

Image previews include known source dimensions and filenames. Suggested separates likely content from logos, icons and decorative assets; Review and All files keep uncertain resources accessible. Image name proposals show their page evidence and require your acceptance.

Document names use visible link text and relevant nearby labels. Advanced options retain folders, templates, file types, width/regex filters, optional extended image discovery and local source/outcome CSV export.

English and Japanese interface. Processing stays in your Chrome profile. Image previews and downloads contact their source websites. No Batch Grab account, naming service, ads or extension telemetry.

Limits: accessible HTTP(S) resources on the current page only. No paywall/login bypass, crawling, automatic scrolling, conversion or streaming-video capture. Page-based classification and naming can be wrong. Completed means Chrome saved the response; check important file contents. Keep Chrome running after jobs are accepted. Browser shutdown/OS sleep recovery is not certified. 500 files per batch, 1,000 pending jobs, 10,000 scan results.

## Japanese listing

名称: Batch Grab（マニフェストと同じ）

概要: ウェブページの画像・文書を選択して保存。ファイル名やフォルダーを確認し、実際のダウンロード結果を表示します。

本文:

今開いているページから、必要な画像や文書を選んで保存できます。無料・アカウント不要です。

ページでBatch Grabを開き、プレビューや「文書」でファイルを選びます。「詳細・名前」で候補を確認し、保存します。実際の保存先、完了、処理中、失敗を結果で確認できます。

画像のサイズと取得元を表示し、コンテンツ候補をロゴや装飾画像と分類します。不確かな画像は「要確認」や「すべて」で確認できます。画像名の候補は確認してから適用します。文書名はリンクや近くのラベルを利用します。詳細設定にはフォルダー、テンプレート、フィルター、CSV出力があります。

英語・日本語のUIに対応しています。処理は端末内で行い、Batch Grabへの利用状況送信はありません。プレビューや保存は元のサイトへ通信します。

通常のHTTP(S)ページが対象です。アクセス制限の回避、自動巡回、自動スクロール、変換、ストリーミング動画の取得は行いません。分類や名前は確認してください。「完了」は内容の正しさを保証しません。保存中はChromeを起動したままにしてください。ブラウザー終了やOS休止からの復旧は未認証です。

## Single purpose and privacy tab

Single purpose: select accessible files from the current webpage, review their names/folders, save them and inspect actual download results.

Permission justifications are in ../docs/SECURITY_AND_PRIVACY.md. Declare that the extension handles webpage URLs/context and download metadata locally; do not equate “not transmitted to the developer” with “no data handled.” Inspect current dashboard categories and answer consistently with the privacy policy. No sale, unrelated third-party transfer, advertising, credit, profiling or analytics use. No remote code.

Privacy URL: pending approved real website origin + /privacy.html. Support URL: pending origin + /faq.html. Contact: ronaldoibibash310@gmail.com. Brand is Batch Grab; owner must confirm publisher identity and account declarations.

## Submission files

Upload `../dist/batch-grab-0.4.0-production.zip` (relative to marketing). Root manifest, runtime JS/CSS/HTML, en/ja messages and four PNG icons only. `store-submission/batch-grab` is an identical unpacked copy. Build hashes document consistency.

Store screenshots: `store-assets/01-collect-images.jpg`, `02-organize-documents.jpg`, `03-check-outcomes.jpg`, `04-japanese.jpg`, each 1280×800. They frame actual extension captures on fictional fixtures; captions disclose this. Optional tile: `small-promo-440x280.jpg`. Icon: `icon-128.png`, transparent padding with 96×96 brand content. No testimonials, usage counts, guaranteed savings or protected-site claims.

## Owner steps

Sign into the [developer dashboard](https://chrome.google.com/webstore/devconsole), complete publisher registration/verification and any displayed fee only with owner approval. Upload ZIP, select distribution, fill English/Japanese listing and privacy fields, add actual policy/support URLs and screenshots, test the uploaded version, then explicitly approve submission/review/publication. Copy the real public listing URL only after verifying its title, publisher and version. Do not generate a fake URL or use an unpacked ID.

References: [publishing](https://developer.chrome.com/docs/webstore/publish), [images](https://developer.chrome.com/docs/webstore/images), [privacy FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq). Requirements may change; check the dashboard at submission time.
