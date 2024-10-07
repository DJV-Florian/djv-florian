#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float sdOctahedron(vec3 p, float s){
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;

    if(3.0*p.x < m) q = p.xyz;
    else if(3.0*p.y < m) q = p.yzx;
    else if(3.0*p.z < m) q = p.zxy;
    else return m*0.57735027;

    float k = clamp(0.5 * (q.z-q.y+s), 0.0, s);
    return length(vec3(q.x, q.y-s+k,q.z-k));
}



mat2 rot2D(float angle){
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c,s,s,-c);
}


float map(vec3 p){
    vec3 q = p;
    vec3 l = p;
    q.xz *= rot2D(u_time * .2);
    l = abs(l);
    l = cos(l + .9 + (0.25 * sin(u_time * .5)/2.));
    l.xz *= rot2D(-u_time * .2);
    float mainForm = sdOctahedron(q, 0.5);
    float littleOnes = sdOctahedron(l, 0.2);
    float ground = p.y + .6;
    return min(ground, min(littleOnes, mainForm));
}

float RayMarch(vec3 ro, vec3 rd){
    float t = 0.;

    for(int i = 0; i < 80; i++){
        vec3 p = ro + rd * t;

        float d = map(p);

        t += d;

        if(d < 0.001 || t > 80.) break;

    }

    return t;
}


void main(){
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0.,.2,-3.0);
    vec3 rd = normalize(vec3(uv * .8, 1.0));

    vec3 color = vec3(.0);

    ro.yz *= rot2D(-.3);
    rd.yz *= rot2D(-.3);


    float t = RayMarch(ro, rd);


    color = vec3(t * .15) + mix(vec3(0.1,0.2,0.3), vec3(1.0, 0.0078, 0.2549), (0.25 * sin(u_time * .5)/2.));

    gl_FragColor = vec4(color,1.0);
}