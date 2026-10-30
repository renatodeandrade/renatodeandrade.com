# Sequência de observação — Caça-Asteroides

Material: terceiro vídeo fornecido pelo proprietário na conversa, `294117780_1102320390718094_8019691683408846048_n.mp4` (414 × 426 px). O original não é distribuído com o site.

Foi escolhido porque a área marcada fica íntegra e o campo é menos carregado que o segundo vídeo. No primeiro, a marcação está cortada na borda. A página apresenta a sequência como exemplo do processo de observação, sem atribuir uma descoberta, data ou autoria científica não confirmada.

## Arquivos

- `asteroid-observation.gif`: recorte de 280 × 280 px, origem x=18/y=54; quadros 5, 15, 25 e 35 (índices a partir de zero), 350 ms cada, loop de 1,4 s.
- `asteroid-observation-still.png`: primeiro quadro da sequência, usado quando a animação está pausada, fora de vista, sem JavaScript ou com movimento reduzido.

A marcação vermelha original foi preservada. Não foram geradas imagens, estrelas, trajetórias ou quadros intermediários. A redução para a paleta GIF é apenas uma conversão de formato.

## Reprodução da conversão

Com FFmpeg instalado e o vídeo original no diretório atual:

```bash
ffmpeg -i 294117780_1102320390718094_8019691683408846048_n.mp4 -filter_complex "[0:v]select='eq(n,5)+eq(n,15)+eq(n,25)+eq(n,35)',crop=280:280:18:54,settb=1/100,setpts=N*35,split[a][b];[a]palettegen=max_colors=256:reserve_transparent=0[p];[b][p]paletteuse=dither=bayer:bayer_scale=3[out]" -map '[out]' -fps_mode passthrough -enc_time_base 1/100 -loop 0 -final_delay 35 asteroid-observation.gif
ffmpeg -i asteroid-observation.gif -frames:v 1 -update 1 asteroid-observation-still.png
```
