precision mediump float;

// viewport pixel
uniform vec2 resolution;
// seconds
uniform float time;
// center start (-1 ~ 1)
uniform vec2 mouse;

// https://www.google.com/search?q=hsv&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjSitvYuo3jAhUYx4sBHWQkA84Q_AUIESgC&biw=1298&bih=878#imgrc=YM6dH1K4hrwo1M:
vec3 hsv(float h, float s, float v){
  vec4 t = vec4(1., 2. / 3., 1. / 3., 3.);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6. - vec3(t.w));
  return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0., 1.), s);
}

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

  // Line wave
  d = .01 / abs(
    p.y
    + sin(
      p.x
      * 10. // inerval
      + time // move
    )
    * .3 // amplitude
  );
  c = vec3(d);

  gl_FragColor = vec4(c, 1.);
}