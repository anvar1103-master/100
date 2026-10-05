# Wraps each game page into a standalone HTML document under docs/ for GitHub Pages.
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
GAMES = {
    'vyshibala': ('docs/index.html', 'Вышибала', 'Бильярд-сумо на краю пустоты.'),
    'shar-baba': ('docs/shar-baba/index.html', 'Шар-баба', 'Башенный кран, шар для сноса и парящий остров.'),
    'gribnoy-dozor': ('docs/gribnoy-dozor/index.html', 'Грибной дозор', 'Грибы-бойцы защищают лес от вредителей.'),
    'lesnaya-voyna': ('docs/lesnaya-voyna/index.html', 'Лесная война', 'Командный шутер: грибы и папоротники против слизней и жуков.'),
}
for folder, (out, title, desc) in GAMES.items():
    src = (root / folder / 'index.html').read_text(encoding='utf-8')
    head = ('<!doctype html><html lang="ru"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            f'<meta name="description" content="{desc}"><meta property="og:title" content="{title}">'
            f'<meta property="og:description" content="{desc}"></head><body>')
    dest = root / out
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(head + src + '</body></html>\n', encoding='utf-8')
    print('wrote', out)
