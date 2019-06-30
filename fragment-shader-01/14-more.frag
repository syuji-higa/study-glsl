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

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(s, c, -c, s);
}

void main() {
  // position
  // 1. gl_FragCoord.xy = left bottom start (0 ~ resolutin)
  // 2. center start (-resolutin ~ resolutin)
  // 3. long side (-1 ~ 1)
  vec2 p =
    (gl_FragCoord.xy * 2. - resolution)
    / max(resolution.x, resolution.y);

  // distance
  float d = 0.;
  // color
  vec3 c = vec3(0.);

  // one more...
  d = step( // striped
    .5,
    fract(
      (p.y - time) * 50. // num
      - sin((p.x - time * .001) * 500.) // wave
    )
  );
  p *= pow(length(p), 4.); // distotion
  p *= mat2( // scale
    sin(time * .2), 0.,
    0., sin(time * .2)
  );
  p += vec2( // offset
    .3 * sin(time), // x
    .3 * cos(time) // y
  );
  p *= rotate(time); // rotate
  d += sin(atan(p.y, p.x) * 10.) * sin(time); // wrav circle
  d *= (1. - length(p)) * .3; // wave rate
  d += (.7 / length(p)); // scale
  d = floor(d * 2.) * .5; // step
  c = vec3(d) * hsv(
    (sin(time + d * .1) + 1.) * .5, // h
    .3, // s
    .5 // v
  );

  gl_FragColor = vec4(c, 1.);
}
