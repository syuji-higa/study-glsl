precision mediump float;

uniform vec2 resolution; // viewport pixel
uniform float time; // seconds
uniform vec2 mouse; // center start (-1 ~ 1)

//
// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

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
  dist *= snoise(vec3(pos * 10.0, time)); // ex simplex noise step 1
  dist *= snoise(vec3(pos * 20.0, time)); // ex simplex noise step 2
  dist *= snoise(vec3(pos * 50.0, time)); // ex simplex noise step 3
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

  gl_FragColor = vec4(color, 1.);
}
