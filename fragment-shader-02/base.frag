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
  
  vec2 p = pos;
  color += vec3(length(dist));

  gl_FragColor = vec4(color, 1.);
}
