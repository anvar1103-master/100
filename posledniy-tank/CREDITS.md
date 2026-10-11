# Чужие ассеты в игре (все CC0, можно использовать бесплатно и без указания авторства)

| Что | Откуда | Лицензия |
|---|---|---|
| Камни, кусты, деревья, папоротники, цветы, грибы, клевер, камешки (`src/assets/nature.glb`) | Quaternius, «Stylized Nature MegaKit» — https://quaternius.com/packs/stylizednaturemegakit.html | CC0 1.0 |
| Тяжёлый танк «Картечник» и лёгкий танк «Рикошет» (`src/assets/tanks/heavy_tank.glb`, `light_tank.glb`) | CptDrunkBear, «N64 Style Tank Models and Textures» — https://opengameart.org/content/n64-style-tank-models-and-textures | CC0 |
| Стартовый танк «Новобранец» (`src/assets/tanks/basic_tank.glb`; модель упрощена, текстуры камуфляжа нарисованы заново) | konserwa, «panzerkampfwagen III» — https://opengameart.org/content/panzerkampfwagen-iii | CC0 |
| Ракетный танк «Мортира» (`src/assets/tanks/artillery_tank.glb`) | mutantleg, «Missile Launcher Tank» — https://opengameart.org/content/missile-launcher-tank | CC0 |
| Танк-снайпер «Дальнобой» (`src/assets/tanks/sniper_tank.glb`) | Adalbertus Michael Georgios Bydgostiensis, «Cool low poly tonk» — https://opengameart.org/content/cool-low-poly-tonk | CC0 |
| Скорострельный танк «Стрекот» (`src/assets/tanks/rapid_tank.glb`) | mutantleg, «Mini Tank» — https://opengameart.org/content/mini-tank | CC0 |
| Звуки (`src/assets/sfx/*.mp3`) | Kenney: Impact Sounds, Interface Sounds, Sci-Fi Sounds, Digital Audio, RPG Audio, Music Jingles, Voiceover Pack Fighter — https://kenney.nl/assets | CC0 1.0 |
| Шрифты Rubik и Nunito (`src/fonts`) | Google Fonts | SIL Open Font License 1.1 |
| Движок three.js | https://threejs.org | MIT |

Модели танков разобраны на корпус, башню и ствол и перекрашены в цвета ролей прямо в игре (`src/js/tankmodels.js`);
если они не загрузятся, игра соберёт запасные игрушечные танки из фигур (`src/js/tanks.js`). Все анимации процедурные, арена описана текстом в `src/js/maps.js`, музыка генерируется на лету.
Часть кода (небо, перевод, автонастройка графики, модуль Яндекс Игр, генератор музыки) взята из «Лесной войны»
(репозиторий `anvar1103-master/100`).
