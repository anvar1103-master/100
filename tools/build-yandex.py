#!/usr/bin/env python3
"""Собирает архив для Яндекс Игр: dist/metrostroy-yandex.zip

В архиве index.html лежит в корне, шрифты хранятся локально (внешние запросы
на платформе запрещены), подключён /sdk.js, отладочный хук удалён.
"""
import re, zipfile, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'index.html').read_text(encoding='utf-8')

# 1. шрифты Google -> локальные
src, n = re.subn(r'<link rel="preconnect"[^>]*>\s*', '', src)
src, n2 = re.subn(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>',
                  '<link rel="stylesheet" href="fonts.css">', src)
assert n2 == 1, 'не нашёл ссылку на шрифты'

# 2. SDK Яндекс Игр должен подключаться из корня до кода игры
src, n3 = re.subn(r'<script>\n\(\(\) => \{', '<script src="/sdk.js"></script>\n<script>\n(() => {', src, count=1)
assert n3 == 1, 'не нашёл основной скрипт'

# 3. отладочный хук для тестов
src, n4 = re.subn(r'window\.__metro = \{[^\n]*\};\n', '', src)
assert n4 == 1, 'не нашёл __metro'

assert 'googleapis' not in src and 'gstatic' not in src and 'http://' not in src

out = root / 'dist'; out.mkdir(exist_ok=True)
z = out / 'metrostroy-yandex.zip'
with zipfile.ZipFile(z, 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.writestr('index.html', src)
    zf.write(root / 'yandex-assets' / 'fonts.css', 'fonts.css')
    for f in sorted((root / 'yandex-assets' / 'fonts').iterdir()):
        zf.write(f, 'fonts/' + f.name)
print(z, z.stat().st_size // 1024, 'KB')
