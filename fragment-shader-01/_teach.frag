precision mediump float;

// viewport pixel
uniform vec2 resolution;
// seconds
uniform float time;
// center start (-1 ~ 1)
uniform vec2 mouse;

// // https://www.google.com/search?q=hsv&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjSitvYuo3jAhUYx4sBHWQkA84Q_AUIESgC&biw=1298&bih=878#imgrc=YM6dH1K4hrwo1M:
// vec3 hsv(float h, float s, float v){
//   vec4 t = vec4(1., 2. / 3., 1. / 3., 3.);
//   vec3 p = abs(fract(vec3(h) + t.xyz) * 6. - vec3(t.w));
//   return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0., 1.), s);
// }

// mat2 rotate(float a) {
//   float s = sin(a);
//   float c = cos(a);
//   return mat2(s, c, -c, s);
// }

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

  // // Circle
  // d = length(p);
  // c = vec3(d); // gradation
  // // c = vec3(step(1., d)); // shape
  // // c = vec3(step(.5, d)); // shape size change

  // // Rect
  // d = p.x;
  // // d = abs(p.x);
  // // d = p.y;
  // // d = abs(p.y);
  // // d = max(abs(p.x), abs(p.y));
  // c = vec3(d); // gradation
  // // c = vec3(step(.3, d)); // shape

  // // Offset
  // // p += vec2(.4, 0); // move
  // d = max(abs(p.x), abs(p.y));
  // // p += vec2(-.4, 0); // move reset
  // // p += vec2(-.4, 0); // move
  // // d = min(d, max(abs(p.x), abs(p.y))); // add
  // c = vec3(step(.3, d));

  // // Striped
  // d = fract(p.y);
  // // d = fract(p.y * 10.);
  // c = vec3(d); // gradation
  // // c = vec3(step(.5, d)); // shape

  // // Step gradation
  // d = abs(p.x);
  // // d = floor(abs(p.x));
  // // d = abs(length(p)); // circle
  // // d = max(abs(p.x), abs(p.y)); // rect
  // // d = floor(d * 10.) / 10.; // step
  // c = vec3(d);

  // // Circle glow
  // d = length(p);
  // // d = .1 / length(p);
  // c = vec3(d);
  // // c *= vec3(
  // //   .3, // r
  // //   .5, // g
  // //   1. // b
  // // );
  // // c *= hsv(
  // //   (sin(time) + 1.) * .5, // h
  // //   .5, // s
  // //   .5 // v
  // // );

  // // Central line
  // d = atan(p.x, p.y); // -π/2 ～ π/2
  // // d = sin(atan(p.x, p.y));
  // // d = sin(atan(p.x, p.y) * 10.);
  // c = vec3(d); // gradation
  // // c = vec3(step(.5, d)); // shape

  // // Line
  // d = abs(p.y);
  // // d = .01 / abs(p.y);
  // c = vec3(d); // gradation
  // // c = vec3(step(1., d)); // shape

  // // Line wave
  // d = .01 / abs(p.y + sin(p.x * 10.) * .3);
  // // d = .01 / abs(p.y + sin(p.x * 10. + time) * .3);
  // c = vec3(d);

  // // ring
  // d = length(p);
  // // d = 1. - length(p);
  // // d = .5 - length(p);
  // // d = abs(.5 - length(p));
  // // d = .1 / abs(.5 - length(p));
  // // d = .02 / abs(.5 - length(p));
  // c = vec3(d);
  // // c = vec3(step(1., d)); // shape

  // // Transformation matrix
  // // https://www.google.com/search?biw=1298&bih=878&tbm=isch&sa=1&ei=jK8WXdOjCYru8wX7mq6wBg&q=%E5%A4%89%E6%8F%9B%E8%A1%8C%E5%88%97+%E3%82%A2%E3%82%B8%E3%83%9E%E3%83%86%E3%82%A3%E3%82%AF%E3%82%B9&oq=%E5%A4%89%E6%8F%9B%E8%A1%8C%E5%88%97+%E3%82%A2%E3%82%B8%E3%83%9E%E3%83%86%E3%82%A3%E3%82%AF%E3%82%B9&gs_l=img.3...9954.10893..11480...0.0..0.84.678.9......0....1..gws-wiz-img.YhJ3YJItQ5A#imgrc=OdplCVuTQ6BF4M:
  // // http://matrixmultiplication.xyz/
  // // p *= mat2(
  // //   1., 0.,
  // //   0., 1.
  // // );
  // // // rotate
  // // p *= mat2(
  // //   sin(1.), cos(1.),
  // //   -cos(1.), sin(1.)
  // // );
  // // p *= mat2(
  // //   sin(time), cos(time),
  // //   -cos(time), sin(time)
  // // );
  // // // scale
  // // p *= mat2(
  // //   sin(time), 0.,
  // //   0., sin(time)
  // // );
  // // // translate
  // // p = (vec3(p, 1.) * mat3(
  // //   1., 0., sin(time), 
  // //   0., 1., cos(time),
  // //   0., 0., 1.
  // // )).xy;
  // d = max(abs(p.x), abs(p.y));
  // c = vec3(step(.3, d));

  // // Reptation
  // // p = mod(p, .5);
  // // p = mod(p, .5) - .25;
  // // vec2 pp = mod(p, .5) - .25;
  // d = .1 / length(p);
  // // d = .1 / length(pp);
  // c = vec3(d);
  // // c = vec3(d) * hsv(
  // //   length(p),
  // //   // length(
  // //   //     floor(p * 2.) // 1 / mod coefficient = 1 / 5 = 2
  // //   //   )
  // //   //   // * .5 // h intarval rate
  // //   // ,
  // //   .5, // s
  // //   .5 // v
  // // );

  // // duplicate
  // // p = p + vec2(.3, .3);
  // d = .01 / length(p);
  // c += vec3(d);
  // // for(int i = 0; i < 12; i++) {
  // //   vec2 pp = p + vec2(
  // //     // https://www.google.com/search?biw=1298&bih=878&tbm=isch&sa=1&ei=P70WXfCkBNOA8QXDjp3oDw&q=%E5%86%86%E3%80%80%E4%B8%89%E8%A7%92%E9%96%A2%E6%95%B0%E3%80%80gif%E3%82%A2%E3%83%8B%E3%83%A1&oq=%E5%86%86%E3%80%80%E4%B8%89%E8%A7%92%E9%96%A2%E6%95%B0%E3%80%80gif%E3%82%A2%E3%83%8B%E3%83%A1&gs_l=img.3...33486.36676..36997...0.0..0.109.1588.17j1......0....1..gws-wiz-img.27I2p9lEuTU#imgrc=dZgCNCHyRZESzM:
  // //     .3 * sin(float(i) / (12. / 3.14 / 2.)),
  // //     .3 * cos(float(i) / (12. / 3.14 / 2.))
  // //     // .3 * sin(float(i) / (12. / 3.14 / 2.)) + sin(float(i) + time) * .05,
  // //     // .3 * cos(float(i) / (12. / 3.14 / 2.)) + cos(float(i) + time) * .05
  // //   );
  // //   d = .01 / length(pp);
  // //   c += vec3(d);
  // //   // d = .03 / length(pp);
  // //   // c += vec3(d) * hsv(
  // //   //   (float(i) / 12.) + abs(sin(time * .5)), // h
  // //   //   .5, // s
  // //   //   .5 // v
  // //   // );
  // // }

  // // one more...
  // d = step( // striped
  //   .5,
  //   fract(
  //     (p.y - time) * 50. // num
  //     - sin((p.x - time * .001) * 500.) // wave
  //   )
  // );
  // p *= pow(length(p), 4.); // distotion
  // p *= mat2( // scale
  //   sin(time * .2), 0.,
  //   0., sin(time * .2)
  // );
  // p += vec2( // offset
  //   .3 * sin(time), // x
  //   .3 * cos(time) // y
  // );
  // p *= rotate(time); // rotate
  // d += sin(atan(p.y, p.x) * 10.) * sin(time); // wrav circle
  // d *= (1. - length(p)) * .3; // wave rate
  // d += (.7 / length(p)); // scale
  // d = floor(d * 2.) * .5; // step
  // c = vec3(d) * hsv(
  //   (sin(time + d * .1) + 1.) * .5, // h
  //   .3, // s
  //   .5 // v
  // );

  gl_FragColor = vec4(c, 1.);
}
