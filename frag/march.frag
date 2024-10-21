#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float smin(float a, float b, float k){
    float h = max (k-abs(a-b), 0.0) /k;
    return min(a,b) - h*h*h*k*(1.0/6.0);
}

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

mat2 rot2D(float angle){
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

float sdOctahedron(vec3 p, float s){
    p = abs(p);
    float m = p.x+p.y+p.z-s;
    vec3 q;
    if(3.0*p.x<m) q = p.xyz;
    else if(3.0*p.y < m) q = p.yzx;
    else if(3.0*p.z < m) q = p.zxy;
    else return m*0.57735027;

    float k = clamp(0.5*(q.z-q.y+s), 0.0, s);
    return length(vec3(q.x, q.y-s+k, q.z-k));
}


vec3 palette (float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b*cos(6.28318*(c*t+d));
}

float map(vec3 p){
    vec3 q = p;
    vec3 r = p;
    vec3 t= p;
    q.y += sin(u_time) * .2 + cos(u_time) * .1;
    q.xz *= rot2D(u_time * .02);
    q = fract(q) - .5;
    q.xy *= rot2D(u_time);

    r.xy *= rot2D(0.7);
    t.xy *= rot2D(2.4);

    float octahedron = sdOctahedron(q, .2);
    float ground = 1.7 - r.y;
    float ground2 = 1.7 - t.y;
    return smin(smin(ground, ground2, 1.0), octahedron, 0.5);
}

float RayMarching(vec3 ro, vec3 rd){
    float t = 0.;

    for(int i = 0; i < 80; i++){
        vec3 p = ro + rd * t;
        float d = map(p);
        t += d;

        if (d < 0.0001 || t > 100.0) break;
    }

    return t;
}


void main(){
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0.0,0.0,3.0);

    vec3 rd = normalize(vec3(uv, 1.0));

    vec3 color = vec3(0.0);

    float t = RayMarching(ro, rd);
   // vec3 p = ro + rd * t;


    vec3 a = vec3(.25,.0,1.0);
    vec3 b = vec3(0.38,0.56,1.0);
    vec3 c = vec3(.48,.33,.48);
    vec3 dp = vec3(0.4863, 0.349, 0.3882);

    color = vec3(t * .1113) + mix(vec3(0.0196, 0.1373, 0.2118) , palette(t*.2, a,b,c,dp) , 1.0 + sin(u_time) * .5);
    gl_FragColor = vec4(color, 1.0);

}