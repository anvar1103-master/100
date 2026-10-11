# Чужие ассеты в игре (все CC0, можно использовать бесплатно и без указания авторства)

| Что | Откуда | Лицензия |
|---|---|---|
| Камни, кусты, деревья, папоротники, цветы, грибы, клевер, камешки (`src/assets/nature.glb`) | Quaternius, «Stylized Nature MegaKit» — https://quaternius.com/packs/stylizednaturemegakit.html | CC0 1.0 |
| Стартовый танк «Новобранец» — Т-34/85 (`src/assets/tanks/starter.glb`) | Lotnik, «t-34/85» — https://opengameart.org/content/t-3485 | CC0 |
| Танки классов: M60A2 (Картечник), M730 Chaparral (Мортира), AMX-10P Pak90 (Дальнобой), M41 (Рикошет), Type 80 (Стрекот) (`src/assets/tanks/heavy, artillery, sniper, light, rapid.glb`) | Captain_Ahab_62, «misc modern tanks» — https://opengameart.org/content/misc-modern-tanks | CC0 |
| Звуки (`src/assets/sfx/*.mp3`) | Kenney: Impact Sounds, Interface Sounds, Sci-Fi Sounds, Digital Audio, RPG Audio, Music Jingles, Voiceover Pack Fighter — https://kenney.nl/assets | CC0 1.0 |
| Шрифты Rubik и Nunito (`src/fonts`) | Google Fonts | SIL Open Font License 1.1 |
| Движок three.js | https://threejs.org | MIT |

Модели танков собраны из исходников (Blender) в корпус, гусеницы, башню и ствол; текстура гусениц нарисована заново; в игре их разбирает `src/js/tankmodels.js`;
если они не загрузятся, игра соберёт запасные игрушечные танки из фигур (`src/js/tanks.js`). Все анимации процедурные, арена описана текстом в `src/js/maps.js`, музыка генерируется на лету.
Часть кода (небо, перевод, автонастройка графики, модуль Яндекс Игр, генератор музыки) взята из «Лесной войны»
(репозиторий `anvar1103-master/100`).
