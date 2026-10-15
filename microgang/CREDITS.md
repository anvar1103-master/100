# Чужие ассеты в игре (все CC0, можно использовать бесплатно и без указания авторства)

Всё ниже взято только с лицензией CC0 (общественное достояние). Фраза в колонке «Лицензия» — дословно с
страницы источника (на OpenGameArt: поле `License(s): CC0`, у Kenney: `License: Creative Commons CC0`,
у Poly Haven: `CC0 1.0 Universal - public domain`).
Файлы звуков обработаны: обрезана тишина в начале, моно, 44,1 кГц, mp3, пик около −1 дБ, затухание на конце.

## Звуки (`src/assets/sfx/*.mp3`)

### Оружие: выстрелы (настоящие записи)
| Что | Откуда | Лицензия |
|---|---|---|
| `rifle_1`, `rifle_2` (AR-15), `rifle_3` (АК-47), `rifle_far`; `shotgun` (Benelli Nova), `shotgun_2`, `shotgun_far` (Winchester Model 12); `sniper` (Tikka T3 .30-06), `sniper_2`, `sniper_far` (Springfield 1917 .30-06); `revolver`, `revolver_2`, `revolver_far` (S&W 642 .38); `pistol` (Colt 1911), `pistol_2` (Walther PPQ). Взяты выстрелы «near» (вплотную) и «mid» (`*_far`, средняя дистанция) из «Prepared SFX Library». Запись: Ben Jaszczak, Brian Nelson, Kevin Heras, Matthew Nanney («The Free Firearm Sound Library», на OpenGameArt выложил bart) | https://opengameart.org/content/the-free-firearm-sound-library (сайт проекта: http://freefirearmsfx.com) | «License(s): CC0»; на странице: «Our team holds CC0 NO RIGHTS RESERVED for this library. It may be used without royalty or credit» |

### Оружие: механика (настоящие записи, кое-что склеено)
| Что | Откуда | Лицензия |
|---|---|---|
| `mag_out`, `mag_in`, `charge` (магазин вынут / вставлен / затвор), нарезаны из одной записи пистолета; часть `bolt` | «Handgun Reload Sound Effect», zer0_sol — https://opengameart.org/content/handgun-reload-sound-effect | «License(s): CC0» |
| `mag_out_2`, `mag_in_2`, `charge_2` (страйкбольный автомат), `cyl_click` (трещотка барабана) | «Gun reload sounds», SpringySpringo — https://opengameart.org/content/gun-reload-sounds | «License(s): CC0» |
| `pump` (перезарядка помпой), `shell_in`, `shell_in_2` (патрон в магазин дробовика) | «Shotgun Reload Sound effects», zer0_sol — https://opengameart.org/content/shotgun-reload-sound-effects | «License(s): CC0» |
| `dry` (осечка / сухой щелчок) | «Equipment Click», LFA — https://opengameart.org/content/equipment-click | «License(s): CC0» |
| `dry_2`, `cyl_open`, `bolt` (щелчок поднятия рукоятки): `metalLatch`, `metalClick` | Kenney «RPG Audio» — https://kenney.nl/assets/rpg-audio | «License: Creative Commons CC0» |
| `cyl_close` (из `mechanical1`), `bolt` (удар затвора вниз из `clank1`) | «Mechanical Sounds», BMacZero — https://opengameart.org/content/mechanical-sounds | «License(s): CC0» |

`bolt.mp3` (затвор винтовки) и `cyl_open` / `cyl_close` — собраны из настоящих записей щелчков и лязга (отдельной записи
затвора и барабана с лицензией CC0 не нашлось). `shell_1..4` (гильзы) — тоже собраны: маленький металлический «звяк» плюс затухающие отскоки.

