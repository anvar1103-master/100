# Wraps the game page into a standalone HTML document for GitHub Pages (docs/index.html).
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'vyshibala' / 'index.html').read_text(encoding='utf-8')
head = ('<!doctype html><html lang="ru"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<meta name="description" content="Бильярд-сумо на краю пустоты. Сталкивай шары с платформы: рикошеты, взрывы и враги, сбитые чужими руками.">'
        '<meta property="og:title" content="Вышибала"><meta property="og:description" content="Бильярд на краю пустоты. Шары дерутся в ответ.">'
        '</head><body>')
(root / 'docs' / 'index.html').write_text(head + src + '</body></html>\n', encoding='utf-8')
print('docs/index.html written')
