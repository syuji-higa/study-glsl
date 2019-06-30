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

  // Transformation matrix
  // https://www.google.com/search?biw=1298&bih=878&tbm=isch&sa=1&ei=jK8WXdOjCYru8wX7mq6wBg&q=%E5%A4%89%E6%8F%9B%E8%A1%8C%E5%88%97+%E3%82%A2%E3%82%B8%E3%83%9E%E3%83%86%E3%82%A3%E3%82%AF%E3%82%B9&oq=%E5%A4%89%E6%8F%9B%E8%A1%8C%E5%88%97+%E3%82%A2%E3%82%B8%E3%83%9E%E3%83%86%E3%82%A3%E3%82%AF%E3%82%B9&gs_l=img.3...9954.10893..11480...0.0..0.84.678.9......0....1..gws-wiz-img.YhJ3YJItQ5A#imgrc=OdplCVuTQ6BF4M:
  // http://matrixmultiplication.xyz/
  p *= mat2(
    1., 0.,
    0., 1.
  );
  // rotate
  p *= mat2(
    sin(1.), cos(1.),
    -cos(1.), sin(1.)
  );
  p *= mat2(
    sin(time), cos(time),
    -cos(time), sin(time)
  );
  // scale
  p *= mat2(
    sin(time) * 2., 0.,
    0., sin(time) * 2.
  );
  // translate
  p = (vec3(p, 1.) * mat3(
    1., 0., sin(time) * .5, 
    0., 1., cos(time) * .5,
    0., 0., 1.
  )).xy;
  d = max(abs(p.x), abs(p.y));
  c = vec3(step(.3, d));

  gl_FragColor = vec4(c, 1.);
}