### Попадания, шаги, вода
| Что | Откуда | Лицензия |
|---|---|---|
| `shell_1`, `shell_2`, `shell_4` (звон гильз), `imp_wood_2`, `imp_stone_2` | «75 CC0 breaking / falling / hit sfx», rubberduck — https://opengameart.org/content/75-cc0-breaking-falling-hit-sfx | «License(s): CC0» |
| `shell_3` (из `clink2`), часть `head` (`bing1`), часть `kill` (`thud3`) | «Metal Impact Sounds», BMacZero — https://opengameart.org/content/metal-impact-sounds | «License(s): CC0» |
| `imp_wood`, `imp_stone`, `imp_flesh_3` | «Impact», Iwan «qubodup» Gabovitch — https://opengameart.org/content/impact | «License(s): CC0» |
| `imp_flesh_2` | «8 wet squish, slurp impacts» (независимый банк звуков independent.nu), выложил qubodup — https://opengameart.org/content/8-wet-squish-slurp-impacts | «License(s): CC0» |
| `imp_flesh_1` | «37 hits/punches» (independent.nu), выложил qubodup — https://opengameart.org/content/37-hitspunches | «License(s): CC0» |
| `imp_dirt_1` | «Shovel Sound», themightyglider — https://opengameart.org/content/shovel-sound | «License(s): CC0» |
| `imp_dirt_2` | «25 CC0 mud sfx», rubberduck — https://opengameart.org/content/25-cc0-mud-sfx | «License(s): CC0» |
| `step_dirt_1..4`, `imp_dirt_3`, `land`, `jump` (шаги по земле / песку; `land` и `jump` — те же шаги, замедленные и сложенные с травой) | «Fantozzi's Footsteps (Grass/Sand & Stone)» (запись Fantozzi, выложил qubodup) — https://opengameart.org/content/fantozzis-footsteps-grasssand-stone | «License(s): CC0» |
| `step_grass_1..4`, часть `land` | Kenney «Impact Sounds» (`footstep_grass_000..003`) — https://kenney.nl/assets/impact-sounds | «License: Creative Commons CC0» |
| `splash`, `splash_2` | «40 CC0 water / splash / slime SFX», rubberduck — https://opengameart.org/content/40-cc0-water-splash-slime-sfx | «License(s): CC0» |
| `splash_3` | «6 Short water splashes», выложил qubodup — https://opengameart.org/content/6-short-water-splashes | «License(s): CC0» |
| `whiz_1..3` (пуля пролетает рядом): быстрые взмахи палкой, ускоренные и с падающим тоном, плюс короткий щелчок | «Swish - bamboo stick weapon swhoshes», qubodup — https://opengameart.org/content/swish-bamboo-stick-weapon-swhoshes ; щелчок из «87 Clickety Clips», OwlishMedia — https://opengameart.org/content/87-clickety-clips | «License(s): CC0» (обе страницы) |

Настоящей записи пролёта пули с CC0 не нашлось — `whiz_*` сделаны из настоящих записей, но это подделка; если звучит не так, лучше синтезировать.

### Интерфейс
| Что | Откуда | Лицензия |
|---|---|---|
| `tick` (хитмаркер), `hover`, `click`, `click_2`, основа `kill` и `head` | Kenney «Interface Sounds» (`tick_002`, `tick_004`, `click_001`, `click_004`, `confirmation_003`) — https://kenney.nl/assets/interface-sounds | «License: Creative Commons CC0» |
| `head` (звон при попадании в голову) — к щелчку Kenney добавлен «звон» `bing1` из «Metal Impact Sounds» (см. выше) | | |

### Фоновые звуки (петли)
| Что | Откуда | Лицензия |
|---|---|---|
| `amb_meadow` (28 с, петля без шва): птицы + сверчки + лёгкий воздух | Птицы — «Ambient Bird Sounds», isaiah658 — https://opengameart.org/content/ambient-bird-sounds ; сверчки — «cricket sounds», syncopika — https://opengameart.org/content/cricket-sounds ; воздух — тот же ветер, что в `amb_wind` | «License(s): CC0» (все страницы) |
| `amb_wind` (36 с, петля без шва): мягкий ветер с порывами | Ветер — «wind1» (wind1.wav, wind3.wav; синтезированный ветер, Luke.RUSTLTD) — https://opengameart.org/content/wind1 ; шорох травы — запись шума из «AMB Outside 1», Kresiek The Furry — https://opengameart.org/content/amb-outside-1 ; порывы (медленные волны громкости) наложены нами | «License(s): CC0» (обе страницы) |

Жужжания пчёл с лицензией CC0 не нашлось — в `amb_meadow` его нет. Звук гильзы дробовика (пластик) отдельно не делали.

