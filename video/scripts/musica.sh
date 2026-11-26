#!/usr/bin/env bash
# Põe uma trilha por baixo do áudio de efeitos de um reel já renderizado, sem refazer o vídeo.
# Uso: scripts/musica.sh <reel.mp4> <trilha.mp3> <saida.mp4> [inicio_s=10] [nivel_lufs=-21]
#  - a trilha cai sozinha quando há efeito (sidechain), entra em fade e sai em fade; a trilha é nivelada em LUFS antes da mistura;
#  - o resultado volta a -14 LUFS (pico -2 dBTP), o mesmo alvo dos reels sem música;
#  - o vídeo é copiado sem recodificar.
set -euo pipefail
reel="$1"; trilha="$2"; saida="$3"; ini="${4:-10}"; nivel="${5:--21}"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$reel")
fim=$(python3 -c "print(max(0,$dur-1.6))")
ffmpeg -v error -y -i "$reel" -ss "$ini" -t "$dur" -i "$trilha" -filter_complex "
[0:a]aresample=48000,asplit=2[efx][chave];
[1:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=${nivel}:TP=-3:LRA=7,afade=t=in:st=0:d=0.8,afade=t=out:st=${fim}:d=1.6[mus];
[mus][chave]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=350[duck];
[efx][duck]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-2:LRA=9,atrim=0:${dur}[o]" \
  -map 0:v -map "[o]" -c:v copy -c:a aac -b:a 192k -ar 48000 "$saida"
