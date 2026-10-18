# Чужие ассеты в Backshots

Правило владельца (с этапа 1): CC0, CC-BY (с автором здесь и в титрах) и Adobe Mixamo. Исходники переупакованы
скриптом `tools/assets.mjs` (уменьшены текстуры, упрощены сетки, сжаты), форму никто не перерисовывал.
Исходные файлы Mixamo в открытый доступ не выкладываем (условия Adobe), в игре — только ужатые модели.

## Персонажи и движения (`src/assets/models/chars/*.glb`, `anims.glb`)
| Что | Откуда | Лицензия |
|---|---|---|
| `ch12`, `ch23`, `ch33` — офисные люди; 54 движения: стойка и прицел с автоматом, ходьба/бег/спринт/ходьба вприсядку в 8 сторон, повороты, прыжок, стрельба, перезарядка, реакции на попадание, 8 смертей, поза с пистолетом стоя и с колена (наборы «Rifle 8-Way Locomotion Pack», «Shooter Pack», «Pistol Handgun Locomotion Pack» и отдельные) | Adobe Mixamo — https://www.mixamo.com | Mixamo: бесплатно для игр, в т.ч. коммерческих; нельзя распространять сами исходные файлы как ассеты |

## Руки от первого лица (`src/assets/models/fp_rifle.glb`, `fp_pistol.glb`)
Готовит `python tools/fparms.py` (Blender, `pip install bpy`) + `node tools/assets.mjs fparms <папка>`. Текстуры 1024 webp,
своё оружие из моделей убрано (оставлено невидимым только для подгонки наших стволов).
| Что | Откуда | Лицензия |
|---|---|---|
| руки в перчатках с анимациями (стойка, перезарядки, доставание) — для автоматов, дробовика и снайперки | «M16 A2 Assault Rifle - Animated», user77 — https://sketchfab.com/3d-models/m16-a2-assault-rifle-animated-bd4ff595b593447f9a7f1d95f501fb6c | CC Attribution (CC BY 4.0) |
| руки в перчатках с анимациями пистолета (стойка, выстрел, две перезарядки) | «FPS pistol animations», Cransh — https://sketchfab.com/3d-models/fps-pistol-animations-0d7a343dcb6f401197a73c91aee93f6d | CC Attribution (CC BY 4.0) |

## Оружие (`src/assets/models/guns/*.glb`)
| Что | Откуда | Лицензия |
|---|---|---|
| `ak` (АК-47), `m4` (M4A1), `shotgun`, `sniper`, `pistol` (Макаров) | «Free CC0 Guns & Explosives Pack», 3dmodelscc0 — https://3dmodelscc0.itch.io/free-cc0-guns-explosives-pack | на странице: «all offered under a CC0 public domain license» (автор не назван) |

## Текстуры (`src/assets/tex/`, 1024 px; нормали переведены в OpenGL)
| Что | Откуда | Лицензия |
|---|---|---|
| `wallpaper_*`, `carpet_*`, `ceiling_tiles_*`, `painted_wall_2_*` | «Backrooms PBR texture pack», methodical pixel — https://opengameart.org/content/backrooms-pbr-texture-pack | «License(s): CC0» |

## Предметы (`src/assets/models/props.glb`, текстуры 512 px)
Poly Haven, на странице лицензии: «Our assets are all licensed as CC0» — https://polyhaven.com/license
| Модель | Страница |
|---|---|
| plastic_monobloc_chair_01, metal_trash_can, WetFloorSign_01, metal_office_desk, korean_fire_extinguisher_01, wall_clock, fire_alarm | https://polyhaven.com/a/<имя модели> |

## Лут (`src/assets/models/loot.glb`, текстуры 512 px, готовит `node tools/assets.mjs loot <папка>`)
Poly Haven, CC0 (https://polyhaven.com/license):
| Модель | Где в игре | Автор, страница |
|---|---|---|
| ammo_box | патроны | DanKit — https://polyhaven.com/a/ammo_box |
| medical_box | аптечка | Ulan Cabanilla — https://polyhaven.com/a/medical_box |
| medical_tape | бинт | Miroslav Turura — https://polyhaven.com/a/medical_tape |
| wooden_military_crate | бронежилет и шлем лежат в армейском ящике | Prabhjinder Singh — https://polyhaven.com/a/wooden_military_crate |

Реалистичных бронежилета и шлема под CC0 / CC-BY без входа на сайт не нашлось (Sketchfab и Smithsonian закрыты для
скачивания отсюда, на OpenGameArt и itch.io — только грубые модели), поэтому броня показана ящиком. Если владелец
найдёт подходящую модель — заменить узел в `lootview.js`.

## Звуки (`src/assets/sfx/*.mp3`)
| Что | Откуда | Лицензия |
|---|---|---|
| `hum` (гул ламп, петля) | «Fluorescent Light Hum», CHallSmith — https://freesound.org/s/870708/ | Creative Commons 0 |
| `vent` (вентиляция, петля) | «room tone office hallway heavy ventilation», kyles — https://freesound.org/s/637804/ | Creative Commons 0 |
| `flicker` (мигание с треском, петля) | «Flickering Fluorescent Light with Background Hum», kentspublicdomain — https://freesound.org/s/777053/ | Creative Commons 0 |
| `buzz` | «fluorescent light flickering 1», TemperMode — https://freesound.org/s/484157/ | Creative Commons 0 |
| `thud` (далёкий удар) | «Big Structure Collision Heard from Inside», Osvoldon — https://freesound.org/s/653294/ | Creative Commons 0 |
| `indoor_tail` (выстрелы в помещении) | «Shooting_inside», ikbenraar — https://freesound.org/s/592264/ | Creative Commons 0 |
| `step_1..4` (шаги по ковру) | Kenney «Impact Sounds» (footstep_carpet_000..003) — https://kenney.nl/assets/impact-sounds | «License: Creative Commons CC0» |
| выстрелы (автомат, дробовик, винтовка, пистолет), помпа, затвор, патроны в дробовик, перезарядка, гильзы, попадания, интерфейс, пролёт пули | взяты из Microgang — авторы и ссылки в `../microgang/CREDITS.md` (Free Firearm Sound Library и др.) | CC0 |
С Freesound без входа на сайт скачиваются только сжатые копии (mp3 128 кбит/с) — их и взяли.

## Код
| Что | Откуда | Лицензия |
|---|---|---|
| three.js | https://threejs.org | MIT |
| postprocessing, N8AO | https://github.com/pmndrs/postprocessing , https://github.com/N8python/n8ao | Zlib, ISC |
| Rapier (физика) | https://rapier.rs | Apache-2.0 |
| Шрифты Oswald и Nunito (`src/fonts`) | Google Fonts | SIL Open Font License 1.1 |