## Текстуры (`src/assets/tex/`, 1024 px; `*_diff` цвет, `*_nor` нормали OpenGL, `*_rough` шероховатость)

Poly Haven (https://polyhaven.com), на странице каждой текстуры: «CC0 1.0 Universal - public domain» (`license: https://creativecommons.org/publicdomain/zero/1.0/`).
Исходники 8K перепакованы в 1K jpg (качество ~80).

| Файлы | Откуда | Лицензия |
|---|---|---|
| `soil_*` (лесная земля с камешками и сухими стебельками) | Poly Haven «Forest Ground 04» — https://polyhaven.com/a/forest_ground_04 , автор Rob Tuytel | CC0 1.0 Universal |
| `soil_dark_*` (тёмный гравий и перегной) | «Brown Mud Rocks 01» — https://polyhaven.com/a/brown_mud_rocks_01 , Rob Tuytel | CC0 1.0 Universal |
| `litter_*` (тёмная земля с опавшими листьями и ростками) | «Mud Forest» — https://polyhaven.com/a/mud_forest , eye-candy.xyz | CC0 1.0 Universal |
| `bark_*` (кора) | «Bark Brown 01» — https://polyhaven.com/a/bark_brown_01 , Rob Tuytel | CC0 1.0 Universal |
| `rock_*` (камень для галек) | «Rock 05» — https://polyhaven.com/a/rock_05 , Rob Tuytel | CC0 1.0 Universal |
| `velvet_*` (мягкая ворсистая поверхность, для шляпок грибов и ткани; красная) | «Velour Velvet» — https://polyhaven.com/a/velour_velvet , colormass (фото), Rico Cilliers | CC0 1.0 Universal |
| `walnut_*` (тёмный лакированный орех для ложи): рисунок волокон от «Black Walnut Veneer 02», **цвет перекрашен нами** в тёмный орех, шероховатость снижена под лак (0,28–0,50) | https://polyhaven.com/a/black_walnut_veneer_02 , Jenelle van Heerden | CC0 1.0 Universal |
| `steel_*` (тёмная исцарапанная сталь), `brass_*` (потёртая латунь): за основу взяты участки «Blue Metal Plate» (https://polyhaven.com/a/blue_metal_plate , Rob Tuytel) — пятна, шероховатость, нормали, — отражены в плитку; **цвет сделан нами, царапины дорисованы нами по случайному рисунку**. Металличность в игре ставить 1,0. В Poly Haven чистой латуни и стали нет, ambientCG недоступен | CC0 1.0 Universal |

OpenGameArt:
| Файлы | Откуда | Лицензия |
|---|---|---|
| `moss_*` (густой мох): фото «IMGP3092.JPG», обрезано, сделано бесшовным, цвет чуть выправлен; **нормали и шероховатость посчитаны нами по яркости** | «Free texture resource pack: moss, rock, patterns and misc», rubberduck — https://opengameart.org/content/free-texture-resource-pack-moss-rock-patterns-and-misc (`tex-res-stone-and-moss.zip`) | «License(s): CC0» |
| `leaf_diff.png` (лист с жилками, с прозрачностью, 512×768), `leaf_nor.jpg` (**нормали посчитаны нами по яркости**) | «60 CC0 Vegetation textures» (`plant_55.png`, фото с burningwell), rubberduck — https://opengameart.org/content/60-cc0-vegetation-textures | «License(s): CC0» |

## Шрифты и код
| Что | Откуда | Лицензия |
|---|---|---|
| Шрифты Oswald и Nunito (`src/fonts`) | Google Fonts | SIL Open Font License 1.1 |
| Движок three.js | https://threejs.org | MIT |
| Пост-обработка: postprocessing (pmndrs), N8AO | https://github.com/pmndrs/postprocessing , https://github.com/N8python/n8ao | Zlib, ISC |

Всё остальное сделано для этой игры в коде: насекомые-бойцы и их анимации, четыре ружья, трава, грибы, одуванчики,
клевер, земляника, жёлуди, шишки, раковина, паутина, роса, текстуры листьев и лепестков, эффекты и интерфейс.
Часть идей и кода (перевод, автонастройка графики, сборка) взята из Brawl Green и «Лесной войны».
