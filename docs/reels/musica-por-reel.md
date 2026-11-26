# Música por reel (24/11/2026; refeita em 26/11/2026 com as cinco faixas do Dyones)

Cada reel usa um trecho de cerca de 28 s, escolhido por nível firme, sem quebra e colado numa batida (`video/scripts/trechos.py`). A trilha entra por baixo dos efeitos com `video/scripts/musica.sh`, nivelada a -21 LUFS, abaixa sozinha quando há efeito e sai em fade. O reel final fica em -14 LUFS, com pico de -2 dBTP.

Os arquivos de áudio ficam fora do repositório. São as cinco faixas que o Dyones mandou em 26/11:
- kulakovka, minimal electronica;
- ronaldoreyz, innovation pulsewave;
- the_mountain, instrumental minimal;
- alexgrohl, breathing upbeat corporate;
- spoot, soft corporate, que entra no lugar da "digital prototype flow" do plano de 24/11.

**Regra da distribuição (26/11):** na semana de 01/12 nenhum trecho se repete e nenhum dia leva a mesma faixa duas vezes. Os 10 reels da semana de 08/12 reaproveitam trechos da semana anterior.

| Reel | Quando sai | Trilha | Início (s) |
|---|---|---|---|
| L1-01 | ter 01/12, 08:30 | kulakovka, minimal electronica | 6.05 |
| L1-21 | ter 01/12, 14:00 | the_mountain, instrumental minimal | 21.3 |
| L1-17 | ter 01/12, 20:00 | alexgrohl, breathing upbeat corporate | 7.3 |
| L1-11 | qua 02/12, 08:30 | spoot, soft corporate | 34.2 |
| L1-08 | qua 02/12, 14:00 | ronaldoreyz, innovation pulsewave | 39.9 |
| L1-07 | qua 02/12, 20:00 | kulakovka, minimal electronica | 106.05 |
| L1-22 | qui 03/12, 08:30 | the_mountain, instrumental minimal | 72.3 |
| L1-02 | qui 03/12, 14:00 | kulakovka, minimal electronica | 36.05 |
| L1-13 | qui 03/12, 20:00 | alexgrohl, breathing upbeat corporate | 45.1 |
| L1-10 | sex 04/12, 08:30 | spoot, soft corporate | 98.2 |
| L1-14 | sex 04/12, 14:00 | ronaldoreyz, innovation pulsewave | 92.7 |
| L1-20 | sex 04/12, 20:00 | alexgrohl, breathing upbeat corporate | 90.1 |
| L1-09 | sáb 05/12, 08:30 | spoot, soft corporate | 62.2 |
| L1-12 | sáb 05/12, 14:00 | ronaldoreyz, innovation pulsewave | 4.7 |
| L1-23 | sáb 05/12, 20:00 | kulakovka, minimal electronica | 78.05 |
| L1-03 | semana de 08/12 | alexgrohl, breathing upbeat corporate | 7.3 |
| L1-04 | semana de 08/12 | kulakovka, minimal electronica | 6.05 |
| L1-05 | semana de 08/12 | ronaldoreyz, innovation pulsewave | 39.9 |
| L1-06 | semana de 08/12 | spoot, soft corporate | 34.2 |
| L1-15 | semana de 08/12 | the_mountain, instrumental minimal | 21.3 |
| L1-16 | semana de 08/12 | kulakovka, minimal electronica | 106.05 |
| L1-18 | semana de 08/12 | spoot, soft corporate | 98.2 |
| L1-19 | semana de 08/12 | ronaldoreyz, innovation pulsewave | 92.7 |
| L1-24 | semana de 08/12 | the_mountain, instrumental minimal | 72.3 |
| L1-25 | semana de 08/12 | alexgrohl, breathing upbeat corporate | 45.1 |

**Para refazer um reel,** a partir de `video/`:
```bash
bash scripts/musica.sh saida/L1-XX.v2.mp4 <trilha.mp3> L1-XX-v3.mp4 <início> < /dev/null
```
O `< /dev/null` evita que o ffmpeg leia a entrada de um laço `while read`.

**Licença.** Conferir a licença de cada faixa antes de publicar, no site de onde ela foi baixada (uso comercial e crédito exigido).
