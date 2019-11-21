precision mediump float;

uniform vec2 resolution; // viewport pixel
uniform float time; // seconds
uniform vec2 mouse; // center start (-1 ~ 1)

float rand(vec2 p){
  return fract(sin(dot(p,vec2(123.45,678.9)))*12345.6789);
}

void main() {
  // position
  // 1. gl_FragCoord.xy = left bottom start (0 ~ resolutin)
  // 2. center start (-resolutin ~ resolutin)
  // 3. long side (-1 ~ 1)
  vec2 pos =
    (gl_FragCoord.xy * 2.0 - resolution)
    / max(resolution.x, resolution.y);

  float dist = 0.0; // distance
  vec3 color = vec3(0.0);

  // ex mosaic
  pos = floor(pos * 40.0) / 40.0;

  // fire ball base
  //   1. 光る円をつくる
  //   2. 色を付ける
  //   3. 上を尖らせる
  //   4. 下を狭める
  //   5. 幅を縮める
  //   6. 上側を波打たせる
  //   7. 揺らす
  //   8. 色味を調整する
  vec2 p = pos;
  color = vec3(-0.5); // step 8
  p.x *= 2.0; // step 5
  p.x += sin(p.y * 60.0 - time * 20.0) * 0.003; // step 7
  p.y += abs(p.x * max(p.y, 0.0)) * 5.0; // step 3
  p.y += sin(exp(-p.x) * 60.) * 0.05 * max(p.y, 0.0); // step 6
  p.y -= min(p.y, 0.0) * 2.8; // step 4
  dist = 0.03 / pow(length(p), 4.0); // step 1
  color += vec3(length(dist));
  color *= vec3(0.8, 0.3, 0.1); // step 2

  // ex sparks
  //   1. 光る円をつくる
  //   2. 色を付ける
  //   3. 上に動かす
  //   4. 上に行くほど小さくする
  //   5. 縦に細長くする
  //   6. 横に波打たせる
  //   7. 数を増やす
  //   8. 横の動きをズラす
  //   9. 縦の動きをズラす
  //  10. 縦の動きのサイクルをズラす
  //  11. 縦の動きが継続するように
  //  12. 不要に明るいところを暗くする
  //  13. ランダム感を与える
  for(int i = 0; i < 80; i++) { // step 7
    p = pos; // setp 3
    float index = float(i); // step 7
    p.x += sin(( // step 6
        p.y // step 6
        + p.x * sign(rand(vec2(index)) - 0.5) // step 13
        + index * index // step 10
      ) * 3.0) // step 6
      * sin(index) // step 8
      * 0.3 // step 6
    ; // step 6
    p.x *= 2.0 // step 5
      + abs(p.x * 300.) // step 12
    ; // step 5
    p.y += cos(index * 10.) * 0.2 - 0.3; // step 9
    p.y -= fract(time * 0.8 // step 3
      + index * 0.13 // step 11
    ); // step 3
    dist = 0.03 // step 1
      * exp(-abs(pos.y * 3.0)) // step 4
      / length(p); // step 1
    vec3 c = vec3(dist);
    c *= vec3(0.8, 0.3, 0.1); // step 2
    color += c;
  } // step 7

  // ex step
  color = vec3(
    step(0.5, color.r),
    step(0.5, color.g),
    step(0.5, color.b)
  );

  gl_FragColor = vec4(color, 1.);
}
