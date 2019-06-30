precision mediump float;

// viewport pixel
uniform vec2 resolution;
// seconds
uniform float time;
// center start (-1 ~ 1)
uniform vec2 mouse;

void main() {
  // position
  // 1. gl_FragCoord.xy = left bottom start (0 ~ resolutin)
  // 2. center start (-resolutin/2 ~ resolutin/2)
  // 3. long side (-1 ~ 1)
  vec2 p =
    (gl_FragCoord.xy * 2. - resolution)
    / max(resolution.x, resolution.y);

  // distance
  float d = 0.;
  // color
  vec3 c = vec3(0.);

  // Step gradation
  d = max(abs(p.x), abs(p.y)); // rect gradation
  d = floor(d * 10.) * .1; // step
  c = vec3(d);

  gl_FragColor = vec4(c, 1.);
}
