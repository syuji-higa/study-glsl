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

  // duplicate
  d = .01 / length(p);
  for(int i = 0; i < 12; i++) {
    vec2 pp = p + vec2(
      // https://www.google.com/search?biw=1298&bih=878&tbm=isch&sa=1&ei=P70WXfCkBNOA8QXDjp3oDw&q=%E5%86%86%E3%80%80%E4%B8%89%E8%A7%92%E9%96%A2%E6%95%B0%E3%80%80gif%E3%82%A2%E3%83%8B%E3%83%A1&oq=%E5%86%86%E3%80%80%E4%B8%89%E8%A7%92%E9%96%A2%E6%95%B0%E3%80%80gif%E3%82%A2%E3%83%8B%E3%83%A1&gs_l=img.3...33486.36676..36997...0.0..0.109.1588.17j1......0....1..gws-wiz-img.27I2p9lEuTU#imgrc=dZgCNCHyRZESzM:
      .3 * sin(float(i) / (12. / 3.14 / 2.)) + sin(float(i) + time) * .05,
      .3 * cos(float(i) / (12. / 3.14 / 2.)) + cos(float(i) + time) * .05
    );
    d = .03 / length(pp);
    c += vec3(d) * hsv(
      (float(i) / 12.) + abs(sin(time * .5)), // h
      .5, // s
      .5 // v
    );
  }

  gl_FragColor = vec4(c, 1.);
}
