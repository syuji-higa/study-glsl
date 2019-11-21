precision mediump float;

uniform vec2 resolution; // viewport pixel
uniform float time; // seconds
uniform vec2 mouse; // center start (-1 ~ 1)

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

  gl_FragColor = vec4(color, 1.);
}
