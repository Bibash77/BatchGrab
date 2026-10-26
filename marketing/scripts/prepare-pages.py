# -*- coding: utf-8 -*-
from pathlib import Path
import json, html
m = Path(__file__).resolve().parents[1]
src = m / 'src'
esc = html.escape
locales = {code: json.loads((m / 'locales' / f'{code}.json').read_text()) for code in ['en', 'ja']}
version = '0.4.0'

def link(name, lang):
    return name + ('-ja' if lang == 'ja' else '') + '.html'

def page(file, title, body, lang='en', description=None):
    d = locales[lang]
    navs = ['onboarding', 'images', 'documents', 'faq']
    nav = ''.join((f'<a href="{link(f, lang)}">{esc(t)}</a>' for (f, t) in zip(navs, d['nav'])))
    nav += f'''<a href="{link('index', d['copy_ja'])}" lang="{d['copy_ja']}">{d['nav'][-1]}</a>'''
    description = description or (d['lead'] if file.startswith('index') else title + ' — ' + d['copy_free_image_and_document_collection_with_batch_grab'])
    content = f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{esc(title)} | Batch Grab</title><meta name="description" content="{esc(description)}"><meta property="og:title" content="{esc(title)} | Batch Grab"><meta property="og:description" content="{esc(description)}"><meta property="og:type" content="website"><link rel="icon" href="assets/brand.svg" type="image/svg+xml"><link rel="stylesheet" href="site.css"><script src="launch-config.js" defer></script><script src="site.js" defer></script></head><body><a class="skip" href="#main">{d['copy_skip_to_content']}</a><header><div class="wrap"><a class="brand" href="{link('index', lang)}"><span>BG</span>Batch Grab</a><nav aria-label="{d['copy_main_navigation']}">{nav}</nav></div></header><div id="previewNotice" class="notice">{d['notice']}</div><main id="main">{body}</main><footer><div class="wrap"><div><a href="{link('privacy', lang)}">{d['privacyTitle']}</a> · <a href="guides.html">Guides</a> · <a href="https://github.com/Bibash77/BatchGrab">GitHub</a></div><p id="publisherContact">Batch Grab · <a href="mailto:ronaldoibibash310@gmail.com">ronaldoibibash310@gmail.com</a></p><p class="small">{d['copy_no_account_no_payments_no_extension_telemetry']}</p></div></footer></body></html>'''
    (src / file).write_text(content, encoding='utf8')

def cta(lang):
    return f'''<div class="actions"><a class="button install-cta" data-metric="install_intent" href="{link('beta', lang)}">{locales[lang]['cta']}</a><a class="button secondary" href="{link('onboarding', lang)}" data-metric="guide_open">{locales[lang]['demo']}</a></div>'''
for (lang, d) in locales.items():
    steps = ''.join((f"""<article><span class="step-number">0{i + 1}</span><h3>{d['steps'][i]}</h3><p>{d['stepCopy'][i]}</p></article>""" for i in range(3)))
    home = f'''<div class="wrap"><section class="hero"><div><p class="eyebrow">{d['eyebrow']}</p><h1>{d['home']}</h1><p class="lead">{d['lead']}</p>{cta(lang)}<p class="small store-status">{d['access']}</p></div><figure><div class="screen"><img src="assets/images-picker.png" width="760" height="600" alt="Batch Grab image previews, selection and download button"></div><figcaption>{d['caption']}</figcaption></figure></section><div class="strip"><span>Images / 画像</span><span>Documents / 文書</span><span>English / 日本語</span><span>Free / 無料</span></div><section class="section"><h2>{d['onboard']}</h2><div class="steps">{steps}</div></section><section class="section split"><figure><div class="screen"><img loading="lazy" src="assets/document-picker.png" width="760" height="600" alt="Document names and selection in Batch Grab"></div><figcaption>{d['caption']}</figcaption></figure><div><h2>{d['copy_names_you_can_review_br_results_you_can_check']}</h2><p>{d['copy_use_labels_from_the_page_to_review_document_names_and_o']}</p><p>{d['limits']}</p><a href="{link('faq', lang)}">{d['faqTitle']}</a></div></section>{cta(lang)}</div>'''
    page(link('index', lang), d['copy_free_image_and_document_downloader'], home, lang)
    installsteps = d['copy_unzip_the_beta_into_a_folder_you_can_keep_open_chrome_e']
    beta = f"""<div class="wrap"><div class="pagehead"><p class="eyebrow">{d['eyebrow']}</p><h1>{d['install']}</h1><p class="lead store-status">{d['access']}</p><div class="actions"><a class="button" data-metric="beta_download" href="downloads/batch-grab-0.4.0-beta.zip" download>{d['download']}</a></div></div><article class="prose"><ol>""" + ''.join((f'<li>{esc(x)}</li>' for x in installsteps)) + f'''</ol><p>{d['copy_wait_for_existing_jobs_before_updating_reload_the_same_']}</p><p><a href="{link('onboarding', lang)}" data-metric="guide_open">{d['onboard']} →</a></p><p><a href="fixture/index.html">30-PDF controlled example / 文書のテストページ</a></p><p><a href="mailto:ronaldoibibash310@gmail.com">{d['support']}</a> — {d['copy_please_share_only_a_short_task_description_or_redacted_']}</p></article></div>'''
    page(link('beta', lang), d['install'], beta, lang)
    onboard = f"""<div class="wrap"><div class="pagehead"><h1>{d['onboard']}</h1><p class="lead">{d['lead']}</p></div><div class="steps">{steps}</div><section class="section prose"><h2>{d['copy_check_actual_results']}</h2><p>{d['copy_wait_for_the_jobs_saved_confirmation_before_closing_the']}</p><figure><div class="screen"><img src="assets/document-outcomes.png" width="760" height="600" alt="Actual saved paths and completed downloads"></div><figcaption>{d['caption']}</figcaption></figure><h2>{d['copy_if_no_files_appear']}</h2><p>{d['copy_try_images_review_or_all_files_clear_search_and_optiona']}</p><p>{d['limits']}</p></section>{cta(lang)}</div>"""
    page(link('onboarding', lang), d['onboard'], onboard, lang)
    faqs = d['copy_is_it_free_yes_this_release_has_no_account_checkout_sub']
    page(link('faq', lang), d['faqTitle'], '<div class="wrap"><div class="pagehead"><h1>' + d['faqTitle'] + '</h1></div><article class="prose">' + ''.join((f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for (q, a) in faqs)) + '</article></div>', lang)
    privacy = d['copy_h2_extension_processing_h2_p_when_you_invoke_batch_grab']
    page(link('privacy', lang), d['privacyTitle'], f"""<div class="wrap"><div class="pagehead"><p class="eyebrow">0.4.0 · 2026-10-26 · {d['copy_owner_review_before_publication']}</p><h1>{d['privacyTitle']}</h1></div><article class="prose">{privacy}<p><a href="mailto:ronaldoibibash310@gmail.com">ronaldoibibash310@gmail.com</a></p></article></div>""", lang)
    for task in ['images', 'documents']:
        isimage = task == 'images'
        title = ('Collect images from webpages' if isimage else 'Collect and organize web documents') if lang == 'en' else 'ページの画像をまとめて保存' if isimage else 'ウェブ文書を集めて整理'
        copy = ('Preview images with dimensions, filenames and source hosts. Suggested separates likely content from site assets. Review uncertain candidates and inspect alternative resolutions before saving.' if isimage else 'Select exposed PDFs, spreadsheets or other document links. Review names from link text or nearby labels. Edit section folders in Options and check failures after the batch.') if lang == 'en' else 'サイズ・ファイル名・取得元をプレビューで確認できます。「おすすめ」はコンテンツ候補をサイト素材と分けます。不確かな画像や別解像度は確認してから保存してください。' if isimage else 'PDFや表計算などの文書リンクを選択し、ページのラベルによる名前の候補を確認します。フォルダーは設定で編集でき、保存後に失敗を確認できます。'
        page(link(task, lang), title, f'''<div class="wrap"><div class="pagehead"><p class="eyebrow">{d['eyebrow']}</p><h1>{title}</h1><p class="lead">{copy}</p>{cta(lang)}</div><figure><div class="screen"><img src="assets/{('images-picker.png' if isimage else 'document-picker.png')}" width="760" height="600" alt="Actual Batch Grab {task} workflow"></div><figcaption>{d['caption']}</figcaption></figure><section class="section prose"><h2>{d['faqTitle']}</h2><p>{d['limits']}</p><a href="{link('faq', lang)}">FAQ →</a></section></div>''', lang)
posts = json.loads((src / 'posts.json').read_text())
cards = ''
for (slug, title, sub, body) in posts:
    body = body.replace('Batch Grab’s beta', 'Batch Grab').replace('Batch Grab’s', 'Batch Grab’s')
    page('guide-' + slug + '.html', title, '<div class="wrap"><div class="pagehead"><p class="eyebrow">Practical workflow guide</p><h1>' + esc(title) + '</h1><p class="lead">' + esc(sub) + '</p></div><article class="prose">' + body + '</article>' + cta('en') + '</div>')
    cards += f'<a class="guide" href="guide-{slug}.html"><h2>{esc(title)}</h2><p>{esc(sub)}</p></a>'
page('guides.html', 'Useful download guides', '<div class="wrap"><div class="pagehead"><h1>Make the folder useful.</h1><p class="lead">Practical ways to select, name and check web downloads.</p></div><div class="guide-grid">' + cards + '</div></div>')
page('demo.html', 'See the download workflow', '<div class="wrap"><div class="pagehead"><h1>Preview. Select. Download. Check.</h1><p class="lead">Actual screenshots from controlled fixtures, not customer results or a video.</p></div>' + ''.join((f'<section class="section"><h2>{title}</h2><div class="screen"><img src="assets/{img}" width="760" height="600" alt="{title}"></div></section>' for (title, img) in [('Select useful images', 'images-picker.png'), ('Review document names', 'document-picker.png'), ('Check actual download outcomes', 'document-outcomes.png')])) + cta('en') + '</div>')
page('pricing.html', 'Batch Grab is free', '<div class="wrap"><div class="pagehead"><h1>Free to use.</h1><p class="lead">This release has no paid license, checkout or subscription. The previous $5 experiment is not the current offer.</p></div>' + cta('en') + '</div>')
