# Yandex Games build: the offline package plus the Yandex SDK, index.html at the archive root, nothing extra
import os, shutil, zipfile
here = os.path.dirname(os.path.abspath(__file__))  # expects the offline package in out/lesnaya-voyna next to this script
src = here + '/out/lesnaya-voyna'; dst = here + '/out/yandex'
shutil.rmtree(dst, ignore_errors=True)
shutil.copytree(src, dst, ignore=shutil.ignore_patterns('start.bat', 'start.sh', 'tools', 'README.md', 'peerjs.min.js'))
p = dst + '/index.html'; s = open(p, encoding='utf-8').read()
a = '<script type="importmap">'
assert s.count(a) == 1
s = s.replace(a, '<script src="/sdk.js"></script>\n' + a)
assert 'jsdelivr' not in s and 'googleapis' not in s and 'claude.ai/' not in s.replace('в claude.ai.', '')
open(p, 'w', encoding='utf-8').write(s)
out = '/home/user/100/packages/lesnaya-voyna-yandex.zip'
z = zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED)
for r, d, fs in os.walk(dst):
    for f in sorted(fs):
        full = os.path.join(r, f); z.write(full, os.path.relpath(full, dst))
z.close(); print('yandex zip', os.path.getsize(out) // 1024, 'KB')
