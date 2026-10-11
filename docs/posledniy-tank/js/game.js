var mu="160";var Mx=0,gf=1,bx=2;var Gl=1,gu=2,Zi=3,Fi=0,Zt=1,zt=2;var Li=0,Ii=1,un=2,xf=3,vf=4,xu=5,Zs=100,Ex=101,Sx=102,_f=103,yf=104,wx=200,Tx=201,Ax=202,Rx=203,Go=204,Vo=205,Cx=206,Px=207,Lx=208,Ix=209,Fx=210,Dx=211,zx=212,Ux=213,Nx=214,kx=0,Ox=1,Bx=2,rl=3,Hx=4,Gx=5,vu=6,Vx=7,_u=0,Wx=1,Xx=2,_s=0,yu=1,Mu=2,bu=3,oa=4,qx=5,Eu=6,Mf="attached",Yx="detached",sm=300,Fr=301,Dr=302,Ih=303,Fh=304,Vl=306,ji=1e3,$n=1001,Wo=1002,Qt=1003,ol=1004;var zo=1005;var Un=1006,Su=1007;var Ms=1008;var ys=1009,Zx=1010,Kx=1011,wu=1012,rm=1013,xs=1014,$i=1015,Gn=1016,om=1017,am=1018,$s=1020,$x=1021,ai=1023,Jx=1024,jx=1025,Js=1026,zr=1027,Qx=1028,lm=1029,ev=1030,cm=1031,hm=1033,$c=33776,Jc=33777,jc=33778,Qc=33779,bf=35840,Ef=35841,Sf=35842,wf=35843,um=36196,Tf=37492,Af=37496,Rf=37808,Cf=37809,Pf=37810,Lf=37811,If=37812,Ff=37813,Df=37814,zf=37815,Uf=37816,Nf=37817,kf=37818,Of=37819,Bf=37820,Hf=37821,eh=36492,Gf=36494,Vf=36495,tv=36283,Wf=36284,Xf=36285,qf=36286;var Ur=2300,Qs=2301,th=2302,Yf=2400,Zf=2401,Kf=2402,nv=2500;var dm=0,Wl=1,aa=2,fm=3e3,js=3001,iv=3200,sv=3201,Tu=0,rv=1,Hn="",gt="srgb",nn="srgb-linear",Au="display-p3",Xl="display-p3-linear",al="linear",Tt="srgb",ll="rec709",cl="p3";var ur=7680;var $f=519,ov=512,av=513,lv=514,pm=515,cv=516,hv=517,uv=518,dv=519,Dh=35044,ql=35048;var Jf="300 es",zh=1035,Ji=2e3,hl=2001,bs=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jf=1234567,Uo=Math.PI/180,Nr=180/Math.PI;function Ei(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tn[n&255]+Tn[n>>8&255]+Tn[n>>16&255]+Tn[n>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[t&63|128]+Tn[t>>8&255]+"-"+Tn[t>>16&255]+Tn[t>>24&255]+Tn[i&255]+Tn[i>>8&255]+Tn[i>>16&255]+Tn[i>>24&255]).toLowerCase()}function en(n,e,t){return Math.max(e,Math.min(t,n))}function Ru(n,e){return(n%e+e)%e}function fv(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function pv(n,e,t){return n!==e?(t-n)/(e-n):0}function No(n,e,t){return(1-t)*n+t*e}function mv(n,e,t,i){return No(n,e,1-Math.exp(-t*i))}function gv(n,e=1){return e-Math.abs(Ru(n,e*2)-e)}function xv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function vv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function _v(n,e){return n+Math.floor(Math.random()*(e-n+1))}function yv(n,e){return n+Math.random()*(e-n)}function Mv(n){return n*(.5-Math.random())}function bv(n){n!==void 0&&(jf=n);let e=jf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ev(n){return n*Uo}function Sv(n){return n*Nr}function Uh(n){return(n&n-1)===0&&n!==0}function wv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ul(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Tv(n,e,t,i,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),h=o((e+i)/2),d=r((e-i)/2),u=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*h,l*d,l*u,a*c);break;case"YZY":n.set(l*u,a*h,l*d,a*c);break;case"ZXZ":n.set(l*d,l*u,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function wt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var wi={DEG2RAD:Uo,RAD2DEG:Nr,generateUUID:Ei,clamp:en,euclideanModulo:Ru,mapLinear:fv,inverseLerp:pv,lerp:No,damp:mv,pingpong:gv,smoothstep:xv,smootherstep:vv,randInt:_v,randFloat:yv,randFloatSpread:Mv,seededRandom:bv,degToRad:Ev,radToDeg:Sv,isPowerOfTwo:Uh,ceilPowerOfTwo:wv,floorPowerOfTwo:ul,setQuaternionFromProperEuler:Tv,normalize:wt,denormalize:Pi},ae=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(en(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},st=class n{constructor(e,t,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],x=s[0],m=s[3],p=s[6],v=s[1],_=s[4],M=s[7],S=s[2],b=s[5],R=s[8];return r[0]=o*x+a*v+l*S,r[3]=o*m+a*_+l*b,r[6]=o*p+a*M+l*R,r[1]=c*x+h*v+d*S,r[4]=c*m+h*_+d*b,r[7]=c*p+h*M+d*R,r[2]=u*x+f*v+g*S,r[5]=u*m+f*_+g*b,r[8]=u*p+f*M+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=t*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(s*c-h*i)*x,e[2]=(a*i-s*o)*x,e[3]=u*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(nh.makeScale(e,t)),this}rotate(e){return this.premultiply(nh.makeRotation(-e)),this}translate(e,t){return this.premultiply(nh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},nh=new st;function mm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Xo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Av(){let n=Xo("canvas");return n.style.display="block",n}var Qf={};function ko(n){n in Qf||(Qf[n]=!0,console.warn(n))}var ep=new st().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),tp=new st().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Pa={[nn]:{transfer:al,primaries:ll,toReference:n=>n,fromReference:n=>n},[gt]:{transfer:Tt,primaries:ll,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Xl]:{transfer:al,primaries:cl,toReference:n=>n.applyMatrix3(tp),fromReference:n=>n.applyMatrix3(ep)},[Au]:{transfer:Tt,primaries:cl,toReference:n=>n.convertSRGBToLinear().applyMatrix3(tp),fromReference:n=>n.applyMatrix3(ep).convertLinearToSRGB()}},Rv=new Set([nn,Xl]),dt={enabled:!0,_workingColorSpace:nn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Rv.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;let i=Pa[e].toReference,s=Pa[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Pa[n].primaries},getTransfer:function(n){return n===Hn?al:Pa[n].transfer}};function Lr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ih(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var dr,dl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{dr===void 0&&(dr=Xo("canvas")),dr.width=e.width,dr.height=e.height;let i=dr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=dr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Xo("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Lr(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Lr(t[i]/255)*255):t[i]=Lr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cv=0,fl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cv++}),this.uuid=Ei(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(sh(s[o].image)):r.push(sh(s[o]))}else r=sh(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function sh(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?dl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Pv=0,gn=class n extends bs{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=$n,s=$n,r=Un,o=Ms,a=ai,l=ys,c=n.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pv++}),this.uuid=Ei(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===js?gt:Hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ji:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case Wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ji:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case Wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===gt?js:fm}set encoding(e){ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===js?gt:Hn}};gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=sm;gn.DEFAULT_ANISOTROPY=1;var At=class n{constructor(e=0,t=0,i=0,s=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,M=(f+1)/2,S=(p+1)/2,b=(h+u)/4,R=(d+x)/4,F=(g+m)/4;return _>M&&_>S?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=b/i,r=R/i):M>S?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=F/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=R/r,s=F/r),this.set(i,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Nh=class extends bs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t);let s={width:e,height:t,depth:1};i.encoding!==void 0&&(ko("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===js?gt:Hn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new gn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends Nh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},pl=class extends gn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var kh=class extends gn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Nn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||l!==u||c!==f||h!==g){let m=1-a,p=l*u+c*f+h*g+d*x,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let S=Math.sqrt(_),b=Math.atan2(S,p*v);m=Math.sin(m*b)/S,a=Math.sin(a*b)/S}let M=a*v;if(l=l*m+u*M,c=c*m+f*M,h=h*m+g*M,d=d*m+x*M,m===1-a){let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-a*f,e[t+2]=c*g+h*f+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(en(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(np.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(np.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return rh.copy(this).projectOnVector(e),this.sub(rh)}reflect(e){return this.sub(rh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(en(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},rh=new P,np=new Nn,Rn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=yi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yi):yi.fromBufferAttribute(r,o),yi.applyMatrix4(e.matrixWorld),this.expandByPoint(yi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),La.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),La.copy(i.boundingBox)),La.applyMatrix4(e.matrixWorld),this.union(La)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,yi),yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ro),Ia.subVectors(this.max,Ro),fr.subVectors(e.a,Ro),pr.subVectors(e.b,Ro),mr.subVectors(e.c,Ro),ds.subVectors(pr,fr),fs.subVectors(mr,pr),Vs.subVectors(fr,mr);let t=[0,-ds.z,ds.y,0,-fs.z,fs.y,0,-Vs.z,Vs.y,ds.z,0,-ds.x,fs.z,0,-fs.x,Vs.z,0,-Vs.x,-ds.y,ds.x,0,-fs.y,fs.x,0,-Vs.y,Vs.x,0];return!oh(t,fr,pr,mr,Ia)||(t=[1,0,0,0,1,0,0,0,1],!oh(t,fr,pr,mr,Ia))?!1:(Fa.crossVectors(ds,fs),t=[Fa.x,Fa.y,Fa.z],oh(t,fr,pr,mr,Ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Gi=[new P,new P,new P,new P,new P,new P,new P,new P],yi=new P,La=new Rn,fr=new P,pr=new P,mr=new P,ds=new P,fs=new P,Vs=new P,Ro=new P,Ia=new P,Fa=new P,Ws=new P;function oh(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ws.fromArray(n,r);let a=s.x*Math.abs(Ws.x)+s.y*Math.abs(Ws.y)+s.z*Math.abs(Ws.z),l=e.dot(Ws),c=t.dot(Ws),h=i.dot(Ws);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Lv=new Rn,Co=new P,ah=new P,Jn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Lv.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Co.subVectors(e,this.center);let t=Co.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Co,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ah.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Co.copy(e.center).add(ah)),this.expandByPoint(Co.copy(e.center).sub(ah))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Vi=new P,lh=new P,Da=new P,ps=new P,ch=new P,za=new P,hh=new P,kr=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vi.copy(this.origin).addScaledVector(this.direction,t),Vi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){lh.copy(e).add(t).multiplyScalar(.5),Da.copy(t).sub(e).normalize(),ps.copy(this.origin).sub(lh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Da),a=ps.dot(this.direction),l=-ps.dot(Da),c=ps.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(lh).addScaledVector(Da,u),f}intersectSphere(e,t){Vi.subVectors(e.center,this.origin);let i=Vi.dot(this.direction),s=Vi.dot(Vi)-i*i,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Vi)!==null}intersectTriangle(e,t,i,s,r){ch.subVectors(t,e),za.subVectors(i,e),hh.crossVectors(ch,za);let o=this.direction.dot(hh),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ps.subVectors(this.origin,e);let l=a*this.direction.dot(za.crossVectors(ps,za));if(l<0)return null;let c=a*this.direction.dot(ch.cross(ps));if(c<0||l+c>o)return null;let h=-a*ps.dot(hh);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ge=class n{constructor(e,t,i,s,r,o,a,l,c,h,d,u,f,g,x,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,d,u,f,g,x,m)}set(e,t,i,s,r,o,a,l,c,h,d,u,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,s=1/gr.setFromMatrixColumn(e,0).length(),r=1/gr.setFromMatrixColumn(e,1).length(),o=1/gr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,g=a*h,x=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-x*c,t[9]=-a*l,t[2]=x-u*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,x=c*d;t[0]=u+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,x=c*d;t[0]=u-x*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,g=a*h,x=a*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+x,t[1]=l*d,t[5]=x*c+u,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-x*d}else if(e.order==="XZY"){let u=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+x,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Iv,e,Fv)}lookAt(e,t,i){let s=this.elements;return Zn.subVectors(e,t),Zn.lengthSq()===0&&(Zn.z=1),Zn.normalize(),ms.crossVectors(i,Zn),ms.lengthSq()===0&&(Math.abs(i.z)===1?Zn.x+=1e-4:Zn.z+=1e-4,Zn.normalize(),ms.crossVectors(i,Zn)),ms.normalize(),Ua.crossVectors(Zn,ms),s[0]=ms.x,s[4]=Ua.x,s[8]=Zn.x,s[1]=ms.y,s[5]=Ua.y,s[9]=Zn.y,s[2]=ms.z,s[6]=Ua.z,s[10]=Zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],v=i[3],_=i[7],M=i[11],S=i[15],b=s[0],R=s[4],F=s[8],E=s[12],T=s[1],z=s[5],H=s[9],$=s[13],L=s[2],k=s[6],X=s[10],j=s[14],Z=s[3],K=s[7],Q=s[11],ie=s[15];return r[0]=o*b+a*T+l*L+c*Z,r[4]=o*R+a*z+l*k+c*K,r[8]=o*F+a*H+l*X+c*Q,r[12]=o*E+a*$+l*j+c*ie,r[1]=h*b+d*T+u*L+f*Z,r[5]=h*R+d*z+u*k+f*K,r[9]=h*F+d*H+u*X+f*Q,r[13]=h*E+d*$+u*j+f*ie,r[2]=g*b+x*T+m*L+p*Z,r[6]=g*R+x*z+m*k+p*K,r[10]=g*F+x*H+m*X+p*Q,r[14]=g*E+x*$+m*j+p*ie,r[3]=v*b+_*T+M*L+S*Z,r[7]=v*R+_*z+M*k+S*K,r[11]=v*F+_*H+M*X+S*Q,r[15]=v*E+_*$+M*j+S*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*a*u+i*c*u+s*a*f-i*l*f)+x*(+t*l*f-t*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+m*(+t*c*d-t*a*f-r*o*d+i*o*f+r*a*h-i*c*h)+p*(-s*a*h-t*l*d+t*a*u+s*o*d-i*o*u+i*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=d*m*c-x*u*c+x*l*f-a*m*f-d*l*p+a*u*p,_=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,M=h*x*c-g*d*c+g*a*f-o*x*f-h*a*p+o*d*p,S=g*d*l-h*x*l-g*a*u+o*x*u+h*a*m-o*d*m,b=t*v+i*_+s*M+r*S;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/b;return e[0]=v*R,e[1]=(x*u*r-d*m*r-x*s*f+i*m*f+d*s*p-i*u*p)*R,e[2]=(a*m*r-x*l*r+x*s*c-i*m*c-a*s*p+i*l*p)*R,e[3]=(d*l*r-a*u*r-d*s*c+i*u*c+a*s*f-i*l*f)*R,e[4]=_*R,e[5]=(h*m*r-g*u*r+g*s*f-t*m*f-h*s*p+t*u*p)*R,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*R,e[7]=(o*u*r-h*l*r+h*s*c-t*u*c-o*s*f+t*l*f)*R,e[8]=M*R,e[9]=(g*d*r-h*x*r-g*i*f+t*x*f+h*i*p-t*d*p)*R,e[10]=(o*x*r-g*a*r+g*i*c-t*x*c-o*i*p+t*a*p)*R,e[11]=(h*a*r-o*d*r-h*i*c+t*d*c+o*i*f-t*a*f)*R,e[12]=S*R,e[13]=(h*x*s-g*d*s+g*i*u-t*x*u-h*i*m+t*d*m)*R,e[14]=(g*a*s-o*x*s-g*i*l+t*x*l+o*i*m-t*a*m)*R,e[15]=(o*d*s-h*a*s+h*i*l-t*d*l-o*i*u+t*a*u)*R,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,x=o*h,m=o*d,p=a*d,v=l*c,_=l*h,M=l*d,S=i.x,b=i.y,R=i.z;return s[0]=(1-(x+p))*S,s[1]=(f+M)*S,s[2]=(g-_)*S,s[3]=0,s[4]=(f-M)*b,s[5]=(1-(u+p))*b,s[6]=(m+v)*b,s[7]=0,s[8]=(g+_)*R,s[9]=(m-v)*R,s[10]=(1-(u+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements,r=gr.set(s[0],s[1],s[2]).length(),o=gr.set(s[4],s[5],s[6]).length(),a=gr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Mi.copy(this);let c=1/r,h=1/o,d=1/a;return Mi.elements[0]*=c,Mi.elements[1]*=c,Mi.elements[2]*=c,Mi.elements[4]*=h,Mi.elements[5]*=h,Mi.elements[6]*=h,Mi.elements[8]*=d,Mi.elements[9]*=d,Mi.elements[10]*=d,t.setFromRotationMatrix(Mi),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Ji){let l=this.elements,c=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),u=(i+s)/(i-s),f,g;if(a===Ji)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===hl)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Ji){let l=this.elements,c=1/(t-e),h=1/(i-s),d=1/(o-r),u=(t+e)*c,f=(i+s)*h,g,x;if(a===Ji)g=(o+r)*d,x=-2*d;else if(a===hl)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},gr=new P,Mi=new Ge,Iv=new P(0,0,0),Fv=new P(1,1,1),ms=new P,Ua=new P,Zn=new P,ip=new Ge,sp=new Nn,Or=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(en(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-en(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(en(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-en(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(en(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-en(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ip,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sp.setFromEuler(this),this.setFromQuaternion(sp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Or.DEFAULT_ORDER="XYZ";var ml=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Dv=0,rp=new P,xr=new Nn,Wi=new Ge,Na=new P,Po=new P,zv=new P,Uv=new Nn,op=new P(1,0,0),ap=new P(0,1,0),lp=new P(0,0,1),Nv={type:"added"},kv={type:"removed"},Rt=class n extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dv++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new P,t=new Or,i=new Nn,s=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new st}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xr.setFromAxisAngle(e,t),this.quaternion.multiply(xr),this}rotateOnWorldAxis(e,t){return xr.setFromAxisAngle(e,t),this.quaternion.premultiply(xr),this}rotateX(e){return this.rotateOnAxis(op,e)}rotateY(e){return this.rotateOnAxis(ap,e)}rotateZ(e){return this.rotateOnAxis(lp,e)}translateOnAxis(e,t){return rp.copy(e).applyQuaternion(this.quaternion),this.position.add(rp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(op,e)}translateY(e){return this.translateOnAxis(ap,e)}translateZ(e){return this.translateOnAxis(lp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Na.copy(e):Na.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Po.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(Po,Na,this.up):Wi.lookAt(Na,Po,this.up),this.quaternion.setFromRotationMatrix(Wi),s&&(Wi.extractRotation(s.matrixWorld),xr.setFromRotationMatrix(Wi),this.quaternion.premultiply(xr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Nv)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kv)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,e,zv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,Uv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++){let r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}};Rt.DEFAULT_UP=new P(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bi=new P,Xi=new P,uh=new P,qi=new P,vr=new P,_r=new P,cp=new P,dh=new P,fh=new P,ph=new P,ka=!1,Rr=class n{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),bi.subVectors(e,t),s.cross(bi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){bi.subVectors(s,t),Xi.subVectors(i,t),uh.subVectors(e,t);let o=bi.dot(bi),a=bi.dot(Xi),l=bi.dot(uh),c=Xi.dot(Xi),h=Xi.dot(uh),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getUV(e,t,i,s,r,o,a,l){return ka===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ka=!0),this.getInterpolation(e,t,i,s,r,o,a,l)}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,qi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qi.x),l.addScaledVector(o,qi.y),l.addScaledVector(a,qi.z),l)}static isFrontFacing(e,t,i,s){return bi.subVectors(i,t),Xi.subVectors(e,t),bi.cross(Xi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),Xi.subVectors(this.a,this.b),bi.cross(Xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return ka===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ka=!0),n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,o,a;vr.subVectors(s,i),_r.subVectors(r,i),dh.subVectors(e,i);let l=vr.dot(dh),c=_r.dot(dh);if(l<=0&&c<=0)return t.copy(i);fh.subVectors(e,s);let h=vr.dot(fh),d=_r.dot(fh);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(vr,o);ph.subVectors(e,r);let f=vr.dot(ph),g=_r.dot(ph);if(g>=0&&f<=g)return t.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(_r,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return cp.subVectors(r,s),a=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(cp,a);let p=1/(m+x+u);return o=x*p,a=u*p,t.copy(i).addScaledVector(vr,o).addScaledVector(_r,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},gm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gs={h:0,s:0,l:0},Oa={h:0,s:0,l:0};function mh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var te=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=dt.workingColorSpace){if(e=Ru(e,1),t=en(t,0,1),i=en(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=mh(o,r,e+1/3),this.g=mh(o,r,e),this.b=mh(o,r,e-1/3)}return dt.toWorkingColorSpace(this,s),this}setStyle(e,t=gt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){let i=gm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}copyLinearToSRGB(e){return this.r=ih(e.r),this.g=ih(e.g),this.b=ih(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return dt.fromWorkingColorSpace(An.copy(this),e),Math.round(en(An.r*255,0,255))*65536+Math.round(en(An.g*255,0,255))*256+Math.round(en(An.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(An.copy(this),t);let i=An.r,s=An.g,r=An.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=gt){dt.fromWorkingColorSpace(An.copy(this),e);let t=An.r,i=An.g,s=An.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(gs),this.setHSL(gs.h+e,gs.s+t,gs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gs),e.getHSL(Oa);let i=No(gs.h,Oa.h,t),s=No(gs.s,Oa.s,t),r=No(gs.l,Oa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},An=new te;te.NAMES=gm;var Ov=0,Cn=class extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ov++}),this.uuid=Ei(),this.name="",this.type="Material",this.blending=Ii,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Vo,this.blendEquation=Zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=rl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$f,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(i.blending=this.blending),this.side!==Fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Go&&(i.blendSrc=this.blendSrc),this.blendDst!==Vo&&(i.blendDst=this.blendDst),this.blendEquation!==Zs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==rl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$f&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Fe=class extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Yt=new P,Ba=new ae,ot=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Dh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=$i,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix3(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Pi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),s=wt(s,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dh&&(e.usage=this.usage),e}};var qo=class extends ot{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var gl=class extends ot{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Qe=class extends ot{constructor(e,t,i){super(new Float32Array(e),t,i)}};var Bv=0,oi=new Ge,gh=new Rt,yr=new P,Kn=new Rn,Lo=new Rn,hn=new P,vt=class n extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bv++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mm(e)?gl:qo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new st().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,i){return oi.makeTranslation(e,t,i),this.applyMatrix4(oi),this}scale(e,t,i){return oi.makeScale(e,t,i),this.applyMatrix4(oi),this}lookAt(e){return gh.lookAt(e),gh.updateMatrix(),this.applyMatrix4(gh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(e){let t=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Kn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){let i=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Lo.setFromBufferAttribute(a),this.morphTargetsRelative?(hn.addVectors(Kn.min,Lo.min),Kn.expandByPoint(hn),hn.addVectors(Kn.max,Lo.max),Kn.expandByPoint(hn)):(Kn.expandByPoint(Lo.min),Kn.expandByPoint(Lo.max))}Kn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)hn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(hn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)hn.fromBufferAttribute(a,c),l&&(yr.fromBufferAttribute(e,c),hn.add(yr)),s=Math.max(s,i.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ot(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<a;T++)c[T]=new P,h[T]=new P;let d=new P,u=new P,f=new P,g=new ae,x=new ae,m=new ae,p=new P,v=new P;function _(T,z,H){d.fromArray(s,T*3),u.fromArray(s,z*3),f.fromArray(s,H*3),g.fromArray(o,T*2),x.fromArray(o,z*2),m.fromArray(o,H*2),u.sub(d),f.sub(d),x.sub(g),m.sub(g);let $=1/(x.x*m.y-m.x*x.y);isFinite($)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar($),v.copy(f).multiplyScalar(x.x).addScaledVector(u,-m.x).multiplyScalar($),c[T].add(p),c[z].add(p),c[H].add(p),h[T].add(v),h[z].add(v),h[H].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let T=0,z=M.length;T<z;++T){let H=M[T],$=H.start,L=H.count;for(let k=$,X=$+L;k<X;k+=3)_(i[k+0],i[k+1],i[k+2])}let S=new P,b=new P,R=new P,F=new P;function E(T){R.fromArray(r,T*3),F.copy(R);let z=c[T];S.copy(z),S.sub(R.multiplyScalar(R.dot(z))).normalize(),b.crossVectors(F,z);let $=b.dot(h[T])<0?-1:1;l[T*4]=S.x,l[T*4+1]=S.y,l[T*4+2]=S.z,l[T*4+3]=$}for(let T=0,z=M.length;T<z;++T){let H=M[T],$=H.start,L=H.count;for(let k=$,X=$+L;k<X;k+=3)E(i[k+0]),E(i[k+1]),E(i[k+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ot(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new ot(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,i);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hp=new Ge,Xs=new kr,Ha=new Jn,up=new P,Mr=new P,br=new P,Er=new P,xh=new P,Ga=new P,Va=new ae,Wa=new ae,Xa=new ae,dp=new P,fp=new P,pp=new P,qa=new P,Ya=new P,ne=class extends Rt{constructor(e=new vt,t=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(xh.fromBufferAttribute(d,e),o?Ga.addScaledVector(xh,h):Ga.addScaledVector(xh.sub(t),h))}t.add(Ga)}return t}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ha.copy(i.boundingSphere),Ha.applyMatrix4(r),Xs.copy(e.ray).recast(e.near),!(Ha.containsPoint(Xs.origin)===!1&&(Xs.intersectSphere(Ha,up)===null||Xs.origin.distanceToSquared(up)>(e.far-e.near)**2))&&(hp.copy(r).invert(),Xs.copy(e.ray).applyMatrix4(hp),!(i.boundingBox!==null&&Xs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Xs)))}_computeIntersections(e,t,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=v,S=_;M<S;M+=3){let b=a.getX(M),R=a.getX(M+1),F=a.getX(M+2);s=Za(this,p,e,i,c,h,d,b,R,F),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=a.getX(m),_=a.getX(m+1),M=a.getX(m+2);s=Za(this,o,e,i,c,h,d,v,_,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=v,S=_;M<S;M+=3){let b=M,R=M+1,F=M+2;s=Za(this,p,e,i,c,h,d,b,R,F),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=m,_=m+1,M=m+2;s=Za(this,o,e,i,c,h,d,v,_,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Hv(n,e,t,i,s,r,o,a){let l;if(e.side===Zt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Fi,a),l===null)return null;Ya.copy(a),Ya.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Ya);return c<t.near||c>t.far?null:{distance:c,point:Ya.clone(),object:n}}function Za(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Mr),n.getVertexPosition(l,br),n.getVertexPosition(c,Er);let h=Hv(n,e,t,i,Mr,br,Er,qa);if(h){s&&(Va.fromBufferAttribute(s,a),Wa.fromBufferAttribute(s,l),Xa.fromBufferAttribute(s,c),h.uv=Rr.getInterpolation(qa,Mr,br,Er,Va,Wa,Xa,new ae)),r&&(Va.fromBufferAttribute(r,a),Wa.fromBufferAttribute(r,l),Xa.fromBufferAttribute(r,c),h.uv1=Rr.getInterpolation(qa,Mr,br,Er,Va,Wa,Xa,new ae),h.uv2=h.uv1),o&&(dp.fromBufferAttribute(o,a),fp.fromBufferAttribute(o,l),pp.fromBufferAttribute(o,c),h.normal=Rr.getInterpolation(qa,Mr,br,Er,dp,fp,pp,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};Rr.getNormal(Mr,br,Er,d.normal),h.face=d}return h}var li=class n extends vt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(d,2));function g(x,m,p,v,_,M,S,b,R,F,E){let T=M/R,z=S/F,H=M/2,$=S/2,L=b/2,k=R+1,X=F+1,j=0,Z=0,K=new P;for(let Q=0;Q<X;Q++){let ie=Q*z-$;for(let me=0;me<k;me++){let O=me*T-H;K[x]=O*v,K[m]=ie*_,K[p]=L,c.push(K.x,K.y,K.z),K[x]=0,K[m]=0,K[p]=b>0?1:-1,h.push(K.x,K.y,K.z),d.push(me/R),d.push(1-Q/F),j+=1}}for(let Q=0;Q<F;Q++)for(let ie=0;ie<R;ie++){let me=u+ie+k*Q,O=u+ie+k*(Q+1),Y=u+(ie+1)+k*(Q+1),le=u+(ie+1)+k*Q;l.push(me,O,le),l.push(O,Y,le),Z+=6}a.addGroup(f,Z,E),f+=Z,u+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Br(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function zn(n){let e={};for(let t=0;t<n.length;t++){let i=Br(n[t]);for(let s in i)e[s]=i[s]}return e}function Gv(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function xm(n){return n.getRenderTarget()===null?n.outputColorSpace:dt.workingColorSpace}var Ps={clone:Br,merge:zn},Vv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yt=class extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vv,this.fragmentShader=Wv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Br(e.uniforms),this.uniformsGroups=Gv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},xl=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},tn=class extends xl{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Uo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nr*2*Math.atan(Math.tan(Uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Uo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Sr=-90,wr=1,Yo=class extends Rt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(Sr,wr,e,t);s.layers=this.layers,this.add(s);let r=new tn(Sr,wr,e,t);r.layers=this.layers,this.add(r);let o=new tn(Sr,wr,e,t);o.layers=this.layers,this.add(o);let a=new tn(Sr,wr,e,t);a.layers=this.layers,this.add(a);let l=new tn(Sr,wr,e,t);l.layers=this.layers,this.add(l);let c=new tn(Sr,wr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Ji)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===hl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},vl=class extends gn{constructor(e,t,i,s,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Fr,super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zo=class extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(ko("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===js?gt:Hn),this.texture=new vl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Un}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new li(5,5,5),r=new yt({name:"CubemapFromEquirect",uniforms:Br(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:Li});r.uniforms.tEquirect.value=t;let o=new ne(s,r),a=t.minFilter;return t.minFilter===Ms&&(t.minFilter=Un),new Yo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}},vh=new P,Xv=new P,qv=new st,Ki=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=vh.subVectors(i,t).cross(Xv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(vh),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||qv.getNormalMatrix(e),s=this.coplanarPoint(vh).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},qs=new Jn,Ka=new P,Ko=class{constructor(e=new Ki,t=new Ki,i=new Ki,s=new Ki,r=new Ki,o=new Ki){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ji){let i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],v=s[13],_=s[14],M=s[15];if(i[0].setComponents(l-r,u-c,m-f,M-p).normalize(),i[1].setComponents(l+r,u+c,m+f,M+p).normalize(),i[2].setComponents(l+o,u+h,m+g,M+v).normalize(),i[3].setComponents(l-o,u-h,m-g,M-v).normalize(),i[4].setComponents(l-a,u-d,m-x,M-_).normalize(),t===Ji)i[5].setComponents(l+a,u+d,m+x,M+_).normalize();else if(t===hl)i[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qs)}intersectsSprite(e){return qs.center.set(0,0,0),qs.radius=.7071067811865476,qs.applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Ka.x=s.normal.x>0?e.max.x:e.min.x,Ka.y=s.normal.y>0?e.max.y:e.min.y,Ka.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function vm(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Yv(n,e){let t=e.isWebGL2,i=new WeakMap;function s(c,h){let d=c.array,u=c.usage,f=d.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,d,u),c.onUploadCallback();let x;if(d instanceof Float32Array)x=n.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=n.SHORT;else if(d instanceof Uint32Array)x=n.UNSIGNED_INT;else if(d instanceof Int32Array)x=n.INT;else if(d instanceof Int8Array)x=n.BYTE;else if(d instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,d){let u=h.array,f=h._updateRange,g=h.updateRanges;if(n.bindBuffer(d,c),f.count===-1&&g.length===0&&n.bufferSubData(d,0,u),g.length!==0){for(let x=0,m=g.length;x<m;x++){let p=g[x];t?n.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):n.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?n.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):n.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=i.get(c);if(d===void 0)i.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:o,remove:a,update:l}}var Gt=class n extends vt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let v=p*u-o;for(let _=0;_<c;_++){let M=_*d-r;g.push(M,-v,0),x.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){let _=v+c*p,M=v+c*(p+1),S=v+1+c*(p+1),b=v+1+c*p;f.push(_,M,b),f.push(M,S,b)}this.setIndex(f),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(x,3)),this.setAttribute("uv",new Qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Zv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$v=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Qv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,t_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,i_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,s_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,o_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,a_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,l_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,h_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,d_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,p_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,m_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,g_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,x_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,v_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,__=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,y_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,E_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,S_="gl_FragColor = linearToOutputTexel( gl_FragColor );",w_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,T_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,A_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,R_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,P_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,L_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,I_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,F_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,D_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,z_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,U_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,N_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,H_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,G_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,V_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,X_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,q_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Y_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Z_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,K_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ey=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ty=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ny=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ry=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,oy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ay=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ly=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,cy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,hy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,uy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,py=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,my=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_y=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,My=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,by=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ey=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ty=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ay=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ry=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Py=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ly=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Iy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ny=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ky=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Oy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,By=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$y=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,eM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,iM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_M=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,EM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:Zv,alphahash_pars_fragment:Kv,alphamap_fragment:$v,alphamap_pars_fragment:Jv,alphatest_fragment:jv,alphatest_pars_fragment:Qv,aomap_fragment:e_,aomap_pars_fragment:t_,batching_pars_vertex:n_,batching_vertex:i_,begin_vertex:s_,beginnormal_vertex:r_,bsdfs:o_,iridescence_fragment:a_,bumpmap_pars_fragment:l_,clipping_planes_fragment:c_,clipping_planes_pars_fragment:h_,clipping_planes_pars_vertex:u_,clipping_planes_vertex:d_,color_fragment:f_,color_pars_fragment:p_,color_pars_vertex:m_,color_vertex:g_,common:x_,cube_uv_reflection_fragment:v_,defaultnormal_vertex:__,displacementmap_pars_vertex:y_,displacementmap_vertex:M_,emissivemap_fragment:b_,emissivemap_pars_fragment:E_,colorspace_fragment:S_,colorspace_pars_fragment:w_,envmap_fragment:T_,envmap_common_pars_fragment:A_,envmap_pars_fragment:R_,envmap_pars_vertex:C_,envmap_physical_pars_fragment:H_,envmap_vertex:P_,fog_vertex:L_,fog_pars_vertex:I_,fog_fragment:F_,fog_pars_fragment:D_,gradientmap_pars_fragment:z_,lightmap_fragment:U_,lightmap_pars_fragment:N_,lights_lambert_fragment:k_,lights_lambert_pars_fragment:O_,lights_pars_begin:B_,lights_toon_fragment:G_,lights_toon_pars_fragment:V_,lights_phong_fragment:W_,lights_phong_pars_fragment:X_,lights_physical_fragment:q_,lights_physical_pars_fragment:Y_,lights_fragment_begin:Z_,lights_fragment_maps:K_,lights_fragment_end:$_,logdepthbuf_fragment:J_,logdepthbuf_pars_fragment:j_,logdepthbuf_pars_vertex:Q_,logdepthbuf_vertex:ey,map_fragment:ty,map_pars_fragment:ny,map_particle_fragment:iy,map_particle_pars_fragment:sy,metalnessmap_fragment:ry,metalnessmap_pars_fragment:oy,morphcolor_vertex:ay,morphnormal_vertex:ly,morphtarget_pars_vertex:cy,morphtarget_vertex:hy,normal_fragment_begin:uy,normal_fragment_maps:dy,normal_pars_fragment:fy,normal_pars_vertex:py,normal_vertex:my,normalmap_pars_fragment:gy,clearcoat_normal_fragment_begin:xy,clearcoat_normal_fragment_maps:vy,clearcoat_pars_fragment:_y,iridescence_pars_fragment:yy,opaque_fragment:My,packing:by,premultiplied_alpha_fragment:Ey,project_vertex:Sy,dithering_fragment:wy,dithering_pars_fragment:Ty,roughnessmap_fragment:Ay,roughnessmap_pars_fragment:Ry,shadowmap_pars_fragment:Cy,shadowmap_pars_vertex:Py,shadowmap_vertex:Ly,shadowmask_pars_fragment:Iy,skinbase_vertex:Fy,skinning_pars_vertex:Dy,skinning_vertex:zy,skinnormal_vertex:Uy,specularmap_fragment:Ny,specularmap_pars_fragment:ky,tonemapping_fragment:Oy,tonemapping_pars_fragment:By,transmission_fragment:Hy,transmission_pars_fragment:Gy,uv_pars_fragment:Vy,uv_pars_vertex:Wy,uv_vertex:Xy,worldpos_vertex:qy,background_vert:Yy,background_frag:Zy,backgroundCube_vert:Ky,backgroundCube_frag:$y,cube_vert:Jy,cube_frag:jy,depth_vert:Qy,depth_frag:eM,distanceRGBA_vert:tM,distanceRGBA_frag:nM,equirect_vert:iM,equirect_frag:sM,linedashed_vert:rM,linedashed_frag:oM,meshbasic_vert:aM,meshbasic_frag:lM,meshlambert_vert:cM,meshlambert_frag:hM,meshmatcap_vert:uM,meshmatcap_frag:dM,meshnormal_vert:fM,meshnormal_frag:pM,meshphong_vert:mM,meshphong_frag:gM,meshphysical_vert:xM,meshphysical_frag:vM,meshtoon_vert:_M,meshtoon_frag:yM,points_vert:MM,points_frag:bM,shadow_vert:EM,shadow_frag:SM,sprite_vert:wM,sprite_frag:TM},ue={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Ci={basic:{uniforms:zn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:zn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new te(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:zn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:zn([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:zn([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new te(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:zn([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:zn([ue.points,ue.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:zn([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:zn([ue.common,ue.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:zn([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:zn([ue.sprite,ue.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:zn([ue.common,ue.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:zn([ue.lights,ue.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Ci.physical={uniforms:zn([Ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var $a={r:0,b:0,g:0};function AM(n,e,t,i,s,r,o){let a=new te(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(m,p){let v=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?x(a,l):_&&_.isColor&&(x(_,1),v=!0);let M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Vl)?(h===void 0&&(h=new ne(new li(1,1,1),new yt({name:"BackgroundCubeMaterial",uniforms:Br(Ci.backgroundCube.uniforms),vertexShader:Ci.backgroundCube.vertexShader,fragmentShader:Ci.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=dt.getTransfer(_.colorSpace)!==Tt,(d!==_||u!==_.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=_,u=_.version,f=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ne(new Gt(2,2),new yt({name:"BackgroundMaterial",uniforms:Br(Ci.background.uniforms),vertexShader:Ci.background.vertexShader,fragmentShader:Ci.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=dt.getTransfer(_.colorSpace)!==Tt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||u!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=_,u=_.version,f=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,p){m.getRGB($a,xm(n)),i.buffers.color.setClear($a.r,$a.g,$a.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(a,l)},render:g}}function RM(n,e,t,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=m(null),c=l,h=!1;function d(L,k,X,j,Z){let K=!1;if(o){let Q=x(j,X,k);c!==Q&&(c=Q,f(c.object)),K=p(L,j,X,Z),K&&v(L,j,X,Z)}else{let Q=k.wireframe===!0;(c.geometry!==j.id||c.program!==X.id||c.wireframe!==Q)&&(c.geometry=j.id,c.program=X.id,c.wireframe=Q,K=!0)}Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(K||h)&&(h=!1,F(L,k,X,j),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function u(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function f(L){return i.isWebGL2?n.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return i.isWebGL2?n.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function x(L,k,X){let j=X.wireframe===!0,Z=a[L.id];Z===void 0&&(Z={},a[L.id]=Z);let K=Z[k.id];K===void 0&&(K={},Z[k.id]=K);let Q=K[j];return Q===void 0&&(Q=m(u()),K[j]=Q),Q}function m(L){let k=[],X=[],j=[];for(let Z=0;Z<s;Z++)k[Z]=0,X[Z]=0,j[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:X,attributeDivisors:j,object:L,attributes:{},index:null}}function p(L,k,X,j){let Z=c.attributes,K=k.attributes,Q=0,ie=X.getAttributes();for(let me in ie)if(ie[me].location>=0){let Y=Z[me],le=K[me];if(le===void 0&&(me==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),me==="instanceColor"&&L.instanceColor&&(le=L.instanceColor)),Y===void 0||Y.attribute!==le||le&&Y.data!==le.data)return!0;Q++}return c.attributesNum!==Q||c.index!==j}function v(L,k,X,j){let Z={},K=k.attributes,Q=0,ie=X.getAttributes();for(let me in ie)if(ie[me].location>=0){let Y=K[me];Y===void 0&&(me==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),me==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor));let le={};le.attribute=Y,Y&&Y.data&&(le.data=Y.data),Z[me]=le,Q++}c.attributes=Z,c.attributesNum=Q,c.index=j}function _(){let L=c.newAttributes;for(let k=0,X=L.length;k<X;k++)L[k]=0}function M(L){S(L,0)}function S(L,k){let X=c.newAttributes,j=c.enabledAttributes,Z=c.attributeDivisors;X[L]=1,j[L]===0&&(n.enableVertexAttribArray(L),j[L]=1),Z[L]!==k&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,k),Z[L]=k)}function b(){let L=c.newAttributes,k=c.enabledAttributes;for(let X=0,j=k.length;X<j;X++)k[X]!==L[X]&&(n.disableVertexAttribArray(X),k[X]=0)}function R(L,k,X,j,Z,K,Q){Q===!0?n.vertexAttribIPointer(L,k,X,Z,K):n.vertexAttribPointer(L,k,X,j,Z,K)}function F(L,k,X,j){if(i.isWebGL2===!1&&(L.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let Z=j.attributes,K=X.getAttributes(),Q=k.defaultAttributeValues;for(let ie in K){let me=K[ie];if(me.location>=0){let O=Z[ie];if(O===void 0&&(ie==="instanceMatrix"&&L.instanceMatrix&&(O=L.instanceMatrix),ie==="instanceColor"&&L.instanceColor&&(O=L.instanceColor)),O!==void 0){let Y=O.normalized,le=O.itemSize,_e=t.get(O);if(_e===void 0)continue;let be=_e.buffer,ze=_e.type,Ie=_e.bytesPerElement,Ae=i.isWebGL2===!0&&(ze===n.INT||ze===n.UNSIGNED_INT||O.gpuType===rm);if(O.isInterleavedBufferAttribute){let Xe=O.data,B=Xe.stride,jt=O.offset;if(Xe.isInstancedInterleavedBuffer){for(let Re=0;Re<me.locationSize;Re++)S(me.location+Re,Xe.meshPerAttribute);L.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let Re=0;Re<me.locationSize;Re++)M(me.location+Re);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Re=0;Re<me.locationSize;Re++)R(me.location+Re,le/me.locationSize,ze,Y,B*Ie,(jt+le/me.locationSize*Re)*Ie,Ae)}else{if(O.isInstancedBufferAttribute){for(let Xe=0;Xe<me.locationSize;Xe++)S(me.location+Xe,O.meshPerAttribute);L.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let Xe=0;Xe<me.locationSize;Xe++)M(me.location+Xe);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Xe=0;Xe<me.locationSize;Xe++)R(me.location+Xe,le/me.locationSize,ze,Y,le*Ie,le/me.locationSize*Xe*Ie,Ae)}}else if(Q!==void 0){let Y=Q[ie];if(Y!==void 0)switch(Y.length){case 2:n.vertexAttrib2fv(me.location,Y);break;case 3:n.vertexAttrib3fv(me.location,Y);break;case 4:n.vertexAttrib4fv(me.location,Y);break;default:n.vertexAttrib1fv(me.location,Y)}}}}b()}function E(){H();for(let L in a){let k=a[L];for(let X in k){let j=k[X];for(let Z in j)g(j[Z].object),delete j[Z];delete k[X]}delete a[L]}}function T(L){if(a[L.id]===void 0)return;let k=a[L.id];for(let X in k){let j=k[X];for(let Z in j)g(j[Z].object),delete j[Z];delete k[X]}delete a[L.id]}function z(L){for(let k in a){let X=a[k];if(X[L.id]===void 0)continue;let j=X[L.id];for(let Z in j)g(j[Z].object),delete j[Z];delete X[L.id]}}function H(){$(),h=!0,c!==l&&(c=l,f(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:H,resetDefaultState:$,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:z,initAttributes:_,enableAttribute:M,disableUnusedAttributes:b}}function CM(n,e,t,i){let s=i.isWebGL2,r;function o(h){r=h}function a(h,d){n.drawArrays(r,h,d),t.update(d,r,1)}function l(h,d,u){if(u===0)return;let f,g;if(s)f=n,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,d,u),t.update(d,r,u)}function c(h,d,u){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=d[x];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function PM(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=u>0,M=o||e.has("OES_texture_float"),S=_&&M,b=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:M,floatVertexTextures:S,maxSamples:b}}function LM(n){let e=this,t=null,i=0,s=!1,r=!1,o=new Ki,a=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let v=r?0:i,_=v*4,M=p.clippingState||null;l.value=M,M=h(g,u,_,f);for(let S=0;S!==_;++S)M[S]=t[S];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,M=f;_!==x;++_,M+=4)o.copy(d[_]).applyMatrix4(v,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function IM(n){let e=new WeakMap;function t(o,a){return a===Ih?o.mapping=Fr:a===Fh&&(o.mapping=Dr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ih||a===Fh)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Zo(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}var Es=class extends xl{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Cr=4,mp=[.125,.215,.35,.446,.526,.582],Ks=20,_h=new Es,gp=new te,yh=null,Mh=0,bh=0,Ys=(1+Math.sqrt(5))/2,Tr=1/Ys,xp=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Ys,Tr),new P(0,Ys,-Tr),new P(Tr,0,Ys),new P(-Tr,0,Ys),new P(Ys,Tr,0),new P(-Ys,Tr,0)],Hr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){yh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),bh=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_p(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(yh,Mh,bh),e.scissorTest=!1,Ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fr||e.mapping===Dr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yh=this._renderer.getRenderTarget(),Mh=this._renderer.getActiveCubeFace(),bh=this._renderer.getActiveMipmapLevel();let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:Gn,format:ai,colorSpace:nn,depthBuffer:!1},s=vp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vp(e,t,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=FM(r)),this._blurMaterial=DM(r,e,t)}return s}_compileMaterial(e){let t=new ne(this._lodPlanes[0],e);this._renderer.compile(t,_h)}_sceneToCubeUV(e,t,i,s){let a=new tn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(gp),h.toneMapping=_s,h.autoClear=!1;let f=new Fe({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),g=new ne(new li,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(gp),x=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let _=this._cubeSize;Ja(s,v*_,p>2?_:0,_,_),h.setRenderTarget(s),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Fr||e.mapping===Dr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_p());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Ja(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,_h)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=xp[(s-1)%xp.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new ne(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ks-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ks;m>Ks&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ks}`);let p=[],v=0;for(let R=0;R<Ks;++R){let F=R/x,E=Math.exp(-F*F/2);p.push(E),R===0?v+=E:R<m&&(v+=2*E)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-i;let M=this._sizeLods[s],S=3*M*(s>_-Cr?s-_+Cr:0),b=4*(this._cubeSize-M);Ja(t,S,b,3*M,2*M),l.setRenderTarget(t),l.render(d,_h)}};function FM(n){let e=[],t=[],i=[],s=n,r=n-Cr+1+mp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Cr?l=mp[o-n+Cr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*f),_=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let b=0;b<f;b++){let R=b%3*2/3-1,F=b>2?0:-1,E=[R,F,0,R+2/3,F,0,R+2/3,F+1,0,R,F,0,R+2/3,F+1,0,R,F+1,0];v.set(E,x*g*b),_.set(u,m*g*b);let T=[b,b,b,b,b,b];M.set(T,p*g*b)}let S=new vt;S.setAttribute("position",new ot(v,x)),S.setAttribute("uv",new ot(_,m)),S.setAttribute("faceIndex",new ot(M,p)),e.push(S),s>Cr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function vp(n,e,t){let i=new xn(n,e,t);return i.texture.mapping=Vl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ja(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function DM(n,e,t){let i=new Float32Array(Ks),s=new P(0,1,0);return new yt({name:"SphericalGaussianBlur",defines:{n:Ks,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function _p(){return new yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function yp(){return new yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Cu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zM(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ih||l===Fh,h=l===Fr||l===Dr;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new Hr(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{let d=a.image;if(c&&d&&d.height>0||h&&d&&s(d)){t===null&&(t=new Hr(n));let u=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function UM(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){let s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function NM(n,e,t,i){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);for(let g in u.morphAttributes){let x=u.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let g in u)e.update(u[g],n.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],n.ARRAY_BUFFER)}}function c(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let _=0,M=v.length;_<M;_+=3){let S=v[_+0],b=v[_+1],R=v[_+2];u.push(S,b,b,R,R,S)}}else if(g!==void 0){let v=g.array;x=g.version;for(let _=0,M=v.length/3-1;_<M;_+=3){let S=_+0,b=_+1,R=_+2;u.push(S,b,b,R,R,S)}}else return;let m=new(mm(u)?gl:qo)(u,1);m.version=x;let p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function kM(n,e,t,i){let s=i.isWebGL2,r;function o(f){r=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,g){n.drawElements(r,g,a,f*l),t.update(g,r,1)}function d(f,g,x){if(x===0)return;let m,p;if(s)m=n,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*l,x),t.update(g,r,x)}function u(f,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,x);let p=0;for(let v=0;v<x;v++)p+=g[v];t.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function OM(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function BM(n,e){return n[0]-e[0]}function HM(n,e){return Math.abs(e[1])-Math.abs(n[1])}function GM(n,e,t){let i={},s=new Float32Array(8),r=new WeakMap,o=new At,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){let u=c.morphTargetInfluences;if(e.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0,x=r.get(h);if(x===void 0||x.count!==g){let L=function(){H.dispose(),r.delete(h),h.removeEventListener("dispose",L)};x!==void 0&&x.texture.dispose();let v=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],F=0;v===!0&&(F=1),_===!0&&(F=2),M===!0&&(F=3);let E=h.attributes.position.count*F,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let z=new Float32Array(E*T*4*g),H=new pl(z,E,T,g);H.type=$i,H.needsUpdate=!0;let $=F*4;for(let k=0;k<g;k++){let X=S[k],j=b[k],Z=R[k],K=E*T*4*k;for(let Q=0;Q<X.count;Q++){let ie=Q*$;v===!0&&(o.fromBufferAttribute(X,Q),z[K+ie+0]=o.x,z[K+ie+1]=o.y,z[K+ie+2]=o.z,z[K+ie+3]=0),_===!0&&(o.fromBufferAttribute(j,Q),z[K+ie+4]=o.x,z[K+ie+5]=o.y,z[K+ie+6]=o.z,z[K+ie+7]=0),M===!0&&(o.fromBufferAttribute(Z,Q),z[K+ie+8]=o.x,z[K+ie+9]=o.y,z[K+ie+10]=o.z,z[K+ie+11]=Z.itemSize===4?o.w:1)}}x={count:g,texture:H,size:new ae(E,T)},r.set(h,x),h.addEventListener("dispose",L)}let m=0;for(let v=0;v<u.length;v++)m+=u[v];let p=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(n,"morphTargetBaseInfluence",p),d.getUniforms().setValue(n,"morphTargetInfluences",u),d.getUniforms().setValue(n,"morphTargetsTexture",x.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{let f=u===void 0?0:u.length,g=i[h.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];i[h.id]=g}for(let _=0;_<f;_++){let M=g[_];M[0]=_,M[1]=u[_]}g.sort(HM);for(let _=0;_<8;_++)_<f&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(BM);let x=h.morphAttributes.position,m=h.morphAttributes.normal,p=0;for(let _=0;_<8;_++){let M=a[_],S=M[0],b=M[1];S!==Number.MAX_SAFE_INTEGER&&b?(x&&h.getAttribute("morphTarget"+_)!==x[S]&&h.setAttribute("morphTarget"+_,x[S]),m&&h.getAttribute("morphNormal"+_)!==m[S]&&h.setAttribute("morphNormal"+_,m[S]),s[_]=b,p+=b):(x&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),m&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),s[_]=0)}let v=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(n,"morphTargetBaseInfluence",v),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function VM(n,e,t,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var _l=class extends gn{constructor(e,t,i,s,r,o,a,l,c,h){if(h=h!==void 0?h:Js,h!==Js&&h!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Js&&(i=xs),i===void 0&&h===zr&&(i=$s),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Qt,this.minFilter=l!==void 0?l:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},_m=new gn,ym=new _l(1,1);ym.compareFunction=pm;var Mm=new pl,bm=new kh,Em=new vl,Mp=[],bp=[],Ep=new Float32Array(16),Sp=new Float32Array(9),wp=new Float32Array(4);function $r(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Mp[s];if(r===void 0&&(r=new Float32Array(s),Mp[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function sn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function rn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Yl(n,e){let t=bp[e];t===void 0&&(t=new Int32Array(e),bp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function WM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function XM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2fv(this.addr,e),rn(t,e)}}function qM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;n.uniform3fv(this.addr,e),rn(t,e)}}function YM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4fv(this.addr,e),rn(t,e)}}function ZM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,i))return;wp.set(i),n.uniformMatrix2fv(this.addr,!1,wp),rn(t,i)}}function KM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,i))return;Sp.set(i),n.uniformMatrix3fv(this.addr,!1,Sp),rn(t,i)}}function $M(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(sn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(sn(t,i))return;Ep.set(i),n.uniformMatrix4fv(this.addr,!1,Ep),rn(t,i)}}function JM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function jM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2iv(this.addr,e),rn(t,e)}}function QM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3iv(this.addr,e),rn(t,e)}}function eb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4iv(this.addr,e),rn(t,e)}}function tb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function nb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;n.uniform2uiv(this.addr,e),rn(t,e)}}function ib(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;n.uniform3uiv(this.addr,e),rn(t,e)}}function sb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;n.uniform4uiv(this.addr,e),rn(t,e)}}function rb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?ym:_m;t.setTexture2D(e||r,s)}function ob(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||bm,s)}function ab(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Em,s)}function lb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Mm,s)}function cb(n){switch(n){case 5126:return WM;case 35664:return XM;case 35665:return qM;case 35666:return YM;case 35674:return ZM;case 35675:return KM;case 35676:return $M;case 5124:case 35670:return JM;case 35667:case 35671:return jM;case 35668:case 35672:return QM;case 35669:case 35673:return eb;case 5125:return tb;case 36294:return nb;case 36295:return ib;case 36296:return sb;case 35678:case 36198:case 36298:case 36306:case 35682:return rb;case 35679:case 36299:case 36307:return ob;case 35680:case 36300:case 36308:case 36293:return ab;case 36289:case 36303:case 36311:case 36292:return lb}}function hb(n,e){n.uniform1fv(this.addr,e)}function ub(n,e){let t=$r(e,this.size,2);n.uniform2fv(this.addr,t)}function db(n,e){let t=$r(e,this.size,3);n.uniform3fv(this.addr,t)}function fb(n,e){let t=$r(e,this.size,4);n.uniform4fv(this.addr,t)}function pb(n,e){let t=$r(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function mb(n,e){let t=$r(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function gb(n,e){let t=$r(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function xb(n,e){n.uniform1iv(this.addr,e)}function vb(n,e){n.uniform2iv(this.addr,e)}function _b(n,e){n.uniform3iv(this.addr,e)}function yb(n,e){n.uniform4iv(this.addr,e)}function Mb(n,e){n.uniform1uiv(this.addr,e)}function bb(n,e){n.uniform2uiv(this.addr,e)}function Eb(n,e){n.uniform3uiv(this.addr,e)}function Sb(n,e){n.uniform4uiv(this.addr,e)}function wb(n,e,t){let i=this.cache,s=e.length,r=Yl(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||_m,r[o])}function Tb(n,e,t){let i=this.cache,s=e.length,r=Yl(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||bm,r[o])}function Ab(n,e,t){let i=this.cache,s=e.length,r=Yl(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Em,r[o])}function Rb(n,e,t){let i=this.cache,s=e.length,r=Yl(t,s);sn(i,r)||(n.uniform1iv(this.addr,r),rn(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Mm,r[o])}function Cb(n){switch(n){case 5126:return hb;case 35664:return ub;case 35665:return db;case 35666:return fb;case 35674:return pb;case 35675:return mb;case 35676:return gb;case 5124:case 35670:return xb;case 35667:case 35671:return vb;case 35668:case 35672:return _b;case 35669:case 35673:return yb;case 5125:return Mb;case 36294:return bb;case 36295:return Eb;case 36296:return Sb;case 35678:case 36198:case 36298:case 36306:case 35682:return wb;case 35679:case 36299:case 36307:return Tb;case 35680:case 36300:case 36308:case 36293:return Ab;case 36289:case 36303:case 36311:case 36292:return Rb}}var Oh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=cb(t.type)}},Bh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cb(t.type)}},Hh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],i)}}},Eh=/(\w+)(\])?(\[|\.)?/g;function Tp(n,e){n.seq.push(e),n.map[e.id]=e}function Pb(n,e,t){let i=n.name,s=i.length;for(Eh.lastIndex=0;;){let r=Eh.exec(i),o=Eh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Tp(t,c===void 0?new Oh(a,n,e):new Bh(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Hh(a),Tp(t,d)),t=d}}}var Ir=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Pb(r,o,this)}}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&i.push(o)}return i}};function Ap(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Lb=37297,Ib=0;function Fb(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Db(n){let e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(n),i;switch(e===t?i="":e===cl&&t===ll?i="LinearDisplayP3ToLinearSRGB":e===ll&&t===cl&&(i="LinearSRGBToLinearDisplayP3"),n){case nn:case Xl:return[i,"LinearTransferOETF"];case gt:case Au:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Rp(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Fb(n.getShaderSource(e),o)}else return s}function zb(n,e){let t=Db(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Ub(n,e){let t;switch(e){case yu:t="Linear";break;case Mu:t="Reinhard";break;case bu:t="OptimizedCineon";break;case oa:t="ACESFilmic";break;case Eu:t="AgX";break;case qx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Nb(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pr).join(`
`)}function kb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Pr).join(`
`)}function Ob(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Bb(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Pr(n){return n!==""}function Cp(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Hb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(n){return n.replace(Hb,Vb)}var Gb=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Vb(n,e){let t=je[e];if(t===void 0){let i=Gb.get(e);if(i!==void 0)t=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Gh(t)}var Wb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lp(n){return n.replace(Wb,Xb)}function Xb(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ip(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qb(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Gl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===gu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Zi&&(e="SHADOWMAP_TYPE_VSM"),e}function Yb(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Fr:case Dr:e="ENVMAP_TYPE_CUBE";break;case Vl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Zb(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Dr:e="ENVMAP_MODE_REFRACTION";break}return e}function Kb(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case _u:e="ENVMAP_BLENDING_MULTIPLY";break;case Wx:e="ENVMAP_BLENDING_MIX";break;case Xx:e="ENVMAP_BLENDING_ADD";break}return e}function $b(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Jb(n,e,t,i){let s=n.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=qb(t),c=Yb(t),h=Zb(t),d=Kb(t),u=$b(t),f=t.isWebGL2?"":Nb(t),g=kb(t),x=Ob(r),m=s.createProgram(),p,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Pr).join(`
`),p.length>0&&(p+=`
`),v=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Pr).join(`
`),v.length>0&&(v+=`
`)):(p=[Ip(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),v=[f,Ip(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_s?"#define TONE_MAPPING":"",t.toneMapping!==_s?je.tonemapping_pars_fragment:"",t.toneMapping!==_s?Ub("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,zb("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pr).join(`
`)),o=Gh(o),o=Cp(o,t),o=Pp(o,t),a=Gh(a),a=Cp(a,t),a=Pp(a,t),o=Lp(o),a=Lp(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Jf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let M=_+p+o,S=_+v+a,b=Ap(s,s.VERTEX_SHADER,M),R=Ap(s,s.FRAGMENT_SHADER,S);s.attachShader(m,b),s.attachShader(m,R),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function F(H){if(n.debug.checkShaderErrors){let $=s.getProgramInfoLog(m).trim(),L=s.getShaderInfoLog(b).trim(),k=s.getShaderInfoLog(R).trim(),X=!0,j=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,b,R);else{let Z=Rp(s,b,"vertex"),K=Rp(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+Z+`
`+K)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(L===""||k==="")&&(j=!1);j&&(H.diagnostics={runnable:X,programLog:$,vertexShader:{log:L,prefix:p},fragmentShader:{log:k,prefix:v}})}s.deleteShader(b),s.deleteShader(R),E=new Ir(s,m),T=Bb(s,m)}let E;this.getUniforms=function(){return E===void 0&&F(this),E};let T;this.getAttributes=function(){return T===void 0&&F(this),T};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(m,Lb)),z},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ib++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=R,this}var jb=0,Vh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Wh(e),t.set(e,i)),i}},Wh=class{constructor(e){this.id=jb++,this.code=e,this.usedTimes=0}};function Qb(n,e,t,i,s,r,o){let a=new ml,l=new Vh,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return E===0?"uv":`uv${E}`}function m(E,T,z,H,$){let L=H.fog,k=$.geometry,X=E.isMeshStandardMaterial?H.environment:null,j=(E.isMeshStandardMaterial?t:e).get(E.envMap||X),Z=j&&j.mapping===Vl?j.image.height:null,K=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let Q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ie=Q!==void 0?Q.length:0,me=0;k.morphAttributes.position!==void 0&&(me=1),k.morphAttributes.normal!==void 0&&(me=2),k.morphAttributes.color!==void 0&&(me=3);let O,Y,le,_e;if(K){let In=Ci[K];O=In.vertexShader,Y=In.fragmentShader}else O=E.vertexShader,Y=E.fragmentShader,l.update(E),le=l.getVertexShaderID(E),_e=l.getFragmentShaderID(E);let be=n.getRenderTarget(),ze=$.isInstancedMesh===!0,Ie=$.isBatchedMesh===!0,Ae=!!E.map,Xe=!!E.matcap,B=!!j,jt=!!E.aoMap,Re=!!E.lightMap,Ue=!!E.bumpMap,ve=!!E.normalMap,ut=!!E.displacementMap,Ye=!!E.emissiveMap,C=!!E.metalnessMap,w=!!E.roughnessMap,G=E.anisotropy>0,re=E.clearcoat>0,se=E.iridescence>0,oe=E.sheen>0,we=E.transmission>0,ge=G&&!!E.anisotropyMap,ye=re&&!!E.clearcoatMap,Oe=re&&!!E.clearcoatNormalMap,et=re&&!!E.clearcoatRoughnessMap,ee=se&&!!E.iridescenceMap,St=se&&!!E.iridescenceThicknessMap,rt=oe&&!!E.sheenColorMap,qe=oe&&!!E.sheenRoughnessMap,Le=!!E.specularMap,Me=!!E.specularColorMap,Je=!!E.specularIntensityMap,bt=we&&!!E.transmissionMap,Bt=we&&!!E.thicknessMap,nt=!!E.gradientMap,he=!!E.alphaMap,I=E.alphaTest>0,fe=!!E.alphaHash,pe=!!E.extensions,He=!!k.attributes.uv1,Ne=!!k.attributes.uv2,Pt=!!k.attributes.uv3,Lt=_s;return E.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(Lt=n.toneMapping),{isWebGL2:h,shaderID:K,shaderType:E.type,shaderName:E.name,vertexShader:O,fragmentShader:Y,defines:E.defines,customVertexShaderID:le,customFragmentShaderID:_e,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Ie,instancing:ze,instancingColor:ze&&$.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:be===null?n.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:nn,map:Ae,matcap:Xe,envMap:B,envMapMode:B&&j.mapping,envMapCubeUVHeight:Z,aoMap:jt,lightMap:Re,bumpMap:Ue,normalMap:ve,displacementMap:u&&ut,emissiveMap:Ye,normalMapObjectSpace:ve&&E.normalMapType===rv,normalMapTangentSpace:ve&&E.normalMapType===Tu,metalnessMap:C,roughnessMap:w,anisotropy:G,anisotropyMap:ge,clearcoat:re,clearcoatMap:ye,clearcoatNormalMap:Oe,clearcoatRoughnessMap:et,iridescence:se,iridescenceMap:ee,iridescenceThicknessMap:St,sheen:oe,sheenColorMap:rt,sheenRoughnessMap:qe,specularMap:Le,specularColorMap:Me,specularIntensityMap:Je,transmission:we,transmissionMap:bt,thicknessMap:Bt,gradientMap:nt,opaque:E.transparent===!1&&E.blending===Ii,alphaMap:he,alphaTest:I,alphaHash:fe,combine:E.combine,mapUv:Ae&&x(E.map.channel),aoMapUv:jt&&x(E.aoMap.channel),lightMapUv:Re&&x(E.lightMap.channel),bumpMapUv:Ue&&x(E.bumpMap.channel),normalMapUv:ve&&x(E.normalMap.channel),displacementMapUv:ut&&x(E.displacementMap.channel),emissiveMapUv:Ye&&x(E.emissiveMap.channel),metalnessMapUv:C&&x(E.metalnessMap.channel),roughnessMapUv:w&&x(E.roughnessMap.channel),anisotropyMapUv:ge&&x(E.anisotropyMap.channel),clearcoatMapUv:ye&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:St&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:qe&&x(E.sheenRoughnessMap.channel),specularMapUv:Le&&x(E.specularMap.channel),specularColorMapUv:Me&&x(E.specularColorMap.channel),specularIntensityMapUv:Je&&x(E.specularIntensityMap.channel),transmissionMapUv:bt&&x(E.transmissionMap.channel),thicknessMapUv:Bt&&x(E.thicknessMap.channel),alphaMapUv:he&&x(E.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ve||G),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:He,vertexUv2s:Ne,vertexUv3s:Pt,pointsUvs:$.isPoints===!0&&!!k.attributes.uv&&(Ae||he),fog:!!L,useFog:E.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:$.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:me,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:Lt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ae&&E.map.isVideoTexture===!0&&dt.getTransfer(E.map.colorSpace)===Tt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===zt,flipSided:E.side===Zt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:pe&&E.extensions.derivatives===!0,extensionFragDepth:pe&&E.extensions.fragDepth===!0,extensionDrawBuffers:pe&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:pe&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:pe&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function p(E){let T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(let z in E.defines)T.push(z),T.push(E.defines[z]);return E.isRawShaderMaterial===!1&&(v(T,E),_(T,E),T.push(n.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function v(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function _(E,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function M(E){let T=g[E.type],z;if(T){let H=Ci[T];z=Ps.clone(H.uniforms)}else z=E.uniforms;return z}function S(E,T){let z;for(let H=0,$=c.length;H<$;H++){let L=c[H];if(L.cacheKey===T){z=L,++z.usedTimes;break}}return z===void 0&&(z=new Jb(n,T,E,r),c.push(z)),z}function b(E){if(--E.usedTimes===0){let T=c.indexOf(E);c[T]=c[c.length-1],c.pop(),E.destroy()}}function R(E){l.remove(E)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:S,releaseProgram:b,releaseShaderCache:R,programs:c,dispose:F}}function e1(){let n=new WeakMap;function e(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function t(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function t1(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Fp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Dp(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,u,f,g,x,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),e++,p}function a(d,u,f,g,x,m){let p=o(d,u,f,g,x,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,u,f,g,x,m){let p=o(d,u,f,g,x,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||t1),i.length>1&&i.sort(u||Fp),s.length>1&&s.sort(u||Fp)}function h(){for(let d=e,u=n.length;d<u;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function n1(){let n=new WeakMap;function e(i,s){let r=n.get(i),o;return r===void 0?(o=new Dp,n.set(i,[o])):s>=r.length?(o=new Dp,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function i1(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new te};break;case"SpotLight":t={position:new P,direction:new P,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new te,groundColor:new te};break;case"RectAreaLight":t={color:new te,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function s1(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var r1=0;function o1(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function a1(n,e){let t=new i1,i=s1(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new P);let r=new P,o=new Ge,a=new Ge;function l(h,d){let u=0,f=0,g=0;for(let H=0;H<9;H++)s.probe[H].set(0,0,0);let x=0,m=0,p=0,v=0,_=0,M=0,S=0,b=0,R=0,F=0,E=0;h.sort(o1);let T=d===!0?Math.PI:1;for(let H=0,$=h.length;H<$;H++){let L=h[H],k=L.color,X=L.intensity,j=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=k.r*X*T,f+=k.g*X*T,g+=k.b*X*T;else if(L.isLightProbe){for(let K=0;K<9;K++)s.probe[K].addScaledVector(L.sh.coefficients[K],X);E++}else if(L.isDirectionalLight){let K=t.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){let Q=L.shadow,ie=i.get(L);ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize=Q.mapSize,s.directionalShadow[x]=ie,s.directionalShadowMap[x]=Z,s.directionalShadowMatrix[x]=L.shadow.matrix,M++}s.directional[x]=K,x++}else if(L.isSpotLight){let K=t.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(k).multiplyScalar(X*T),K.distance=j,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,s.spot[p]=K;let Q=L.shadow;if(L.map&&(s.spotLightMap[R]=L.map,R++,Q.updateMatrices(L),L.castShadow&&F++),s.spotLightMatrix[p]=Q.matrix,L.castShadow){let ie=i.get(L);ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize=Q.mapSize,s.spotShadow[p]=ie,s.spotShadowMap[p]=Z,b++}p++}else if(L.isRectAreaLight){let K=t.get(L);K.color.copy(k).multiplyScalar(X),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),s.rectArea[v]=K,v++}else if(L.isPointLight){let K=t.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*T),K.distance=L.distance,K.decay=L.decay,L.castShadow){let Q=L.shadow,ie=i.get(L);ie.shadowBias=Q.bias,ie.shadowNormalBias=Q.normalBias,ie.shadowRadius=Q.radius,ie.shadowMapSize=Q.mapSize,ie.shadowCameraNear=Q.camera.near,ie.shadowCameraFar=Q.camera.far,s.pointShadow[m]=ie,s.pointShadowMap[m]=Z,s.pointShadowMatrix[m]=L.shadow.matrix,S++}s.point[m]=K,m++}else if(L.isHemisphereLight){let K=t.get(L);K.skyColor.copy(L.color).multiplyScalar(X*T),K.groundColor.copy(L.groundColor).multiplyScalar(X*T),s.hemi[_]=K,_++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ue.LTC_FLOAT_1,s.rectAreaLTC2=ue.LTC_FLOAT_2):(s.rectAreaLTC1=ue.LTC_HALF_1,s.rectAreaLTC2=ue.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ue.LTC_FLOAT_1,s.rectAreaLTC2=ue.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ue.LTC_HALF_1,s.rectAreaLTC2=ue.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=f,s.ambient[2]=g;let z=s.hash;(z.directionalLength!==x||z.pointLength!==m||z.spotLength!==p||z.rectAreaLength!==v||z.hemiLength!==_||z.numDirectionalShadows!==M||z.numPointShadows!==S||z.numSpotShadows!==b||z.numSpotMaps!==R||z.numLightProbes!==E)&&(s.directional.length=x,s.spot.length=p,s.rectArea.length=v,s.point.length=m,s.hemi.length=_,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=S,s.pointShadowMap.length=S,s.spotShadow.length=b,s.spotShadowMap.length=b,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=S,s.spotLightMatrix.length=b+R-F,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=F,s.numLightProbes=E,z.directionalLength=x,z.pointLength=m,z.spotLength=p,z.rectAreaLength=v,z.hemiLength=_,z.numDirectionalShadows=M,z.numPointShadows=S,z.numSpotShadows=b,z.numSpotMaps=R,z.numLightProbes=E,s.version=r1++)}function c(h,d){let u=0,f=0,g=0,x=0,m=0,p=d.matrixWorldInverse;for(let v=0,_=h.length;v<_;v++){let M=h[v];if(M.isDirectionalLight){let S=s.directional[u];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),u++}else if(M.isSpotLight){let S=s.spot[g];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),g++}else if(M.isRectAreaLight){let S=s.rectArea[x];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),a.identity(),o.copy(M.matrixWorld),o.premultiply(p),a.extractRotation(o),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){let S=s.point[f];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let S=s.hemi[m];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function zp(n,e){let t=new a1(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function o(d){i.push(d)}function a(d){s.push(d)}function l(d){t.setup(i,d)}function c(d){t.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function l1(n,e){let t=new WeakMap;function i(r,o=0){let a=t.get(r),l;return a===void 0?(l=new zp(n,e),t.set(r,[l])):o>=a.length?(l=new zp(n,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:i,dispose:s}}var Xh=class extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},qh=class extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},c1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function u1(n,e,t){let i=new Ko,s=new ae,r=new ae,o=new At,a=new Xh({depthPacking:sv}),l=new qh,c={},h=t.maxTextureSize,d={[Fi]:Zt,[Zt]:Fi,[zt]:zt},u=new yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:c1,fragmentShader:h1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new vt;g.setAttribute("position",new ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ne(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gl;let p=this.type;this.render=function(b,R,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;let E=n.getRenderTarget(),T=n.getActiveCubeFace(),z=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Li),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let $=p!==Zi&&this.type===Zi,L=p===Zi&&this.type!==Zi;for(let k=0,X=b.length;k<X;k++){let j=b[k],Z=j.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let K=Z.getFrameExtents();if(s.multiply(K),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/K.x),s.x=r.x*K.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/K.y),s.y=r.y*K.y,Z.mapSize.y=r.y)),Z.map===null||$===!0||L===!0){let ie=this.type!==Zi?{minFilter:Qt,magFilter:Qt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new xn(s.x,s.y,ie),Z.map.texture.name=j.name+".shadowMap",Z.camera.updateProjectionMatrix()}n.setRenderTarget(Z.map),n.clear();let Q=Z.getViewportCount();for(let ie=0;ie<Q;ie++){let me=Z.getViewport(ie);o.set(r.x*me.x,r.y*me.y,r.x*me.z,r.y*me.w),H.viewport(o),Z.updateMatrices(j,ie),i=Z.getFrustum(),M(R,F,Z.camera,j,this.type)}Z.isPointLightShadow!==!0&&this.type===Zi&&v(Z,F),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,T,z)};function v(b,R){let F=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new xn(s.x,s.y)),u.uniforms.shadow_pass.value=b.map.texture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(R,null,F,u,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(R,null,F,f,x,null)}function _(b,R,F,E){let T=null,z=F.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(z!==void 0)T=z;else if(T=F.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let H=T.uuid,$=R.uuid,L=c[H];L===void 0&&(L={},c[H]=L);let k=L[$];k===void 0&&(k=T.clone(),L[$]=k,R.addEventListener("dispose",S)),T=k}if(T.visible=R.visible,T.wireframe=R.wireframe,E===Zi?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:d[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,F.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let H=n.properties.get(T);H.light=F}return T}function M(b,R,F,E,T){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&T===Zi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld);let $=e.update(b),L=b.material;if(Array.isArray(L)){let k=$.groups;for(let X=0,j=k.length;X<j;X++){let Z=k[X],K=L[Z.materialIndex];if(K&&K.visible){let Q=_(b,K,E,T);b.onBeforeShadow(n,b,R,F,$,Q,Z),n.renderBufferDirect(F,null,$,Q,b,Z),b.onAfterShadow(n,b,R,F,$,Q,Z)}}}else if(L.visible){let k=_(b,L,E,T);b.onBeforeShadow(n,b,R,F,$,k,null),n.renderBufferDirect(F,null,$,k,b,null),b.onAfterShadow(n,b,R,F,$,k,null)}}let H=b.children;for(let $=0,L=H.length;$<L;$++)M(H[$],R,F,E,T)}function S(b){b.target.removeEventListener("dispose",S);for(let F in c){let E=c[F],T=b.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function d1(n,e,t){let i=t.isWebGL2;function s(){let I=!1,fe=new At,pe=null,He=new At(0,0,0,0);return{setMask:function(Ne){pe!==Ne&&!I&&(n.colorMask(Ne,Ne,Ne,Ne),pe=Ne)},setLocked:function(Ne){I=Ne},setClear:function(Ne,Pt,Lt,ln,In){In===!0&&(Ne*=ln,Pt*=ln,Lt*=ln),fe.set(Ne,Pt,Lt,ln),He.equals(fe)===!1&&(n.clearColor(Ne,Pt,Lt,ln),He.copy(fe))},reset:function(){I=!1,pe=null,He.set(-1,0,0,0)}}}function r(){let I=!1,fe=null,pe=null,He=null;return{setTest:function(Ne){Ne?Ie(n.DEPTH_TEST):Ae(n.DEPTH_TEST)},setMask:function(Ne){fe!==Ne&&!I&&(n.depthMask(Ne),fe=Ne)},setFunc:function(Ne){if(pe!==Ne){switch(Ne){case kx:n.depthFunc(n.NEVER);break;case Ox:n.depthFunc(n.ALWAYS);break;case Bx:n.depthFunc(n.LESS);break;case rl:n.depthFunc(n.LEQUAL);break;case Hx:n.depthFunc(n.EQUAL);break;case Gx:n.depthFunc(n.GEQUAL);break;case vu:n.depthFunc(n.GREATER);break;case Vx:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pe=Ne}},setLocked:function(Ne){I=Ne},setClear:function(Ne){He!==Ne&&(n.clearDepth(Ne),He=Ne)},reset:function(){I=!1,fe=null,pe=null,He=null}}}function o(){let I=!1,fe=null,pe=null,He=null,Ne=null,Pt=null,Lt=null,ln=null,In=null;return{setTest:function(It){I||(It?Ie(n.STENCIL_TEST):Ae(n.STENCIL_TEST))},setMask:function(It){fe!==It&&!I&&(n.stencilMask(It),fe=It)},setFunc:function(It,Fn,Ri){(pe!==It||He!==Fn||Ne!==Ri)&&(n.stencilFunc(It,Fn,Ri),pe=It,He=Fn,Ne=Ri)},setOp:function(It,Fn,Ri){(Pt!==It||Lt!==Fn||ln!==Ri)&&(n.stencilOp(It,Fn,Ri),Pt=It,Lt=Fn,ln=Ri)},setLocked:function(It){I=It},setClear:function(It){In!==It&&(n.clearStencil(It),In=It)},reset:function(){I=!1,fe=null,pe=null,He=null,Ne=null,Pt=null,Lt=null,ln=null,In=null}}}let a=new s,l=new r,c=new o,h=new WeakMap,d=new WeakMap,u={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,M=null,S=null,b=null,R=null,F=null,E=new te(0,0,0),T=0,z=!1,H=null,$=null,L=null,k=null,X=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,K=0,Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=K>=1):Q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=K>=2);let ie=null,me={},O=n.getParameter(n.SCISSOR_BOX),Y=n.getParameter(n.VIEWPORT),le=new At().fromArray(O),_e=new At().fromArray(Y);function be(I,fe,pe,He){let Ne=new Uint8Array(4),Pt=n.createTexture();n.bindTexture(I,Pt),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<pe;Lt++)i&&(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)?n.texImage3D(fe,0,n.RGBA,1,1,He,0,n.RGBA,n.UNSIGNED_BYTE,Ne):n.texImage2D(fe+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ne);return Pt}let ze={};ze[n.TEXTURE_2D]=be(n.TEXTURE_2D,n.TEXTURE_2D,1),ze[n.TEXTURE_CUBE_MAP]=be(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ze[n.TEXTURE_2D_ARRAY]=be(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ze[n.TEXTURE_3D]=be(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ie(n.DEPTH_TEST),l.setFunc(rl),Ye(!1),C(gf),Ie(n.CULL_FACE),ve(Li);function Ie(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function Ae(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Xe(I,fe){return f[I]!==fe?(n.bindFramebuffer(I,fe),f[I]=fe,i&&(I===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=fe),I===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=fe)),!0):!1}function B(I,fe){let pe=x,He=!1;if(I)if(pe=g.get(fe),pe===void 0&&(pe=[],g.set(fe,pe)),I.isWebGLMultipleRenderTargets){let Ne=I.texture;if(pe.length!==Ne.length||pe[0]!==n.COLOR_ATTACHMENT0){for(let Pt=0,Lt=Ne.length;Pt<Lt;Pt++)pe[Pt]=n.COLOR_ATTACHMENT0+Pt;pe.length=Ne.length,He=!0}}else pe[0]!==n.COLOR_ATTACHMENT0&&(pe[0]=n.COLOR_ATTACHMENT0,He=!0);else pe[0]!==n.BACK&&(pe[0]=n.BACK,He=!0);He&&(t.isWebGL2?n.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function jt(I){return m!==I?(n.useProgram(I),m=I,!0):!1}let Re={[Zs]:n.FUNC_ADD,[Ex]:n.FUNC_SUBTRACT,[Sx]:n.FUNC_REVERSE_SUBTRACT};if(i)Re[_f]=n.MIN,Re[yf]=n.MAX;else{let I=e.get("EXT_blend_minmax");I!==null&&(Re[_f]=I.MIN_EXT,Re[yf]=I.MAX_EXT)}let Ue={[wx]:n.ZERO,[Tx]:n.ONE,[Ax]:n.SRC_COLOR,[Go]:n.SRC_ALPHA,[Fx]:n.SRC_ALPHA_SATURATE,[Lx]:n.DST_COLOR,[Cx]:n.DST_ALPHA,[Rx]:n.ONE_MINUS_SRC_COLOR,[Vo]:n.ONE_MINUS_SRC_ALPHA,[Ix]:n.ONE_MINUS_DST_COLOR,[Px]:n.ONE_MINUS_DST_ALPHA,[Dx]:n.CONSTANT_COLOR,[zx]:n.ONE_MINUS_CONSTANT_COLOR,[Ux]:n.CONSTANT_ALPHA,[Nx]:n.ONE_MINUS_CONSTANT_ALPHA};function ve(I,fe,pe,He,Ne,Pt,Lt,ln,In,It){if(I===Li){p===!0&&(Ae(n.BLEND),p=!1);return}if(p===!1&&(Ie(n.BLEND),p=!0),I!==xu){if(I!==v||It!==z){if((_!==Zs||b!==Zs)&&(n.blendEquation(n.FUNC_ADD),_=Zs,b=Zs),It)switch(I){case Ii:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case un:n.blendFunc(n.ONE,n.ONE);break;case xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case un:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,S=null,R=null,F=null,E.set(0,0,0),T=0,v=I,z=It}return}Ne=Ne||fe,Pt=Pt||pe,Lt=Lt||He,(fe!==_||Ne!==b)&&(n.blendEquationSeparate(Re[fe],Re[Ne]),_=fe,b=Ne),(pe!==M||He!==S||Pt!==R||Lt!==F)&&(n.blendFuncSeparate(Ue[pe],Ue[He],Ue[Pt],Ue[Lt]),M=pe,S=He,R=Pt,F=Lt),(ln.equals(E)===!1||In!==T)&&(n.blendColor(ln.r,ln.g,ln.b,In),E.copy(ln),T=In),v=I,z=!1}function ut(I,fe){I.side===zt?Ae(n.CULL_FACE):Ie(n.CULL_FACE);let pe=I.side===Zt;fe&&(pe=!pe),Ye(pe),I.blending===Ii&&I.transparent===!1?ve(Li):ve(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),a.setMask(I.colorWrite);let He=I.stencilWrite;c.setTest(He),He&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),G(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Ie(n.SAMPLE_ALPHA_TO_COVERAGE):Ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(I){H!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),H=I)}function C(I){I!==Mx?(Ie(n.CULL_FACE),I!==$&&(I===gf?n.cullFace(n.BACK):I===bx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ae(n.CULL_FACE),$=I}function w(I){I!==L&&(Z&&n.lineWidth(I),L=I)}function G(I,fe,pe){I?(Ie(n.POLYGON_OFFSET_FILL),(k!==fe||X!==pe)&&(n.polygonOffset(fe,pe),k=fe,X=pe)):Ae(n.POLYGON_OFFSET_FILL)}function re(I){I?Ie(n.SCISSOR_TEST):Ae(n.SCISSOR_TEST)}function se(I){I===void 0&&(I=n.TEXTURE0+j-1),ie!==I&&(n.activeTexture(I),ie=I)}function oe(I,fe,pe){pe===void 0&&(ie===null?pe=n.TEXTURE0+j-1:pe=ie);let He=me[pe];He===void 0&&(He={type:void 0,texture:void 0},me[pe]=He),(He.type!==I||He.texture!==fe)&&(ie!==pe&&(n.activeTexture(pe),ie=pe),n.bindTexture(I,fe||ze[I]),He.type=I,He.texture=fe)}function we(){let I=me[ie];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ge(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ye(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function St(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function rt(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qe(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Je(I){le.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),le.copy(I))}function bt(I){_e.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),_e.copy(I))}function Bt(I,fe){let pe=d.get(fe);pe===void 0&&(pe=new WeakMap,d.set(fe,pe));let He=pe.get(I);He===void 0&&(He=n.getUniformBlockIndex(fe,I.name),pe.set(I,He))}function nt(I,fe){let He=d.get(fe).get(I);h.get(fe)!==He&&(n.uniformBlockBinding(fe,He,I.__bindingPointIndex),h.set(fe,He))}function he(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ie=null,me={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,M=null,S=null,b=null,R=null,F=null,E=new te(0,0,0),T=0,z=!1,H=null,$=null,L=null,k=null,X=null,le.set(0,0,n.canvas.width,n.canvas.height),_e.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ie,disable:Ae,bindFramebuffer:Xe,drawBuffers:B,useProgram:jt,setBlending:ve,setMaterial:ut,setFlipSided:Ye,setCullFace:C,setLineWidth:w,setPolygonOffset:G,setScissorTest:re,activeTexture:se,bindTexture:oe,unbindTexture:we,compressedTexImage2D:ge,compressedTexImage3D:ye,texImage2D:Le,texImage3D:Me,updateUBOMapping:Bt,uniformBlockBinding:nt,texStorage2D:rt,texStorage3D:qe,texSubImage2D:Oe,texSubImage3D:et,compressedTexSubImage2D:ee,compressedTexSubImage3D:St,scissor:Je,viewport:bt,reset:he}}function f1(n,e,t,i,s,r,o){let a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,w){return f?new OffscreenCanvas(C,w):Xo("canvas")}function x(C,w,G,re){let se=1;if((C.width>re||C.height>re)&&(se=re/Math.max(C.width,C.height)),se<1||w===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){let oe=w?ul:Math.floor,we=oe(se*C.width),ge=oe(se*C.height);d===void 0&&(d=g(we,ge));let ye=G?g(we,ge):d;return ye.width=we,ye.height=ge,ye.getContext("2d").drawImage(C,0,0,we,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+we+"x"+ge+")."),ye}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function m(C){return Uh(C.width)&&Uh(C.height)}function p(C){return a?!1:C.wrapS!==$n||C.wrapT!==$n||C.minFilter!==Qt&&C.minFilter!==Un}function v(C,w){return C.generateMipmaps&&w&&C.minFilter!==Qt&&C.minFilter!==Un}function _(C){n.generateMipmap(C)}function M(C,w,G,re,se=!1){if(a===!1)return w;if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let oe=w;if(w===n.RED&&(G===n.FLOAT&&(oe=n.R32F),G===n.HALF_FLOAT&&(oe=n.R16F),G===n.UNSIGNED_BYTE&&(oe=n.R8)),w===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(oe=n.R8UI),G===n.UNSIGNED_SHORT&&(oe=n.R16UI),G===n.UNSIGNED_INT&&(oe=n.R32UI),G===n.BYTE&&(oe=n.R8I),G===n.SHORT&&(oe=n.R16I),G===n.INT&&(oe=n.R32I)),w===n.RG&&(G===n.FLOAT&&(oe=n.RG32F),G===n.HALF_FLOAT&&(oe=n.RG16F),G===n.UNSIGNED_BYTE&&(oe=n.RG8)),w===n.RGBA){let we=se?al:dt.getTransfer(re);G===n.FLOAT&&(oe=n.RGBA32F),G===n.HALF_FLOAT&&(oe=n.RGBA16F),G===n.UNSIGNED_BYTE&&(oe=we===Tt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(oe=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(oe=n.RGB5_A1)}return(oe===n.R16F||oe===n.R32F||oe===n.RG16F||oe===n.RG32F||oe===n.RGBA16F||oe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function S(C,w,G){return v(C,G)===!0||C.isFramebufferTexture&&C.minFilter!==Qt&&C.minFilter!==Un?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function b(C){return C===Qt||C===ol||C===zo?n.NEAREST:n.LINEAR}function R(C){let w=C.target;w.removeEventListener("dispose",R),E(w),w.isVideoTexture&&h.delete(w)}function F(C){let w=C.target;w.removeEventListener("dispose",F),z(w)}function E(C){let w=i.get(C);if(w.__webglInit===void 0)return;let G=C.source,re=u.get(G);if(re){let se=re[w.__cacheKey];se.usedTimes--,se.usedTimes===0&&T(C),Object.keys(re).length===0&&u.delete(G)}i.remove(C)}function T(C){let w=i.get(C);n.deleteTexture(w.__webglTexture);let G=C.source,re=u.get(G);delete re[w.__cacheKey],o.memory.textures--}function z(C){let w=C.texture,G=i.get(C),re=i.get(w);if(re.__webglTexture!==void 0&&(n.deleteTexture(re.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(G.__webglFramebuffer[se]))for(let oe=0;oe<G.__webglFramebuffer[se].length;oe++)n.deleteFramebuffer(G.__webglFramebuffer[se][oe]);else n.deleteFramebuffer(G.__webglFramebuffer[se]);G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer[se])}else{if(Array.isArray(G.__webglFramebuffer))for(let se=0;se<G.__webglFramebuffer.length;se++)n.deleteFramebuffer(G.__webglFramebuffer[se]);else n.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&n.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let se=0;se<G.__webglColorRenderbuffer.length;se++)G.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(G.__webglColorRenderbuffer[se]);G.__webglDepthRenderbuffer&&n.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let se=0,oe=w.length;se<oe;se++){let we=i.get(w[se]);we.__webglTexture&&(n.deleteTexture(we.__webglTexture),o.memory.textures--),i.remove(w[se])}i.remove(w),i.remove(C)}let H=0;function $(){H=0}function L(){let C=H;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),H+=1,C}function k(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function X(C,w){let G=i.get(C);if(C.isVideoTexture&&ut(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){let re=C.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(G,C,w);return}}t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+w)}function j(C,w){let G=i.get(C);if(C.version>0&&G.__version!==C.version){le(G,C,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+w)}function Z(C,w){let G=i.get(C);if(C.version>0&&G.__version!==C.version){le(G,C,w);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+w)}function K(C,w){let G=i.get(C);if(C.version>0&&G.__version!==C.version){_e(G,C,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+w)}let Q={[ji]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[Wo]:n.MIRRORED_REPEAT},ie={[Qt]:n.NEAREST,[ol]:n.NEAREST_MIPMAP_NEAREST,[zo]:n.NEAREST_MIPMAP_LINEAR,[Un]:n.LINEAR,[Su]:n.LINEAR_MIPMAP_NEAREST,[Ms]:n.LINEAR_MIPMAP_LINEAR},me={[ov]:n.NEVER,[dv]:n.ALWAYS,[av]:n.LESS,[pm]:n.LEQUAL,[lv]:n.EQUAL,[uv]:n.GEQUAL,[cv]:n.GREATER,[hv]:n.NOTEQUAL};function O(C,w,G){if(G?(n.texParameteri(C,n.TEXTURE_WRAP_S,Q[w.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Q[w.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Q[w.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ie[w.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ie[w.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(w.wrapS!==$n||w.wrapT!==$n)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(C,n.TEXTURE_MAG_FILTER,b(w.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,b(w.minFilter)),w.minFilter!==Qt&&w.minFilter!==Un&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,me[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let re=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===Qt||w.minFilter!==zo&&w.minFilter!==Ms||w.type===$i&&e.has("OES_texture_float_linear")===!1||a===!1&&w.type===Gn&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(n.texParameterf(C,re.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function Y(C,w){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",R));let re=w.source,se=u.get(re);se===void 0&&(se={},u.set(re,se));let oe=k(w);if(oe!==C.__cacheKey){se[oe]===void 0&&(se[oe]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),se[oe].usedTimes++;let we=se[C.__cacheKey];we!==void 0&&(se[C.__cacheKey].usedTimes--,we.usedTimes===0&&T(w)),C.__cacheKey=oe,C.__webglTexture=se[oe].texture}return G}function le(C,w,G){let re=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(re=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(re=n.TEXTURE_3D);let se=Y(C,w),oe=w.source;t.bindTexture(re,C.__webglTexture,n.TEXTURE0+G);let we=i.get(oe);if(oe.version!==we.__version||se===!0){t.activeTexture(n.TEXTURE0+G);let ge=dt.getPrimaries(dt.workingColorSpace),ye=w.colorSpace===Hn?null:dt.getPrimaries(w.colorSpace),Oe=w.colorSpace===Hn||ge===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let et=p(w)&&m(w.image)===!1,ee=x(w.image,et,!1,s.maxTextureSize);ee=Ye(w,ee);let St=m(ee)||a,rt=r.convert(w.format,w.colorSpace),qe=r.convert(w.type),Le=M(w.internalFormat,rt,qe,w.colorSpace,w.isVideoTexture);O(re,w,St);let Me,Je=w.mipmaps,bt=a&&w.isVideoTexture!==!0&&Le!==um,Bt=we.__version===void 0||se===!0,nt=S(w,ee,St);if(w.isDepthTexture)Le=n.DEPTH_COMPONENT,a?w.type===$i?Le=n.DEPTH_COMPONENT32F:w.type===xs?Le=n.DEPTH_COMPONENT24:w.type===$s?Le=n.DEPTH24_STENCIL8:Le=n.DEPTH_COMPONENT16:w.type===$i&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===Js&&Le===n.DEPTH_COMPONENT&&w.type!==wu&&w.type!==xs&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=xs,qe=r.convert(w.type)),w.format===zr&&Le===n.DEPTH_COMPONENT&&(Le=n.DEPTH_STENCIL,w.type!==$s&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=$s,qe=r.convert(w.type))),Bt&&(bt?t.texStorage2D(n.TEXTURE_2D,1,Le,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,Le,ee.width,ee.height,0,rt,qe,null));else if(w.isDataTexture)if(Je.length>0&&St){bt&&Bt&&t.texStorage2D(n.TEXTURE_2D,nt,Le,Je[0].width,Je[0].height);for(let he=0,I=Je.length;he<I;he++)Me=Je[he],bt?t.texSubImage2D(n.TEXTURE_2D,he,0,0,Me.width,Me.height,rt,qe,Me.data):t.texImage2D(n.TEXTURE_2D,he,Le,Me.width,Me.height,0,rt,qe,Me.data);w.generateMipmaps=!1}else bt?(Bt&&t.texStorage2D(n.TEXTURE_2D,nt,Le,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,rt,qe,ee.data)):t.texImage2D(n.TEXTURE_2D,0,Le,ee.width,ee.height,0,rt,qe,ee.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){bt&&Bt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Le,Je[0].width,Je[0].height,ee.depth);for(let he=0,I=Je.length;he<I;he++)Me=Je[he],w.format!==ai?rt!==null?bt?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Me.width,Me.height,ee.depth,rt,Me.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Le,Me.width,Me.height,ee.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):bt?t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Me.width,Me.height,ee.depth,rt,qe,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Le,Me.width,Me.height,ee.depth,0,rt,qe,Me.data)}else{bt&&Bt&&t.texStorage2D(n.TEXTURE_2D,nt,Le,Je[0].width,Je[0].height);for(let he=0,I=Je.length;he<I;he++)Me=Je[he],w.format!==ai?rt!==null?bt?t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,Me.width,Me.height,rt,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Le,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):bt?t.texSubImage2D(n.TEXTURE_2D,he,0,0,Me.width,Me.height,rt,qe,Me.data):t.texImage2D(n.TEXTURE_2D,he,Le,Me.width,Me.height,0,rt,qe,Me.data)}else if(w.isDataArrayTexture)bt?(Bt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Le,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,rt,qe,ee.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,ee.width,ee.height,ee.depth,0,rt,qe,ee.data);else if(w.isData3DTexture)bt?(Bt&&t.texStorage3D(n.TEXTURE_3D,nt,Le,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,rt,qe,ee.data)):t.texImage3D(n.TEXTURE_3D,0,Le,ee.width,ee.height,ee.depth,0,rt,qe,ee.data);else if(w.isFramebufferTexture){if(Bt)if(bt)t.texStorage2D(n.TEXTURE_2D,nt,Le,ee.width,ee.height);else{let he=ee.width,I=ee.height;for(let fe=0;fe<nt;fe++)t.texImage2D(n.TEXTURE_2D,fe,Le,he,I,0,rt,qe,null),he>>=1,I>>=1}}else if(Je.length>0&&St){bt&&Bt&&t.texStorage2D(n.TEXTURE_2D,nt,Le,Je[0].width,Je[0].height);for(let he=0,I=Je.length;he<I;he++)Me=Je[he],bt?t.texSubImage2D(n.TEXTURE_2D,he,0,0,rt,qe,Me):t.texImage2D(n.TEXTURE_2D,he,Le,rt,qe,Me);w.generateMipmaps=!1}else bt?(Bt&&t.texStorage2D(n.TEXTURE_2D,nt,Le,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,rt,qe,ee)):t.texImage2D(n.TEXTURE_2D,0,Le,rt,qe,ee);v(w,St)&&_(re),we.__version=oe.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function _e(C,w,G){if(w.image.length!==6)return;let re=Y(C,w),se=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+G);let oe=i.get(se);if(se.version!==oe.__version||re===!0){t.activeTexture(n.TEXTURE0+G);let we=dt.getPrimaries(dt.workingColorSpace),ge=w.colorSpace===Hn?null:dt.getPrimaries(w.colorSpace),ye=w.colorSpace===Hn||we===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let Oe=w.isCompressedTexture||w.image[0].isCompressedTexture,et=w.image[0]&&w.image[0].isDataTexture,ee=[];for(let he=0;he<6;he++)!Oe&&!et?ee[he]=x(w.image[he],!1,!0,s.maxCubemapSize):ee[he]=et?w.image[he].image:w.image[he],ee[he]=Ye(w,ee[he]);let St=ee[0],rt=m(St)||a,qe=r.convert(w.format,w.colorSpace),Le=r.convert(w.type),Me=M(w.internalFormat,qe,Le,w.colorSpace),Je=a&&w.isVideoTexture!==!0,bt=oe.__version===void 0||re===!0,Bt=S(w,St,rt);O(n.TEXTURE_CUBE_MAP,w,rt);let nt;if(Oe){Je&&bt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Bt,Me,St.width,St.height);for(let he=0;he<6;he++){nt=ee[he].mipmaps;for(let I=0;I<nt.length;I++){let fe=nt[I];w.format!==ai?qe!==null?Je?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I,0,0,fe.width,fe.height,qe,fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I,0,0,fe.width,fe.height,qe,Le,fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I,Me,fe.width,fe.height,0,qe,Le,fe.data)}}}else{nt=w.mipmaps,Je&&bt&&(nt.length>0&&Bt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,Bt,Me,ee[0].width,ee[0].height));for(let he=0;he<6;he++)if(et){Je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,ee[he].width,ee[he].height,qe,Le,ee[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Me,ee[he].width,ee[he].height,0,qe,Le,ee[he].data);for(let I=0;I<nt.length;I++){let pe=nt[I].image[he].image;Je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I+1,0,0,pe.width,pe.height,qe,Le,pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I+1,Me,pe.width,pe.height,0,qe,Le,pe.data)}}else{Je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,qe,Le,ee[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Me,qe,Le,ee[he]);for(let I=0;I<nt.length;I++){let fe=nt[I];Je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I+1,0,0,qe,Le,fe.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,I+1,Me,qe,Le,fe.image[he])}}}v(w,rt)&&_(n.TEXTURE_CUBE_MAP),oe.__version=se.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function be(C,w,G,re,se,oe){let we=r.convert(G.format,G.colorSpace),ge=r.convert(G.type),ye=M(G.internalFormat,we,ge,G.colorSpace);if(!i.get(w).__hasExternalTextures){let et=Math.max(1,w.width>>oe),ee=Math.max(1,w.height>>oe);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,oe,ye,et,ee,w.depth,0,we,ge,null):t.texImage2D(se,oe,ye,et,ee,0,we,ge,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ve(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,re,se,i.get(G).__webglTexture,0,Ue(w)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,re,se,i.get(G).__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(C,w,G){if(n.bindRenderbuffer(n.RENDERBUFFER,C),w.depthBuffer&&!w.stencilBuffer){let re=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(G||ve(w)){let se=w.depthTexture;se&&se.isDepthTexture&&(se.type===$i?re=n.DEPTH_COMPONENT32F:se.type===xs&&(re=n.DEPTH_COMPONENT24));let oe=Ue(w);ve(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,re,w.width,w.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,re,w.width,w.height)}else n.renderbufferStorage(n.RENDERBUFFER,re,w.width,w.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(w.depthBuffer&&w.stencilBuffer){let re=Ue(w);G&&ve(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,n.DEPTH24_STENCIL8,w.width,w.height):ve(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,n.DEPTH24_STENCIL8,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{let re=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let se=0;se<re.length;se++){let oe=re[se],we=r.convert(oe.format,oe.colorSpace),ge=r.convert(oe.type),ye=M(oe.internalFormat,we,ge,oe.colorSpace),Oe=Ue(w);G&&ve(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,ye,w.width,w.height):ve(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Oe,ye,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,ye,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ie(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),X(w.depthTexture,0);let re=i.get(w.depthTexture).__webglTexture,se=Ue(w);if(w.depthTexture.format===Js)ve(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0);else if(w.depthTexture.format===zr)ve(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0,se):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Ae(C){let w=i.get(C),G=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ie(w.__webglFramebuffer,C)}else if(G){w.__webglDepthbuffer=[];for(let re=0;re<6;re++)t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[re]),w.__webglDepthbuffer[re]=n.createRenderbuffer(),ze(w.__webglDepthbuffer[re],C,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=n.createRenderbuffer(),ze(w.__webglDepthbuffer,C,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xe(C,w,G){let re=i.get(C);w!==void 0&&be(re.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&Ae(C)}function B(C){let w=C.texture,G=i.get(C),re=i.get(w);C.addEventListener("dispose",F),C.isWebGLMultipleRenderTargets!==!0&&(re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture()),re.__version=w.version,o.memory.textures++);let se=C.isWebGLCubeRenderTarget===!0,oe=C.isWebGLMultipleRenderTargets===!0,we=m(C)||a;if(se){G.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(a&&w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[ge]=[];for(let ye=0;ye<w.mipmaps.length;ye++)G.__webglFramebuffer[ge][ye]=n.createFramebuffer()}else G.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(a&&w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let ge=0;ge<w.mipmaps.length;ge++)G.__webglFramebuffer[ge]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(oe)if(s.drawBuffers){let ge=C.texture;for(let ye=0,Oe=ge.length;ye<Oe;ye++){let et=i.get(ge[ye]);et.__webglTexture===void 0&&(et.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&ve(C)===!1){let ge=oe?w:[w];G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ye=0;ye<ge.length;ye++){let Oe=ge[ye];G.__webglColorRenderbuffer[ye]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[ye]);let et=r.convert(Oe.format,Oe.colorSpace),ee=r.convert(Oe.type),St=M(Oe.internalFormat,et,ee,Oe.colorSpace,C.isXRRenderTarget===!0),rt=Ue(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,St,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,G.__webglColorRenderbuffer[ye])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ze(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(se){t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),O(n.TEXTURE_CUBE_MAP,w,we);for(let ge=0;ge<6;ge++)if(a&&w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)be(G.__webglFramebuffer[ge][ye],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,ye);else be(G.__webglFramebuffer[ge],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);v(w,we)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){let ge=C.texture;for(let ye=0,Oe=ge.length;ye<Oe;ye++){let et=ge[ye],ee=i.get(et);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),O(n.TEXTURE_2D,et,we),be(G.__webglFramebuffer,C,et,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,0),v(et,we)&&_(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?ge=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,re.__webglTexture),O(ge,w,we),a&&w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)be(G.__webglFramebuffer[ye],C,w,n.COLOR_ATTACHMENT0,ge,ye);else be(G.__webglFramebuffer,C,w,n.COLOR_ATTACHMENT0,ge,0);v(w,we)&&_(ge),t.unbindTexture()}C.depthBuffer&&Ae(C)}function jt(C){let w=m(C)||a,G=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let re=0,se=G.length;re<se;re++){let oe=G[re];if(v(oe,w)){let we=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ge=i.get(oe).__webglTexture;t.bindTexture(we,ge),_(we),t.unbindTexture()}}}function Re(C){if(a&&C.samples>0&&ve(C)===!1){let w=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],G=C.width,re=C.height,se=n.COLOR_BUFFER_BIT,oe=[],we=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(C),ye=C.isWebGLMultipleRenderTargets===!0;if(ye)for(let Oe=0;Oe<w.length;Oe++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Oe=0;Oe<w.length;Oe++){oe.push(n.COLOR_ATTACHMENT0+Oe),C.depthBuffer&&oe.push(we);let et=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(et===!1&&(C.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),ye&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[Oe]),et===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[we]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[we])),ye){let ee=i.get(w[Oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,G,re,0,0,G,re,se,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,oe)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ye)for(let Oe=0;Oe<w.length;Oe++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.RENDERBUFFER,ge.__webglColorRenderbuffer[Oe]);let et=i.get(w[Oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Oe,n.TEXTURE_2D,et,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function Ue(C){return Math.min(s.maxSamples,C.samples)}function ve(C){let w=i.get(C);return a&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ut(C){let w=o.render.frame;h.get(C)!==w&&(h.set(C,w),C.update())}function Ye(C,w){let G=C.colorSpace,re=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===zh||G!==nn&&G!==Hn&&(dt.getTransfer(G)===Tt?a===!1?e.has("EXT_sRGB")===!0&&re===ai?(C.format=zh,C.minFilter=Un,C.generateMipmaps=!1):w=dl.sRGBToLinear(w):(re!==ai||se!==ys)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}this.allocateTextureUnit=L,this.resetTextureUnits=$,this.setTexture2D=X,this.setTexture2DArray=j,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=Xe,this.setupRenderTarget=B,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=be,this.useMultisampledRTT=ve}function p1(n,e,t){let i=t.isWebGL2;function s(r,o=Hn){let a,l=dt.getTransfer(o);if(r===ys)return n.UNSIGNED_BYTE;if(r===om)return n.UNSIGNED_SHORT_4_4_4_4;if(r===am)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Zx)return n.BYTE;if(r===Kx)return n.SHORT;if(r===wu)return n.UNSIGNED_SHORT;if(r===rm)return n.INT;if(r===xs)return n.UNSIGNED_INT;if(r===$i)return n.FLOAT;if(r===Gn)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===$x)return n.ALPHA;if(r===ai)return n.RGBA;if(r===Jx)return n.LUMINANCE;if(r===jx)return n.LUMINANCE_ALPHA;if(r===Js)return n.DEPTH_COMPONENT;if(r===zr)return n.DEPTH_STENCIL;if(r===zh)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Qx)return n.RED;if(r===lm)return n.RED_INTEGER;if(r===ev)return n.RG;if(r===cm)return n.RG_INTEGER;if(r===hm)return n.RGBA_INTEGER;if(r===$c||r===Jc||r===jc||r===Qc)if(l===Tt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===$c)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Jc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===jc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Qc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===$c)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Jc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===jc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Qc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===bf||r===Ef||r===Sf||r===wf)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===bf)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ef)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Sf)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===wf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===um)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Tf||r===Af)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Tf)return l===Tt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Af)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Rf||r===Cf||r===Pf||r===Lf||r===If||r===Ff||r===Df||r===zf||r===Uf||r===Nf||r===kf||r===Of||r===Bf||r===Hf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Rf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Cf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Pf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Lf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===If)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ff)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Df)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===zf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Nf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===kf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Of)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Bf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Hf)return l===Tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===eh||r===Gf||r===Vf)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===eh)return l===Tt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Gf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Vf)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===tv||r===Wf||r===Xf||r===qf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===eh)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Wf)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Xf)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===qf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===$s?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var Yh=class extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},xt=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},m1={type:"move"},Oo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(m1)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new xt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Zh=class extends bs{constructor(e,t){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,x=t.getContextAttributes(),m=null,p=null,v=[],_=[],M=new ae,S=null,b=new tn;b.layers.enable(1),b.viewport=new At;let R=new tn;R.layers.enable(2),R.viewport=new At;let F=[b,R],E=new Yh;E.layers.enable(1),E.layers.enable(2);let T=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let Y=v[O];return Y===void 0&&(Y=new Oo,v[O]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(O){let Y=v[O];return Y===void 0&&(Y=new Oo,v[O]=Y),Y.getGripSpace()},this.getHand=function(O){let Y=v[O];return Y===void 0&&(Y=new Oo,v[O]=Y),Y.getHandSpace()};function H(O){let Y=_.indexOf(O.inputSource);if(Y===-1)return;let le=v[Y];le!==void 0&&(le.update(O.inputSource,O.frame,c||o),le.dispatchEvent({type:O.type,data:O.inputSource}))}function $(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",L);for(let O=0;O<v.length;O++){let Y=_[O];Y!==null&&(_[O]=null,v[O].disconnect(Y))}T=null,z=null,e.setRenderTarget(m),f=null,u=null,d=null,s=null,p=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){r=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){a=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(O){if(s=O,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",$),s.addEventListener("inputsourceschange",L),x.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(M),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Y={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new xn(f.framebufferWidth,f.framebufferHeight,{format:ai,type:ys,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Y=null,le=null,_e=null;x.depth&&(_e=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=x.stencil?zr:Js,le=x.stencil?$s:xs);let be={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(be),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),p=new xn(u.textureWidth,u.textureHeight,{format:ai,type:ys,depthTexture:new _l(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let ze=e.properties.get(p);ze.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),me.setContext(s),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(O){for(let Y=0;Y<O.removed.length;Y++){let le=O.removed[Y],_e=_.indexOf(le);_e>=0&&(_[_e]=null,v[_e].disconnect(le))}for(let Y=0;Y<O.added.length;Y++){let le=O.added[Y],_e=_.indexOf(le);if(_e===-1){for(let ze=0;ze<v.length;ze++)if(ze>=_.length){_.push(le),_e=ze;break}else if(_[ze]===null){_[ze]=le,_e=ze;break}if(_e===-1)break}let be=v[_e];be&&be.connect(le)}}let k=new P,X=new P;function j(O,Y,le){k.setFromMatrixPosition(Y.matrixWorld),X.setFromMatrixPosition(le.matrixWorld);let _e=k.distanceTo(X),be=Y.projectionMatrix.elements,ze=le.projectionMatrix.elements,Ie=be[14]/(be[10]-1),Ae=be[14]/(be[10]+1),Xe=(be[9]+1)/be[5],B=(be[9]-1)/be[5],jt=(be[8]-1)/be[0],Re=(ze[8]+1)/ze[0],Ue=Ie*jt,ve=Ie*Re,ut=_e/(-jt+Re),Ye=ut*-jt;Y.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Ye),O.translateZ(ut),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert();let C=Ie+ut,w=Ae+ut,G=Ue-Ye,re=ve+(_e-Ye),se=Xe*Ae/w*C,oe=B*Ae/w*C;O.projectionMatrix.makePerspective(G,re,se,oe,C,w),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}function Z(O,Y){Y===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(Y.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(s===null)return;E.near=R.near=b.near=O.near,E.far=R.far=b.far=O.far,(T!==E.near||z!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),T=E.near,z=E.far);let Y=O.parent,le=E.cameras;Z(E,Y);for(let _e=0;_e<le.length;_e++)Z(le[_e],Y);le.length===2?j(E,b,R):E.projectionMatrix.copy(b.projectionMatrix),K(O,E,Y)};function K(O,Y,le){le===null?O.matrix.copy(Y.matrixWorld):(O.matrix.copy(le.matrixWorld),O.matrix.invert(),O.matrix.multiply(Y.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(Y.projectionMatrix),O.projectionMatrixInverse.copy(Y.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Nr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(O){l=O,u!==null&&(u.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)};let Q=null;function ie(O,Y){if(h=Y.getViewerPose(c||o),g=Y,h!==null){let le=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let _e=!1;le.length!==E.cameras.length&&(E.cameras.length=0,_e=!0);for(let be=0;be<le.length;be++){let ze=le[be],Ie=null;if(f!==null)Ie=f.getViewport(ze);else{let Xe=d.getViewSubImage(u,ze);Ie=Xe.viewport,be===0&&(e.setRenderTargetTextures(p,Xe.colorTexture,u.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(p))}let Ae=F[be];Ae===void 0&&(Ae=new tn,Ae.layers.enable(be),Ae.viewport=new At,F[be]=Ae),Ae.matrix.fromArray(ze.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(ze.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),be===0&&(E.matrix.copy(Ae.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),_e===!0&&E.cameras.push(Ae)}}for(let le=0;le<v.length;le++){let _e=_[le],be=v[le];_e!==null&&be!==void 0&&be.update(_e,Y,c||o)}Q&&Q(O,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}let me=new vm;me.setAnimationLoop(ie),this.setAnimationLoop=function(O){Q=O},this.dispose=function(){}}};function g1(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,xm(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,_,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Zt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Zt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let _=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Zt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function x1(n,e,t,i){let s={},r={},o=[],a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,_){let M=_.program;i.uniformBlockBinding(v,M)}function c(v,_){let M=s[v.id];M===void 0&&(g(v),M=h(v),s[v.id]=M,v.addEventListener("dispose",m));let S=_.program;i.updateUBOMapping(v,S);let b=e.render.frame;r[v.id]!==b&&(u(v),r[v.id]=b)}function h(v){let _=d();v.__bindingPointIndex=_;let M=n.createBuffer(),S=v.__size,b=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,S,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,M),M}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let _=s[v.id],M=v.uniforms,S=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let b=0,R=M.length;b<R;b++){let F=Array.isArray(M[b])?M[b]:[M[b]];for(let E=0,T=F.length;E<T;E++){let z=F[E];if(f(z,b,E,S)===!0){let H=z.__offset,$=Array.isArray(z.value)?z.value:[z.value],L=0;for(let k=0;k<$.length;k++){let X=$[k],j=x(X);typeof X=="number"||typeof X=="boolean"?(z.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,H+L,z.__data)):X.isMatrix3?(z.__data[0]=X.elements[0],z.__data[1]=X.elements[1],z.__data[2]=X.elements[2],z.__data[3]=0,z.__data[4]=X.elements[3],z.__data[5]=X.elements[4],z.__data[6]=X.elements[5],z.__data[7]=0,z.__data[8]=X.elements[6],z.__data[9]=X.elements[7],z.__data[10]=X.elements[8],z.__data[11]=0):(X.toArray(z.__data,L),L+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,z.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,_,M,S){let b=v.value,R=_+"_"+M;if(S[R]===void 0)return typeof b=="number"||typeof b=="boolean"?S[R]=b:S[R]=b.clone(),!0;{let F=S[R];if(typeof b=="number"||typeof b=="boolean"){if(F!==b)return S[R]=b,!0}else if(F.equals(b)===!1)return F.copy(b),!0}return!1}function g(v){let _=v.uniforms,M=0,S=16;for(let R=0,F=_.length;R<F;R++){let E=Array.isArray(_[R])?_[R]:[_[R]];for(let T=0,z=E.length;T<z;T++){let H=E[T],$=Array.isArray(H.value)?H.value:[H.value];for(let L=0,k=$.length;L<k;L++){let X=$[L],j=x(X),Z=M%S;Z!==0&&S-Z<j.boundary&&(M+=S-Z),H.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=M,M+=j.storage}}}let b=M%S;return b>0&&(M+=S-b),v.__size=M,v.__cache={},this}function x(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let M=o.indexOf(_.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(let v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var $o=class{constructor(e={}){let{canvas:t=Av(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=o;let f=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gt,this._useLegacyLights=!1,this.toneMapping=_s,this.toneMappingExposure=1;let _=this,M=!1,S=0,b=0,R=null,F=-1,E=null,T=new At,z=new At,H=null,$=new te(0),L=0,k=t.width,X=t.height,j=1,Z=null,K=null,Q=new At(0,0,k,X),ie=new At(0,0,k,X),me=!1,O=new Ko,Y=!1,le=!1,_e=null,be=new Ge,ze=new ae,Ie=new P,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return R===null?j:1}let B=i;function jt(A,N){for(let W=0;W<A.length;W++){let q=A[W],V=t.getContext(q,N);if(V!==null)return V}return null}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mu}`),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",fe,!1),B===null){let N=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&N.shift(),B=jt(N,A),B===null)throw jt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Re,Ue,ve,ut,Ye,C,w,G,re,se,oe,we,ge,ye,Oe,et,ee,St,rt,qe,Le,Me,Je,bt;function Bt(){Re=new UM(B),Ue=new PM(B,Re,e),Re.init(Ue),Me=new p1(B,Re,Ue),ve=new d1(B,Re,Ue),ut=new OM(B),Ye=new e1,C=new f1(B,Re,ve,Ye,Ue,Me,ut),w=new IM(_),G=new zM(_),re=new Yv(B,Ue),Je=new RM(B,Re,re,Ue),se=new NM(B,re,ut,Je),oe=new VM(B,se,re,ut),rt=new GM(B,Ue,C),et=new LM(Ye),we=new Qb(_,w,G,Re,Ue,Je,et),ge=new g1(_,Ye),ye=new n1,Oe=new l1(Re,Ue),St=new AM(_,w,G,ve,oe,u,l),ee=new u1(_,oe,Ue),bt=new x1(B,ut,Ue,ve),qe=new CM(B,Re,ut,Ue),Le=new kM(B,Re,ut,Ue),ut.programs=we.programs,_.capabilities=Ue,_.extensions=Re,_.properties=Ye,_.renderLists=ye,_.shadowMap=ee,_.state=ve,_.info=ut}Bt();let nt=new Zh(_,B);this.xr=nt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let A=Re.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Re.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(k,X,!1))},this.getSize=function(A){return A.set(k,X)},this.setSize=function(A,N,W=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=A,X=N,t.width=Math.floor(A*j),t.height=Math.floor(N*j),W===!0&&(t.style.width=A+"px",t.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(k*j,X*j).floor()},this.setDrawingBufferSize=function(A,N,W){k=A,X=N,j=W,t.width=Math.floor(A*W),t.height=Math.floor(N*W),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy(Q)},this.setViewport=function(A,N,W,q){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,N,W,q),ve.viewport(T.copy(Q).multiplyScalar(j).floor())},this.getScissor=function(A){return A.copy(ie)},this.setScissor=function(A,N,W,q){A.isVector4?ie.set(A.x,A.y,A.z,A.w):ie.set(A,N,W,q),ve.scissor(z.copy(ie).multiplyScalar(j).floor())},this.getScissorTest=function(){return me},this.setScissorTest=function(A){ve.setScissorTest(me=A)},this.setOpaqueSort=function(A){Z=A},this.setTransparentSort=function(A){K=A},this.getClearColor=function(A){return A.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor.apply(St,arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha.apply(St,arguments)},this.clear=function(A=!0,N=!0,W=!0){let q=0;if(A){let V=!1;if(R!==null){let xe=R.texture.format;V=xe===hm||xe===cm||xe===lm}if(V){let xe=R.texture.type,Te=xe===ys||xe===xs||xe===wu||xe===$s||xe===om||xe===am,ke=St.getClearColor(),Ve=St.getClearAlpha(),tt=ke.r,Ze=ke.g,Ke=ke.b;Te?(f[0]=tt,f[1]=Ze,f[2]=Ke,f[3]=Ve,B.clearBufferuiv(B.COLOR,0,f)):(g[0]=tt,g[1]=Ze,g[2]=Ke,g[3]=Ve,B.clearBufferiv(B.COLOR,0,g))}else q|=B.COLOR_BUFFER_BIT}N&&(q|=B.DEPTH_BUFFER_BIT),W&&(q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ye.dispose(),Oe.dispose(),Ye.dispose(),w.dispose(),G.dispose(),oe.dispose(),Je.dispose(),bt.dispose(),we.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",In),nt.removeEventListener("sessionend",It),_e&&(_e.dispose(),_e=null),Fn.stop()};function he(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let A=ut.autoReset,N=ee.enabled,W=ee.autoUpdate,q=ee.needsUpdate,V=ee.type;Bt(),ut.autoReset=A,ee.enabled=N,ee.autoUpdate=W,ee.needsUpdate=q,ee.type=V}function fe(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function pe(A){let N=A.target;N.removeEventListener("dispose",pe),He(N)}function He(A){Ne(A),Ye.remove(A)}function Ne(A){let N=Ye.get(A).programs;N!==void 0&&(N.forEach(function(W){we.releaseProgram(W)}),A.isShaderMaterial&&we.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,W,q,V,xe){N===null&&(N=Ae);let Te=V.isMesh&&V.matrixWorld.determinant()<0,ke=xx(A,N,W,q,V);ve.setMaterial(q,Te);let Ve=W.index,tt=1;if(q.wireframe===!0){if(Ve=se.getWireframeAttribute(W),Ve===void 0)return;tt=2}let Ze=W.drawRange,Ke=W.attributes.position,Xt=Ze.start*tt,Yn=(Ze.start+Ze.count)*tt;xe!==null&&(Xt=Math.max(Xt,xe.start*tt),Yn=Math.min(Yn,(xe.start+xe.count)*tt)),Ve!==null?(Xt=Math.max(Xt,0),Yn=Math.min(Yn,Ve.count)):Ke!=null&&(Xt=Math.max(Xt,0),Yn=Math.min(Yn,Ke.count));let cn=Yn-Xt;if(cn<0||cn===1/0)return;Je.setup(V,q,ke,W,Ve);let Hi,kt=qe;if(Ve!==null&&(Hi=re.get(Ve),kt=Le,kt.setIndex(Hi)),V.isMesh)q.wireframe===!0?(ve.setLineWidth(q.wireframeLinewidth*Xe()),kt.setMode(B.LINES)):kt.setMode(B.TRIANGLES);else if(V.isLine){let it=q.linewidth;it===void 0&&(it=1),ve.setLineWidth(it*Xe()),V.isLineSegments?kt.setMode(B.LINES):V.isLineLoop?kt.setMode(B.LINE_LOOP):kt.setMode(B.LINE_STRIP)}else V.isPoints?kt.setMode(B.POINTS):V.isSprite&&kt.setMode(B.TRIANGLES);if(V.isBatchedMesh)kt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)kt.renderInstances(Xt,cn,V.count);else if(W.isInstancedBufferGeometry){let it=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,qc=Math.min(W.instanceCount,it);kt.renderInstances(Xt,cn,qc)}else kt.render(Xt,cn)};function Pt(A,N,W){A.transparent===!0&&A.side===zt&&A.forceSinglePass===!1?(A.side=Zt,A.needsUpdate=!0,Ca(A,N,W),A.side=Fi,A.needsUpdate=!0,Ca(A,N,W),A.side=zt):Ca(A,N,W)}this.compile=function(A,N,W=null){W===null&&(W=A),m=Oe.get(W),m.init(),v.push(m),W.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),A!==W&&A.traverseVisible(function(V){V.isLight&&V.layers.test(N.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights(_._useLegacyLights);let q=new Set;return A.traverse(function(V){let xe=V.material;if(xe)if(Array.isArray(xe))for(let Te=0;Te<xe.length;Te++){let ke=xe[Te];Pt(ke,W,V),q.add(ke)}else Pt(xe,W,V),q.add(xe)}),v.pop(),m=null,q},this.compileAsync=function(A,N,W=null){let q=this.compile(A,N,W);return new Promise(V=>{function xe(){if(q.forEach(function(Te){Ye.get(Te).currentProgram.isReady()&&q.delete(Te)}),q.size===0){V(A);return}setTimeout(xe,10)}Re.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Lt=null;function ln(A){Lt&&Lt(A)}function In(){Fn.stop()}function It(){Fn.start()}let Fn=new vm;Fn.setAnimationLoop(ln),typeof self<"u"&&Fn.setContext(self),this.setAnimationLoop=function(A){Lt=A,nt.setAnimationLoop(A),A===null?Fn.stop():Fn.start()},nt.addEventListener("sessionstart",In),nt.addEventListener("sessionend",It),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(N),N=nt.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,N,R),m=Oe.get(A,v.length),m.init(),v.push(m),be.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),O.setFromProjectionMatrix(be),le=this.localClippingEnabled,Y=et.init(this.clippingPlanes,le),x=ye.get(A,p.length),x.init(),p.push(x),Ri(A,N,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(Z,K),this.info.render.frame++,Y===!0&&et.beginShadows();let W=m.state.shadowsArray;if(ee.render(W,A,N),Y===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset(),St.render(x,A),m.setupLights(_._useLegacyLights),N.isArrayCamera){let q=N.cameras;for(let V=0,xe=q.length;V<xe;V++){let Te=q[V];hf(x,A,Te,Te.viewport)}}else hf(x,A,N);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(_,A,N),Je.resetDefaultState(),F=-1,E=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Ri(A,N,W,q){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||O.intersectsSprite(A)){q&&Ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(be);let Te=oe.update(A),ke=A.material;ke.visible&&x.push(A,Te,ke,W,Ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||O.intersectsObject(A))){let Te=oe.update(A),ke=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ie.copy(A.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),Ie.copy(Te.boundingSphere.center)),Ie.applyMatrix4(A.matrixWorld).applyMatrix4(be)),Array.isArray(ke)){let Ve=Te.groups;for(let tt=0,Ze=Ve.length;tt<Ze;tt++){let Ke=Ve[tt],Xt=ke[Ke.materialIndex];Xt&&Xt.visible&&x.push(A,Te,Xt,W,Ie.z,Ke)}}else ke.visible&&x.push(A,Te,ke,W,Ie.z,null)}}let xe=A.children;for(let Te=0,ke=xe.length;Te<ke;Te++)Ri(xe[Te],N,W,q)}function hf(A,N,W,q){let V=A.opaque,xe=A.transmissive,Te=A.transparent;m.setupLightsView(W),Y===!0&&et.setGlobalState(_.clippingPlanes,W),xe.length>0&&gx(V,xe,N,W),q&&ve.viewport(T.copy(q)),V.length>0&&Ra(V,N,W),xe.length>0&&Ra(xe,N,W),Te.length>0&&Ra(Te,N,W),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function gx(A,N,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;let xe=Ue.isWebGL2;_e===null&&(_e=new xn(1,1,{generateMipmaps:!0,type:Re.has("EXT_color_buffer_half_float")?Gn:ys,minFilter:Ms,samples:xe?4:0})),_.getDrawingBufferSize(ze),xe?_e.setSize(ze.x,ze.y):_e.setSize(ul(ze.x),ul(ze.y));let Te=_.getRenderTarget();_.setRenderTarget(_e),_.getClearColor($),L=_.getClearAlpha(),L<1&&_.setClearColor(16777215,.5),_.clear();let ke=_.toneMapping;_.toneMapping=_s,Ra(A,W,q),C.updateMultisampleRenderTarget(_e),C.updateRenderTargetMipmap(_e);let Ve=!1;for(let tt=0,Ze=N.length;tt<Ze;tt++){let Ke=N[tt],Xt=Ke.object,Yn=Ke.geometry,cn=Ke.material,Hi=Ke.group;if(cn.side===zt&&Xt.layers.test(q.layers)){let kt=cn.side;cn.side=Zt,cn.needsUpdate=!0,uf(Xt,W,q,Yn,cn,Hi),cn.side=kt,cn.needsUpdate=!0,Ve=!0}}Ve===!0&&(C.updateMultisampleRenderTarget(_e),C.updateRenderTargetMipmap(_e)),_.setRenderTarget(Te),_.setClearColor($,L),_.toneMapping=ke}function Ra(A,N,W){let q=N.isScene===!0?N.overrideMaterial:null;for(let V=0,xe=A.length;V<xe;V++){let Te=A[V],ke=Te.object,Ve=Te.geometry,tt=q===null?Te.material:q,Ze=Te.group;ke.layers.test(W.layers)&&uf(ke,N,W,Ve,tt,Ze)}}function uf(A,N,W,q,V,xe){A.onBeforeRender(_,N,W,q,V,xe),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),V.onBeforeRender(_,N,W,q,A,xe),V.transparent===!0&&V.side===zt&&V.forceSinglePass===!1?(V.side=Zt,V.needsUpdate=!0,_.renderBufferDirect(W,N,q,V,A,xe),V.side=Fi,V.needsUpdate=!0,_.renderBufferDirect(W,N,q,V,A,xe),V.side=zt):_.renderBufferDirect(W,N,q,V,A,xe),A.onAfterRender(_,N,W,q,V,xe)}function Ca(A,N,W){N.isScene!==!0&&(N=Ae);let q=Ye.get(A),V=m.state.lights,xe=m.state.shadowsArray,Te=V.state.version,ke=we.getParameters(A,V.state,xe,N,W),Ve=we.getProgramCacheKey(ke),tt=q.programs;q.environment=A.isMeshStandardMaterial?N.environment:null,q.fog=N.fog,q.envMap=(A.isMeshStandardMaterial?G:w).get(A.envMap||q.environment),tt===void 0&&(A.addEventListener("dispose",pe),tt=new Map,q.programs=tt);let Ze=tt.get(Ve);if(Ze!==void 0){if(q.currentProgram===Ze&&q.lightsStateVersion===Te)return ff(A,ke),Ze}else ke.uniforms=we.getUniforms(A),A.onBuild(W,ke,_),A.onBeforeCompile(ke,_),Ze=we.acquireProgram(ke,Ve),tt.set(Ve,Ze),q.uniforms=ke.uniforms;let Ke=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ke.clippingPlanes=et.uniform),ff(A,ke),q.needsLights=_x(A),q.lightsStateVersion=Te,q.needsLights&&(Ke.ambientLightColor.value=V.state.ambient,Ke.lightProbe.value=V.state.probe,Ke.directionalLights.value=V.state.directional,Ke.directionalLightShadows.value=V.state.directionalShadow,Ke.spotLights.value=V.state.spot,Ke.spotLightShadows.value=V.state.spotShadow,Ke.rectAreaLights.value=V.state.rectArea,Ke.ltc_1.value=V.state.rectAreaLTC1,Ke.ltc_2.value=V.state.rectAreaLTC2,Ke.pointLights.value=V.state.point,Ke.pointLightShadows.value=V.state.pointShadow,Ke.hemisphereLights.value=V.state.hemi,Ke.directionalShadowMap.value=V.state.directionalShadowMap,Ke.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ke.spotShadowMap.value=V.state.spotShadowMap,Ke.spotLightMatrix.value=V.state.spotLightMatrix,Ke.spotLightMap.value=V.state.spotLightMap,Ke.pointShadowMap.value=V.state.pointShadowMap,Ke.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Ze,q.uniformsList=null,Ze}function df(A){if(A.uniformsList===null){let N=A.currentProgram.getUniforms();A.uniformsList=Ir.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function ff(A,N){let W=Ye.get(A);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function xx(A,N,W,q,V){N.isScene!==!0&&(N=Ae),C.resetTextureUnits();let xe=N.fog,Te=q.isMeshStandardMaterial?N.environment:null,ke=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:nn,Ve=(q.isMeshStandardMaterial?G:w).get(q.envMap||Te),tt=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ze=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ke=!!W.morphAttributes.position,Xt=!!W.morphAttributes.normal,Yn=!!W.morphAttributes.color,cn=_s;q.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(cn=_.toneMapping);let Hi=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,kt=Hi!==void 0?Hi.length:0,it=Ye.get(q),qc=m.state.lights;if(Y===!0&&(le===!0||A!==E)){let ri=A===E&&q.id===F;et.setState(q,A,ri)}let Ht=!1;q.version===it.__version?(it.needsLights&&it.lightsStateVersion!==qc.state.version||it.outputColorSpace!==ke||V.isBatchedMesh&&it.batching===!1||!V.isBatchedMesh&&it.batching===!0||V.isInstancedMesh&&it.instancing===!1||!V.isInstancedMesh&&it.instancing===!0||V.isSkinnedMesh&&it.skinning===!1||!V.isSkinnedMesh&&it.skinning===!0||V.isInstancedMesh&&it.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&it.instancingColor===!1&&V.instanceColor!==null||it.envMap!==Ve||q.fog===!0&&it.fog!==xe||it.numClippingPlanes!==void 0&&(it.numClippingPlanes!==et.numPlanes||it.numIntersection!==et.numIntersection)||it.vertexAlphas!==tt||it.vertexTangents!==Ze||it.morphTargets!==Ke||it.morphNormals!==Xt||it.morphColors!==Yn||it.toneMapping!==cn||Ue.isWebGL2===!0&&it.morphTargetsCount!==kt)&&(Ht=!0):(Ht=!0,it.__version=q.version);let Hs=it.currentProgram;Ht===!0&&(Hs=Ca(q,N,V));let pf=!1,Ao=!1,Yc=!1,wn=Hs.getUniforms(),Gs=it.uniforms;if(ve.useProgram(Hs.program)&&(pf=!0,Ao=!0,Yc=!0),q.id!==F&&(F=q.id,Ao=!0),pf||E!==A){wn.setValue(B,"projectionMatrix",A.projectionMatrix),wn.setValue(B,"viewMatrix",A.matrixWorldInverse);let ri=wn.map.cameraPosition;ri!==void 0&&ri.setValue(B,Ie.setFromMatrixPosition(A.matrixWorld)),Ue.logarithmicDepthBuffer&&wn.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&wn.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),E!==A&&(E=A,Ao=!0,Yc=!0)}if(V.isSkinnedMesh){wn.setOptional(B,V,"bindMatrix"),wn.setOptional(B,V,"bindMatrixInverse");let ri=V.skeleton;ri&&(Ue.floatVertexTextures?(ri.boneTexture===null&&ri.computeBoneTexture(),wn.setValue(B,"boneTexture",ri.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(wn.setOptional(B,V,"batchingTexture"),wn.setValue(B,"batchingTexture",V._matricesTexture,C));let Zc=W.morphAttributes;if((Zc.position!==void 0||Zc.normal!==void 0||Zc.color!==void 0&&Ue.isWebGL2===!0)&&rt.update(V,W,Hs),(Ao||it.receiveShadow!==V.receiveShadow)&&(it.receiveShadow=V.receiveShadow,wn.setValue(B,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Gs.envMap.value=Ve,Gs.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),Ao&&(wn.setValue(B,"toneMappingExposure",_.toneMappingExposure),it.needsLights&&vx(Gs,Yc),xe&&q.fog===!0&&ge.refreshFogUniforms(Gs,xe),ge.refreshMaterialUniforms(Gs,q,j,X,_e),Ir.upload(B,df(it),Gs,C)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ir.upload(B,df(it),Gs,C),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&wn.setValue(B,"center",V.center),wn.setValue(B,"modelViewMatrix",V.modelViewMatrix),wn.setValue(B,"normalMatrix",V.normalMatrix),wn.setValue(B,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let ri=q.uniformsGroups;for(let Kc=0,yx=ri.length;Kc<yx;Kc++)if(Ue.isWebGL2){let mf=ri[Kc];bt.update(mf,Hs),bt.bind(mf,Hs)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Hs}function vx(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function _x(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,N,W){Ye.get(A.texture).__webglTexture=N,Ye.get(A.depthTexture).__webglTexture=W;let q=Ye.get(A);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||Re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,N){let W=Ye.get(A);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(A,N=0,W=0){R=A,S=N,b=W;let q=!0,V=null,xe=!1,Te=!1;if(A){let Ve=Ye.get(A);Ve.__useDefaultFramebuffer!==void 0?(ve.bindFramebuffer(B.FRAMEBUFFER,null),q=!1):Ve.__webglFramebuffer===void 0?C.setupRenderTarget(A):Ve.__hasExternalTextures&&C.rebindTextures(A,Ye.get(A.texture).__webglTexture,Ye.get(A.depthTexture).__webglTexture);let tt=A.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(Te=!0);let Ze=Ye.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ze[N])?V=Ze[N][W]:V=Ze[N],xe=!0):Ue.isWebGL2&&A.samples>0&&C.useMultisampledRTT(A)===!1?V=Ye.get(A).__webglMultisampledFramebuffer:Array.isArray(Ze)?V=Ze[W]:V=Ze,T.copy(A.viewport),z.copy(A.scissor),H=A.scissorTest}else T.copy(Q).multiplyScalar(j).floor(),z.copy(ie).multiplyScalar(j).floor(),H=me;if(ve.bindFramebuffer(B.FRAMEBUFFER,V)&&Ue.drawBuffers&&q&&ve.drawBuffers(A,V),ve.viewport(T),ve.scissor(z),ve.setScissorTest(H),xe){let Ve=Ye.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ve.__webglTexture,W)}else if(Te){let Ve=Ye.get(A.texture),tt=N||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ve.__webglTexture,W||0,tt)}F=-1},this.readRenderTargetPixels=function(A,N,W,q,V,xe,Te){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Te!==void 0&&(ke=ke[Te]),ke){ve.bindFramebuffer(B.FRAMEBUFFER,ke);try{let Ve=A.texture,tt=Ve.format,Ze=Ve.type;if(tt!==ai&&Me.convert(tt)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ke=Ze===Gn&&(Re.has("EXT_color_buffer_half_float")||Ue.isWebGL2&&Re.has("EXT_color_buffer_float"));if(Ze!==ys&&Me.convert(Ze)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ze===$i&&(Ue.isWebGL2||Re.has("OES_texture_float")||Re.has("WEBGL_color_buffer_float")))&&!Ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-q&&W>=0&&W<=A.height-V&&B.readPixels(N,W,q,V,Me.convert(tt),Me.convert(Ze),xe)}finally{let Ve=R!==null?Ye.get(R).__webglFramebuffer:null;ve.bindFramebuffer(B.FRAMEBUFFER,Ve)}}},this.copyFramebufferToTexture=function(A,N,W=0){let q=Math.pow(2,-W),V=Math.floor(N.image.width*q),xe=Math.floor(N.image.height*q);C.setTexture2D(N,0),B.copyTexSubImage2D(B.TEXTURE_2D,W,0,0,A.x,A.y,V,xe),ve.unbindTexture()},this.copyTextureToTexture=function(A,N,W,q=0){let V=N.image.width,xe=N.image.height,Te=Me.convert(W.format),ke=Me.convert(W.type);C.setTexture2D(W,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,W.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,W.unpackAlignment),N.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,q,A.x,A.y,V,xe,Te,ke,N.image.data):N.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,q,A.x,A.y,N.mipmaps[0].width,N.mipmaps[0].height,Te,N.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,q,A.x,A.y,Te,ke,N.image),q===0&&W.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(A,N,W,q,V=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let xe=A.max.x-A.min.x+1,Te=A.max.y-A.min.y+1,ke=A.max.z-A.min.z+1,Ve=Me.convert(q.format),tt=Me.convert(q.type),Ze;if(q.isData3DTexture)C.setTexture3D(q,0),Ze=B.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)C.setTexture2DArray(q,0),Ze=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,q.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,q.unpackAlignment);let Ke=B.getParameter(B.UNPACK_ROW_LENGTH),Xt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Yn=B.getParameter(B.UNPACK_SKIP_PIXELS),cn=B.getParameter(B.UNPACK_SKIP_ROWS),Hi=B.getParameter(B.UNPACK_SKIP_IMAGES),kt=W.isCompressedTexture?W.mipmaps[V]:W.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,kt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,kt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,A.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,A.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,A.min.z),W.isDataTexture||W.isData3DTexture?B.texSubImage3D(Ze,V,N.x,N.y,N.z,xe,Te,ke,Ve,tt,kt.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Ze,V,N.x,N.y,N.z,xe,Te,ke,Ve,kt.data)):B.texSubImage3D(Ze,V,N.x,N.y,N.z,xe,Te,ke,Ve,tt,kt),B.pixelStorei(B.UNPACK_ROW_LENGTH,Ke),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Xt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Yn),B.pixelStorei(B.UNPACK_SKIP_ROWS,cn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Hi),V===0&&q.generateMipmaps&&B.generateMipmap(Ze),ve.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),ve.unbindTexture()},this.resetState=function(){S=0,b=0,R=null,ve.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Au?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===Xl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===gt?js:fm}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===js?gt:nn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Kh=class extends $o{};Kh.prototype.isWebGL1Renderer=!0;var yl=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new te(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Gr=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Jo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Dh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Dn=new P,jo=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Dn.fromBufferAttribute(this,t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dn.fromBufferAttribute(this,t),Dn.applyNormalMatrix(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dn.fromBufferAttribute(this,t),Dn.transformDirection(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),s=wt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),s=wt(s,this.array),r=wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ot(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Up=new P,Np=new At,kp=new At,v1=new P,Op=new Ge,ja=new P,Sh=new Jn,Bp=new Ge,wh=new kr,Qo=class extends ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Mf,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Rn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ja),this.boundingBox.expandByPoint(ja)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Jn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ja),this.boundingSphere.expandByPoint(ja)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sh.copy(this.boundingSphere),Sh.applyMatrix4(s),e.ray.intersectsSphere(Sh)!==!1&&(Bp.copy(s).invert(),wh.copy(e.ray).applyMatrix4(Bp),!(this.boundingBox!==null&&wh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,wh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new At,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Mf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yx?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,s=this.geometry;Np.fromBufferAttribute(s.attributes.skinIndex,e),kp.fromBufferAttribute(s.attributes.skinWeight,e),Up.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=kp.getComponent(r);if(o!==0){let a=Np.getComponent(r);Op.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(v1.copy(Up).applyMatrix4(Op),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Vr=class extends Rt{constructor(){super(),this.isBone=!0,this.type="Bone"}},$h=class extends gn{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Qt,h=Qt,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Hp=new Ge,_1=new Ge,ea=class n{constructor(e=[],t=[]){this.uuid=Ei(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new Ge;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:_1;Hp.multiplyMatrices(a,t[r]),Hp.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new $h(t,e,e,ai,$i);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){let r=e.bones[i],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Vr),this.bones.push(o),this.boneInverses.push(new Ge().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=i[s];e.boneInverses.push(a.toArray())}return e}},Si=class extends ot{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ar=new Ge,Gp=new Ge,Qa=[],Vp=new Rn,y1=new Ge,Io=new ne,Fo=new Jn,Qi=class extends ne{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Si(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,y1)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ar),Vp.copy(e.boundingBox).applyMatrix4(Ar),this.boundingBox.union(Vp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ar),Fo.copy(e.boundingSphere).applyMatrix4(Ar),this.boundingSphere.union(Fo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let i=this.matrixWorld,s=this.count;if(Io.geometry=this.geometry,Io.material=this.material,Io.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fo.copy(this.boundingSphere),Fo.applyMatrix4(i),e.ray.intersectsSphere(Fo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ar),Gp.multiplyMatrices(i,Ar),Io.matrixWorld=Gp,Io.raycast(e,Qa);for(let o=0,a=Qa.length;o<a;o++){let l=Qa[o];l.instanceId=r,l.object=this,t.push(l)}Qa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Si(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var ta=class extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Wp=new P,Xp=new P,qp=new Ge,Th=new kr,el=new Jn,Wr=class extends Rt{constructor(e=new vt,t=new ta){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Wp.fromBufferAttribute(t,s-1),Xp.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Wp.distanceTo(Xp);e.setAttribute("lineDistance",new Qe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),el.copy(i.boundingSphere),el.applyMatrix4(s),el.radius+=r,e.ray.intersectsSphere(el)===!1)return;qp.copy(s).invert(),Th.copy(e.ray).applyMatrix4(qp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new P,h=new P,d=new P,u=new P,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){let p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let _=p,M=v-1;_<M;_+=f){let S=g.getX(_),b=g.getX(_+1);if(c.fromBufferAttribute(m,S),h.fromBufferAttribute(m,b),Th.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);let F=e.ray.origin.distanceTo(u);F<e.near||F>e.far||t.push({distance:F,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let _=p,M=v-1;_<M;_+=f){if(c.fromBufferAttribute(m,_),h.fromBufferAttribute(m,_+1),Th.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);let b=e.ray.origin.distanceTo(u);b<e.near||b>e.far||t.push({distance:b,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Yp=new P,Zp=new P,Ml=class extends Wr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Yp.fromBufferAttribute(t,s),Zp.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Yp.distanceTo(Zp);e.setAttribute("lineDistance",new Qe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},bl=class extends Wr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},er=class extends Cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Kp=new Ge,Jh=new kr,tl=new Jn,nl=new P,Xr=class extends Rt{constructor(e=new vt,t=new er){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(s),tl.radius+=r,e.ray.intersectsSphere(tl)===!1)return;Kp.copy(s).invert(),Jh.copy(e.ray).applyMatrix4(Kp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,x=f;g<x;g++){let m=c.getX(g);nl.fromBufferAttribute(d,m),$p(nl,m,l,s,e,t,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,x=f;g<x;g++)nl.fromBufferAttribute(d,g),$p(nl,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function $p(n,e,t,i,s,r,o){let a=Jh.distanceSqToPoint(n);if(a<t){let l=new P;Jh.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}var vn=class extends gn{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ci=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let i=this.getLengths(),s=0,r=i.length,o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let h=i[s],u=i[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ae:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){let i=new P,s=[],r=[],o=[],a=new P,l=new Ge;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(en(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(en(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},na=class extends ci{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){let i=t||new ae,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},jh=class extends na{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Pu(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return n+e*r+t*o+i*a}}}var il=new P,Ah=new Pu,Rh=new Pu,Ch=new Pu,El=class extends ci{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new P){let i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(il.subVectors(s[0],s[1]).add(s[0]),c=il);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(il.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=il),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Ah.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,x,m),Rh.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,x,m),Ch.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Ah.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Rh.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Ch.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(Ah.calc(l),Rh.calc(l),Ch.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Jp(n,e,t,i,s){let r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function M1(n,e){let t=1-n;return t*t*e}function b1(n,e){return 2*(1-n)*n*e}function E1(n,e){return n*n*e}function Bo(n,e,t,i){return M1(n,e)+b1(n,t)+E1(n,i)}function S1(n,e){let t=1-n;return t*t*t*e}function w1(n,e){let t=1-n;return 3*t*t*n*e}function T1(n,e){return 3*(1-n)*n*n*e}function A1(n,e){return n*n*n*e}function Ho(n,e,t,i,s){return S1(n,e)+w1(n,t)+T1(n,i)+A1(n,s)}var Sl=class extends ci{constructor(e=new ae,t=new ae,i=new ae,s=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ae){let i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ho(e,s.x,r.x,o.x,a.x),Ho(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Qh=class extends ci{constructor(e=new P,t=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new P){let i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ho(e,s.x,r.x,o.x,a.x),Ho(e,s.y,r.y,o.y,a.y),Ho(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wl=class extends ci{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},eu=class extends ci{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tl=class extends ci{constructor(e=new ae,t=new ae,i=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ae){let i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Bo(e,s.x,r.x,o.x),Bo(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tu=class extends ci{constructor(e=new P,t=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new P){let i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Bo(e,s.x,r.x,o.x),Bo(e,s.y,r.y,o.y),Bo(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Al=class extends ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){let i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(Jp(a,l.x,c.x,h.x,d.x),Jp(a,l.y,c.y,h.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let s=e.points[t];this.points.push(new ae().fromArray(s))}return this}},jp=Object.freeze({__proto__:null,ArcCurve:jh,CatmullRomCurve3:El,CubicBezierCurve:Sl,CubicBezierCurve3:Qh,EllipseCurve:na,LineCurve:wl,LineCurve3:eu,QuadraticBezierCurve:Tl,QuadraticBezierCurve3:tu,SplineCurve:Al}),nu=class extends ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jp[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let s=e.curves[t];this.curves.push(new jp[s.type]().fromJSON(s))}return this}},iu=class extends nu{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new wl(this.currentPoint.clone(),new ae(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){let r=new Tl(this.currentPoint.clone(),new ae(e,t),new ae(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){let a=new Sl(this.currentPoint.clone(),new ae(e,t),new ae(i,s),new ae(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Al(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){let c=new na(e,t,i,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},qr=class n extends vt{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=en(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,d=new P,u=new ae,f=new P,g=new P,x=new P,m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let v=0;v<=t;v++){let _=i+v*h*s,M=Math.sin(_),S=Math.cos(_);for(let b=0;b<=e.length-1;b++){d.x=e[b].x*M,d.y=e[b].y,d.z=e[b].x*S,o.push(d.x,d.y,d.z),u.x=v/t,u.y=b/(e.length-1),a.push(u.x,u.y);let R=l[3*b+0]*M,F=l[3*b+1],E=l[3*b+0]*S;c.push(R,F,E)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){let M=_+v*e.length,S=M,b=M+e.length,R=M+e.length+1,F=M+1;r.push(S,b,F),r.push(R,F,b)}this.setIndex(r),this.setAttribute("position",new Qe(o,3)),this.setAttribute("uv",new Qe(a,2)),this.setAttribute("normal",new Qe(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.points,e.segments,e.phiStart,e.phiLength)}},ia=class n extends qr{constructor(e=1,t=1,i=4,s=8){let r=new iu;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new n(e.radius,e.length,e.capSegments,e.radialSegments)}},Vn=class n extends vt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new P,h=new ae;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=i+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(a,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Vt=class n extends vt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=i/2,p=0;v(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Qe(d,3)),this.setAttribute("normal",new Qe(u,3)),this.setAttribute("uv",new Qe(f,2));function v(){let M=new P,S=new P,b=0,R=(t-e)/i;for(let F=0;F<=r;F++){let E=[],T=F/r,z=T*(t-e)+e;for(let H=0;H<=s;H++){let $=H/s,L=$*l+a,k=Math.sin(L),X=Math.cos(L);S.x=z*k,S.y=-T*i+m,S.z=z*X,d.push(S.x,S.y,S.z),M.set(k,R,X).normalize(),u.push(M.x,M.y,M.z),f.push($,1-T),E.push(g++)}x.push(E)}for(let F=0;F<s;F++)for(let E=0;E<r;E++){let T=x[E][F],z=x[E+1][F],H=x[E+1][F+1],$=x[E][F+1];h.push(T,z,$),h.push(z,H,$),b+=6}c.addGroup(p,b,0),p+=b}function _(M){let S=g,b=new ae,R=new P,F=0,E=M===!0?e:t,T=M===!0?1:-1;for(let H=1;H<=s;H++)d.push(0,m*T,0),u.push(0,T,0),f.push(.5,.5),g++;let z=g;for(let H=0;H<=s;H++){let L=H/s*l+a,k=Math.cos(L),X=Math.sin(L);R.x=E*X,R.y=m*T,R.z=E*k,d.push(R.x,R.y,R.z),u.push(0,T,0),b.x=k*.5+.5,b.y=X*.5*T+.5,f.push(b.x,b.y),g++}for(let H=0;H<s;H++){let $=S+H,L=z+H;M===!0?h.push(L,L+1,$):h.push(L+1,L,$),F+=3}c.addGroup(p,F,M===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Yr=class n extends Vt{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Rl=class n extends vt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};let r=[],o=[];a(s),c(i),h(),this.setAttribute("position",new Qe(r,3)),this.setAttribute("normal",new Qe(r.slice(),3)),this.setAttribute("uv",new Qe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let _=new P,M=new P,S=new P;for(let b=0;b<t.length;b+=3)f(t[b+0],_),f(t[b+1],M),f(t[b+2],S),l(_,M,S,v)}function l(v,_,M,S){let b=S+1,R=[];for(let F=0;F<=b;F++){R[F]=[];let E=v.clone().lerp(M,F/b),T=_.clone().lerp(M,F/b),z=b-F;for(let H=0;H<=z;H++)H===0&&F===b?R[F][H]=E:R[F][H]=E.clone().lerp(T,H/z)}for(let F=0;F<b;F++)for(let E=0;E<2*(b-F)-1;E++){let T=Math.floor(E/2);E%2===0?(u(R[F][T+1]),u(R[F+1][T]),u(R[F][T])):(u(R[F][T+1]),u(R[F+1][T+1]),u(R[F+1][T]))}}function c(v){let _=new P;for(let M=0;M<r.length;M+=3)_.x=r[M+0],_.y=r[M+1],_.z=r[M+2],_.normalize().multiplyScalar(v),r[M+0]=_.x,r[M+1]=_.y,r[M+2]=_.z}function h(){let v=new P;for(let _=0;_<r.length;_+=3){v.x=r[_+0],v.y=r[_+1],v.z=r[_+2];let M=m(v)/2/Math.PI+.5,S=p(v)/Math.PI+.5;o.push(M,1-S)}g(),d()}function d(){for(let v=0;v<o.length;v+=6){let _=o[v+0],M=o[v+2],S=o[v+4],b=Math.max(_,M,S),R=Math.min(_,M,S);b>.9&&R<.1&&(_<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),S<.2&&(o[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,_){let M=v*3;_.x=e[M+0],_.y=e[M+1],_.z=e[M+2]}function g(){let v=new P,_=new P,M=new P,S=new P,b=new ae,R=new ae,F=new ae;for(let E=0,T=0;E<r.length;E+=9,T+=6){v.set(r[E+0],r[E+1],r[E+2]),_.set(r[E+3],r[E+4],r[E+5]),M.set(r[E+6],r[E+7],r[E+8]),b.set(o[T+0],o[T+1]),R.set(o[T+2],o[T+3]),F.set(o[T+4],o[T+5]),S.copy(v).add(_).add(M).divideScalar(3);let z=m(S);x(b,T+0,v,z),x(R,T+2,_,z),x(F,T+4,M,z)}}function x(v,_,M,S){S<0&&v.x===1&&(o[_]=v.x-1),M.x===0&&M.z===0&&(o[_]=S/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.details)}};var Cl=class n extends Rl{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Pl=class n extends Rl{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},Ss=class n extends vt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],l=[],c=[],h=[],d=e,u=(t-e)/s,f=new P,g=new ae;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){let p=r+m/i*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){let m=x*(i+1);for(let p=0;p<i;p++){let v=p+m,_=v,M=v+i+1,S=v+i+2,b=v+1;a.push(_,M,b),a.push(M,S,b)}}this.setIndex(a),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Ot=class n extends vt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new P,u=new P,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let v=[],_=p/i,M=0;p===0&&o===0?M=.5/t:p===i&&l===Math.PI&&(M=-.5/t);for(let S=0;S<=t;S++){let b=S/t;d.x=-e*Math.cos(s+b*r)*Math.sin(o+_*a),d.y=e*Math.cos(o+_*a),d.z=e*Math.sin(s+b*r)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(b+M,1-_),v.push(c++)}h.push(v)}for(let p=0;p<i;p++)for(let v=0;v<t;v++){let _=h[p][v+1],M=h[p][v],S=h[p+1][v],b=h[p+1][v+1];(p!==0||o>0)&&f.push(_,M,b),(p!==i-1||l<Math.PI)&&f.push(M,S,b)}this.setIndex(f),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(x,3)),this.setAttribute("uv",new Qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Di=class n extends vt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new P,d=new P,u=new P;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,v=(s+1)*f+g;o.push(x,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ll=class extends yt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ws=class extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tu,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},hi=class extends ws{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return en(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Il=class extends Cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tu,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function sl(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function R1(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function C1(n){function e(s,r){return n[s]-n[r]}let t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function Qp(n,e,t){let i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=n[a+l]}return s}function Sm(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(e.push(r.time),t.push(o)),r=n[s++];while(r!==void 0)}var Ts=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=t[++i],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},su=class extends Ts{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yf,endingEnd:Yf}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zf:r=e,a=2*t-i;break;case Kf:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Zf:o=e,l=2*i-t;break;case Kf:o=1,l=i+s[1]-s[0];break;default:o=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-t)/(s-t),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,v=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,_=(-1-f)*m+(1.5+f)*x+.5*g,M=f*m-f*x;for(let S=0;S!==a;++S)r[S]=p*o[h+S]+v*o[c+S]+_*o[l+S]+M*o[d+S];return r}},ru=class extends Ts{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(i-t)/(s-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},ou=class extends Ts{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ui=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=sl(t,this.TimeBufferType),this.values=sl(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:sl(e.times,Array),values:sl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ou(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ru(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new su(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ur:t=this.InterpolantFactoryMethodDiscrete;break;case Qs:t=this.InterpolantFactoryMethodLinear;break;case th:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ur;case this.InterpolantFactoryMethodLinear:return Qs;case this.InterpolantFactoryMethodSmooth:return th}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&R1(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===th,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let x=t[d+g];if(x!==t[u+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*i,u=o*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=Qs;var As=class extends ui{};As.prototype.ValueTypeName="bool";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=Ur;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;var Fl=class extends ui{};Fl.prototype.ValueTypeName="color";var es=class extends ui{};es.prototype.ValueTypeName="number";var au=class extends Ts{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Nn.slerpFlat(r,0,o,c-a,o,c,l);return r}},zi=class extends ui{InterpolantFactoryMethodLinear(e){return new au(this.times,this.values,this.getValueSize(),e)}};zi.prototype.ValueTypeName="quaternion";zi.prototype.DefaultInterpolation=Qs;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends ui{};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=Ur;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var ts=class extends ui{};ts.prototype.ValueTypeName="vector";var Dl=class{constructor(e,t=-1,i,s=nv){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Ei(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,s=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(L1(i[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=i.length;r!==o;++r)t.push(ui.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=C1(l);l=Qp(l,1,h),c=Qp(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new es(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=s[d];u||(s[d]=u=[]),u.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,i));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(d,u,f,g,x){if(f.length!==0){let m=[],p=[];Sm(f,m,p,g),m.length!==0&&x.push(new d(u,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let d=0;d<c.length;d++){let u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){let f={},g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let x=0;x<u[g].morphTargets.length;x++)f[u[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let v=0;v!==u[g].morphTargets.length;++v){let _=u[g];m.push(_.time),p.push(_.morphTarget===x?1:0)}s.push(new es(".morphTargetInfluence["+x+"]",m,p))}l=f.length*o}else{let f=".bones["+t[d].name+"]";i(ts,f+".position",u,"pos",s),i(zi,f+".quaternion",u,"rot",s),i(ts,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){let e=this.tracks,t=0;for(let i=0,s=e.length;i!==s;++i){let r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function P1(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return es;case"vector":case"vector2":case"vector3":case"vector4":return ts;case"color":return Fl;case"quaternion":return zi;case"bool":case"boolean":return As;case"string":return Rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function L1(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=P1(n.type);if(n.times===void 0){let t=[],i=[];Sm(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var vs={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},lu=class{constructor(e,t,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},I1=new lu,ns=class{constructor(e){this.manager=e!==void 0?e:I1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ns.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yi={},cu=class extends Error{constructor(e,t){super(e),this.response=t}},sa=class extends ns{constructor(e){super(e)}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=vs.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Yi[e]!==void 0){Yi[e].push({onLoad:t,onProgress:i,onError:s});return}Yi[e]=[],Yi[e].push({onLoad:t,onProgress:i,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Yi[e],d=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=u?parseInt(u):0,g=f!==0,x=0,m=new ReadableStream({start(p){v();function v(){d.read().then(({done:_,value:M})=>{if(_)p.close();else{x+=M.byteLength;let S=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let b=0,R=h.length;b<R;b++){let F=h[b];F.onProgress&&F.onProgress(S)}p.enqueue(M),v()}})}}});return new Response(m)}else throw new cu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{vs.add(e,c);let h=Yi[e];delete Yi[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Yi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Yi[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var hu=class extends ns{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=vs.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Xo("img");function l(){h(),vs.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(d){h(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var zl=class extends ns{constructor(e){super(e)}load(e,t,i,s){let r=new gn,o=new hu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}},Zr=class extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ul=class extends Zr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ph=new Ge,em=new P,tm=new P,ra=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ko,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;em.setFromMatrixPosition(e.matrixWorld),t.position.copy(em),tm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tm),t.updateMatrixWorld(),Ph.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ph),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ph)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},uu=class extends ra{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,i=Nr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Nl=class extends Zr{constructor(e,t,i=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new uu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},nm=new Ge,Do=new P,Lh=new P,du=class extends ra{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new At(2,1,1,1),new At(0,1,1,1),new At(3,1,1,1),new At(1,1,1,1),new At(3,0,1,1),new At(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Do.setFromMatrixPosition(e.matrixWorld),i.position.copy(Do),Lh.copy(i.position),Lh.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Lh),i.updateMatrixWorld(),s.makeTranslation(-Do.x,-Do.y,-Do.z),nm.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nm)}},kl=class extends Zr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new du}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},fu=class extends ra{constructor(){super(new Es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Kr=class extends Zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new fu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Cs=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,s=e.length;i<s;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ol=class extends vt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Bl=class extends ns{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=vs.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return vs.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),vs.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});vs.add(e,l),r.manager.itemStart(e)}};var Hl=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=im(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=im();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function im(){return(typeof performance>"u"?Date:performance).now()}var Lu="\\[\\]\\.:\\/",F1=new RegExp("["+Lu+"]","g"),Iu="[^"+Lu+"]",D1="[^"+Lu.replace("\\.","")+"]",z1=/((?:WC+[\/:])*)/.source.replace("WC",Iu),U1=/(WCOD+)?/.source.replace("WCOD",D1),N1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Iu),k1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Iu),O1=new RegExp("^"+z1+U1+N1+k1+"$"),B1=["material","materials","bones","map"],pu=class{constructor(e,t,i){let s=i||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ft=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(F1,"")}static parseTrackName(e){let t=O1.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);B1.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=pu;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rw=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mu);var J=n=>document.getElementById(n),Pe=Math.PI*2,$e=(n,e,t)=>n<e?e:n>t?t:n,Wn=(n,e,t)=>n+(e-n)*t;var Kt=matchMedia("(pointer:coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>0,la=Math.random,D=(n=0,e=1)=>n+la()*(e-n),is=n=>n[Math.floor(la()*n.length)];function Fu(n,e){let t=n>>>0,i=la;la=()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296};try{return e()}finally{la=i}}function tr(n,e){let t=(e-n)%Pe;return t>Math.PI&&(t-=Pe),t<-Math.PI&&(t+=Pe),t}var Jr=n=>{for(let e=n.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n},_t={get(n,e){try{let t=localStorage.getItem("pt_"+n);return t===null?e:JSON.parse(t)}catch{return e}},set(n,e){try{localStorage.setItem("pt_"+n,JSON.stringify(e))}catch{}}},dn=n=>String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]);function ss(n,e,t,i,s){return n.v+=((e-n.x)*t-n.v*i)*s,n.x+=n.v*s,n.x}var rs=(n=0)=>({x:n,v:0});var Zl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var jn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},H1=new Es(-1,1,1,-1,0,1),Du=class extends vt{constructor(){super(),this.setAttribute("position",new Qe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Qe([0,2,0,0,2,0],2))}},G1=new Du,Ls=class{constructor(e){this._mesh=new ne(G1,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,H1)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Kl=class extends jn{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof yt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ps.clone(e.uniforms),this.material=new yt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ls(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var ca=class extends jn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},$l=class extends jn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Jl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new ae);this._width=i.width,this._height=i.height,t=new xn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Kl(Zl),this.copyPass.material.blending=Li,this.clock=new Hl}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ca!==void 0&&(o instanceof ca?i=!0:o instanceof $l&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var jl=class extends jn{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};var wm={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var jr=class n extends jn{constructor(e,t,i,s){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new ae(e.x,e.y):new ae(256,256),this.clearColor=new te(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new xn(r,o,{type:Gn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let u=new xn(r,o,{type:Gn});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);let f=new xn(r,o,{type:Gn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}let a=wm;this.highPassUniforms=Ps.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new yt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ae(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=Zl;this.copyUniforms=Ps.clone(h.uniforms),this.blendMaterial=new yt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:un,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new te,this.oldClearAlpha=1,this.basic=new Fe,this.fsQuad=new Ls(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ae(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new yt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ae(.5,.5)},direction:{value:new ae(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new yt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};jr.BlurDirectionX=new ae(1,0);jr.BlurDirectionY=new ae(0,1);var Tm={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Ql=class extends jn{constructor(){super();let e=Tm;this.uniforms=Ps.clone(e.uniforms),this.material=new Ll({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Ls(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},dt.getTransfer(this._outputColorSpace)===Tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===yu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Mu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===bu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===oa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Eu&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var nr=J("c"),Ou=(()=>{let n=_t.get("gfx",Kt?"low":"medium");return["low","medium","high"].includes(n)?n:"medium"})(),ct=Ou==="low",os=Ou==="high",V1=["roughness","metalness","envMapIntensity","roughnessMap","metalnessMap"];function mt(n={}){if(!ct)return new ws(n);let e=Object.assign({},n);for(let t of V1)delete e[t];return new Il(e)}var Ut=new $o({canvas:nr,antialias:!Kt,powerPreference:"high-performance",stencil:!1});Ut.toneMapping=oa;Ut.toneMappingExposure=1;Ut.shadowMap.enabled=!ct;Ut.shadowMap.type=os?gu:Gl;var ce=new Gr,Nu=new te("#B9A08A");ce.fog=new yl(Nu,48,120);var Be=new tn(55,1,.1,400),ec=new P(-.86,.3,.22).normalize(),tc={top:{value:new te("#27477E")},hor:{value:new te("#FFB46A")},hor2:{value:new te("#9C7FB0")},sunDir:{value:ec},t:{value:0},disc:{value:new te("#FFA040")},cloud:{value:new te("#F6C6A4")},stars:{value:0}},Bu=new yt({side:Zt,depthWrite:!1,fog:!1,uniforms:tc,vertexShader:"varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 hor; uniform vec3 hor2; uniform vec3 sunDir; uniform float t; uniform vec3 disc; uniform vec3 cloud; uniform float stars; varying vec3 vDir;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 1.7; a *= 0.5; } return v; }
void main(){
  vec3 d = normalize(vDir); float h = d.y;
  vec2 dxz = d.xz; float dl = length(dxz); dxz = dl > 1e-3 ? dxz / dl : vec2(0.0, 1.0);
  float side = clamp(dot(dxz, normalize(sunDir.xz)) * 0.5 + 0.5, 0.0, 1.0);
  vec3 horc = mix(hor2, hor, side * side);
  vec3 col = mix(horc, top, pow(clamp(h, 0.0, 1.0), 0.45));
  col = mix(col, horc * 0.8, clamp(-h / 0.3, 0.0, 1.0));
  float s = max(dot(d, sunDir), 0.0);
  col += disc * (pow(s, 1200.0) * 10.0 + pow(s, 40.0) * 0.55 + pow(s, 6.0) * 0.18);
  // night: a field of stars, denser and brighter toward the top
  if(stars > 0.0 && h > 0.02){
    vec2 sp = d.xz / (h + 0.35) * 90.0; vec2 cell = floor(sp); float r = hash(cell);
    float st = step(0.985, r) * smoothstep(0.42, 0.0, length(fract(sp) - 0.5)) * (0.5 + 0.5 * hash(cell + 7.0));
    col += vec3(0.85, 0.9, 1.0) * st * stars * 2.2 * smoothstep(0.02, 0.3, h);
  }
  if(h > 0.0){
    vec2 uv = d.xz / (h + 0.16) * 1.3 + vec2(t * 0.012, t * 0.005);
    float c = smoothstep(0.48, 0.78, fbm(uv)) * smoothstep(0.0, 0.25, h);
    vec3 cc = mix(cloud * vec3(0.75, 0.68, 0.85), cloud, side) * (0.85 + 0.2 * fbm(uv * 2.0 + 3.0)) + disc * pow(s, 5.0) * 0.9 * (1.0 - stars * 0.85);
    col = mix(col, cc, c * 0.9);
  }
  col = clamp(col, 0.0, 8.0); if(!(col.r == col.r && col.g == col.g && col.b == col.b)) col = top;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`}),eo=new ne(new Ot(300,32,16),Bu);eo.renderOrder=-10;eo.frustumCulled=!1;ce.add(eo);function Rm(n){tc.t.value+=n}function W1(){let n=new Hr(Ut),e=new Gr;e.add(new ne(new Ot(50,32,16),Bu));let t=new ne(new Vn(49,24),new Fe({color:"#4A6A2E",side:zt}));t.rotation.x=-Math.PI/2,t.position.y=-4,e.add(t),Uu&&Uu.dispose();let i=Uu=n.fromScene(e,.04,.1,200);n.dispose(),ce.environment=i.texture}var zu=null,Uu=null;function X1(){zu&&zu.dispose();let n=zu=new Zo(ct?256:512,{type:Gn}),e=new Yo(.5,400,n),t=new Gr,i=new ne(new Ot(100,32,16),Bu);t.add(i),e.update(Ut,t),ce.background=n.texture,eo.visible=!1}var ha=new Ul("#AFC2EC","#4E5E2C",.8);ce.add(ha);var yn=new Kr("#FFC88C",2.5);ct&&(ha.intensity=1.55,yn.intensity=2.3);yn.castShadow=!0;yn.shadow.bias=-4e-4;yn.shadow.normalBias=.03;ce.add(yn,yn.target);function Cm(n){for(let e of["top","hor","hor2","disc","cloud"])tc[e].value.set(n[e]);tc.stars.value=n.stars||0,ec.set(n.dir[0],n.dir[1],n.dir[2]).normalize(),yn.color.set(n.sunC),yn.intensity=n.sunI*(ct?.92:1),ha.color.set(n.hs),ha.groundColor.set(n.hg),ha.intensity=n.hi*(ct?1.94:1),Nu.set(n.fog),ce.fog.color.copy(Nu),Ut.toneMappingExposure=n.exp,yn.position.copy(ec).multiplyScalar(70),W1(),X1()}function Pm(n,e){let t=yn.shadow.camera,i=Math.hypot(n,e)+3;t.left=-i,t.right=i,t.top=i,t.bottom=-i,t.near=1,t.far=160,t.updateProjectionMatrix(),yn.position.copy(ec).multiplyScalar(70),yn.target.position.set(0,0,0)}function di(n,e,t,i={}){let s=document.createElement("canvas");s.width=n,s.height=e,t(s.getContext("2d"),n,e);let r=new vn(s);return r.colorSpace=i.linear?Hn:gt,i.repeat&&(r.wrapS=r.wrapT=ji),r.anisotropy=4,r}var de={level:Ou,PR:1,post:!1,composer:null,bloom:null,perfN:0,perfSum:0,calm:0,shadows:!ct,fps:0,frames:0,fpsT:0,onShadows:null};function ku(){return Math.min(os?2:ct?1.3:1.5,devicePixelRatio||1)}var Am=()=>Math.min(ct?.8:.75,devicePixelRatio||1);function Qr(){let n=innerWidth,e=innerHeight;Ut.setSize(n,e,!1),Be.aspect=n/e,Be.fov=Be.userData.baseFov=Be.aspect<.75?72:Be.aspect<1.2?62:55,Be.updateProjectionMatrix(),de.composer&&(de.composer.setPixelRatio(de.PR),de.composer.setSize(n,e))}function q1(){if(de.composer)return;let n=Ut.getDrawingBufferSize(new ae),e=new xn(n.x,n.y,{type:Gn,samples:2});de.composer=new Jl(Ut,e),de.composer.addPass(new jl(ce,Be)),de.bloom=new jr(new ae(innerWidth,innerHeight),.35,.5,.92),de.composer.addPass(de.bloom),de.composer.addPass(new Ql)}function Lm(n){_t.set("gfx",n)}function Im(){de.PR=Math.min(ku(),ct?1.15:1.25),Ut.setPixelRatio(de.PR),ce.fog.near=ct?30:40,ce.fog.far=ct?85:110,Be.far=160,Be.updateProjectionMatrix();let n=os?2048:1024;if(yn.shadow.mapSize.x!==n&&(yn.shadow.mapSize.set(n,n),yn.shadow.map&&(yn.shadow.map.dispose(),yn.shadow.map=null)),os)try{q1()}catch{de.composer=null}de.post=os&&!!de.composer,de.perfN=de.perfSum=de.calm=0,Qr()}function Y1(){de.shadows=!1,Ut.shadowMap.enabled=!1,ce.traverse(n=>{if(n.material)for(let e of[].concat(n.material))e.needsUpdate=!0}),de.onShadows&&de.onShadows(!1)}function Fm(n,e){if(de.frames++,de.fpsT+=n,de.fpsT>=.5&&(de.fps=Math.round(de.frames/de.fpsT),de.frames=0,de.fpsT=0),!e||n>.5||document.hidden||(de.perfN++,de.perfSum+=n,de.perfN<60))return;let t=de.perfSum/de.perfN;de.perfN=0,de.perfSum=0,t>.0205?(de.calm=0,de.post?(de.post=!1,de.noPost=!0):de.PR>Am()+.01?(de.PR=Math.max(Am(),de.PR*.88),Ut.setPixelRatio(de.PR),Qr()):de.shadows&&++de.slow>=2&&Y1()):t<.0135&&++de.calm>=3&&(de.calm=0,de.slow=0,de.PR<ku()-.01?(de.PR=Math.min(ku(),de.PR*1.1),Ut.setPixelRatio(de.PR),Qr()):!de.post&&de.composer&&os&&!de.noPost&&(de.post=!0))}de.slow=0;function Hu(){de.post&&de.composer?de.composer.render():Ut.render(ce,Be)}function ua(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new vt,c=0;for(let h=0;h<n.length;++h){let d=n[h],u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,d=[];for(let u=0;u<n.length;++u){let f=n[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=n[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=Dm(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in o){let d=o[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][u]);let g=Dm(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Dm(n){let e,t,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let o=new e(r),a=0;for(let c=0;c<n.length;++c)o.set(n[c].array,a),a+=n[c].array.length;let l=new ot(o,t,i);return s!==void 0&&(l.gpuType=s),l}function nc(n,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},i=n.getIndex(),s=n.getAttribute("position"),r=i?i.count:s.count,o=0,a=Object.keys(n.attributes),l={},c={},h=[],d=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let v=0,_=a.length;v<_;v++){let M=a[v],S=n.attributes[M];l[M]=new ot(new S.array.constructor(S.count*S.itemSize),S.itemSize,S.normalized);let b=n.morphAttributes[M];b&&(c[M]=new ot(new b.array.constructor(b.count*b.itemSize),b.itemSize,b.normalized))}let f=e*.5,g=Math.log10(1/e),x=Math.pow(10,g),m=f*x;for(let v=0;v<r;v++){let _=i?i.getX(v):v,M="";for(let S=0,b=a.length;S<b;S++){let R=a[S],F=n.getAttribute(R),E=F.itemSize;for(let T=0;T<E;T++)M+=`${~~(F[d[T]](_)*x+m)},`}if(M in t)h.push(t[M]);else{for(let S=0,b=a.length;S<b;S++){let R=a[S],F=n.getAttribute(R),E=n.morphAttributes[R],T=F.itemSize,z=l[R],H=c[R];for(let $=0;$<T;$++){let L=d[$],k=u[$];if(z[k](o,F[L](_)),E)for(let X=0,j=E.length;X<j;X++)H[X][k](o,E[X][L](_))}}t[M]=o,h.push(o),o++}}let p=n.clone();for(let v in n.attributes){let _=l[v];if(p.setAttribute(v,new ot(_.array.slice(0,o*_.itemSize),_.itemSize,_.normalized)),v in c)for(let M=0;M<c[v].length;M++){let S=c[v][M];p.morphAttributes[v][M]=new ot(S.array.slice(0,o*S.itemSize),S.itemSize,S.normalized)}}return p.setIndex(h),p}function Gu(n,e){if(e===dm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===aa||e===Wl){let t=n.getIndex();if(t===null){let o=[],a=n.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,s=[];if(e===aa)for(let o=1;o<=i;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var sr=class extends ns{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ku(t)}),this.register(function(t){return new sd(t)}),this.register(function(t){return new rd(t)}),this.register(function(t){return new od(t)}),this.register(function(t){return new Ju(t)}),this.register(function(t){return new ju(t)}),this.register(function(t){return new Qu(t)}),this.register(function(t){return new ed(t)}),this.register(function(t){return new Zu(t)}),this.register(function(t){return new td(t)}),this.register(function(t){return new $u(t)}),this.register(function(t){return new id(t)}),this.register(function(t){return new nd(t)}),this.register(function(t){return new qu(t)}),this.register(function(t){return new ad(t)}),this.register(function(t){return new ld(t)})}load(e,t,i,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Cs.extractUrlBase(e);o=Cs.resolveURL(c,this.path)}else o=Cs.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new sa(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},i,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Om){try{o[at.KHR_BINARY_GLTF]=new cd(e)}catch(d){s&&s(d);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new gd(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case at.KHR_MATERIALS_UNLIT:o[d]=new Yu;break;case at.KHR_DRACO_MESH_COMPRESSION:o[d]=new hd(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[d]=new ud;break;case at.KHR_MESH_QUANTIZATION:o[d]=new dd;break;default:u.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(i,s)}parseAsync(e,t){let i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}};function Z1(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},qu=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){let r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,s=t.cache.get(i);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],nn);let d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Kr(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new kl(h),c.distance=d;break;case"spot":c=new Nl(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Fs(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,r=i.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return i._getNodeRef(t.cache,a,l)})}},Yu=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return Fe}extendParams(e,t,i){let s=[];e.color=new te(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],nn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,gt))}return Promise.all(s)}},Zu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Ku=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(i.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ae(a,a)}return Promise.all(r)}},$u=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(i.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Ju=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new te(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],nn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(i.assignTexture(t,"sheenColorMap",o.sheenColorTexture,gt)),o.sheenRoughnessTexture!==void 0&&r.push(i.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},ju=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(i.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Qu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(i.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new te().setRGB(a[0],a[1],a[2],nn),Promise.all(r)}},ed=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},td=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(i.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new te().setRGB(a[0],a[1],a[2],nn),o.specularColorTexture!==void 0&&r.push(i.assignTexture(t,"specularColorMap",o.specularColorTexture,gt)),Promise.all(r)}},nd=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(i.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},id=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:hi}extendMaterialParams(e,t){let i=this.parser,s=i.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(i.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},sd=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},rd=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=i.textureLoader;if(a.uri){let c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},od=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=i.textureLoader;if(a.uri){let c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,o.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ad=class{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*d);return o.decodeGltfBuffer(new Uint8Array(f),h,d,u,s.mode,s.filter),f})})}else return null}},ld=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let s=t.meshes[i.mesh];for(let c of s.primitives)if(c.mode!==fi.TRIANGLES&&c.mode!==fi.TRIANGLE_STRIP&&c.mode!==fi.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=i.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(let g of d){let x=new Ge,m=new P,p=new Nn,v=new P(1,1,1),_=new Qi(g.geometry,g.material,u);for(let M=0;M<u;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,M),l.SCALE&&v.fromBufferAttribute(l.SCALE,M),_.setMatrixAt(M,x.compose(m,p,v));for(let M in l)if(M==="_COLOR_0"){let S=l[M];_.instanceColor=new Si(S.array,S.itemSize,S.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);Rt.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Om="glTF",da=12,zm={JSON:1313821514,BIN:5130562},cd=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,da),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Om)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-da,r=new DataView(e,da),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===zm.JSON){let c=new Uint8Array(e,da+o,a);this.content=i.decode(c)}else if(l===zm.BIN){let c=da+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},hd=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let d=pd[h]||h.toLowerCase();a[d]=o[h]}for(let h in e.attributes){let d=pd[h]||h.toLowerCase();if(o[h]!==void 0){let u=i.accessors[e.attributes[h]],f=to[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(f){for(let g in f.attributes){let x=f.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}d(f)},a,c,nn,u)})})}},ud=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},dd=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},ic=class extends Ts{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=i[r+o];return t}interpolate_(e,t,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,d=(i-t)/h,u=d*d,f=u*d,g=e*c,x=g-c,m=-2*f+3*u,p=f-u,v=1-m,_=p-u+d;for(let M=0;M!==a;M++){let S=o[x+M+a],b=o[x+M+l]*h,R=o[g+M+a],F=o[g+M]*h;r[M]=v*S+_*b+m*R+p*F}return r}},K1=new Nn,fd=class extends ic{interpolate_(e,t,i,s){let r=super.interpolate_(e,t,i,s);return K1.fromArray(r).normalize().toArray(r),r}},fi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},to={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Um={9728:Qt,9729:Un,9984:ol,9985:Su,9986:zo,9987:Ms},Nm={33071:$n,33648:Wo,10497:ji},Vu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},pd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Is={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},$1={CUBICSPLINE:void 0,LINEAR:Qs,STEP:Ur},Wu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function J1(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new ws({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Fi})),n.DefaultMaterial}function ir(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Fs(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function j1(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let d=e[c];if(i){let u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;o.push(u)}if(s){let u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;a.push(u)}if(r){let u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;l.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],d=c[1],u=c[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=d),r&&(n.morphAttributes.color=u),n.morphTargetsRelative=!0,n})}function Q1(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function eE(n){let e,t=n.extensions&&n.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Xu(t.attributes):e=n.indices+":"+Xu(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+Xu(n.targets[i]);return e}function Xu(n){let e="",t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function md(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function tE(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var nE=new Ge,gd=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Z1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=!1,r=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,r=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||s&&r<98?this.textureLoader=new zl(this.options.manager):this.textureLoader=new Bl(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sa(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:i,userData:{}};return ir(r,a,s),Fs(a,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let s=i.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let s=e(t[i]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){let i=e+":"+t,s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return i.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){i.load(Cs.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){let t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Vu[s.type],a=to[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new ot(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=Vu[s.type],c=to[s.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(f&&f!==d){let p=Math.floor(u/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,_=t.cache.get(v);_||(x=new c(a,p*f,s.count*f/h),_=new Jo(x,f/h),t.cache.add(v,_)),m=new jo(_,l,u%f/h,g)}else a===null?x=new c(s.count*l):x=new c(a,u,s.count*l),m=new ot(x,l,g);if(s.sparse!==void 0){let p=Vu.SCALAR,v=to[s.sparse.indices.componentType],_=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,S=new v(o[1],_,s.sparse.count*p),b=new c(o[2],M,s.sparse.count*l);a!==null&&(m=new ot(m.array.slice(),m.itemSize,m.normalized));for(let R=0,F=S.length;R<F;R++){let E=S[R];if(m.setX(E,b[R*l]),l>=2&&m.setY(E,b[R*l+1]),l>=3&&m.setZ(E,b[R*l+2]),l>=4&&m.setW(E,b[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,i=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=i.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,i){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let u=(r.samplers||{})[o.sampler]||{};return h.magFilter=Um[u.magFilter]||Un,h.minFilter=Um[u.minFilter]||Ms,h.wrapS=Nm[u.wrapS]||ji,h.wrapT=Nm[u.wrapT]||ji,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(d){c=!0;let u=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(u),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(d){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(x){let m=new gn(x);m.needsUpdate=!0,u(m)}),t.load(Cs.resolveURL(d,r.path),g,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),d.userData.mimeType=o.mimeType||tE(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){let r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let a=i.extensions!==void 0?i.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,i=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+i.uuid,l=this.cache.get(a);l||(l=new er,Cn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(a,l)),i=l}else if(e.isLine){let a="LineBasicMaterial:"+i.uuid,l=this.cache.get(a);l||(l=new ta,Cn.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(a,l)),i=l}if(s||r||o){let a="ClonedMaterial:"+i.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=i.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return ws}loadMaterial(e){let t=this,i=this.json,s=this.extensions,r=i.materials[e],o,a={},l=r.extensions||{},c=[];if(l[at.KHR_MATERIALS_UNLIT]){let d=s[at.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,r,t))}else{let d=r.pbrMetallicRoughness||{};if(a.color=new te(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let u=d.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],nn),a.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,gt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=zt);let h=r.alphaMode||Wu.OPAQUE;if(h===Wu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Wu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Fe&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ae(1,1),r.normalTexture.scale!==void 0)){let d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==Fe&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Fe){let d=r.emissiveFactor;a.emissive=new te().setRGB(d[0],d[1],d[2],nn)}return r.emissiveTexture!==void 0&&o!==Fe&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,gt)),Promise.all(c).then(function(){let d=new o(a);return r.name&&(d.name=r.name),Fs(d,r),t.associations.set(d,{materials:e}),r.extensions&&ir(s,d,r),d})}createUniqueName(e){let t=Ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,s=this.primitiveCache;function r(a){return i[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return km(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=eE(c),d=s[h];if(d)o.push(d.promise);else{let u;c.extensions&&c.extensions[at.KHR_DRACO_MESH_COMPRESSION]?u=r(c):u=km(new vt,c,t),s[h]={primitive:c,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){let t=this,i=this.json,s=this.extensions,r=i.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?J1(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,g=h.length;f<g;f++){let x=h[f],m=o[f],p,v=c[f];if(m.mode===fi.TRIANGLES||m.mode===fi.TRIANGLE_STRIP||m.mode===fi.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Qo(x,v):new ne(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===fi.TRIANGLE_STRIP?p.geometry=Gu(p.geometry,Wl):m.mode===fi.TRIANGLE_FAN&&(p.geometry=Gu(p.geometry,aa));else if(m.mode===fi.LINES)p=new Ml(x,v);else if(m.mode===fi.LINE_STRIP)p=new Wr(x,v);else if(m.mode===fi.LINE_LOOP)p=new bl(x,v);else if(m.mode===fi.POINTS)p=new Xr(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Q1(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Fs(p,r),m.extensions&&ir(s,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&ir(s,d[0],r),d[0];let u=new xt;r.extensions&&ir(s,u,r),t.associations.set(u,{meshes:e});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}loadCamera(e){let t,i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new tn(wi.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new Es(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Fs(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let d=o[c];if(d){a.push(d);let u=new Ge;r!==null&&u.fromArray(r.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ea(a,l)})}loadAnimation(e){let t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){let f=s.channels[d],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){let u=d[0],f=d[1],g=d[2],x=d[3],m=d[4],p=[];for(let v=0,_=u.length;v<_;v++){let M=u[v],S=f[v],b=g[v],R=x[v],F=m[v];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let E=i._createAnimationTracks(M,S,b,R,F);if(E)for(let T=0;T<E.length;T++)p.push(E[T])}return new Dl(r,void 0,p)})}createNodeMesh(e){let t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){let o=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(i.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,nE)});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}_loadNodeShallow(e){let t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Vr:c.length>1?h=new xt:c.length===1?h=c[0]:h=new Rt,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(r.name&&(h.userData.name=r.name,h.name=o),Fs(h,r),r.extensions&&ir(i,h,r),r.matrix!==void 0){let d=new Ge;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],s=this,r=new xt;i.name&&(r.name=s.createUniqueName(i.name)),Fs(r,i),i.extensions&&ir(t,r,i);let o=i.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,d=l.length;h<d;h++)r.add(l[h]);let c=h=>{let d=new Map;for(let[u,f]of s.associations)(u instanceof Cn||u instanceof gn)&&d.set(u,f);return h.traverse(u=>{let f=s.associations.get(u);f!=null&&d.set(u,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];Is[r.path]===Is.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(a);let c;switch(Is[r.path]){case Is.weights:c=es;break;case Is.rotation:c=zi;break;case Is.position:case Is.scale:c=ts;break;default:switch(i.itemSize){case 1:c=es;break;case 2:case 3:default:c=ts;break}break}let h=s.interpolation!==void 0?$1[s.interpolation]:Qs,d=this._getArrayFromAccessor(i);for(let u=0,f=l.length;u<f;u++){let g=new c(l[u]+"."+Is[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=md(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let s=this instanceof zi?fd:ic;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function iE(n,e,t){let i=e.attributes,s=new Rn;if(i.POSITION!==void 0){let a=t.json.accessors[i.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),a.normalized){let h=md(to[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new P,l=new P;for(let c=0,h=r.length;c<h;c++){let d=r[c];if(d.POSITION!==void 0){let u=t.json.accessors[d.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){let x=md(to[u.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}n.boundingBox=s;let o=new Jn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=o}function km(n,e,t){let i=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){n.setAttribute(a,l)})}for(let o in i){let a=pd[o]||o.toLowerCase();a in n.attributes||s.push(r(i[o],a))}if(e.indices!==void 0&&!n.index){let o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});s.push(o)}return dt.workingColorSpace!==nn&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${dt.workingColorSpace}" not supported.`),Fs(n,e),iE(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?j1(n,e.targets,t):n})}var Ui={};async function Bm(n){let e;if(window.BG_NATURE_B64){let t=await(await fetch(window.BG_NATURE_B64)).text(),i=Uint8Array.from(atob(t.trim()),o=>o.charCodeAt(0)),s=window.createImageBitmap;window.createImageBitmap=void 0;let r=new Promise((o,a)=>new sr().parse(i.buffer,"",o,a));window.createImageBitmap=s,e=await r,n&&n(1)}else e=await new Promise((t,i)=>new sr().load("assets/nature.glb",t,s=>{n&&s.total&&n(s.loaded/s.total)},i));for(let t of e.scene.children){t.updateMatrixWorld(!0);let i=new Ge().copy(t.matrixWorld).invert(),s=[],r=new Rn;t.traverse(o=>{if(!o.isMesh)return;let a=new Ge().multiplyMatrices(i,o.matrixWorld);s.push({geometry:o.geometry,map:o.material.map||null,matName:o.material.name||"",matrix:a});let l=o.geometry;l.computeBoundingBox(),r.union(l.boundingBox.clone().applyMatrix4(a))}),Ui[t.name]={parts:s,box:r,size:r.getSize(new P)}}return Ui}var sE={sph:new Ot(1,14,10),sphLo:new Ot(1,7,5),cyl:new Vt(1,1,1,10),box:new li(1,1,1),cone:new Yr(1,1,10),dome:new Ot(1,18,7,0,Math.PI*2,0,Math.PI/2),torus:new Di(1,.22,6,16),disc:new Vn(1,16)};sE.disc.rotateX(-Math.PI/2);var Jw=new P(0,1,0),jw=new P,Qw=new Ge,eT=new Nn,tT=new Or;function Hm(){let n=mt({vertexColors:!0,roughness:.5,metalness:0});return n.userData.u={uFlash:{value:0},uRim:{value:new te("#FFF6DA")},uTint:{value:new te(0,0,0)}},n.onBeforeCompile=e=>{Object.assign(e.uniforms,n.userData.u),e.vertexShader=`attribute float aGlow;
varying float vGlow;
`+e.vertexShader.replace("#include <color_vertex>",`#include <color_vertex>
 vGlow = aGlow;`),e.fragmentShader=`uniform float uFlash; uniform vec3 uRim; uniform vec3 uTint; varying float vGlow;
`+e.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
      float rim = pow(1.0 - clamp(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.6);
      totalEmissiveRadiance += uRim * rim * 0.35 * diffuseColor.rgb + diffuseColor.rgb * vGlow * 1.6 + vec3(uFlash) + uTint;`)},n.customProgramCacheKey=()=>"hero",n}function Gm(n=.022){let e=new Fe({color:"#13200F",side:Zt});return e.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <skinning_vertex>",`#include <skinning_vertex>
#ifdef USE_SKINNING
 transformed += normalize(objectNormal) * ${n.toFixed(4)};
#else
 transformed += normalize(normal) * ${n.toFixed(4)};
#endif`)},e.customProgramCacheKey=()=>"outline"+n,e}function Vm(n){let e=new Fe({color:n,depthWrite:!1,depthFunc:vu,fog:!1,blending:xu,blendSrc:Go,blendDst:Vo,opacity:.62});return e.onBeforeCompile=t=>{t.fragmentShader=t.fragmentShader.replace("#include <opaque_fragment>","gl_FragColor = vec4(outgoingLight, opacity);")},e.customProgramCacheKey=()=>"sil",e}var Qn={shroom:{name:"\u041A\u0430\u0440\u0442\u0435\u0447\u043D\u0438\u043A",species:"\u0442\u044F\u0436\u0451\u043B\u044B\u0439 \u0442\u0430\u043D\u043A",role:"\u0414\u0440\u043E\u0431\u043E\u0432\u0438\u043A",color:"#E23A2E",hp:3900,speed:5,rad:.55,height:1.05,desc:"\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F \u0442\u043E\u043B\u0441\u0442\u0430\u044F \u043F\u0443\u0448\u043A\u0430 \u0431\u044C\u0451\u0442 \u043A\u0430\u0440\u0442\u0435\u0447\u044C\u044E \u0432\u0435\u0435\u0440\u043E\u043C: \u0432\u0431\u043B\u0438\u0437\u0438 \u0440\u0430\u0437\u043D\u043E\u0441\u0438\u0442 \u043B\u044E\u0431\u043E\u0433\u043E.",attack:{kind:"fan",name:"\u041A\u0430\u0440\u0442\u0435\u0447\u044C",count:5,spread:.5,range:7.2,speed:24,dmg:290,reload:1.5,cd:.42,size:.2,color:"#FF6B4A"},super:{kind:"fan",name:"\u0414\u0432\u043E\u0439\u043D\u043E\u0439 \u0437\u0430\u0440\u044F\u0434",desc:"\u0448\u0438\u0440\u043E\u043A\u0438\u0439 \u0437\u0430\u043B\u043F \u043E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442 \u0432\u0440\u0430\u0433\u043E\u0432",count:11,spread:.85,range:8.6,speed:27,dmg:330,knock:3.4,size:.28,color:"#FFD24A",charge:4600}},beetle:{name:"\u041C\u043E\u0440\u0442\u0438\u0440\u0430",species:"\u043C\u0438\u043D\u043E\u043C\u0451\u0442\u043D\u044B\u0439 \u0442\u0430\u043D\u043A",role:"\u041C\u0435\u0442\u0430\u0442\u0435\u043B\u044C",color:"#3B57D6",hp:3e3,speed:4.7,rad:.56,height:1.1,desc:"\u0411\u044C\u0451\u0442 \u0441\u043D\u0430\u0440\u044F\u0434\u0430\u043C\u0438 \u043D\u0430\u0432\u0435\u0441\u043E\u043C \u0447\u0435\u0440\u0435\u0437 \u043A\u0443\u0441\u0442\u044B. \u0420\u0430\u0437\u0440\u044B\u0432 \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0433\u043E\u0440\u044F\u0449\u0443\u044E \u043B\u0443\u0436\u0443.",attack:{kind:"lob",name:"\u041C\u0438\u043D\u0430",range:10,flight:.78,radius:1.7,dmg:820,reload:1.9,cd:.5,puddle:{r:1.35,dps:320,t:1.8},color:"#FF9A2E"},super:{kind:"barrage",name:"\u041A\u043E\u0432\u0440\u043E\u0432\u044B\u0439 \u043E\u0431\u0441\u0442\u0440\u0435\u043B",desc:"\u043F\u044F\u0442\u044C \u043C\u0438\u043D \u043B\u043E\u0436\u0430\u0442\u0441\u044F \u0434\u043E\u0440\u043E\u0436\u043A\u043E\u0439",count:5,range:12,flight:.95,radius:1.9,dmg:1050,knock:2.2,step:1.9,color:"#FF5A2E",charge:3900}},wasp:{name:"\u0414\u0430\u043B\u044C\u043D\u043E\u0431\u043E\u0439",species:"\u0438\u0441\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C \u0442\u0430\u043D\u043A\u043E\u0432",role:"\u0421\u043D\u0430\u0439\u043F\u0435\u0440",color:"#F5C21B",hp:3100,speed:5.2,rad:.48,height:1,desc:"\u0414\u043B\u0438\u043D\u043D\u0430\u044F \u043F\u0443\u0448\u043A\u0430: \u0447\u0435\u043C \u0434\u0430\u043B\u044C\u0448\u0435 \u0446\u0435\u043B\u044C, \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u0446\u0435\u043B \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0435\u0442, \u0430 \u0432\u044B\u0441\u0442\u0440\u0435\u043B \u0438\u0437 \u043F\u0440\u0438\u0446\u0435\u043B\u0430 \u0437\u0430\u0440\u044F\u0436\u0430\u0435\u0442\u0441\u044F \u0434\u043E +60% \u0443\u0440\u043E\u043D\u0430.",attack:{kind:"needle",name:"\u0411\u0440\u043E\u043D\u0435\u0431\u043E\u0439\u043D\u044B\u0439",range:15,speed:40,dmg:1e3,dmgFar:1800,reload:1.9,cd:.5,size:.16,color:"#FFB21E",scope:{time:.9,dmg:.6,range:1.35,speed:1.3,slow:.5}},super:{kind:"beam",name:"\u0420\u0435\u043B\u044C\u0441\u043E\u0432\u044B\u0439 \u043B\u0443\u0447",desc:"\u043B\u0443\u0447 \u043F\u0440\u043E\u0448\u0438\u0432\u0430\u0435\u0442 \u0441\u0442\u0435\u043D\u044B \u0438 \u0432\u0441\u0435\u0445 \u043D\u0430 \u043F\u0443\u0442\u0438",range:21,width:.75,dmg:2100,windup:.38,color:"#FFE15A",charge:3600}},roly:{name:"\u0420\u0438\u043A\u043E\u0448\u0435\u0442",species:"\u043A\u0440\u0443\u0433\u043B\u044B\u0439 \u0442\u0430\u043D\u043A",role:"\u0420\u0438\u043A\u043E\u0448\u0435\u0442",color:"#6E7FA3",hp:3500,speed:5,rad:.55,height:1.05,desc:"\u0421\u043D\u0430\u0440\u044F\u0434\u044B \u043E\u0442\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u044E\u0442 \u043E\u0442 \u043A\u0443\u0441\u0442\u043E\u0432 \u0438 \u0434\u043E\u0441\u0442\u0430\u044E\u0442 \u0432\u0440\u0430\u0433\u0430 \u0437\u0430 \u0443\u0433\u043B\u043E\u043C.",attack:{kind:"bounce",name:"\u041F\u0440\u044B\u0433\u0443\u043D",range:12,speed:24,dmg:800,bounces:2,ricochet:1.35,reload:1.2,cd:.38,size:.24,color:"#7FE7FF"},super:{kind:"bounce",name:"\u042F\u0434\u0440\u043E-\u043A\u0430\u0442\u0443\u043D",desc:"\u043E\u0433\u0440\u043E\u043C\u043D\u043E\u0435 \u044F\u0434\u0440\u043E \u0434\u043E\u043B\u0433\u043E \u0441\u043A\u0430\u0447\u0435\u0442 \u043F\u043E \u043A\u043E\u0440\u0438\u0434\u043E\u0440\u0430\u043C \u0438 \u0431\u044C\u0451\u0442 \u0432\u0441\u0435\u0445 \u043D\u0430 \u043F\u0443\u0442\u0438",range:30,speed:13,dmg:1150,bounces:7,pierce:!0,knock:2.4,size:.5,color:"#B8F4FF",charge:3e3}},hopper:{name:"\u0421\u0442\u0440\u0435\u043A\u043E\u0442",species:"\u043B\u0451\u0433\u043A\u0438\u0439 \u0442\u0430\u043D\u043A",role:"\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0447\u0438\u043A",color:"#5DB83A",hp:3400,speed:5.3,rad:.5,height:1,desc:"\u0421\u043F\u0430\u0440\u0435\u043D\u043D\u0430\u044F \u0430\u0432\u0442\u043E\u043F\u0443\u0448\u043A\u0430 \u0431\u044C\u0451\u0442 \u043E\u0447\u0435\u0440\u0435\u0434\u044F\u043C\u0438. \u0414\u0435\u0440\u0436\u0438 \u043A\u043D\u043E\u043F\u043A\u0443 \u2014 \u0440\u0430\u0437\u0431\u0440\u043E\u0441 \u0440\u0430\u0441\u0442\u0451\u0442, \u0441\u0442\u0440\u0435\u043B\u044F\u0439 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u043C\u0438 \u043E\u0447\u0435\u0440\u0435\u0434\u044F\u043C\u0438.",attack:{kind:"burst",name:"\u041E\u0447\u0435\u0440\u0435\u0434\u044C",count:5,gap:.07,spread:.05,bloom:.12,range:9.5,speed:30,dmg:200,reload:1.05,cd:.42,size:.13,color:"#B6FF5A"},super:{kind:"frenzy",name:"\u0421\u0442\u0440\u0435\u043A\u043E\u0442\u043D\u044F",desc:"4 \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u0441\u0442\u0440\u0435\u043B\u044F\u0435\u0442 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0438 \u0442\u043E\u0447\u043D\u0435\u0435, \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \u0434\u043B\u0438\u043D\u043D\u0435\u0435",time:4,color:"#E2FF8A",charge:4200}}},Ni=Object.keys(Qn),ei=3;var fa=(n,e,t,i,s="")=>`<svg viewBox="0 0 72 72" aria-hidden="true"><rect x="6" y="46" width="60" height="16" rx="8" fill="#2B2B30"/>${[14,26,38,50,60].map(r=>`<circle cx="${r}" cy="54" r="4.5" fill="#6A6A72"/>`).join("")}<rect x="8" y="34" width="56" height="15" rx="6" fill="${n}"/><rect x="8" y="44" width="56" height="4" fill="${e}"/>${t}${i}<circle cx="31" cy="26" r="4.5" fill="#fff"/><circle cx="42" cy="26" r="4.5" fill="#fff"/><circle cx="32" cy="27" r="2.3" fill="#16121C"/><circle cx="43" cy="27" r="2.3" fill="#16121C"/>${s}</svg>`,sc={shroom:fa("#D8402F","#9E2A1F",'<ellipse cx="36" cy="27" rx="17" ry="11" fill="#D8402F"/><circle cx="27" cy="21" r="3" fill="#F2E6CC"/><circle cx="45" cy="19" r="2.4" fill="#F2E6CC"/>','<rect x="50" y="24" width="12" height="7" rx="2" fill="#3E3A40"/><path d="M60 21L68 18V37L60 34Z" fill="#C9A24A"/>'),beetle:fa("#3E5CC8","#26387E",'<rect x="22" y="17" width="28" height="18" rx="5" fill="#3E5CC8"/>','<path d="M44 20L58 7L64 12L50 25Z" fill="#2E2E36"/><path d="M56 5L66 13" stroke="#C9A24A" stroke-width="4"/>'),wasp:fa("#F2C01E","#2A2420",'<rect x="24" y="19" width="24" height="15" rx="5" fill="#F2C01E"/><rect x="24" y="23" width="24" height="3" fill="#2A2420"/>','<rect x="46" y="24" width="24" height="4" rx="2" fill="#34343C"/><rect x="66" y="22" width="5" height="8" rx="1" fill="#2A2420"/>','<path d="M18 34V48M30 34V48M42 34V48" stroke="#2A2420" stroke-width="3"/>'),roly:fa("#6E7FA3","#4A5575",'<ellipse cx="36" cy="27" rx="15" ry="11" fill="#6E7FA3"/><path d="M22 30Q36 36 50 30" stroke="#B9C4DE" stroke-width="2.5" fill="none"/>','<rect x="48" y="24" width="16" height="5" rx="2" fill="#3A4463"/><circle cx="62" cy="26.5" r="4" fill="none" stroke="#7FE7FF" stroke-width="2.5"/>'),hopper:fa("#5DB83A","#3F8A2A",'<rect x="24" y="19" width="24" height="15" rx="5" fill="#5DB83A"/><path d="M28 19V6" stroke="#2E3A2A" stroke-width="1.6"/><circle cx="28" cy="6" r="2" fill="#B6FF5A"/>','<rect x="46" y="22" width="18" height="3" rx="1.5" fill="#2E3A2A"/><rect x="46" y="28" width="18" height="3" rx="1.5" fill="#2E3A2A"/>')};var rc=new te;function io(n,e,t=0){n=n.index?n.toNonIndexed():n,n.deleteAttribute("uv");let i=n.attributes.position.count,s=new Float32Array(i*3),r=new Float32Array(i);rc.set(e);for(let o=0;o<i;o++)s[o*3]=rc.r,s[o*3+1]=rc.g,s[o*3+2]=rc.b,r[o]=t;return n.setAttribute("color",new ot(s,3)),n.setAttribute("aGlow",new ot(r,1)),n}var ht=(n,e,t,i,s=0,r=0,o=0)=>(n.rotateX(s),n.rotateY(r),n.rotateZ(o),n.translate(e,t,i),n);function fn(n,e,t,i,s){let o=new li(n,e,t,3,3,3),a=o.attributes.position,l=new P,c=n/2-i,h=e/2-i,d=t/2-i;for(let u=0;u<a.count;u++){l.fromBufferAttribute(a,u);let f=new P(wi.clamp(l.x,-c,c),wi.clamp(l.y,-h,h),wi.clamp(l.z,-d,d)),g=l.clone().sub(f);g.lengthSq()>1e-8&&l.copy(f).addScaledVector(g.normalize(),i),a.setXYZ(u,l.x,l.y,l.z)}return o.computeVertexNormals(),io(o,s)}var pi=(n,e,t,i,s=14)=>io(new Vt(n,e,t,s),i),no=(n,e,t=1,i=1,s=1)=>{let r=new Ot(n,16,10);return r.scale(t,i,s),io(r,e)},kn=n=>{let e=ua(n);return e.computeBoundingSphere(),e};function pa(n,e,t){let i=[];for(let s of[-1,1]){i.push(ht(fn(.24,.3,n,.1,"#2B2B30"),s*e,.17,0));for(let r=0;r<4;r++)i.push(ht(pi(.1,.1,.06,"#6A6A72",12),s*(e+.12),.15,-n*.36+r*n*.24,0,0,Math.PI/2));i.push(ht(fn(.3,.06,n+.06,.03,t),s*e,.34,0))}return i}var Wm={shroom:()=>{let n="#D8402F",e="#9E2A1F";return{len:1.3,hull:kn([...pa(1.3,.42,e),ht(fn(.86,.32,1.2,.1,n),0,.42,0),ht(fn(.5,.06,.3,.02,"#F2E6CC"),0,.6,-.36)]),turret:kn([no(.38,n,1,.7,1),ht(no(.11,"#F2E6CC"),.22,.12,-.18),ht(no(.08,"#F2E6CC"),-.24,.16,-.08),ht(pi(.3,.36,.08,e),0,-.12,0)]),barrel:kn([ht(pi(.09,.1,.42,"#3E3A40"),0,0,.21,Math.PI/2),ht(pi(.17,.1,.16,"#C9A24A"),0,0,.48,Math.PI/2)]),turretPos:[0,.62,.02],barrelPos:[0,.04,.26],muzzle:[0,0,.58],eyes:[0,.2,.25],eyeR:.09,eyeSep:.14}},beetle:()=>{let n="#3E5CC8",e="#26387E";return{len:1.35,restElev:.45,hull:kn([...pa(1.35,.44,e),ht(fn(.88,.36,1.26,.08,n),0,.44,0),ht(fn(.2,.12,.2,.04,"#25252C"),.28,.66,-.4),ht(fn(.2,.12,.2,.04,"#25252C"),-.28,.66,-.4)]),turret:kn([fn(.62,.3,.62,.1,n),ht(fn(.66,.06,.66,.03,e),0,-.14,0)]),barrel:kn([ht(pi(.15,.16,.4,"#2E2E36"),0,0,.18,Math.PI/2),ht(pi(.19,.19,.08,"#C9A24A"),0,0,.38,Math.PI/2)]),turretPos:[0,.77,-.06],barrelPos:[0,.06,.2],muzzle:[0,0,.42],eyes:[0,.16,.3],eyeR:.09,eyeSep:.16}},wasp:()=>{let n="#F2C01E",e="#2A2420",t=[.3,0,-.3].map(i=>ht(fn(.82,.05,.12,.02,e),0,.58,i));return{len:1.45,hull:kn([...pa(1.45,.4,e),ht(fn(.8,.28,1.4,.08,n),0,.42,0),...t]),turret:kn([fn(.5,.24,.56,.1,n),ht(fn(.52,.05,.12,.02,e),0,.12,-.1)]),barrel:kn([ht(pi(.05,.06,1.15,"#34343C"),0,0,.57,Math.PI/2),ht(fn(.14,.1,.16,.03,"#2A2420"),0,0,1.14),ht(pi(.07,.07,.2,e),0,.09,.12,Math.PI/2)]),turretPos:[0,.68,-.08],barrelPos:[0,.02,.24],muzzle:[0,0,1.24],eyes:[0,.13,.24],eyeR:.075,eyeSep:.13}},roly:()=>{let n="#6E7FA3",e="#B9C4DE";return{len:1.25,hull:kn([...pa(1.25,.42,"#4A5575"),ht(no(.5,n,.9,.42,1.25),0,.42,0),...[-.3,0,.3].map(t=>ht(io(new Di(.38,.035,6,20),e),0,.5,t,0,0,0))]),turret:kn([no(.34,n,1,.75,1),ht(io(new Di(.3,.04,6,20),e),0,.04,0,Math.PI/2)]),barrel:kn([ht(pi(.07,.08,.6,"#3A4463"),0,0,.3,Math.PI/2),ht(io(new Di(.1,.035,6,14),"#7FE7FF",.8),0,0,.56)]),turretPos:[0,.66,0],barrelPos:[0,.02,.24],muzzle:[0,0,.64],eyes:[0,.18,.24],eyeR:.09,eyeSep:.14}},hopper:()=>{let n="#5DB83A",e="#3F8A2A";return{len:1.2,hull:kn([...pa(1.2,.38,e),ht(fn(.74,.28,1.12,.1,n),0,.4,0),ht(fn(.5,.04,.5,.02,"#C9EE7A"),0,.55,-.2)]),turret:kn([fn(.48,.26,.5,.1,n),ht(pi(.012,.012,.6,"#2E3A2A",5),-.16,.38,-.16),ht(no(.035,"#B6FF5A"),-.16,.68,-.16)]),barrel:kn([ht(pi(.04,.04,.55,"#2E3A2A"),.07,0,.28,Math.PI/2),ht(pi(.04,.04,.55,"#2E3A2A"),-.07,0,.28,Math.PI/2),ht(fn(.24,.1,.12,.03,e),0,0,.04)]),turretPos:[0,.66,0],barrelPos:[0,0,.22],muzzle:[0,0,.58],eyes:[0,.14,.22],eyeR:.08,eyeSep:.12}}},xd=null;function Xm(n){xd=n,oc.clear()}var oc=new Map;function qm(n){return oc.has(n)||oc.set(n,xd&&xd[n]||(Wm[n]||Wm.shroom)()),oc.get(n)}var vd={shroom:{file:"heavy_tank",body:"#D8402F",len:1.4},beetle:{file:"artillery_tank",body:"#3E5CC8",len:1.3,restElev:.35,gun:"dark"},wasp:{file:"sniper_tank",body:"#F2C01E",len:1.45,barrelZ:1.5},roly:{file:"light_tank",body:"#6E7FA3",len:1.3,barrelZ:1.3},hopper:{file:"rapid_tank",body:"#5DB83A",len:1.25}},rE={track:"#2B2B30",wheel:"#7A7A84",gun:"#3A3A44"};function oE(n,e){let t=[n.material.name||""];for(let s=n;s&&s!==e;s=s.parent)t.push(s.name||"");let i=t.join(" ");return/track|tread/i.test(i)?"track":/wheel/i.test(i)?"wheel":/barrel|gun/i.test(i)?"gun":/miniturret/i.test(i)?"dark":"body"}var ac=new Map;function aE(n){if(!ac.has(n)){let e=document.createElement("canvas");e.width=n.width,e.height=n.height;let t=e.getContext("2d",{willReadFrequently:!0});t.drawImage(n,0,0),ac.set(n,{w:e.width,h:e.height,d:t.getImageData(0,0,e.width,e.height).data})}return ac.get(n)}function lE(n,e,t){e-=Math.floor(e),t-=Math.floor(t);let i=Math.min(n.w-1,Math.floor(e*n.w)),s=Math.min(n.h-1,Math.floor(t*n.h)),r=(s*n.w+i)*4;return(.3*n.d[r]+.59*n.d[r+1]+.11*n.d[r+2])/255}function cE(n,e){n.updateMatrixWorld(!0);let t=O=>{let Y=null;return n.traverse(le=>{!Y&&O.test(le.name||"")&&(Y=le)}),Y},i=t(/^turret/i),s=t(/^barrel/i),r=(O,Y)=>{for(let le=O;le;le=le.parent)if(le===Y)return!0;return!1},o=O=>new P().setFromMatrixPosition(O.matrixWorld),a=o(i),l=o(s),c={hull:[],turret:[],barrel:[]},h=new P;n.traverse(O=>{if(!O.isMesh)return;let Y=r(O,s)?"barrel":r(O,i)?"turret":"hull",le=Y==="barrel"?l:Y==="turret"?a:new P,_e=O.geometry,be=_e.attributes.position,ze=_e.attributes.uv,Ie=_e.index,Ae=O.material.map&&O.material.map.image?aE(O.material.map.image):null,Xe=O.material.color?.3*O.material.color.r+.59*O.material.color.g+.11*O.material.color.b:1,B=oE(O,n),jt=B==="gun"&&e.gun?e.gun:B,Re=Ie?Ie.count:be.count;for(let Ue=0;Ue<Re;Ue+=3){let ve=[],ut=[0,1,2].map(C=>Ie?Ie.getX(Ue+C):Ue+C);for(let C of ut)h.fromBufferAttribute(be,C).applyMatrix4(O.matrixWorld).sub(le),ve.push(h.x,h.y,h.z);let Ye=Xe;if(Ae&&ze){let C=0,w=0;for(let G of ut)C+=ze.getX(G)/3,w+=ze.getY(G)/3;Ye*=lE(Ae,C,w)}c[Y].push({c:ve,kind:jt,lum:Ye})}});let d=new Rn;for(let O of c.hull)for(let Y=0;Y<9;Y+=3)d.expandByPoint(h.set(O.c[Y],O.c[Y+1],O.c[Y+2]));let u=d.max.y;for(let[O,Y]of[["turret",a],["barrel",l]])for(let le of c[O])for(let _e=1;_e<9;_e+=3)u=Math.max(u,le.c[_e]+Y.y);let f=d.max.z-d.min.z,g=d.max.x-d.min.x,x=u-d.min.y,m=Math.min(e.len/f,1.08/g),p=wi.clamp(x*m*1.2,.85,1.2)/x,v=(d.min.x+d.max.x)/2,_=(d.min.z+d.max.z)/2,M=d.min.y,S={};for(let O in c)for(let Y of c[O]){let le=S[Y.kind]||(S[Y.kind]=[0,0]);le[0]+=Y.lum,le[1]++}let b=new te(e.body),R=b.clone().multiplyScalar(.62),F=new te,E=(O,Y,le,_e,be=1)=>{let ze=O.length*3,Ie=new Float32Array(ze*3),Ae=new Float32Array(ze*3);O.forEach((B,jt)=>{let Re=S[B.kind],Ue=wi.clamp(1+(B.lum-Re[0]/Re[1])*1.4,.6,1.35);B.kind==="body"?F.copy(b):B.kind==="dark"?F.copy(R):F.set(rE[B.kind]),F.multiplyScalar(Ue);for(let ve=0;ve<3;ve++){let ut=(jt*3+ve)*3;Ie[ut]=(B.c[ve*3]-Y)*m,Ie[ut+1]=(B.c[ve*3+1]-le)*p,Ie[ut+2]=(B.c[ve*3+2]-_e)*m*be,Ae[ut]=F.r,Ae[ut+1]=F.g,Ae[ut+2]=F.b}});let Xe=new vt;return Xe.setAttribute("position",new ot(Ie,3)),Xe.setAttribute("color",new ot(Ae,3)),Xe.setAttribute("aGlow",new ot(new Float32Array(ze),1)),Xe.computeVertexNormals(),Xe.computeBoundingBox(),Xe.computeBoundingSphere(),Xe},T=E(c.hull,v,M,_),z=E(c.turret,0,0,0),H=E(c.barrel,0,0,0,e.barrelZ||1),$=[(a.x-v)*m,(a.y-M)*p,(a.z-_)*m],L=[(l.x-a.x)*m,(l.y-a.y)*p,(l.z-a.z)*m],k=H.boundingBox,X=z.boundingBox,j=[(k.min.x+k.max.x)/2,(k.min.y+k.max.y)/2,k.max.z],Z=wi.clamp((X.max.y-X.min.y)*.22,.065,.1),K=Math.min(.15,(X.max.x-X.min.x)*.22),Q=wi.clamp(Math.max(L[1]+k.max.y+Z*.9,X.min.y+(X.max.y-X.min.y)*.55),X.min.y+Z,X.max.y-Z*.5),ie=-1e9,me=z.attributes.position;for(let O=0;O<me.count;O++)Math.abs(me.getY(O)-Q)<Z*1.5&&Math.abs(me.getX(O))<K+Z*2&&(ie=Math.max(ie,me.getZ(O)));return ie<-1e8&&(ie=X.max.z),{len:f*m,hull:T,turret:z,barrel:H,turretPos:$,barrelPos:L,muzzle:j,eyes:[0,Q,ie-Z*.3],eyeR:Z,eyeSep:K,restElev:e.restElev}}async function Ym(n){try{let e=Object.keys(vd),t=0,i=new sr,s={};await Promise.all(e.map(async r=>{let o=await i.loadAsync("assets/tanks/"+vd[r].file+".glb");s[r]=cE(o.scene,vd[r]),o.scene.traverse(a=>{a.isMesh&&(a.geometry.dispose(),a.material.map&&a.material.map.dispose(),a.material.dispose())}),n&&n(++t/e.length)})),ac.clear(),Xm(s)}catch(e){console.warn("tank models not loaded, using built-in tanks",e)}}var hE={id:"glade",name:"\u0413\u0440\u0438\u0431\u043D\u0430\u044F \u043F\u043E\u043B\u044F\u043D\u0430",desc:"\u0413\u0440\u0438\u0431\u043D\u0438\u0446\u0430 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435, \u043A\u0443\u0441\u0442\u044B-\u0438\u0437\u0433\u043E\u0440\u043E\u0434\u0438 \u043F\u043E \u0431\u043E\u043A\u0430\u043C \u0438 \u0432\u044B\u0441\u043E\u043A\u0430\u044F \u0442\u0440\u0430\u0432\u0430 \u0434\u043B\u044F \u0437\u0430\u0441\u0430\u0434.",half:['""..,..r.r.r..,..""','""...............""',".....##.....##.....","...................","####...........####",".......T...T.......",'"""......R......"""','"""...#####....."""','"""............."""','.~~.....""....R....','.~~..R..""".....##.','........"""....##..',".##................",'"""...R..M..R..."""']},uE={id:"pitch",name:"\u041B\u0435\u0441\u043D\u043E\u0435 \u043F\u043E\u043B\u0435",desc:"\u041F\u043E\u043B\u0435 \u0441 \u0432\u043E\u0440\u043E\u0442\u0430\u043C\u0438 \u0438\u0437 \u043A\u0443\u0441\u0442\u043E\u0432, \u043E\u0441\u0442\u0440\u043E\u0432\u043A\u0430\u043C\u0438-\u0443\u043A\u0440\u044B\u0442\u0438\u044F\u043C\u0438 \u0438 \u0442\u0440\u0430\u0432\u043E\u0439 \u043F\u043E \u043A\u0440\u0430\u044F\u043C.",mode:"ball",half:["########ggggg########",'"#.................#"','""......R...R......""',".....r....r....r.....",".....................","...##...........##...",'"""..............."""','"""....T.....T...."""',".........###.........",".....................","..##.............##..",'..##.....""".....##..',".....................",'"".......R.R.......""',".....................",'""".......M......."""']},dE={id:"creek",name:"\u0422\u0438\u0445\u0438\u0435 \u0437\u0430\u0432\u043E\u0434\u0438",desc:"\u0414\u0432\u0435 \u0437\u0430\u0432\u043E\u0434\u0438 \u043F\u043E \u0431\u043E\u043A\u0430\u043C, \u0433\u0440\u0438\u0431\u043D\u0438\u0446\u0430 \u0432 \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u0442\u0440\u0430\u0432\u0435 \u0438 \u0443\u0437\u043A\u0438\u0435 \u0431\u0435\u0440\u0435\u0433\u0430 \u0434\u043B\u044F \u043E\u0431\u0445\u043E\u0434\u043E\u0432.",mode:"spores",half:['"".....r.r.r.....""','"".......,.......""',"....##.......##....","....#....T....#....","..R.............R..",'"""....#####...."""','"""............."""',".....T.......T.....","..##.....R.....##..",".~...............~.",'.~~~..."""""...~~~.',".~~~~...T.T...~~~~.","...~~~.......~~~...",'.~~~.."".M.""..~~~.']},Zm={glade:_d(hE),creek:_d(dE),maze:fE(2718),pitch:_d(uE)};function _d(n){let e=n.half,t=e[0].length;for(let a of e)if(a.length!==t)throw new Error("map "+n.id+": row width "+a.length+" != "+t+" in \xAB"+a+"\xBB");let i=e[e.length-1];if(i!==[...i].reverse().join(""))throw new Error("map "+n.id+": middle row must be a palindrome");let s=a=>a==="r"?"b":a==="g"?"h":a,r=e.slice(0,-1).reverse().map(a=>[...a].reverse().map(s).join("")),o=[...e,...r];return Object.assign({},n,{rows:o,W:t,H:o.length})}function fE(n){let e=n>>>0,t=()=>{e=e+1831565813>>>0;let v=e;return v=Math.imul(v^v>>>15,v|1),v^=v+Math.imul(v^v>>>7,v|61),((v^v>>>14)>>>0)/4294967296},i=12,s=i*2-1,r=Array.from({length:i},()=>Array(i).fill("#")),o=(v,_)=>v>=0&&_>=0&&v<i&&_<i,a=new Set,l=[[0,0]];for(r[0][0]=".",a.add("0,0");l.length;){let[v,_]=l[l.length-1],M=[[2,0],[-2,0],[0,2],[0,-2]].map(([E,T])=>[v+E,_+T,E,T]).filter(([E,T])=>o(E,T)&&!a.has(E+","+T));if(!M.length){l.pop();continue}let[S,b,R,F]=M[Math.floor(t()*M.length)];r[v+R/2][_+F/2]=".",r[S][b]=".",a.add(S+","+b),l.push([S,b])}for(let v=0;v<i;v++)for(let _=0;_<i;_++)r[v][_]==="#"&&v%2!==_%2&&t()<.12&&(r[v][_]=".");for(let v=1;v<i;v+=2)for(let _=1;_<i;_+=2)[[1,0],[-1,0],[0,1],[0,-1]].every(([S,b])=>!o(v+S,_+b)||r[v+S][_+b]===".")&&t()<.15&&(r[v][_]=".");for(let v=0;v<i;v++)for(let _=0;_<i;_++)Math.max(i-1-v,i-1-_)<=2&&(r[v][_]=".");let c=[[1,1],[1,8],[8,1]];for(let[v,_]of c)for(let M=v-1;M<=v+1;M++)for(let S=_-1;S<=_+1;S++)o(M,S)&&(r[M][S]=".");let h=(v,_,M)=>c.some(([S,b])=>Math.abs(S-v)<=M&&Math.abs(b-_)<=M)||Math.max(i-1-v,i-1-_)<=3;for(let v=0;v<9;v++){let _=Math.floor(t()*i),M=Math.floor(t()*i);for(let S=0;S<6;S++){o(_,M)&&r[_][M]==="."&&!h(_,M,1)&&(r[_][M]='"');let b=Math.floor(t()*4);_+=[1,-1,0,0][b],M+=[0,0,1,-1][b]}}let d=0,u=(v,_)=>[[1,0],[-1,0],[0,1],[0,-1]].filter(([M,S])=>o(v+M,_+S)&&r[v+M][_+S]==="#").length;for(let v of[3,2])for(let _=0;_<i-1&&d<10;_++)for(let M=0;M<i-1&&d<10;M++)r[_][M]!=="."||h(_,M,2)||u(_,M)>=v&&t()<(v===3?.9:.4)&&(r[_][M]="C",d++);r[i-4][i-3]="C",r[i-3][i-4]="C",r[i-3][i-3]="R";for(let v=0;v<i;v++)for(let _=0;_<i;_++)r[v][_]==="."&&!h(v,_,2)&&t()<.025&&(r[v][_]="R");for(let v=0;v<i;v++)r[i-1][v]=r[v][i-1];for(let[v,_]of c)r[v][_]="s";let f=Array.from({length:s},()=>Array(s).fill("#"));for(let v=0;v<s;v++)for(let _=0;_<s;_++){let M=v,S=_;for(let b=0;b<4&&!(M<i&&S<i);b++){let R=M;M=s-1-S,S=R}f[v][_]=r[M][S]}let g=v=>v!=="#"&&v!=="R"&&v!=="C";for(let v=0;v<200;v++){let _=Array.from({length:s},()=>Array(s).fill(!1)),M=[[1,1]];for(_[1][1]=!0;M.length;){let[F,E]=M.pop();for(let[T,z]of[[1,0],[-1,0],[0,1],[0,-1]]){let H=F+T,$=E+z;H>=0&&$>=0&&H<s&&$<s&&!_[H][$]&&g(f[H][$])&&(_[H][$]=!0,M.push([H,$]))}}let S=null;for(let F=0;F<s&&!S;F++)for(let E=0;E<s&&!S;E++)g(f[F][E])&&!_[F][E]&&(S=[F,E]);if(!S)break;let[b,R]=S;for(let[F,E]of[[1,0],[-1,0],[0,1],[0,-1]]){let T=b+F,z=R+E;if(T>=0&&z>=0&&T<s&&z<s&&f[T][z]!=="."&&f[T][z]!=='"'){let H=T,$=z;for(let L=0;L<4;L++){f[H][$]=".";let k=H;H=$,$=s-1-k}break}}}let x=v=>v%2?1:2,m=[];for(let v=0;v<s;v++)for(let _=0;_<x(v);_++){let M="";for(let S=0;S<s;S++)for(let b=0;b<x(S);b++){let R=f[v][S],F=_===0&&b===0;M+="CRs".includes(R)&&!F?".":R}m.push(M)}let p=m[0].length;return{id:"maze",name:"\u041B\u0435\u0441\u043D\u043E\u0439 \u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442",desc:"\u0423\u0437\u043A\u0438\u0435 \u043F\u0440\u043E\u0445\u043E\u0434\u044B \u043C\u0435\u0436\u0434\u0443 \u043A\u0443\u0441\u0442\u0430\u043C\u0438, \u0442\u0430\u0439\u043D\u0438\u043A\u0438 \u0441 \u0441\u0438\u043B\u043E\u0439 \u0438 \u043F\u043E\u043B\u044F\u043D\u0430 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435.",rows:m,W:p,H:m.length,mode:"br"}}var U={map:null,W:0,H:0,rows:null,group:null,hx:0,hz:0,spawns:{0:[],1:[],ffa:[]},mine:null,grassTiles:[],crates:[],shared:{}},pn={time:{value:0},push:{value:Array.from({length:10},()=>new P(0,0,0))},me:{value:new P(0,0,0)},season:{value:new P(0,0,0)}},pE={ground:`{ vec3 c = diffuseColor.rgb; float l = dot(c, vec3(0.333));
    c = mix(c, vec3(l * 1.25, l * 1.02, l * 0.55), uSeason.y * 0.6);
    c = mix(c, vec3(0.9, 0.94, 1.0) * (0.78 + 0.3 * l), uSeason.x * 0.82); diffuseColor.rgb = c; }`,leaf:`{ vec3 c = diffuseColor.rgb; float l = dot(c, vec3(0.333));
    c = mix(c, vec3(l * 1.6, l * 0.9, l * 0.3), uSeason.y * 0.75);
    c = mix(c, vec3(0.86, 0.92, 0.95) * (0.7 + 0.4 * l), uSeason.x * 0.55); diffuseColor.rgb = c; }`,hedge:`{ vec3 c = diffuseColor.rgb; float l = dot(c, vec3(0.333));
    c = mix(c, vec3(l * 1.7, l * 0.95, l * 0.3), uSeason.y * 0.8);
    float top = smoothstep(0.45, 0.85, vWN.y);
    c = mix(c, vec3(0.94, 0.97, 1.0), uSeason.x * (0.18 + top * 0.8)); diffuseColor.rgb = c; }`,stone:"{ diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.9, 0.94, 1.0), uSeason.x * 0.35); }"};function mi(n,e){let t=n.onBeforeCompile,i=n.customProgramCacheKey&&n.customProgramCacheKey!==Cn.prototype.customProgramCacheKey?n.customProgramCacheKey.bind(n):null;return n.onBeforeCompile=(s,r)=>{t&&t.call(n,s,r),s.uniforms.uSeason=pn.season,s.fragmentShader=`uniform vec3 uSeason;
`+s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+pE[e])},n.customProgramCacheKey=()=>(i?i():"")+"season-"+e,n}var qt=n=>(n-(U.W-1)/2)*1.6,$t=n=>(n-(U.H-1)/2)*1.6,Ti=n=>Math.floor(n/1.6+U.W/2),Ai=n=>Math.floor(n/1.6+U.H/2);function ls(n,e){return n<0||e<0||n>=U.W||e>=U.H?"X":U.rows[e][n]}var gi=(n,e)=>ls(Ti(n),Ai(e)),mE=new Set(["#","R","T","~","X","C"]),gE=new Set(["#","R","T","X","C"]),Ds=n=>mE.has(n),lc=n=>gE.has(n),xE=new Set(["#","X"]),Md=n=>xE.has(n),ao=(n,e,t,i)=>Mn(n,e,t,i,Md)<0,Jm=n=>n==="#"||n==="X"?Td:n==="R"?1.15:n==="C"?1.1:n==="T"?.9:0,cc=(n,e)=>gi(n,e)==='"';function ki(n,e){let t=Ti(n.x-e),i=Ti(n.x+e),s=Ai(n.z-e),r=Ai(n.z+e),o=!1;for(let a=s;a<=r;a++)for(let l=t;l<=i;l++){if(!Ds(ls(l,a)))continue;let c=qt(l)-1.6/2,h=c+1.6,d=$t(a)-1.6/2,u=d+1.6,f=$e(n.x,c,h),g=$e(n.z,d,u),x=n.x-f,m=n.z-g,p=x*x+m*m;if(!(p>=e*e))if(o=!0,p>1e-8){let v=Math.sqrt(p),_=(e-v)/v;n.x+=x*_,n.z+=m*_}else{let v=[n.x-c,h-n.x,n.z-d,u-n.z],_=Math.min(...v);_===v[0]?n.x=c-e:_===v[1]?n.x=h+e:_===v[2]?n.z=d-e:n.z=u+e}}return o}function Mn(n,e,t,i,s=lc){let r=t-n,o=i-e,a=Ti(n),l=Ai(e);if(s(ls(a,l)))return 0;let c=Ti(t),h=Ai(i),d=r>0?1:-1,u=o>0?1:-1,f=n/1.6+U.W/2,g=e/1.6+U.H/2,x=r/1.6,m=o/1.6,p=x!==0?Math.abs(1/x):1/0,v=m!==0?Math.abs(1/m):1/0,_=x!==0?(d>0?Math.floor(f)+1-f:f-Math.floor(f))*p:1/0,M=m!==0?(u>0?Math.floor(g)+1-g:g-Math.floor(g))*v:1/0;for(let S=0;S<200;S++){if(a===c&&l===h)return-1;let b;if(_<M?(b=_,_+=p,a+=d):(b=M,M+=v,l+=u),b>1)return-1;if(s(ls(a,l)))return b}return-1}var hc=(n,e,t,i)=>Mn(n,e,t,i)<0;function jm(n,e,t,i){let s=U.W,r=U.H,o=$e(Ti(n),0,s-1),a=$e(Ai(e),0,r-1),l=$e(Ti(t),0,s-1),c=$e(Ai(i),0,r-1);if(Ds(ls(l,c))){let b=vE(l,c);if(!b)return null;l=b[0],c=b[1]}let h=s*r,d=new Float32Array(h).fill(1e9),u=new Int32Array(h).fill(-1),f=new Uint8Array(h),g=[a*s+o];d[g[0]]=0;let x=b=>{let R=Math.abs(b%s-l),F=Math.abs((b/s|0)-c);return Math.max(R,F)+.414*Math.min(R,F)},m=c*s+l;for(;g.length;){let b=0,R=1e9;for(let z=0;z<g.length;z++){let H=d[g[z]]+x(g[z]);H<R&&(R=H,b=z)}let F=g[b];if(g[b]=g[g.length-1],g.pop(),F===m)break;f[F]=1;let E=F%s,T=F/s|0;for(let z=-1;z<=1;z++)for(let H=-1;H<=1;H++){if(!H&&!z)continue;let $=E+H,L=T+z;if($<0||L<0||$>=s||L>=r||Ds(U.rows[L][$])||H&&z&&(Ds(U.rows[T][$])||Ds(U.rows[L][E])))continue;let k=L*s+$;if(f[k])continue;let X=d[F]+(H&&z?1.414:1)+(U.rows[L][$]==='"'?.15:0);X<d[k]&&(d[k]>=1e9&&g.push(k),d[k]=X,u[k]=F)}}if(u[m]<0&&m!==a*s+o)return null;let p=[];for(let b=m;b>=0;b=u[b])p.push(b);p.reverse();let v=p.map(b=>({x:qt(b%s),z:$t(b/s|0)}));v[v.length-1]={x:$e(t,qt(l)-1.6*.45,qt(l)+1.6*.45),z:$e(i,$t(c)-1.6*.45,$t(c)+1.6*.45)};let _=[],M={x:n,z:e},S=0;for(;S<v.length;){let b=v.length-1;for(;b>S&&!bd(M.x,M.z,v[b].x,v[b].z);)b--;_.push(v[b]),M=v[b],S=b+1}return _}function bd(n,e,t,i){let s=t-n,r=i-e,o=Math.hypot(s,r)||1,a=-r/o*.42,l=s/o*.42;return Mn(n+a,e+l,t+a,i+l,Ds)<0&&Mn(n-a,e-l,t-a,i-l,Ds)<0}function vE(n,e){for(let t=1;t<6;t++)for(let i=-t;i<=t;i++)for(let s=-t;s<=t;s++)if(Math.max(Math.abs(s),Math.abs(i))===t&&!Ds(ls(n+s,e+i)))return[n+s,e+i];return null}function va(n,e,t,i){return n.onBeforeCompile=s=>{s.uniforms.uTime=pn.time,s.uniforms.uPush=pn.push,s.uniforms.uMe=pn.me,i&&(s.fragmentShader=`uniform vec3 uMe;
varying vec3 vWPg;
`+s.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
        float keep = smoothstep(1.2, 2.8, distance(vWPg, cameraPosition));
        if(uMe.z > 0.0) keep = min(keep, mix(0.35, 1.0, smoothstep(uMe.z * 0.6, uMe.z, distance(vWPg.xz, uMe.xy))));
        if(ign > keep) discard;`)),s.vertexShader=`uniform float uTime;
uniform vec3 uPush[10];
varying vec3 vWPg;
`+s.vertexShader.replace("#include <project_vertex>",`
      vec4 mvPosition = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        mvPosition = instanceMatrix * mvPosition;
      #endif
      vec4 wp = modelMatrix * mvPosition;
      float hw = clamp(position.y / ${e.toFixed(3)}, 0.0, 1.0); hw *= hw;
      float ph = wp.x * 0.35 + wp.z * 0.27;
      wp.x += (sin(uTime * 1.7 + ph) * 0.6 + sin(uTime * 3.1 + ph * 2.3) * 0.25) * ${t.toFixed(3)} * hw;
      wp.z += cos(uTime * 1.3 + ph * 1.2) * ${(t*.6).toFixed(3)} * hw;
      ${i?`for(int i = 0; i < 10; i++){
        vec2 d = wp.xz - uPush[i].xy; float l = length(d);
        float k = uPush[i].z > 0.01 ? 1.0 - smoothstep(0.0, uPush[i].z, l) : 0.0;
        wp.xz += d / max(l, 0.01) * k * 0.55 * hw; wp.y -= k * 0.45 * hw * ${e.toFixed(3)};
      }`:""}
      vWPg = wp.xyz;
      mvPosition = viewMatrix * wp;
      gl_Position = projectionMatrix * mvPosition;`)},n.customProgramCacheKey=()=>"wind"+e+t+i,n}function _E(){return di(256,256,(n,e,t)=>{n.fillStyle="#3E7F2C",n.fillRect(0,0,e,t);let i=["#2F6A22","#4C9634","#5AAA3A","#3A7A28","#6CBB45","#2A5C1E"];for(let s=0;s<900;s++){let r=D(0,e),o=D(0,t),a=D(5,11),l=D(0,Pe);n.fillStyle=is(i);for(let c of[-e,0,e])for(let h of[-t,0,t])n.beginPath(),n.ellipse(r+c,o+h,a,a*.55,l,0,Pe),n.fill()}n.globalAlpha=.25,n.fillStyle="#B9E87A";for(let s=0;s<160;s++){let r=D(0,e),o=D(0,t);n.beginPath(),n.ellipse(r,o,3,1.6,D(0,Pe),0,Pe),n.fill()}},{repeat:!0})}var yE=`
  if(uMe.z > 0.0){
    vec3 P = vec3(uMe.x, 1.0, uMe.y), C = cameraPosition, D = P - C;
    float t = dot(vWP - C, D) / max(dot(D, D), 1e-4);
    if(t > 0.0 && t < 1.08){
      float r = mix(0.7, 1.7, clamp(t, 0.0, 1.0)), d = length(vWP - (C + D * t));
      float keep = mix(0.14, 1.0, smoothstep(r * 0.55, r, d));
      float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
      if(ign > keep) discard;
    }
  }`;function ME(n,e,t){return n.onBeforeCompile=i=>{t&&(i.uniforms.uMe=pn.me,i.fragmentShader=`uniform vec3 uMe;
`+i.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
`+yE)),i.vertexShader=`varying vec3 vWP; varying vec3 vWN;
`+i.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
 vWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);`),i.fragmentShader=`varying vec3 vWP; varying vec3 vWN;
`+i.fragmentShader.replace("#include <map_fragment>",`
      ${ct?`vec3 an = abs(vWN);   // phones: one texture read along the main axis instead of three
      vec2 tuv = an.y > an.x && an.y > an.z ? vWP.xz : an.x > an.z ? vWP.zy : vWP.xy;
      diffuseColor *= texture2D(map, tuv * ${e.toFixed(3)});`:`vec3 bw = pow(abs(vWN), vec3(4.0)); bw /= max(bw.x + bw.y + bw.z, 1e-4);
      vec4 tx = texture2D(map, vWP.zy * ${e.toFixed(3)}), ty = texture2D(map, vWP.xz * ${e.toFixed(3)}), tz = texture2D(map, vWP.xy * ${e.toFixed(3)});
      diffuseColor *= tx * bw.x + ty * bw.y + tz * bw.z;`}`)},n.customProgramCacheKey=()=>"tri"+e+(t?"see":""),n}function bE(n,e,t,i){let s=U.W*U.H>700,r=s?ct?1.2:1.5:ct?1.7:2.2,o=.32,a=new li(n,e,t,Math.ceil(n*r),Math.ceil(e*r),Math.ceil(t*r));a.deleteAttribute("normal"),a.deleteAttribute("uv"),a=nc(a);let l=a.attributes.position,c=n/2-o,h=e/2-o,d=t/2-o,u=new P,f=new P,g=new Float32Array(l.count*3);for(let x=0;x<l.count;x++){u.fromBufferAttribute(l,x);let m=$e(u.x,-c,c),p=$e(u.y,-h,h),v=$e(u.z,-d,d);f.set(u.x-m,u.y-p,u.z-v).normalize();let _=.07*(Math.sin(u.x*4.1+i)*Math.sin(u.z*3.7-i)+Math.sin(u.y*5.3+u.x*2.1+i*2))+(u.y>h-.01?.05*Math.sin(u.x*2.3+u.z*2.9+i):0);u.set(m,p,v).addScaledVector(f,o+_),l.setXYZ(x,u.x,u.y+e/2,u.z);let M=$e((u.y+e/2)/e,0,1),S=.55+.45*Math.pow(M,.7)+D(-.05,.05);g[x*3]=S*.95,g[x*3+1]=S,g[x*3+2]=S*.9}return a.setAttribute("color",new ot(g,3)),a.computeVertexNormals(),a}function EE(){let n=[[0,0],[.78,0],[.62,.12],[.55,.3],[.53,.7],[.56,.84],[.5,.86]].map(s=>new ae(s[0],s[1])),e=new qr(n,18),t=new Vn(.5,18);t.rotateX(-Math.PI/2),t.translate(0,.86,0);let i=e.attributes.position;for(let s=0;s<i.count;s++){let r=i.getX(s),o=i.getZ(s),a=Math.atan2(o,r),l=i.getY(s),c=1+.07*Math.sin(a*7)+.04*Math.sin(a*13+l*6);i.setX(s,r*c),i.setZ(s,o*c)}return e.computeVertexNormals(),{side:e,top:t}}var ro=new Ge,oo=new Nn,ga=new P,Ed=new P,Sd=new P(0,1,0);function rr(n,e,t,i={}){let s=Ui[n];if(!s||!e.length)return[];let r=[];for(let o of s.parts){let a=t(o);if(!a)continue;let l=new Qi(o.geometry,a,e.length);e.forEach((c,h)=>{oo.setFromAxisAngle(Sd,c.rot||0),ga.setScalar(c.s||1),c.sy&&(ga.y*=c.sy),ro.compose(Ed.set(c.x,c.y||0,c.z),oo,ga).multiply(o.matrix),l.setMatrixAt(h,ro),c.color&&l.setColorAt&&l.setColorAt(h,c.color)}),l.castShadow=!!i.cast,l.receiveShadow=i.receive!==!1,l.computeBoundingSphere(),U.group.add(l),r.push(l)}return r}function wd(n){U.group&&(ce.remove(U.group),U.group.traverse(t=>{t.geometry&&!t.userData.shared&&t.geometry.dispose()}));let e=Zm[n];Object.assign(U,{map:e,W:e.W,H:e.H,rows:e.rows.map(t=>[...t]),hx:e.W*1.6/2,hz:e.H*1.6/2,spawns:{0:[],1:[],ffa:[]},grassTiles:[],crates:[],mine:null,bands:[],waterMat:null,flowers:[]}),U.group=new xt,ce.add(U.group),Pm(U.hx+2,U.hz+2);for(let t=0;t<U.H;t++)for(let i=0;i<U.W;i++){let s=U.rows[t][i];if(s==="b"&&U.spawns[0].push({x:qt(i),z:$t(t)-3.2}),s==="r"&&U.spawns[1].push({x:qt(i),z:$t(t)+3.2}),s==="M"&&(U.mine={x:qt(i),z:$t(t)}),s==="s"){let r=qt(i),o=$t(t),a=Math.hypot(r,o)||1;U.spawns.ffa.push({x:r-r/a*1,z:o-o/a*1})}s==='"'&&U.grassTiles.push([i,t])}return U.spawns[0].length||(U.spawns[0]=U.spawns[1]=U.spawns.ffa),Fu(7331,()=>{SE(),TE(),PE(),CE(),LE(),IE(),FE(),UE()}),U}function SE(){let e=U.W*40,t=U.H*40,i=di(e,t,u=>{for(let g=0;g<U.H;g++)for(let x=0;x<U.W;x++){let m=(g+x)%2===0;u.fillStyle=m?"#7CC24E":"#71B847",u.fillRect(x*40,g*40,40,40)}let f=(g,x,m)=>{let p=u.createRadialGradient(g,x,m*.2,g,x,m);p.addColorStop(0,"rgba(201,164,106,0.95)"),p.addColorStop(.7,"rgba(190,156,98,0.6)"),p.addColorStop(1,"rgba(190,156,98,0)"),u.fillStyle=p,u.beginPath(),u.arc(g,x,m,0,Pe),u.fill()};for(let g=0;g<U.H;g++)for(let x=0;x<U.W;x++){let m=U.rows[g][x],p=(x+.5)*40,v=(g+.5)*40;m==="M"&&f(p,v,40*2.6),(m==="b"||m==="r"||m==="s")&&f(p,v,40*1.1)}for(let g=0;g<e*t/60;g++){let x=D(0,e),m=D(0,t);u.strokeStyle=is(["rgba(70,140,40,.5)","rgba(150,215,90,.45)","rgba(55,115,35,.45)","rgba(180,230,120,.3)"]),u.lineWidth=D(1,2.2),u.beginPath(),u.moveTo(x,m),u.lineTo(x+D(-2,2),m-D(3,7)),u.stroke()}u.filter="blur(6px)";for(let g=0;g<U.H;g++)for(let x=0;x<U.W;x++){let m=U.rows[g][x];m==="#"?(u.fillStyle="rgba(30,60,20,.55)",u.fillRect(x*40-6,g*40-6,52,52)):m==="R"||m==="T"?(u.fillStyle="rgba(30,60,20,.35)",u.beginPath(),u.arc((x+.5)*40,(g+.5)*40,40*.65,0,Pe),u.fill()):m==='"'?(u.fillStyle="rgba(40,90,25,.35)",u.fillRect(x*40,g*40,40,40)):m==="~"&&(u.fillStyle="#4B5E2E",u.fillRect(x*40-4,g*40-4,48,48))}u.filter="none";for(let g=0;g<U.H;g++)for(let x=0;x<U.W;x++){let m=U.rows[g][x];m!=="b"&&m!=="r"&&m!=="s"||(u.strokeStyle=m==="b"?"rgba(80,190,255,.85)":m==="r"?"rgba(255,90,90,.85)":"rgba(255,215,90,.8)",u.lineWidth=4,u.beginPath(),u.arc((x+.5)*40,(g+.5)*40,40*.38,0,Pe),u.stroke())}if(U.map.mode==="ball"){u.strokeStyle="rgba(255,255,255,.55)",u.lineWidth=5,u.beginPath(),u.moveTo(0,t/2),u.lineTo(e,t/2),u.stroke(),u.beginPath(),u.arc(e/2,t/2,40*3.2,0,Pe),u.stroke();for(let g=0;g<U.H;g++)for(let x=0;x<U.W;x++){let m=U.rows[g][x];m!=="g"&&m!=="h"||(u.fillStyle=m==="g"?"rgba(255,90,90,.35)":"rgba(80,190,255,.35)",u.fillRect(x*40,g*40,40,40))}for(let g of[!0,!1]){let x=g?40:t-240,m=40*11;u.strokeRect(e/2-m/2,x,m,40*5)}}});i.anisotropy=8;let s=.8,r=Math.round(U.W*1.6/s),o=Math.round(U.H*1.6/s),a=new Gt(U.W*1.6,U.H*1.6,r,o);a.rotateX(-Math.PI/2);let l=a.attributes.position;for(let u=0;u<l.count;u++){let f=l.getX(u),g=l.getZ(u),x=0;for(let[m,p]of[[0,0],[.35,0],[-.35,0],[0,.35],[0,-.35]])gi(f+m,g+p)==="~"&&(x+=.2);l.setY(u,-x*.7)}a.computeVertexNormals();let c=new ne(a,mi(mt({map:i,roughness:.95}),"ground"));c.receiveShadow=!0,U.group.add(c);let h=di(256,256,(u,f,g)=>{u.fillStyle="#5E9E3A",u.fillRect(0,0,f,g);for(let x=0;x<1400;x++){let m=D(0,f),p=D(0,g);u.strokeStyle=is(["rgba(40,100,30,.5)","rgba(120,190,70,.45)","rgba(70,130,40,.5)"]),u.lineWidth=D(1,2),u.beginPath(),u.moveTo(m,p),u.lineTo(m+D(-2,2),p-D(3,8)),u.stroke()}},{repeat:!0});h.repeat.set(40,40);let d=new ne(new Gt(260,260),mi(mt({map:h,roughness:1}),"ground"));d.rotation.x=-Math.PI/2,d.position.y=-.85}function wE(){return U.shared.hedge||(U.shared.hedge=mi(ME(mt({map:_E(),vertexColors:!0,roughness:.85,color:"#E8FFD8"}),.55,!0),"hedge")),U.shared.hedge}var Td=2.6;function TE(){let n=[],e=new Set,t=U.W,i=U.H,s=(h,d)=>ls(h,d)==="#";for(let h=0;h<i;h++)for(let d=0;d<t;d++){if(!s(d,h)||e.has(h*t+d))continue;let u=d;for(;s(u+1,h);)u++;if(u>d){for(let f=d;f<=u;f++)e.add(h*t+f);so(n,qt(d)-1.6/2,$t(h)-1.6/2,(u-d+1)*1.6,1.6)}}for(let h=0;h<t;h++)for(let d=0;d<i;d++){if(!s(h,d)||e.has(d*t+h))continue;let u=d;for(;s(h,u+1)&&!e.has((u+1)*t+h);)u++;for(let f=d;f<=u;f++)e.add(f*t+h);so(n,qt(h)-1.6/2,$t(d)-1.6/2,1.6,(u-d+1)*1.6)}let r=U.hx,o=U.hz,a=1.3;so(n,-r-a,-o-a,U.W*1.6+2*a,a,3),so(n,-r-a,o,U.W*1.6+2*a,a,3),so(n,-r-a,-o,a,U.H*1.6,3),so(n,r,-o,a,U.H*1.6,3);let l=new ne(ua(n),wE());l.castShadow=l.receiveShadow=!0,U.group.add(l),n.forEach(h=>h.dispose());let c=[];for(let h=0;h<i;h++)for(let d=0;d<t;d++)s(d,h)&&os&&D()<.3&&c.push({x:qt(d)+D(-.4,.4),y:Td-.3,z:$t(h)+D(-.4,.4),rot:D(0,Pe),s:D(.32,.42)});rr("Bush_Common",c,()=>Qm("#4FA23A"),{cast:!1})}function so(n,e,t,i,s,r=Td){let o=bE(i-.06,r,s-.06,D(0,100));o.translate(e+i/2,0,t+s/2),n.push(o)}function Qm(n){let e="leaf"+n;if(!U.shared[e]){let t=Ui.Bush_Common.parts[0].map;U.shared[e]=mi(va(mt({map:t,color:n,alphaTest:.45,side:zt,roughness:.8}),1.6,.05,!1),"leaf")}return U.shared[e]}var e0=3e3,as=null,ma=new Rt;function AE(){let n=new li(1.3,1.1,1.3);return n.translate(0,.55,0),n}function RE(){return di(128,128,(n,e,t)=>{n.fillStyle="#9A6B3C",n.fillRect(0,0,e,t);for(let i=0;i<4;i++)n.fillStyle=i%2?"#8A5E33":"#A87645",n.fillRect(0,i*32+2,e,28);n.strokeStyle="#5E3D1E",n.lineWidth=8,n.strokeRect(4,4,e-8,t-8),n.beginPath(),n.moveTo(8,8),n.lineTo(e-8,t-8),n.stroke(),n.fillStyle="#FFD45A",n.beginPath(),n.arc(e/2,t/2,15,0,Pe),n.fill(),n.fillStyle="#FFF4C0",n.beginPath(),n.arc(e/2-4,t/2-4,5,0,Pe),n.fill()})}function CE(){U.crates=[];for(let n=0;n<U.H;n++)for(let e=0;e<U.W;e++)U.rows[n][e]==="C"&&U.crates.push({c:e,r:n,x:qt(e),z:$t(n),hp:e0,shake:0,rot:Math.floor(D(0,4))*Math.PI/2,alive:!0});if(!U.crates.length){as=null;return}as=new Qi(AE(),mt({map:RE(),roughness:.85}),U.crates.length),as.castShadow=as.receiveShadow=!0,U.crates.forEach((n,e)=>{n.i=e,xa(n)}),U.group.add(as)}function xa(n){let e=n.alive?1:0,t=n.shake>0?Math.sin(n.shake*60)*.06*n.shake/.2:0;ma.position.set(n.x+t,0,n.z),ma.rotation.set(0,n.rot+t,0),ma.scale.set(e,e*(1-t*.5),e),ma.updateMatrix(),as.setMatrixAt(n.i,ma.matrix),as.instanceMatrix.needsUpdate=!0}var t0=(n,e)=>U.crates.find(t=>t.alive&&t.c===n&&t.r===e)||null;function Ad(n,e){return!n||!n.alive?!1:(n.hp-=e,n.shake=.2,n.hp<=0?(n.alive=!1,U.rows[n.r][n.c]=".",xa(n),!0):(xa(n),!1))}function n0(){if(as)for(let n of U.crates)n.alive=!0,n.hp=e0,n.shake=0,U.rows[n.r][n.c]="C",xa(n)}function i0(n){if(as)for(let e of U.crates)e.shake>0&&(e.shake=Math.max(0,e.shake-n),xa(e))}function PE(){let n=[[],[],[]],e=[];for(let l=0;l<U.H;l++)for(let c=0;c<U.W;c++){let h=U.rows[l][c],d=qt(c),u=$t(l);if(h==="R"){let f=(l*7+c*3)%3;n[f].push({x:d,z:u,y:-.05,rot:D(0,Pe),s:.56})}h==="T"&&e.push({x:d,z:u,rot:D(0,Pe),s:D(.95,1.05)})}let t=mi(mt({map:Ui.Rock_Medium_1.parts[0].map,roughness:.9,color:"#D8E0D0"}),"stone");n.forEach((l,c)=>rr("Rock_Medium_"+(c+1),l,()=>t,{cast:!0}));let{side:i,top:s}=EE(),r=di(128,128,(l,c,h)=>{l.fillStyle="#6B4A2E",l.fillRect(0,0,c,h);for(let d=0;d<40;d++){let u=D(0,c);l.strokeStyle=is(["#4E3420","#7E5A38","#5A3D25"]),l.lineWidth=D(2,6),l.beginPath(),l.moveTo(u,0),l.bezierCurveTo(u+D(-8,8),h*.3,u+D(-8,8),h*.7,u+D(-4,4),h),l.stroke()}},{repeat:!0});r.repeat.set(3,1);let o=di(128,128,(l,c,h)=>{l.fillStyle="#E2B97A",l.fillRect(0,0,c,h);for(let d=4;d<64;d+=D(4,7))l.strokeStyle=`rgba(150,95,45,${D(.35,.7)})`,l.lineWidth=D(1,2.5),l.beginPath(),l.arc(64+D(-1,1),64+D(-1,1),d,0,Pe),l.stroke();l.strokeStyle="#6B4A2E",l.lineWidth=8,l.beginPath(),l.arc(64,64,62,0,Pe),l.stroke()}),a=(l,c)=>{let h=new Qi(l,c,e.length);e.forEach((d,u)=>{oo.setFromAxisAngle(Sd,d.rot),ro.compose(Ed.set(d.x,0,d.z),oo,ga.setScalar(d.s)),h.setMatrixAt(u,ro)}),h.castShadow=h.receiveShadow=!0,U.group.add(h)};e.length&&(a(i,mi(mt({map:r,roughness:.9}),"stone")),a(s,mi(mt({map:o,roughness:.8}),"ground")))}var Km=[];function yd(n){let e=[],t=[],i=[],s=[],r=new te,o=new te;for(let l=0;l<n;l++){let c=D(-.82,.82),h=D(-.82,.82),d=D(1.15,1.65),u=D(.08,.13),f=D(0,Pe),g=D(.15,.45),x=D(0,Pe),m=Math.cos(f),p=Math.sin(f);r.setHSL(D(.27,.31),D(.6,.75),D(.1,.15)),o.setHSL(D(.22,.28),D(.6,.8),D(.3,.4));let v=e.length/3,_=[[0,1],[.45,.8],[.8,.45],[1,0]];for(let[M,S]of _){let b=c+Math.cos(x)*g*M*M,R=h+Math.sin(x)*g*M*M,F=d*M*(1-g*g*.3*M),E=M===1?0:1;for(let T of E?[-1,1]:[0]){e.push(b+m*u*S*T*.5,F,R+p*u*S*T*.5);let z=r.clone().lerp(o,Math.pow(M,.8));t.push(z.r,z.g,z.b),i.push(-p*.7,.5,m*.7)}}s.push(v,v+1,v+3,v,v+3,v+2,v+2,v+3,v+5,v+2,v+5,v+4,v+4,v+5,v+6)}let a=new vt;return a.setAttribute("position",new Qe(e,3)),a.setAttribute("normal",new Qe(i,3)),a.setAttribute("color",new Qe(t,3)),a.setIndex(s),a}function LE(){let n=os?70:ct?40:56,e=[yd(n),yd(n),yd(n)],t=mi(va(mt({vertexColors:!0,roughness:1,side:zt,envMapIntensity:.5}),1.6,.12,!0),"leaf");Km=[],e.forEach((i,s)=>{let r=U.grassTiles.filter((a,l)=>l%3===s);if(!r.length)return;let o=new Qi(i,t,r.length);r.forEach(([a,l],c)=>{oo.setFromAxisAngle(Sd,Math.floor(D(0,4))*Math.PI/2),ro.compose(Ed.set(qt(a),0,$t(l)),oo,ga.set(1,D(.92,1.08),1)),o.setMatrixAt(c,ro)}),o.receiveShadow=!0,o.computeBoundingSphere(),U.group.add(o),Km.push(o)})}function IE(){let n=[];for(let r=0;r<U.H;r++)for(let o=0;o<U.W;o++)U.rows[r][o]==="~"&&n.push([o,r]);if(!n.length)return;let e=n.map(([r,o])=>{let a=new Gt(1.6+.5,1.6+.5);return a.rotateX(-Math.PI/2),a.translate(qt(r),-.16,$t(o)),a}),t=U.waterMat=mt({color:"#2C86A8",roughness:.2,metalness:.05,transparent:!0,opacity:.9});t.onBeforeCompile=r=>{r.uniforms.uTime=pn.time,r.vertexShader=`varying vec3 vWP2;
`+r.vertexShader.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
 vWP2 = (modelMatrix * vec4(transformed, 1.0)).xyz;`),r.fragmentShader=`uniform float uTime; varying vec3 vWP2;
`+r.fragmentShader.replace("#include <map_fragment>",`
      float rip = sin(vWP2.x * 5.0 + uTime * 1.6) * sin(vWP2.z * 4.3 - uTime * 1.2) + sin((vWP2.x + vWP2.z) * 7.0 + uTime * 2.3) * 0.5;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.85, 1.0, 1.0), smoothstep(0.9, 1.4, rip) * 0.5);`)};let i=new ne(ua(e),t);i.receiveShadow=!0,U.group.add(i);let s=n.filter(()=>D()<.7).map(([r,o])=>({x:qt(r)+D(-.4,.4),y:-.14,z:$t(o)+D(-.4,.4),rot:D(0,Pe),s:D(.5,.7)}));rr("Plant_1",s.map(r=>Object.assign(r,{sy:.25})),()=>Qm("#6DBB4A"))}function FE(){let n=[],e=[],t=[],i=[];for(let o=0;o<U.H;o++)for(let a=0;a<U.W;a++){let l=U.rows[o][a],c=qt(a),h=$t(o);l===","&&n.push({x:c+D(-.3,.3),z:h+D(-.3,.3),rot:D(0,Pe),s:D(.32,.4)}),l==="."&&D()<.22&&e.push({x:c+D(-.6,.6),z:h+D(-.6,.6),rot:D(0,Pe),s:D(.3,.42),color:new te().setHSL(D(.23,.29),.6,D(.42,.5))}),l==="."&&D()<.06&&t.push({x:c+D(-.6,.6),z:h+D(-.6,.6),rot:D(0,Pe),s:D(.4,.7)}),l==="."&&D()<.05&&i.push({x:c+D(-.6,.6),z:h+D(-.6,.6),rot:D(0,Pe),s:D(.35,.5)})}let s=mi(va(mt({map:Ui.Grass_Common_Short.parts[0].map,roughness:.9,side:zt,color:"#A8E07A"}),1.3,.06,!0),"leaf");rr("Grass_Common_Short",e,()=>s),U.flowers=rr("Flower_3_Group",n,o=>o.matName==="Flowers"?DE():$m("#5DB043"));let r=mi(mt({map:Ui.Pebble_Round_1.parts[0].map,roughness:.9}),"stone");rr("Pebble_Round_1",t,()=>r),rr("Clover_1",i,()=>$m("#5AAE42"))}function DE(){return U.shared.fl||(U.shared.fl=va(mt({map:Ui.Flower_3_Group.parts.find(n=>n.matName==="Flowers").map,alphaTest:.4,side:zt,roughness:.7}),2,.05,!0))}function $m(n){let e="leaves"+n;if(!U.shared[e]){let t=Ui.Fern_1.parts[0];U.shared[e]=mi(va(mt({map:t.map,color:n,alphaTest:.4,side:zt,roughness:.8}),2,.05,!0),"leaf")}return U.shared[e]}function zE(n,e,t){return di(2048,256,(i,s,r)=>{Fu(n,()=>{let o=(a,l,c,h)=>{let d=D()<.45,u=[];if(d)for(let f=0;f<4;f++)u.push(["t",l-c*(.35+f*.42),c*(.75-f*.15)]);else for(let f=0;f<5;f++)u.push(["c",D(-.5,.5)*c,l-c*D(.7,1.6),c*D(.45,.7)]);i.fillStyle=h;for(let f of[-s,0,s]){let g=a+f;for(let x of u)i.beginPath(),x[0]==="t"?(i.moveTo(g-x[2],x[1]+c*.45),i.lineTo(g,x[1]-c*.5),i.lineTo(g+x[2],x[1]+c*.45)):i.arc(g+x[1],x[2],x[3],0,Pe),i.fill();i.fillRect(g-c*.08,l-c*.6,c*.16,r)}};for(let a=0;a<s;a+=D(26,48))o(a,r*.92,D(55,95),t);for(let a=0;a<s;a+=D(30,56))o(a,r,D(48,80),e);i.fillStyle=e,i.fillRect(0,r*.86,s,r)})},{repeat:!0})}function UE(){let n=Math.hypot(U.hx,U.hz);for(let[e,t,i,s,r,o]of[[n+18,15,11,"#2C4A22","#3E6230","#FFFFFF"],[n+34,22,23,"#3A4E38","#4E6448","#E8E0E0"]]){let a=zE(i,s,r);a.repeat.set(4,1);let l=new Vt(e,e,t,48,1,!0);l.translate(0,t/2-.5,0);let c=new ne(l,mi(new Fe({map:a,alphaTest:.5,side:Zt,color:o}),"leaf"));c.userData.tint=new te(o),U.bands.push(c),U.group.add(c)}}var _a={"\u0413\u0440\u0438\u0431\u044B \u043F\u0440\u043E\u0441\u044B\u043F\u0430\u044E\u0442\u0441\u044F\u2026":"Mushrooms are waking up\u2026","\u0413\u0440\u0438\u0431\u043D\u0430\u044F \u0430\u0440\u0435\u043D\u0430":"Mushroom Arena","\u0412\u044B\u0431\u0435\u0440\u0438 \u0433\u0435\u0440\u043E\u044F":"Pick a hero",\u0421\u043F\u043E\u0440\u044B:"Spore Rush","3 \u043D\u0430 3 \xB7 \u0441\u043E\u0431\u0435\u0440\u0438 10 \u0441\u043F\u043E\u0440 \u0438 \u0443\u0434\u0435\u0440\u0436\u0438 \u0438\u0445 15 \u0441\u0435\u043A\u0443\u043D\u0434":"3 vs 3 \xB7 collect 10 spores and hold them for 15 seconds",\u0411\u043E\u0442\u044B:"Bots",\u041B\u0451\u0433\u043A\u0438\u0435:"Easy",\u041E\u0431\u044B\u0447\u043D\u044B\u0435:"Normal",\u0421\u043B\u043E\u0436\u043D\u044B\u0435:"Hard","\u0412 \u0431\u043E\u0439!":"Fight!",\u0413\u0440\u0430\u0444\u0438\u043A\u0430:"Graphics",\u0411\u044B\u0441\u0442\u0440\u0430\u044F:"Fast",\u041A\u0440\u0430\u0441\u0438\u0432\u0430\u044F:"Pretty",\u0417\u0432\u0443\u043A:"Sound",\u042D\u0444\u0444\u0435\u043A\u0442\u044B:"Effects",\u041C\u0443\u0437\u044B\u043A\u0430:"Music",\u041F\u0430\u0443\u0437\u0430:"Pause",\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C:"Resume","\u0412\u044B\u0439\u0442\u0438 \u0432 \u043C\u0435\u043D\u044E":"Quit to menu",\u0410\u0442\u0430\u043A\u0430:"Attack","\u041B\u0435\u0432\u044B\u0439 \u043F\u0430\u043B\u0435\u0446 \u2014 \u0431\u0435\u0433, \u043F\u0440\u0430\u0432\u044B\u0439 \u2014 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043A\u0430\u043C\u0435\u0440\u044B. \u041A\u043D\u043E\u043F\u043A\u0430 \u0430\u0442\u0430\u043A\u0438: \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u0435 \u2014 \u0430\u0432\u0442\u043E\u043F\u0440\u0438\u0446\u0435\u043B, \u0441 \u043F\u0440\u043E\u0442\u044F\u0436\u043A\u043E\u0439 \u2014 \u0446\u0435\u043B\u0438\u0448\u044C\u0441\u044F \u0441\u0430\u043C. \u0417\u0432\u0435\u0437\u0434\u0430 \u2014 \u0441\u0443\u043F\u0435\u0440.":"Left thumb to run, right thumb to turn the camera. Attack button: a quick tap auto-aims, hold and drag to aim yourself. The star is your super.","WASD \u2014 \u0431\u0435\u0433, \u043C\u044B\u0448\u044C \u2014 \u043A\u0430\u043C\u0435\u0440\u0430 \u0438 \u043F\u0440\u0438\u0446\u0435\u043B, \u041B\u041A\u041C \u2014 \u0430\u0442\u0430\u043A\u0430, \u041F\u041A\u041C \u0438\u043B\u0438 E \u2014 \u0441\u0443\u043F\u0435\u0440, Esc \u2014 \u043F\u0430\u0443\u0437\u0430.":"WASD to run, mouse to look and aim, LMB to attack, RMB or E for the super, Esc to pause.",\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435:"Health",\u0423\u0440\u043E\u043D:"Damage",\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C:"Range",\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C:"Speed",\u043C:"m",\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438:"Settings",\u0421\u0440\u0435\u0434\u043D\u044F\u044F:"Medium",\u0427\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C:"Sensitivity","\u0421\u0447\u0451\u0442\u0447\u0438\u043A FPS":"FPS counter",\u0412\u044B\u043A\u043B:"Off",\u0412\u043A\u043B:"On",\u0413\u043E\u0442\u043E\u0432\u043E:"Done","\u0418\u0433\u0440\u0430 \u0441\u0430\u043C\u0430 \u0441\u043D\u0438\u0436\u0430\u0435\u0442 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E, \u0435\u0441\u043B\u0438 \u043A\u0430\u0434\u0440\u043E\u0432 \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442. \u041F\u0440\u0438 \u0441\u043C\u0435\u043D\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0441\u044F.":"The game lowers the quality by itself when frames run short. Changing graphics reloads the page.",\u0428\u043B\u044F\u043F\u043D\u0438\u043A:"Capper",\u0411\u0430\u0431\u0430\u0445:"Kaboom",\u0416\u0430\u043B\u043A\u0430:"Stinga",\u043C\u0443\u0445\u043E\u043C\u043E\u0440:"fly agaric","\u0436\u0443\u043A-\u0431\u043E\u043C\u0431\u0430\u0440\u0434\u0438\u0440":"bombardier beetle",\u043E\u0441\u0430:"wasp",\u0414\u0440\u043E\u0431\u043E\u0432\u0438\u043A:"Shotgun",\u041C\u0435\u0442\u0430\u0442\u0435\u043B\u044C:"Thrower",\u0421\u043D\u0430\u0439\u043F\u0435\u0440:"Sniper","\u0421\u043F\u043E\u0440\u043E\u0432\u044B\u0439 \u0434\u0440\u043E\u0431\u043E\u0432\u0438\u043A \u0431\u044C\u0451\u0442 \u0432\u0435\u0435\u0440\u043E\u043C: \u0432\u0431\u043B\u0438\u0437\u0438 \u0440\u0430\u0437\u043D\u043E\u0441\u0438\u0442 \u043B\u044E\u0431\u043E\u0433\u043E.":"A spore shotgun that fires in a fan: up close it flattens anyone.","\u041A\u0438\u0434\u0430\u0435\u0442 \u0431\u043E\u043C\u0431\u044B \u043D\u0430\u0432\u0435\u0441\u043E\u043C \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0435\u043D\u044B. \u0412\u0437\u0440\u044B\u0432 \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0433\u043E\u0440\u044F\u0449\u0443\u044E \u043B\u0443\u0436\u0443.":"Lobs bombs over walls. Each blast leaves a burning puddle.","\u0414\u0430\u043B\u044C\u043D\u043E\u0431\u043E\u0439\u043D\u043E\u0435 \u0436\u0430\u043B\u043E: \u0447\u0435\u043C \u0434\u0430\u043B\u044C\u0448\u0435 \u0446\u0435\u043B\u044C, \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u043D\u0435\u0435.":"A long-range stinger: the further the target, the harder it hits.","\u0414\u0430\u043B\u044C\u043D\u043E\u0431\u043E\u0439\u043D\u043E\u0435 \u0436\u0430\u043B\u043E: \u0447\u0435\u043C \u0434\u0430\u043B\u044C\u0448\u0435 \u0446\u0435\u043B\u044C, \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u0446\u0435\u043B \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0435\u0442, \u0430 \u0432\u044B\u0441\u0442\u0440\u0435\u043B \u0438\u0437 \u043F\u0440\u0438\u0446\u0435\u043B\u0430 \u0437\u0430\u0440\u044F\u0436\u0430\u0435\u0442\u0441\u044F \u0434\u043E +60% \u0443\u0440\u043E\u043D\u0430.":"A long-range stinger: the further the target, the harder it hits. The scope zooms in, and a scoped shot charges up to +60% damage.","\u0421\u043F\u043E\u0440\u043E\u0432\u044B\u0439 \u0432\u0435\u0435\u0440":"Spore Fan","\u0413\u0440\u0438\u0431\u043D\u043E\u0439 \u0437\u0430\u043B\u043F":"Mushroom Volley","\u0448\u0438\u0440\u043E\u043A\u0438\u0439 \u0437\u0430\u043B\u043F \u043E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442 \u0432\u0440\u0430\u0433\u043E\u0432":"a wide volley that knocks enemies back","\u0416\u0443\u0447\u0438\u043D\u0430\u044F \u0431\u043E\u043C\u0431\u0430":"Beetle Bomb","\u041A\u043E\u0432\u0440\u043E\u0432\u0430\u044F \u0431\u043E\u043C\u0431\u0451\u0436\u043A\u0430":"Carpet Bombing","\u043F\u044F\u0442\u044C \u0431\u043E\u043C\u0431 \u043B\u043E\u0436\u0430\u0442\u0441\u044F \u0434\u043E\u0440\u043E\u0436\u043A\u043E\u0439":"five bombs land in a line",\u0416\u0430\u043B\u043E:"Stinger","\u041F\u0440\u043E\u043D\u0437\u0430\u044E\u0449\u0438\u0439 \u043B\u0443\u0447":"Piercing Beam","\u043B\u0443\u0447 \u043F\u0440\u043E\u0448\u0438\u0432\u0430\u0435\u0442 \u0441\u0442\u0435\u043D\u044B \u0438 \u0432\u0441\u0435\u0445 \u043D\u0430 \u043F\u0443\u0442\u0438":"a beam that goes through walls and everyone in its way","\u0441\u043F\u043E\u0440 \u0432\u0435\u0435\u0440\u043E\u043C":"spores in a fan","\u0431\u043E\u043C\u0431\u0430 \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0435\u043D\u044B, \u0433\u043E\u0440\u044F\u0449\u0430\u044F \u043B\u0443\u0436\u0430":"a bomb over walls, a burning puddle","\u0434\u0430\u043B\u044C\u043D\u0438\u0439 \u0432\u044B\u0441\u0442\u0440\u0435\u043B, \u0443\u0440\u043E\u043D \u0440\u0430\u0441\u0442\u0451\u0442 \u0441 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C":"a long shot, damage grows with distance",\u041A\u0430\u0442\u044B\u0448:"Rolly",\u043C\u043E\u043A\u0440\u0438\u0446\u0430:"woodlouse",\u0420\u0438\u043A\u043E\u0448\u0435\u0442:"Ricochet","\u0421\u043A\u0430\u0447\u0443\u0449\u0438\u0439 \u043A\u0430\u0442\u044B\u0448":"Bouncing Pebble","\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u043A\u0430\u0442\u044B\u0448":"Big Roller","\u0420\u043E\u0433\u0430\u0442\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u044F\u0435\u0442 \u0441\u043A\u0430\u0447\u0443\u0449\u0438\u043C\u0438 \u043A\u0430\u0442\u044B\u0448\u0430\u043C\u0438: \u043E\u043D\u0438 \u043E\u0442\u043B\u0435\u0442\u0430\u044E\u0442 \u043E\u0442 \u043A\u0443\u0441\u0442\u043E\u0432 \u0438 \u0434\u043E\u0441\u0442\u0430\u044E\u0442 \u0432\u0440\u0430\u0433\u0430 \u0437\u0430 \u0443\u0433\u043B\u043E\u043C.":"A slingshot that fires bouncing pebbles: they ricochet off hedges and reach enemies around corners.","\u043E\u0433\u0440\u043E\u043C\u043D\u044B\u0439 \u0448\u0430\u0440 \u0434\u043E\u043B\u0433\u043E \u0441\u043A\u0430\u0447\u0435\u0442 \u043F\u043E \u043A\u043E\u0440\u0438\u0434\u043E\u0440\u0430\u043C \u0438 \u0431\u044C\u0451\u0442 \u0432\u0441\u0435\u0445 \u043D\u0430 \u043F\u0443\u0442\u0438":"a huge ball bounces through the corridors for a long time, hitting everyone in its way","\u043E\u0442\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u043E\u0442 \u043A\u0443\u0441\u0442\u043E\u0432 2 \u0440\u0430\u0437\u0430, \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u0441\u043A\u043E\u043A\u0430 \u0431\u044C\u0451\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435":"bounces off hedges twice, hits harder after a bounce",\u0421\u0442\u0440\u0435\u043A\u043E\u0442:"Chirp",\u043A\u0443\u0437\u043D\u0435\u0447\u0438\u043A:"grasshopper",\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0447\u0438\u043A:"Gunner","\u0421\u043F\u043E\u0440\u043E\u0432\u0430\u044F \u043E\u0447\u0435\u0440\u0435\u0434\u044C":"Spore Burst",\u0421\u0442\u0440\u0435\u043A\u043E\u0442\u043D\u044F:"Chirp Storm","\u0421\u043F\u043E\u0440\u043E\u0432\u044B\u0439 \u0430\u0432\u0442\u043E\u043C\u0430\u0442 \u0431\u044C\u0451\u0442 \u043E\u0447\u0435\u0440\u0435\u0434\u044F\u043C\u0438. \u0414\u0435\u0440\u0436\u0438 \u043A\u043D\u043E\u043F\u043A\u0443 \u2014 \u0440\u0430\u0437\u0431\u0440\u043E\u0441 \u0440\u0430\u0441\u0442\u0451\u0442, \u0441\u0442\u0440\u0435\u043B\u044F\u0439 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u043C\u0438 \u043E\u0447\u0435\u0440\u0435\u0434\u044F\u043C\u0438.":"A spore gun that fires in bursts. Hold the trigger and the spread grows: fire in short bursts.","4 \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u0441\u0442\u0440\u0435\u043B\u044F\u0435\u0442 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0438 \u0442\u043E\u0447\u043D\u0435\u0435, \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \u0434\u043B\u0438\u043D\u043D\u0435\u0435":"for 4 seconds fires faster and tighter, with longer bursts","\u043E\u0447\u0435\u0440\u0435\u0434\u044C \u0438\u0437 5 \u0437\u0430\u0440\u044F\u0434\u043E\u0432, \u0440\u0430\u0437\u0431\u0440\u043E\u0441 \u0440\u0430\u0441\u0442\u0451\u0442 \u043F\u0440\u0438 \u0441\u0442\u0440\u0435\u043B\u044C\u0431\u0435":"a burst of 5 shots, the spread grows as you fire",\u0414\u043E\u0436\u0434\u0435\u0432\u0438\u043A\u0431\u043E\u043B:"Puffball","3 \u043D\u0430 3 \xB7 \u0437\u0430\u043A\u0430\u0442\u0438 \u0433\u0440\u0438\u0431-\u0434\u043E\u0436\u0434\u0435\u0432\u0438\u043A \u0432 \u0432\u043E\u0440\u043E\u0442\u0430 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":"3 vs 3 \xB7 roll the puffball into the other goal","\u0417\u0430\u043A\u0430\u0442\u0438 \u0433\u0440\u0438\u0431-\u0434\u043E\u0436\u0434\u0435\u0432\u0438\u043A \u0432 \u0432\u043E\u0440\u043E\u0442\u0430 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430: 2 \u0433\u043E\u043B\u0430 \u2014 \u043F\u043E\u0431\u0435\u0434\u0430":"Roll the puffball into the other goal: 2 goals win","\u0413\u043E\u043B!":"Goal!","\u0413\u043E\u043B \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430":"They scored","\u0417\u043E\u043B\u043E\u0442\u043E\u0439 \u0433\u043E\u043B!":"Golden goal!","\u041A\u0442\u043E \u0437\u0430\u0431\u044C\u0451\u0442 \u2014 \u0442\u043E\u0442 \u043F\u043E\u0431\u0435\u0434\u0438\u043B":"Next goal wins","\u0417\u043E\u043B\u043E\u0442\u043E\u0439 \u0433\u043E\u043B":"Golden goal","\u041C\u044F\u0447 \u0443 \u0442\u0435\u0431\u044F":"You have the ball","\u0410\u0442\u0430\u043A\u0430 \u2014 \u0443\u0434\u0430\u0440 \u0438\u043B\u0438 \u043F\u0430\u0441, \u0441\u0443\u043F\u0435\u0440 \u2014 \u043F\u0443\u0448\u0435\u0447\u043D\u044B\u0439 \u0443\u0434\u0430\u0440":"Attack kicks or passes, the super is a cannon shot",\u0421\u0447\u0451\u0442:"Score","\u041B\u0435\u0441\u043D\u043E\u0435 \u043F\u043E\u043B\u0435":"Forest Pitch","E \xB7 \u041F\u0440\u043E\u0431\u0435\u043B":"E \xB7 Space",\u041F\u0440\u0438\u0446\u0435\u043B:"Scope","\u0417\u0430\u0440\u044F\u0436\u0435\u043D\u043E!":"Charged!","\u041F\u041A\u041C \u2014 \u043F\u0440\u0438\u0446\u0435\u043B: \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u0438\u0435, \u0432\u044B\u0441\u0442\u0440\u0435\u043B \u0437\u0430\u0440\u044F\u0436\u0430\u0435\u0442\u0441\u044F \u0434\u043E +60% \u0443\u0440\u043E\u043D\u0430":"RMB \u2014 scope: zoom in, the shot charges up to +60% damage","\u0412\u0440\u0435\u043C\u044F \u0441\u0443\u0442\u043E\u043A":"Time of day",\u0421\u0435\u0437\u043E\u043D:"Season",\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E:"Random",\u0414\u0435\u043D\u044C:"Day",\u0417\u0430\u043A\u0430\u0442:"Sunset",\u041D\u043E\u0447\u044C:"Night",\u041B\u0435\u0442\u043E:"Summer",\u041E\u0441\u0435\u043D\u044C:"Autumn",\u0417\u0438\u043C\u0430:"Winter",\u043B\u0435\u0442\u043E:"summer",\u043E\u0441\u0435\u043D\u044C:"autumn",\u0437\u0438\u043C\u0430:"winter","\u0422\u0438\u0445\u0438\u0435 \u0437\u0430\u0432\u043E\u0434\u0438":"Quiet Backwaters","\u0413\u0440\u0438\u0431\u043D\u0430\u044F \u043F\u043E\u043B\u044F\u043D\u0430":"Mushroom Glade","\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0442\u0430\u043D\u043A":"Last Tank",\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439:"Last",\u0442\u0430\u043D\u043A:"Tank","\u0422\u0430\u043D\u043A\u0438 \u0432 \u043B\u0435\u0441\u043D\u043E\u043C \u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442\u0435":"Tanks in a forest maze","\u0412\u044B\u0431\u0435\u0440\u0438 \u0442\u0430\u043D\u043A":"Pick a tank","\u0422\u0430\u043D\u043A\u0438 \u043F\u0440\u043E\u0433\u0440\u0435\u0432\u0430\u044E\u0442 \u043C\u043E\u0442\u043E\u0440\u044B\u2026":"Tanks are warming up\u2026","\u043A\u0430\u0436\u0434\u044B\u0439 \u0441\u0430\u043C \u0437\u0430 \u0441\u0435\u0431\u044F \xB7 10 \u0442\u0430\u043D\u043A\u043E\u0432 \u0432 \u043B\u0435\u0441\u043D\u043E\u043C \u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442\u0435, \u0442\u0443\u043C\u0430\u043D \u0441\u0436\u0438\u043C\u0430\u0435\u0442\u0441\u044F":"every tank for itself \xB7 10 tanks in a forest maze, the fog closes in","\u0422\u044B \u2014 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0442\u0430\u043D\u043A!":"You are the last tank standing!","\u0422\u0435\u0431\u044F \u043F\u043E\u0434\u0431\u0438\u043B: ":"Knocked out by ","\u041F\u043E\u0434\u0431\u0438\u0442!":"Knocked out!","\u0422\u0435\u0431\u044F \u043F\u043E\u0434\u0431\u0438\u043B\u0438":"You got knocked out",\u041A\u0430\u0440\u0442\u0435\u0447\u043D\u0438\u043A:"Buckshot","\u0442\u044F\u0436\u0451\u043B\u044B\u0439 \u0442\u0430\u043D\u043A":"heavy tank",\u041A\u0430\u0440\u0442\u0435\u0447\u044C:"Grapeshot","\u0414\u0432\u043E\u0439\u043D\u043E\u0439 \u0437\u0430\u0440\u044F\u0434":"Double Charge","\u043A\u0430\u0440\u0442\u0435\u0447\u0438\u043D \u0432\u0435\u0435\u0440\u043E\u043C":"pellets in a fan","\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F \u0442\u043E\u043B\u0441\u0442\u0430\u044F \u043F\u0443\u0448\u043A\u0430 \u0431\u044C\u0451\u0442 \u043A\u0430\u0440\u0442\u0435\u0447\u044C\u044E \u0432\u0435\u0435\u0440\u043E\u043C: \u0432\u0431\u043B\u0438\u0437\u0438 \u0440\u0430\u0437\u043D\u043E\u0441\u0438\u0442 \u043B\u044E\u0431\u043E\u0433\u043E.":"A short fat gun fires grapeshot in a fan: up close it flattens anyone.",\u041C\u043E\u0440\u0442\u0438\u0440\u0430:"Mortar","\u043C\u0438\u043D\u043E\u043C\u0451\u0442\u043D\u044B\u0439 \u0442\u0430\u043D\u043A":"mortar tank",\u041C\u0438\u043D\u0430:"Shell","\u041A\u043E\u0432\u0440\u043E\u0432\u044B\u0439 \u043E\u0431\u0441\u0442\u0440\u0435\u043B":"Carpet Barrage","\u043F\u044F\u0442\u044C \u043C\u0438\u043D \u043B\u043E\u0436\u0430\u0442\u0441\u044F \u0434\u043E\u0440\u043E\u0436\u043A\u043E\u0439":"five shells land in a line","\u0411\u044C\u0451\u0442 \u0441\u043D\u0430\u0440\u044F\u0434\u0430\u043C\u0438 \u043D\u0430\u0432\u0435\u0441\u043E\u043C \u0447\u0435\u0440\u0435\u0437 \u043A\u0443\u0441\u0442\u044B. \u0420\u0430\u0437\u0440\u044B\u0432 \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0433\u043E\u0440\u044F\u0449\u0443\u044E \u043B\u0443\u0436\u0443.":"Lobs shells over the hedges. Each blast leaves a burning puddle.",\u0414\u0430\u043B\u044C\u043D\u043E\u0431\u043E\u0439:"Longshot","\u0438\u0441\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C \u0442\u0430\u043D\u043A\u043E\u0432":"tank destroyer",\u0411\u0440\u043E\u043D\u0435\u0431\u043E\u0439\u043D\u044B\u0439:"Armour Piercer","\u0420\u0435\u043B\u044C\u0441\u043E\u0432\u044B\u0439 \u043B\u0443\u0447":"Rail Beam","\u0414\u043B\u0438\u043D\u043D\u0430\u044F \u043F\u0443\u0448\u043A\u0430: \u0447\u0435\u043C \u0434\u0430\u043B\u044C\u0448\u0435 \u0446\u0435\u043B\u044C, \u0442\u0435\u043C \u0431\u043E\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u0446\u0435\u043B \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0435\u0442, \u0430 \u0432\u044B\u0441\u0442\u0440\u0435\u043B \u0438\u0437 \u043F\u0440\u0438\u0446\u0435\u043B\u0430 \u0437\u0430\u0440\u044F\u0436\u0430\u0435\u0442\u0441\u044F \u0434\u043E +60% \u0443\u0440\u043E\u043D\u0430.":"A long gun: the further the target, the harder it hits. The scope zooms in, and a scoped shot charges up to +60% damage.","\u043A\u0440\u0443\u0433\u043B\u044B\u0439 \u0442\u0430\u043D\u043A":"round tank",\u041F\u0440\u044B\u0433\u0443\u043D:"Bouncer","\u042F\u0434\u0440\u043E-\u043A\u0430\u0442\u0443\u043D":"Rolling Ball","\u0421\u043D\u0430\u0440\u044F\u0434\u044B \u043E\u0442\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u044E\u0442 \u043E\u0442 \u043A\u0443\u0441\u0442\u043E\u0432 \u0438 \u0434\u043E\u0441\u0442\u0430\u044E\u0442 \u0432\u0440\u0430\u0433\u0430 \u0437\u0430 \u0443\u0433\u043B\u043E\u043C.":"Shells bounce off hedges and reach enemies around corners.","\u043E\u0433\u0440\u043E\u043C\u043D\u043E\u0435 \u044F\u0434\u0440\u043E \u0434\u043E\u043B\u0433\u043E \u0441\u043A\u0430\u0447\u0435\u0442 \u043F\u043E \u043A\u043E\u0440\u0438\u0434\u043E\u0440\u0430\u043C \u0438 \u0431\u044C\u0451\u0442 \u0432\u0441\u0435\u0445 \u043D\u0430 \u043F\u0443\u0442\u0438":"a huge ball bounces through the corridors for a long time, hitting everyone in its way","\u043B\u0451\u0433\u043A\u0438\u0439 \u0442\u0430\u043D\u043A":"light tank",\u041E\u0447\u0435\u0440\u0435\u0434\u044C:"Burst","\u0421\u043F\u0430\u0440\u0435\u043D\u043D\u0430\u044F \u0430\u0432\u0442\u043E\u043F\u0443\u0448\u043A\u0430 \u0431\u044C\u0451\u0442 \u043E\u0447\u0435\u0440\u0435\u0434\u044F\u043C\u0438. \u0414\u0435\u0440\u0436\u0438 \u043A\u043D\u043E\u043F\u043A\u0443 \u2014 \u0440\u0430\u0437\u0431\u0440\u043E\u0441 \u0440\u0430\u0441\u0442\u0451\u0442, \u0441\u0442\u0440\u0435\u043B\u044F\u0439 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u043C\u0438 \u043E\u0447\u0435\u0440\u0435\u0434\u044F\u043C\u0438.":"Twin autocannons fire in bursts. Hold the trigger and the spread grows: fire in short bursts.",\u0421\u0443\u043F\u0435\u0440:"Super","\u041F\u041A\u041C \xB7 E":"RMB \xB7 E","\u0412\u043E\u0437\u0440\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437":"Respawn in","\u0429\u0451\u043B\u043A\u043D\u0438 \u043F\u043E \u043F\u043E\u043B\u044E, \u0447\u0442\u043E\u0431\u044B \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u043C\u044B\u0448\u044C\u044E":"Click the field to aim with the mouse","\u0421\u043E\u0431\u0435\u0440\u0438 10 \u0441\u043F\u043E\u0440 \u0438 \u0443\u0434\u0435\u0440\u0436\u0438 \u0438\u0445 15 \u0441\u0435\u043A\u0443\u043D\u0434":"Collect 10 spores and hold them for 15 seconds",\u0422\u044B:"You","\u0421\u0440\u0435\u0437\u0430\u043B!":"Knocked out!","\u0422\u0435\u0431\u044F \u0441\u0440\u0435\u0437\u0430\u043B\u0438":"You got knocked out","\u0421\u043F\u043E\u0440\u044B \u0443 \u043D\u0430\u0441!":"We have the spores!","\u0414\u0435\u0440\u0436\u0438\u0442\u0435\u0441\u044C 15 \u0441\u0435\u043A\u0443\u043D\u0434":"Hold on for 15 seconds","\u0412\u0440\u0430\u0433 \u043D\u0430\u0431\u0440\u0430\u043B \u0441\u043F\u043E\u0440\u044B!":"The enemy has the spores!","\u041E\u0442\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0445!":"Take them back!","\u041E\u0442\u0441\u0447\u0451\u0442 \u0441\u0431\u0440\u043E\u0448\u0435\u043D":"Countdown reset","\u0414\u0435\u0440\u0436\u0438\u043C \u0441\u043F\u043E\u0440\u044B!":"Hold the spores!","\u0412\u0440\u0430\u0433 \u0443\u043D\u043E\u0441\u0438\u0442 \u0441\u043F\u043E\u0440\u044B!":"The enemy is running off with the spores!","\u041F\u043E\u0431\u0435\u0434\u0430!":"Victory!",\u041F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435:"Defeat",\u041D\u0438\u0447\u044C\u044F:"Draw","\u0415\u0449\u0451 \u0431\u043E\u0439":"Play again","\u0412 \u043C\u0435\u043D\u044E":"Menu","\u0422\u0432\u043E\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0443\u0434\u0435\u0440\u0436\u0430\u043B\u0430 \u0441\u043F\u043E\u0440\u044B.":"Your team held the spores.","\u0412\u0440\u0430\u0433\u0438 \u0443\u0434\u0435\u0440\u0436\u0430\u043B\u0438 \u0441\u043F\u043E\u0440\u044B.":"The enemies held the spores.","\u0412\u0440\u0435\u043C\u044F \u0432\u044B\u0448\u043B\u043E: ":"Time is up: ","\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0433\u0440\u0438\u0431":"Last Shroom","\u043A\u0430\u0436\u0434\u044B\u0439 \u0441\u0430\u043C \u0437\u0430 \u0441\u0435\u0431\u044F \xB7 10 \u0431\u043E\u0439\u0446\u043E\u0432 \u0432 \u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442\u0435, \u0442\u0443\u043C\u0430\u043D \u0441\u0436\u0438\u043C\u0430\u0435\u0442\u0441\u044F":"every fighter for themselves \xB7 10 fighters in a maze, the fog closes in","\u041E\u0441\u0442\u0430\u043D\u044C\u0441\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u043C! \u041B\u043E\u043C\u0430\u0439 \u044F\u0449\u0438\u043A\u0438 \u2014 \u0432 \u043D\u0438\u0445 \u0441\u0438\u043B\u0430":"Be the last one standing! Break crates to power up",\u0422\u0443\u043C\u0430\u043D:"Fog","\u0422\u0443\u043C\u0430\u043D \u0438\u0434\u0451\u0442":"Fog moving",\u0424\u0438\u043D\u0430\u043B:"Final","\u0422\u0443\u043C\u0430\u043D \u0441\u0433\u0443\u0449\u0430\u0435\u0442\u0441\u044F!":"The fog is closing in!","\u0414\u0435\u0440\u0436\u0438\u0441\u044C \u0431\u043B\u0438\u0436\u0435 \u043A \u0446\u0435\u043D\u0442\u0440\u0443":"Stay close to the middle","\u0422\u044B \u2014 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0433\u0440\u0438\u0431!":"You are the last shroom standing!","\u0422\u0435\u0431\u044F \u0441\u0440\u0435\u0437\u0430\u043B: ":"Knocked out by ","\u0422\u0435\u0431\u044F \u043D\u0430\u043A\u0440\u044B\u043B \u044F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0442\u0443\u043C\u0430\u043D.":"The poison fog got you.","\u041B\u0435\u0441\u043D\u043E\u0439 \u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442":"Forest Maze","\u0417\u0430\u0439\u043C\u0438 \u0443\u043A\u0440\u044B\u0442\u0438\u0435":"Find some cover","\u0422\u044B \u0432 \u0442\u043E\u043F-3!":"You are in the top 3!","\u041F\u0443\u0441\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0435\u0440\u0443\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C\u0438":"Let the others fight first","\u0424\u0438\u043D\u0430\u043B!":"Final!","\u041E\u0434\u0438\u043D \u043D\u0430 \u043E\u0434\u0438\u043D":"One on one",\u041E\u0447\u043A\u0438:"Points",\u0432\u0441\u0435\u0433\u043E:"total",\u0413\u0440\u0443\u0437\u0434\u044C:"Milkcap",\u041E\u043F\u0451\u043D\u043E\u043A:"Honeycap",\u0421\u043C\u043E\u0440\u0447\u043E\u043A:"Morel",\u0420\u044B\u0436\u0438\u043A:"Saffron",\u041C\u0430\u0441\u043B\u0451\u043D\u043E\u043A:"Butterball",\u0412\u043E\u043B\u043D\u0443\u0448\u043A\u0430:"Woolly",\u0421\u0442\u0440\u043E\u0447\u043E\u043A:"Brainy",\u0411\u0435\u043B\u044F\u043D\u043A\u0430:"Whitey",\u0415\u0436\u043E\u0432\u0438\u043A:"Hedgehog",\u0414\u0443\u0431\u043E\u0432\u0438\u043A:"Oakcap",\u0412\u0435\u0448\u0435\u043D\u043A\u0430:"Oyster",\u041A\u043E\u0440\u043E\u0435\u0434:"Bark Beetle",\u0428\u0435\u0440\u0448\u0435\u043D\u044C:"Hornet",\u0416\u0443\u0436\u0435\u043B\u0438\u0446\u0430:"Ground Beetle",\u0429\u0435\u043B\u043A\u0443\u043D:"Clicker",\u0420\u0436\u0430\u0432\u0447\u0438\u043A:"Rusty",\u0413\u0430\u0435\u0447\u043A\u0430:"Nutty",\u0411\u043E\u043B\u0442\u0438\u043A:"Bolt",\u0428\u0435\u0441\u0442\u0435\u0440\u0451\u043D\u043A\u0430:"Gear",\u0411\u0430\u043C\u043F\u0435\u0440:"Bumper",\u0414\u0438\u0437\u0435\u043B\u044C:"Diesel",\u0422\u0440\u0430\u043A\u0442\u043E\u0440:"Tractor",\u041F\u043E\u0440\u0448\u0435\u043D\u044C:"Piston",\u041A\u0430\u0440\u0431\u044E\u0440\u0430\u0442\u043E\u0440:"Carb",\u041A\u043B\u0451\u043F\u043A\u0430:"Rivet",\u0411\u0440\u043E\u043D\u044F:"Armor",\u041F\u044B\u0445\u0442\u0443\u043D:"Puffer",\u0413\u0440\u043E\u043C\u044B\u0445\u0430\u043B\u043E:"Rumbler",\u0420\u044B\u0447\u0430\u0433:"Lever",\u0414\u043E\u043C\u043A\u0440\u0430\u0442:"Jack",\u0422\u0430\u0440\u0430\u0445\u0442\u0443\u043D:"Rattler",\u0411\u0443\u043A\u0441\u0438\u0440:"Tug",\u041A\u0430\u0442\u0443\u0448\u043A\u0430:"Spool",\u0421\u0432\u0435\u0442\u043B\u044F\u0447\u043E\u043A:"Firefly",\u041C\u0435\u0434\u0432\u0435\u0434\u043A\u0430:"Mole Cricket",\u0414\u043E\u043B\u0433\u043E\u043D\u043E\u0441\u0438\u043A:"Weevil"};var NE=["ru","be","kk","uk","uz","ky","tg","hy","az"],ti={lang:"ru",set:!1},dc=n=>NE.includes(String(n||"").slice(0,2).toLowerCase())?"ru":"en";ti.lang=(()=>{try{let n=new URLSearchParams(location.search).get("lang");if(n)return dc(n)}catch{}return dc(navigator.language||"ru")})();var Cd=/[А-Яа-яЁё]/,Rd=null;function Mt(n){if(ti.lang!=="en"||!n||!Cd.test(n))return n;if(_a[n]!==void 0)return _a[n];if(!Rd){let e=Object.keys(_a).sort((t,i)=>i.length-t.length).map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));Rd=new RegExp("(?<![\u0410-\u042F\u0430-\u044F\u0401\u0451])(?:"+e.join("|")+")(?![\u0410-\u042F\u0430-\u044F\u0401\u0451])","g")}return n.replace(Rd,e=>_a[e])}function uc(n){if(n.nodeType===3){let e=n.nodeValue;if(Cd.test(e)){let t=Mt(e);t!==e&&(n.nodeValue=t)}return}if(n.nodeType===1){for(let e of["title","placeholder","aria-label"]){let t=n.getAttribute(e);t&&Cd.test(t)&&n.setAttribute(e,Mt(t))}for(let e=n.firstChild;e;e=e.nextSibling)uc(e)}}var lo=null;function fc(n){if(n&&(ti.lang=n),ti.set=!0,document.documentElement.lang=ti.lang,ti.lang!=="en"){lo&&(lo.disconnect(),lo=null);return}document.title=Mt(document.title),uc(document.body),lo||(lo=new MutationObserver(e=>{for(let t of e)if(t.type==="characterData")uc(t.target);else for(let i of t.addedNodes)uc(i)}),lo.observe(document.body,{subtree:!0,childList:!0,characterData:!0}))}var y={state:"load",time:0,fighters:[],me:null,shots:[],lobs:[],beams:[],puddles:[],pickups:[],match:null,shake:0,paused:!1,hooks:{}};function ft(n,...e){let t=y.hooks[n];if(t)for(let i of t)i(...e)}function Dt(n,e){(y.hooks[n]||(y.hooks[n]=[])).push(e)}var gc=class{constructor(e,t){this.max=e,this.n=0;let i=new Gt(1,1),s=new Ol;s.index=i.index,s.setAttribute("position",i.attributes.position),s.setAttribute("uv",i.attributes.uv),this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e*2),s.setAttribute("iPos",new Si(this.pos,3).setUsage(ql)),s.setAttribute("iCol",new Si(this.col,4).setUsage(ql)),s.setAttribute("iSize",new Si(this.size,2).setUsage(ql)),s.instanceCount=0,this.geo=s;let r=new yt({transparent:!0,depthWrite:!1,blending:t?un:Ii,vertexShader:`attribute vec3 iPos; attribute vec4 iCol; attribute vec2 iSize; varying vec4 vCol; varying vec2 vUv; varying float vSoft;
        void main(){ vCol = iCol; vUv = uv; vSoft = iSize.y;
          vec4 mv = modelViewMatrix * vec4(iPos, 1.0); mv.xy += position.xy * min(iSize.x, max(-mv.z, 0.1) * 0.22); gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec4 vCol; varying vec2 vUv; varying float vSoft;
        void main(){ float d = length(vUv - 0.5) * 2.0; float a = clamp(1.0 - d, 0.0, 1.0); a = vSoft > 0.5 ? a * a : smoothstep(0.0, 0.25, a);
          gl_FragColor = vec4(vCol.rgb, vCol.a * a);
          #include <colorspace_fragment>
        }`});this.mesh=new ne(s,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=5,ce.add(this.mesh),this.p=[]}emit(e){this.p.length>=this.max&&this.p.shift(),this.p.push(e)}update(e){let t=this.p,i=0;for(let s=0;s<t.length;s++){let r=t[s];if(r.t+=e,r.t>=r.life)continue;r.vy-=r.grav*e;let o=Math.exp(-r.drag*e);r.vx*=o,r.vy*=o,r.vz*=o,r.x+=r.vx*e,r.y+=r.vy*e,r.z+=r.vz*e,r.y<.02&&r.grav>0&&(r.y=.02,r.vy*=-.3,r.vx*=.7,r.vz*=.7);let a=r.t/r.life;this.pos[i*3]=r.x,this.pos[i*3+1]=r.y,this.pos[i*3+2]=r.z,this.col[i*4]=r.r,this.col[i*4+1]=r.g,this.col[i*4+2]=r.b,this.col[i*4+3]=r.a*(a<.1?a/.1:1-Math.pow((a-.1)/.9,1.6)),this.size[i*2]=r.s0+(r.s1-r.s0)*a,this.size[i*2+1]=r.soft,t[i++]=r}t.length=i,this.geo.instanceCount=i;for(let s of["iPos","iCol","iSize"])this.geo.attributes[s].needsUpdate=!0}clear(){this.p.length=0,this.geo.instanceCount=0}},Et=new gc(900,!0),on=new gc(500,!1),pc=new te;function pt(n,e,t,i,s){pc.set(s.color||"#fff");let r=ct?Math.ceil((s.n||1)*.6):s.n||1,o=ct?.85:1;for(let a=0;a<r;a++){let l=D(0,Pe),c=D(s.upMin??-.3,s.upMax??1),h=D(s.spMin??0,s.sp??2),d=s.jitter?D(1-s.jitter,1+s.jitter):1;n.emit({x:e+D(-1,1)*(s.spread||0),y:t+D(-1,1)*(s.spreadY??s.spread??0),z:i+D(-1,1)*(s.spread||0),vx:Math.cos(l)*h*Math.sqrt(1-c*c*.5)+(s.vx||0),vy:c*h+(s.vy||0),vz:Math.sin(l)*h*Math.sqrt(1-c*c*.5)+(s.vz||0),life:D(s.life*.7,s.life*1.3),t:0,s0:s.s0*o*D(.8,1.2),s1:(s.s1??s.s0)*o*D(.8,1.2),r:pc.r*d,g:pc.g*d,b:pc.b*d,a:s.a??1,grav:s.grav||0,drag:s.drag??2,soft:s.soft?1:0})}}var s0=new Ss(.82,1,40);s0.rotateX(-Math.PI/2);var r0=new Vn(1,28);r0.rotateX(-Math.PI/2);var co=[];function Oi(n,e,t,i,s,r,o=.06){let a=new ne(s0,new Fe({color:r,transparent:!0,depthWrite:!1,blending:un}));a.position.set(n,o,e),a.renderOrder=4,ce.add(a),co.push({m:a,r0:t,r1:i,life:s,t:0})}var kE=(()=>{let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,4,64,64,62);t.addColorStop(0,"rgba(20,14,8,.85)"),t.addColorStop(.6,"rgba(30,22,10,.5)"),t.addColorStop(1,"rgba(30,22,10,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);for(let s=0;s<14;s++){let r=D(0,Pe);e.strokeStyle="rgba(20,14,8,.4)",e.lineWidth=D(2,5),e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.cos(r)*D(40,62),64+Math.sin(r)*D(40,62)),e.stroke()}let i=new vn(n);return i.colorSpace=gt,i})(),zs=[];function OE(n,e,t){let i=new ne(r0,new Fe({map:kE,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));if(i.position.set(n,.035,e),i.scale.setScalar(t),i.rotation.y=D(0,Pe),i.renderOrder=1,ce.add(i),zs.push({m:i,t:0,life:6}),zs.length>14){let s=zs.shift();ce.remove(s.m),s.m.material.dispose()}}var mc=new P,ho=[];function ya(n,e,t,i,s){let r=document.createElement("div");r.className="dnum "+(s||""),r.textContent=s==="heal"?"+"+Math.round(i):Math.round(i),J("hud-world").appendChild(r),ho.push({el:r,x:n+D(-.3,.3),y:e,z:t+D(-.3,.3),t:0,life:.9})}function o0(n){Et.update(n),on.update(n);for(let i=co.length-1;i>=0;i--){let s=co[i];s.t+=n;let r=s.t/s.life;if(r>=1){ce.remove(s.m),s.m.material.dispose(),co.splice(i,1);continue}let o=1-Math.pow(1-r,3);s.m.scale.setScalar(s.r0+(s.r1-s.r0)*o),s.m.material.opacity=1-r}for(let i=zs.length-1;i>=0;i--){let s=zs[i];s.t+=n,s.m.material.opacity=Math.min(1,(s.life-s.t)/1.5),s.t>s.life&&(ce.remove(s.m),s.m.material.dispose(),zs.splice(i,1))}let e=innerWidth,t=innerHeight;for(let i=ho.length-1;i>=0;i--){let s=ho[i];if(s.t+=n,s.t>s.life){s.el.remove(),ho.splice(i,1);continue}if(mc.set(s.x,s.y+s.t*1.2,s.z).project(Be),mc.z>1){s.el.style.opacity=0;continue}let r=s.t/s.life,o=r<.15?.6+r/.15*.7:1.3-Math.min(.3,(r-.15)*1.2);s.el.style.transform=`translate(${(mc.x*.5+.5)*e}px,${(-mc.y*.5+.5)*t}px) translate(-50%,-50%) scale(${o.toFixed(2)})`,s.el.style.opacity=r>.7?(1-r)/.3:1}}function Pd(){Et.clear(),on.clear();for(let n of co)ce.remove(n.m),n.m.material.dispose();co.length=0;for(let n of zs)ce.remove(n.m),n.m.material.dispose();zs.length=0;for(let n of ho)n.el.remove();ho.length=0}function xc(n,e,t,i="#FF9A2E"){pt(Et,n,.4,e,{n:14,color:"#FFE6A0",sp:t*4.5,upMin:.1,upMax:1,life:.35,s0:.45,s1:.1,drag:4}),pt(Et,n,.5,e,{n:6,color:i,sp:t*2,upMin:.2,life:.45,s0:t*.8,s1:t*.3,drag:3,soft:!0,a:.85}),pt(on,n,.5,e,{n:6,color:"#5A5048",sp:t*1.5,upMin:.2,life:1,s0:t*.55,s1:t*1.2,drag:2.5,soft:!0,a:.5,vy:.8,jitter:.2}),pt(on,n,.2,e,{n:6,color:"#6B4A2E",sp:5,upMin:.5,life:.8,s0:.12,s1:.08,grav:14,drag:.5}),Oi(n,e,.3,t*1.15,.4,i),OE(n,e,t*.9),y.shake=Math.max(y.shake,.35)}function uo(n,e,t,i){pt(Et,n,e,t,{n:8,color:i,sp:5,life:.25,s0:.22,s1:.04,drag:5}),pt(Et,n,e,t,{n:1,color:"#FFFFFF",sp:0,life:.12,s0:.9,s1:.3,soft:!0,a:.8})}function cs(n,e,t,i,s=30){pt(Et,n,e,t,{n:s,color:i,sp:4,life:.9,s0:.3,s1:.05,drag:2.5,grav:-1,soft:!0,jitter:.3}),pt(on,n,e,t,{n:12,color:"#F4F0E0",sp:2.5,life:1,s0:.4,s1:.9,drag:3,soft:!0,a:.6,vy:.6})}function a0(n,e,t=3){pt(on,n,.08,e,{n:t,color:"#D9C49A",sp:.8,upMin:.2,life:.5,s0:.15,s1:.4,drag:3,soft:!0,a:.35})}var BE={me:"#FFD23F",ally:"#4FC3FF",foe:"#FF4D4D"},HE=(()=>{let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d");e.strokeStyle="#fff",e.lineWidth=9,e.beginPath(),e.arc(64,64,52,0,Pe),e.stroke(),e.globalAlpha=.25,e.fillStyle="#fff",e.beginPath(),e.arc(64,64,50,0,Pe),e.fill();let t=new vn(n);return t.colorSpace=gt,t})(),Id=new Gt(1.6,1.6);Id.rotateX(-Math.PI/2);var GE=(()=>{let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d"),t=e.createRadialGradient(32,32,4,32,32,31);return t.addColorStop(0,"rgba(0,0,0,.55)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new vn(n)})(),VE=new Fe({map:GE,transparent:!0,depthWrite:!1}),WE=Gm(.03),Ld=new WeakMap;function XE(n){if(!Ld.has(n)){let e=new vt;e.setAttribute("position",n.attributes.position);let t=nc(e,.001);t.computeVertexNormals(),Ld.set(n,t)}return Ld.get(n)}var l0=new Ot(1,14,10),qE=new Fe({color:"#FFFFFF"}),YE=new Fe({color:"#16121C"});function Ma(n){let e=qm(n),t=Hm(),i=Vm("#FFFFFF"),s=new xt,r=new xt,o=new xt,a=new xt,l=new xt;s.add(r),r.add(o),o.add(a),a.add(l),o.position.fromArray(e.turretPos),a.position.fromArray(e.barrelPos);let c=[],h=[],d=(p,v)=>{let _=new ne(p,t);_.castShadow=!0,_.renderOrder=2,v.add(_),h.push(_);let M=new ne(XE(p),WE);M.renderOrder=2,M.visible=!ct,v.add(M),c.push(M);let S=new ne(p,i);return S.renderOrder=1,v.add(S),_};if(d(e.hull,r),d(e.turret,o),d(e.barrel,l),e.extra)for(let[p,v]of e.extra)d(p,v==="turret"?o:v==="barrel"?l:r);let u=new Rt;u.position.fromArray(e.muzzle),l.add(u);let f=new xt;f.position.fromArray(e.eyes),o.add(f);let g=[];for(let p of[-1,1]){let v=new ne(l0,qE);v.scale.setScalar(e.eyeR),v.position.set(p*e.eyeSep,0,0),f.add(v);let _=new ne(l0,YE);_.scale.setScalar(e.eyeR*.55),_.position.set(p*e.eyeSep,0,e.eyeR*.62),f.add(_),g.push(_)}let x=new ne(Id,new Fe({map:HE,transparent:!0,depthWrite:!1,color:"#fff",opacity:.9}));x.position.y=.03,x.renderOrder=1,s.add(x);let m=new ne(Id,VE);return m.position.y=.025,m.scale.setScalar(.95),m.renderOrder=1,s.add(m),{id:n,H:Qn[n],root:s,hull:r,turret:o,barrel:a,recoil:l,eyes:f,pupils:g,mesh:h[0],meshes:h,mat:t,silMat:i,ring:x,blob:m,muzzle:u,P:e,ol:{get visible(){return c[0].visible},set visible(p){for(let v of c)v.visible=p}},yaw:0,hullYaw:0,track:0,blink:2,lastDust:0,popTurret:null,sp:{kick:rs(),pitch:rs(),roll:rs(),squash:rs(),pop:rs(1),lift:rs(),elev:rs(),spin:rs()},prevVX:0,prevVZ:0}}function vc(n){n.mat.dispose(),n.silMat.dispose()}function _c(n,e){n.ring.material.color.set(BE[e]),n.silMat.color.set(e==="foe"?"#FF3B3B":e==="me"?"#FFE58A":"#7FD8FF")}function yc(n,e,t,i){let s=n.sp,r=n.H,o=n.root;if(!e.alive){let S=e.deadT;n.popTurret||(n.popTurret={vy:6.5,vx:D(-1.5,1.5),vz:D(-1.5,1.5),spin:D(-9,9),y:0},n.mat.userData.u.uTint.value.setRGB(-.35,-.38,-.4));let b=n.popTurret;b.vy-=18*t,b.y=Math.max(0,b.y+b.vy*t),n.turret.position.set(n.P.turretPos[0]+b.vx*Math.min(S,.7),n.P.turretPos[1]+b.y,n.P.turretPos[2]+b.vz*Math.min(S,.7)),n.turret.rotation.set(Math.min(S,.7)*b.spin*.25,n.turret.rotation.y+b.spin*t*(b.y>0?1:0),Math.min(S,.7)*.6),o.position.set(e.x,-Math.max(0,S-.9)*.6,e.z),n.ring.visible=!1,n.blob.visible=!1,Math.random()<t*12&&S<2&&pt(on,e.x+D(-.3,.3),.6,e.z+D(-.3,.3),{n:1,color:"#2A2622",sp:.4,vy:1.6,life:1.2,s0:.35,s1:.9,drag:.6,soft:!0,a:.7}),Math.random()<t*8&&S<1.2&&pt(Et,e.x,.5,e.z,{n:1,color:"#FF8A2E",sp:.6,vy:1.2,life:.4,s0:.25,s1:.05,soft:!0}),o.visible=S<2.2;return}n.popTurret&&(n.popTurret=null,n.turret.position.fromArray(n.P.turretPos),n.turret.rotation.set(0,0,0),n.mat.userData.u.uTint.value.setRGB(0,0,0)),n.ring.visible=!0,n.blob.visible=!de.shadows;let a=Math.hypot(e.vx,e.vz),l=a>.4;if(l){let S=Math.atan2(e.vx,e.vz),b=tr(n.hullYaw,S);n.hullYaw+=$e(b,-t*7,t*7)}let c=(e.vx-n.prevVX)/Math.max(t,.001),h=(e.vz-n.prevVZ)/Math.max(t,.001);n.prevVX=e.vx,n.prevVZ=e.vz;let d=Math.cos(n.hullYaw),u=Math.sin(n.hullYaw),f=c*u+h*d,g=c*d-h*u;ss(s.pitch,$e(-f*.012,-.12,.12),140,10,t),ss(s.roll,$e(g*.01,-.1,.1),140,10,t),ss(s.kick,0,220,14,t),ss(s.squash,0,260,12,t),ss(s.pop,1,220,12,t),ss(s.lift,0,80,11,t),ss(s.elev,n.P.restElev||0,90,12,t),ss(s.spin,0,40,8,t),n.track+=a*t;let x=l?Math.sin(n.track*9)*.012:Math.sin(i*30+e.id)*.003;if(n.hull.rotation.set(s.pitch.x-s.kick.x*.06,n.hullYaw,s.roll.x,"YXZ"),n.hull.position.y=x+s.lift.x,n.hull.scale.set(1+s.squash.x*.06,1-s.squash.x*.1,1+s.squash.x*.06),o.position.set(e.x,0,e.z),o.rotation.set(0,0,0),l&&i-n.lastDust>.09&&!e.inGrass){n.lastDust=i;let S=e.x-u*n.P.len*.5,b=e.z-d*n.P.len*.5;pt(on,S+d*.35,.12,b-u*.35,{n:1,color:"#C9B48C",sp:.5,vy:.5,life:.6,s0:.18,s1:.4,drag:2,soft:!0,a:.45}),pt(on,S-d*.35,.12,b+u*.35,{n:1,color:"#C9B48C",sp:.5,vy:.5,life:.6,s0:.18,s1:.4,drag:2,soft:!0,a:.45})}f>8&&Math.random()<t*20&&pt(on,e.x-u*n.P.len*.55,.55,e.z-d*n.P.len*.55,{n:1,color:"#5A5A5E",sp:.3,vy:1,life:.6,s0:.12,s1:.35,drag:1,soft:!0,a:.5});let p=e.atkT<.6||e.supT<.9||e.aiming||!l?e.aim:n.hullYaw;n.yaw+=$e(tr(n.yaw,p),-t*12,t*12),n.turret.rotation.y=tr(n.hullYaw,n.yaw)+s.spin.x;let v=r.attack.kind,_=s.elev.x;if(v==="lob"&&e.atkT<.5&&(_+=Math.sin(Math.min(1,e.atkT/.5)*Math.PI)*.6),e.scope&&(_+=.02),n.barrel.rotation.x=-_,n.recoil.position.z=-Math.max(0,s.kick.x)*.045,e.frenzyT>0?n.recoil.rotation.z=Math.sin(i*60)*.06:n.recoil.rotation.z=0,e.supT<1.2){let S=e.supT;if(n.id==="shroom"){let b=S<.1?S/.1:Math.max(0,1-(S-.1)/.3);n.hull.position.y-=b*.06}else if(n.id==="beetle")n.barrel.rotation.x-=Math.sin(Math.min(1,S/.9)*Math.PI)*.7;else if(n.id==="wasp"){let b=r.super.windup,R=S<b?S/b:Math.max(0,1-(S-b)/.4);n.hull.position.y+=R*.08,n.mat.userData.u.uTint.value.setRGB(.5,.38,.05).multiplyScalar(S<b?S/b:0)}}else n.id==="wasp"&&n.mat.userData.u.uTint.value.setRGB(0,0,0);if(e.victory){let S=Math.abs(Math.sin(i*5+e.id));o.position.y=S*.35,n.turret.rotation.y+=i*4,n.barrel.rotation.x=-.4-Math.sin(i*8)*.15}else e.defeat&&(n.barrel.rotation.x=.25);n.blink-=t;let M=n.blink<0||e.flash>.5;n.eyes.scale.y=M?.15:1,n.blink<-.12&&(n.blink=1.8+Math.random()*3.5),n.mat.userData.u.uFlash.value=Math.max(0,e.flash)*.55,o.scale.setScalar(Math.max(.01,s.pop.x)),o.visible=!0}var Us={attack(n){n.sp.kick.v+=n.id==="shroom"?26:n.id==="wasp"?30:n.id==="hopper"?6:16,n.sp.pitch.v-=.8},super(n){n.sp.kick.v+=34,n.sp.squash.v+=4,n.sp.pitch.v-=1.6,n.id==="roly"&&(n.sp.spin.v+=22)},hurt(n){n.sp.squash.v+=3,n.sp.roll.v+=(Math.random()-.5)*3},spawn(n){n.sp.pop.x=.05,n.sp.pop.v=0,n.sp.lift.x=1.2,n.sp.lift.v=-2},land(n){n.sp.squash.v-=4}};var De={ctx:null,master:null,sfxGain:null,music:null,buffers:{},muted:_t.get("muted",!1),musicOn:_t.get("music",!0),sfxOn:_t.get("sfx",!0),noise:null,ad:!1},h0=["shot_shotgun","shot_pop","shot_beam","shot_throw","boom","boom_big","hit","hit2","hit_wall","hurt","die","super_ready","super","gem","gem_drop","heal","empty","click","select","confirm","step","rustle","countdown","start","win","lose","respawn","kill"],Ud={};function u0(){return Promise.all(h0.map(n=>fetch("assets/sfx/"+n+".mp3").then(e=>e.arrayBuffer()).then(e=>{Ud[n]=e}).catch(()=>{})))}function fo(){if(De.ctx){De.ctx.state==="suspended"&&!De.ad&&!document.hidden&&De.ctx.resume();return}try{let n=new(window.AudioContext||window.webkitAudioContext);De.ctx=n;let e=n.createDynamicsCompressor();e.threshold.value=-10,e.knee.value=12,e.ratio.value=3,e.attack.value=.005,e.release.value=.2,e.connect(n.destination),De.master=n.createGain(),De.master.gain.value=De.muted?0:.8,De.master.connect(e),De.sfxGain=n.createGain(),De.sfxGain.gain.value=De.sfxOn?1:0,De.sfxGain.connect(De.master),De.noise=n.createBuffer(1,n.sampleRate,n.sampleRate);let t=De.noise.getChannelData(0);for(let i=0;i<t.length;i++)t[i]=Math.random()*2-1;for(let i of h0)Ud[i]&&n.decodeAudioData(Ud[i].slice(0),s=>{De.buffers[i]=s},()=>{});$E()}catch{De.ctx=null}}function d0(n){De.sfxOn=n,_t.set("sfx",n),De.sfxGain&&(De.sfxGain.gain.value=n?1:0)}function f0(n){De.musicOn=n,_t.set("music",n),an.gain&&(an.gain.gain.value=n?an.vol:0)}function bc(n){if(De.ctx)try{n?De.ctx.suspend():De.ctx.resume()}catch{}}var Fd={},Dd=0,ZE={shot_shotgun:.55,shot_pop:.4,shot_beam:.45,shot_throw:.7,boom:.75,boom_big:.95,hit:.6,hit2:.5,hit_wall:.35,hurt:.55,die:.7,super_ready:.5,super:.55,gem:.45,gem_drop:.45,heal:.3,empty:.4,click:.5,select:.5,confirm:.5,step:.18,rustle:.35,countdown:.6,start:.8,win:.7,lose:.7,respawn:.4,kill:.55};function Se(n,e,t=1,i=1){let s=De.ctx;if(!s||De.muted||!De.sfxOn)return;let r=De.buffers[n];if(!r)return;let o=performance.now();if(Fd[n]&&o-Fd[n]<70||(Fd[n]=o,Dd>=12))return;let a=(ZE[n]||.5)*t,l=0;if(e&&e!==y.me){let d=y.me&&y.me.alive?y.me.x:Be.position.x,u=y.me&&y.me.alive?y.me.z:Be.position.z,f=e.x-d,g=e.z-u,x=Math.hypot(f,g);if(a*=$e(1.4/(1+x*.12),0,1),a<.03)return;let m=Be.rotation.y;l=$e((f*Math.cos(m)-g*Math.sin(m))/(x+4),-.7,.7)}let c=s.createBufferSource();c.buffer=r,c.playbackRate.value=i;let h=s.createGain();if(h.gain.value=a,c.connect(h),l&&s.createStereoPanner){let d=s.createStereoPanner();d.pan.value=l,h.connect(d),d.connect(De.sfxGain)}else h.connect(De.sfxGain);Dd++,c.onended=()=>Dd--,c.start()}var an={gain:null,next:0,step:0,timer:null,vol:.11},zd=n=>440*Math.pow(2,(n-69)/12),KE=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]];function Mc(n,e,t,i,s,r){let o=De.ctx,a=o.createOscillator(),l=o.createGain();return a.type=e,a.frequency.setValueAtTime(t,n),l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+(r||.01)),l.gain.exponentialRampToValueAtTime(1e-4,n+(r||.01)+s),a.connect(l),l.connect(an.gain),a.start(n),a.stop(n+s+.2),a}function c0(n,e,t,i,s){let r=De.ctx,o=r.createBufferSource();o.buffer=De.noise;let a=r.createBiquadFilter();a.type=e,a.frequency.value=t;let l=r.createGain();l.gain.setValueAtTime(1e-4,n),l.gain.exponentialRampToValueAtTime(i,n+.004),l.gain.exponentialRampToValueAtTime(1e-4,n+s),o.connect(a),a.connect(l),l.connect(an.gain),o.start(n,Math.random()*.5),o.stop(n+s+.05)}function $E(){if(an.timer)return;an.gain=De.ctx.createGain(),an.gain.gain.value=De.musicOn?an.vol:0;let n=De.ctx.createBiquadFilter();n.type="lowpass",n.frequency.value=2400,n.Q.value=.5,an.gain.connect(n),n.connect(De.master),an.next=De.ctx.currentTime+.15,an.timer=setInterval(JE,90)}function JE(){let n=De.ctx;if(!n||!De.musicOn||De.muted||n.state!=="running"){n&&(an.next=Math.max(an.next,n.currentTime+.05));return}let e=y.state==="play"||y.state==="countdown",t=e&&y.match&&y.match.hot,i=60/(e?t?142:128:96)/2;for(;an.next<n.currentTime+.35;){let s=an.next,r=an.step,o=Math.floor(r/8)%4,a=r%8,l=KE[o],c=l[[0,1,2,1,2,1,0,2][a]]+12+(a===4&&o%2?12:0);if((!e||a%2===0||t)&&Mc(s,"triangle",zd(c),e?.035:.045,e?.14:.3),(a===0||e&&a===4)&&Mc(s,"triangle",zd(l[0]-12),e?.12:.07,i*(e?3.4:7),.02),!e&&a===0)for(let h of l)Mc(s,"sine",zd(h),.016,i*7.6,.5);e&&(a%4===0&&Mc(s,"sine",130,.3,.16,.003).frequency.exponentialRampToValueAtTime(45,s+.14),a%4===2&&c0(s,"bandpass",1900,.1,.12),c0(s,"bandpass",6e3,a%2?.008:.016,.03)),an.next+=i,an.step++}}var Wt={fighters:10,wait:25,shrink:120,r1:3.5,dps:650,dpsGrow:6,hp:1.6,dmg:.75,calm:40,power:{dmg:.1,hp:400}},jE=n=>n>=8?.75:n>=6?1:n>=4?1.5:n===3?2.2:3,On={group:null,wall:null,floor:null,u:{uR:{value:40},uTime:{value:0}}},p0="varying vec3 vW; varying vec2 vUv; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",m0=`float h(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
  float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }`;function v0(){let n=new xt,e=new ne(new Vt(1,1,1,ct?48:96,1,!0).translate(0,.5,0),new yt({transparent:!0,depthWrite:!1,side:zt,uniforms:On.u,vertexShader:p0,fragmentShader:`uniform float uTime; varying vec3 vW; varying vec2 vUv; ${m0}
      void main(){ float a = atan(vW.z, vW.x) * 9.0;
        float m = n(vec2(a, vW.y * 0.9 - uTime * 0.6)) * 0.6 + n(vec2(a * 2.3 + uTime * 0.3, vW.y * 2.0 - uTime)) * 0.4;
        float k = clamp(1.0 - vUv.y, 0.0, 1.0); k = k * k;
        vec3 col = mix(vec3(0.42, 0.85, 0.3), vec3(0.62, 0.35, 0.95), m);
        gl_FragColor = vec4(col * 1.2, clamp((0.25 + m * 0.6) * k + 0.08 * k, 0.0, 0.85));
        #include <colorspace_fragment>
      }`}));e.scale.set(40,6,40),e.renderOrder=4,e.frustumCulled=!1;let t=new ne(new Gt(140,140).rotateX(-Math.PI/2),new yt({transparent:!0,depthWrite:!1,uniforms:On.u,vertexShader:p0,fragmentShader:`uniform float uR; uniform float uTime; varying vec3 vW; ${m0}
      void main(){ float d = length(vW.xz); if(d < uR - 0.6) discard;
        float k = clamp((d - uR + 0.6) / 2.0, 0.0, 1.0);
        float m = n(vW.xz * 0.35 + vec2(uTime * 0.25, -uTime * 0.18)) * 0.7 + n(vW.xz * 1.1 - uTime * 0.4) * 0.3;
        vec3 col = mix(vec3(0.35, 0.75, 0.25), vec3(0.55, 0.3, 0.85), m);
        gl_FragColor = vec4(col, k * (0.32 + m * 0.3));
        #include <colorspace_fragment>
      }`}));t.position.y=.09,t.renderOrder=3,t.frustumCulled=!1,n.add(e,t),ce.add(n),Object.assign(On,{group:n,wall:e,floor:t})}function _0(){On.group&&(ce.remove(On.group),On.group.traverse(n=>{n.geometry&&(n.geometry.dispose(),n.material.dispose())}),On.group=null)}var Sc=new Pl(.24,0),y0=mt({color:"#FFC93C",emissive:"#FF9A1E",emissiveIntensity:1.3,roughness:.25,flatShading:!0}),M0=new Fe({color:new te("#FFF4C0").multiplyScalar(2),toneMapped:!1}),b0=new Gt(.7,.7).rotateX(-Math.PI/2),E0=new Fe({color:"#000",transparent:!0,opacity:.25,depthWrite:!1});function S0(n,e,t,i,s=4){let r=new ne(Sc,y0);r.castShadow=!ct;let o=new ne(Sc,M0);o.scale.setScalar(.45),r.add(o);let a=new ne(b0,E0);a.renderOrder=1,a.scale.setScalar(.6),ce.add(r,a),y.pickups.push({kind:"power",x:n,z:e,y:.6,vx:t,vz:i,vy:s,t:0,m:r,sh:a,landed:!1,ph:D(0,Pe)})}function QE(n){let e=y.pickups[n];ce.remove(e.m,e.sh),y.pickups.splice(n,1)}function w0(){let n=Math.hypot(U.hx,U.hz)+1.5;y.match={mode:"br",t:0,over:!1,winner:null,respawn:!1,count:[0,0],alive:Wt.fighters,place:0,fog:{r:n,r0:n,tick:0,shrinking:!1},crates:0},_0(),v0(),On.u.uR.value=n}function T0(){_0(),C0(0)}function eS(n,e=1){n.power=(n.power||0)+e;let t=Wt.power;n.pow=(n.pow0||1)*(1+t.dmg*n.power),n.max+=t.hp*e,n.hp=Math.min(n.max,n.hp+t.hp*e),(n===y.me||n.seen)&&ya(n.x,n.H.height+.3,n.z,t.hp*e,"heal")}Dt("kill",(n,e)=>{let t=y.match;if(!t||t.mode!=="br"||t.over)return;let i=Math.max(1,n.power||0);for(let s=0;s<i;s++){let r=s/i*Pe+D(-.3,.3),o=D(1.2,2.6);S0(n.x,n.z,Math.sin(r)*o,Math.cos(r)*o,D(3,5))}if(t.alive=y.fighters.filter(s=>s.alive).length,n.place=t.alive+1,n===y.me)return t.place=n.place,x0(-1,"out");if(t.alive<=1){let s=y.fighters.find(r=>r.alive);s&&(s.place=1,s===y.me&&(t.place=1)),x0(s?s.team:-1,"last")}});Dt("crateBreak",n=>{!y.match||y.match.mode!=="br"||(y.match.crates++,pt(on,n.x,.6,n.z,{n:14,color:"#A87645",sp:3,upMin:.4,vy:3,life:.7,s0:.25,s1:.08,grav:6,drag:1.5}),cs(n.x,.7,n.z,"#FFC93C",14),Se("hit_wall",n,1.3,.6),S0(n.x,n.z,D(-.6,.6),D(-.6,.6),5))});function A0(n,e,t){let i=Ti(n),s=Ai(e);if(ls(i,s)!=="C")return!1;let r=t0(i,s);return r?(Ad(r,t)&&ft("crateBreak",r),!0):!1}function Nd(n,e){Ad(n,e)&&ft("crateBreak",n)}function R0(n,e,t,i){for(let s of U.crates)s.alive&&Math.hypot(s.x-n,s.z-e)<t+.75&&Nd(s,i)}var Ec=null,g0=-1;function C0(n){Ec=Ec||document.getElementById("fogtint"),Ec&&(n=Math.round(n*20)/20,n!==g0&&(g0=n,Ec.style.opacity=n))}var P0=()=>y.match&&y.match.mode==="br"?y.match.fog.r:1e9;function L0(n){let e=y.match;if(!e||e.mode!=="br")return 1e9;let t=e.fog,i=Math.max(0,e.t+n-Math.max(e.t,Wt.wait));return Math.max(Wt.r1,t.r-I0(e)*i)}var I0=n=>(n.fog.r0-Wt.r1)/Wt.shrink*jE(n.alive),ba={x:0,z:0};function F0(n,e){let t=y.match;if(!t||t.mode!=="br")return;On.u.uTime.value=e,i0(n);let i=t.fog;if(y.state==="play"&&!t.over){t.t+=n;let r=i.shrinking;if(t.t>=Wt.wait&&(i.r=Math.max(Wt.r1,i.r-I0(t)*n)),i.shrinking=t.t>=Wt.wait&&i.r>Wt.r1,i.shrinking&&!r&&ft("fogStart"),i.tick-=n,i.tick<=0){i.tick=.5;let o=Wt.dps+Wt.dpsGrow*t.t;for(let a of y.fighters)a.alive&&Math.hypot(a.x,a.z)>i.r&&(a.inFog=(a.inFog||0)+1,ft("fogHurt",a,o*.5))}}On.u.uR.value=i.r,On.wall&&On.wall.scale.set(i.r,6,i.r);let s=y.me;if(C0(s&&s.alive&&Math.hypot(s.x,s.z)>i.r&&y.state!=="end"?.85:0),s&&s.alive&&Math.hypot(s.x,s.z)>i.r-3&&Math.random()<n*8){let r=D(0,Pe),o=D(1,4);pt(on,s.x+Math.sin(r)*o,D(.3,1.6),s.z+Math.cos(r)*o,{n:1,color:Math.random()<.5?"#8BD86A":"#A77CF0",sp:.3,vy:.3,life:1.4,s0:.5,s1:1.1,drag:.5,soft:!0,a:.35})}for(let r=y.pickups.length-1;r>=0;r--){let o=y.pickups[r];o.t+=n,o.landed||(o.vy-=16*n,o.x+=o.vx*n,o.z+=o.vz*n,o.y+=o.vy*n,ba.x=o.x,ba.z=o.z,ki(ba,.25)&&(o.x=ba.x,o.z=ba.z,o.vx*=-.4,o.vz*=-.4),o.y<.5&&(o.y=.5,Math.abs(o.vy)>2?(o.vy=-o.vy*.4,o.vx*=.6,o.vz*=.6):o.landed=!0));let a=o.landed?Math.sin(e*3+o.ph)*.08:0;if(o.m.position.set(o.x,o.y+a,o.z),o.m.rotation.y=e*2+o.ph,o.sh.position.set(o.x,.04,o.z),Math.random()<n*3&&Et.emit({x:o.x+D(-.2,.2),y:o.y,z:o.z+D(-.2,.2),vx:0,vy:.5,vz:0,life:.6,t:0,s0:.08,s1:.01,r:1,g:.8,b:.3,a:1,grav:0,drag:.5,soft:1}),!(o.t<.35||y.state!=="play")){for(let l of y.fighters)if(!(!l.alive||(l.x-o.x)**2+(l.z-o.z)**2>.9*.9)){QE(r),eS(l,1),pt(Et,l.x,1,l.z,{n:12,color:"#FFD45A",sp:2,vy:1.5,life:.45,s0:.18,s1:.02,soft:!0}),Oi(l.x,l.z,.3,1.2,.4,"#FFC93C"),Se("gem",l,l===y.me?1:.6,.85+Math.min(10,l.power)*.03),ft("power",l);break}}}}function x0(n,e){let t=y.match;t.over=!0,t.winner=n,t.why=e,ft("matchOver",n,e)}function D0(){v0();let n=[...On.group.children];ce.remove(On.group),On.group=null;let e=new ne(Sc,y0);return e.add(new ne(Sc,M0)),n.push(e,new ne(b0,E0)),n}var N0=new P,wc=new Gt(1,1),Rc=new Vt(1,.15,1,8,1,!0);Rc.rotateX(Math.PI/2);Rc.translate(0,0,-.5);var k0=n=>{let e=new te(n);return new P(e.r,e.g,e.b)},z0=n=>new yt({transparent:!0,depthWrite:!1,blending:un,toneMapped:!1,fog:!1,uniforms:{c:{value:k0(n)},a:{value:1}},vertexShader:"varying vec2 vU; void main(){ vU = uv - 0.5; float s = length(modelMatrix[0].xyz); vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); mv.xy += position.xy * s; gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 c; uniform float a; varying vec2 vU; void main(){ float d = length(vU) * 2.0; if(d >= 1.0) discard; float core = 1.0 - smoothstep(0.0, 0.42, d); float halo = pow(clamp(1.0 - d, 0.0, 1.0), 2.2); vec3 col = mix(c * halo * 1.6, vec3(1.3), core); gl_FragColor = vec4(col * a, 1.0); }"}),tS=n=>new yt({transparent:!0,depthWrite:!1,blending:un,toneMapped:!1,fog:!1,side:zt,uniforms:{c:{value:k0(n)}},vertexShader:"varying float vA; varying float vE; void main(){ vA = uv.y; vec4 mv = modelViewMatrix * vec4(position, 1.0); vec3 n = normalize(normalMatrix * normal); vE = abs(dot(n, normalize(-mv.xyz))); gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 c; varying float vA; varying float vE; void main(){ float e = clamp(vE, 0.0, 1.0), a = clamp(vA, 0.0, 1.0); float tail = smoothstep(0.0, 0.5, a); float core = pow(e, 6.0); vec3 col = c * pow(e, 1.3) * 1.3 + vec3(1.0) * core * 0.8; gl_FragColor = vec4(col * tail, 1.0); }"}),U0={},Tc=n=>U0[n]||(U0[n]={glow:z0(n),trail:tS(n),flash:z0(new te(n).lerp(new te("#FFFFFF"),.45).getStyle())}),O0=[];function B0(n,e,t,i=!0){let s=O0.pop();if(!s){s=new xt;let a=new ne(wc);a.frustumCulled=!1,a.renderOrder=7;let l=new ne(Rc);l.frustumCulled=!1,l.renderOrder=6,s.add(a,l),s.userData={glow:a,tr:l}}let r=Tc(n),o=s.userData;return o.glow.material=r.glow,o.tr.material=r.trail,o.glow.scale.setScalar(e),o.len=t,o.w=e*.42,o.tr.visible=i,o.tr.scale.set(.001,.001,.001),s.visible=!0,ce.add(s),s}function kd(n,e,t,i,s,r,o){n.position.set(e,t,i);let a=n.userData;if(!a.tr.visible)return;n.rotation.set(0,Math.atan2(s,r),0);let l=Math.max(.001,Math.min(a.len,o));a.tr.scale.set(a.w,a.w,l)}function Cc(n){ce.remove(n),O0.push(n)}var po=[],Od=[];function ks(n,e,t,i,s,r=.07){if(Be.position.distanceToSquared(N0.set(n,e,t))>2500)return;let o=Od.pop();o||(o=new ne(wc,Tc(i).flash.clone()),o.frustumCulled=!1,o.renderOrder=8),o.material.uniforms.c.value.copy(Tc(i).flash.uniforms.c.value),o.position.set(n,e,t),o.scale.setScalar(s),ce.add(o),po.push({m:o,t:r,T:r,s})}var Ac=new Gt(1,1),H0=n=>{let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),i=t.createRadialGradient(32,32,0,32,32,32);for(let[s,r]of n)i.addColorStop(s,r);return t.fillStyle=i,t.fillRect(0,0,64,64),new vn(e)},nS=H0([[0,"rgba(20,14,6,0.85)"],[.45,"rgba(30,22,10,0.55)"],[.8,"rgba(36,26,14,0.15)"],[1,"rgba(36,26,14,0)"]]),iS=H0([[0,"rgba(255,240,200,1)"],[.3,"rgba(255,170,60,0.85)"],[.7,"rgba(200,60,10,0.25)"],[1,"rgba(120,20,0,0)"]]),G0=new Fe({map:nS,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),V0=new Fe({map:iS,transparent:!0,depthWrite:!1,blending:un,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),Ns=[],sS=ct?12:24;function W0(n,e,t,i,s,r,o=.45){if(Be.position.distanceToSquared(N0.set(n,e,t))>1600)return;let a=Ns.length>=sS?Ns.shift():null;a||(a={burn:new ne(Ac,G0.clone()),ember:new ne(Ac,V0.clone())},a.burn.renderOrder=2,a.ember.renderOrder=3);let l=Math.random()*Math.PI*2;for(let c of[a.burn,a.ember])c.position.set(n+i*.04,e+s*.04,t+r*.04),c.lookAt(c.position.x+i,c.position.y+s,c.position.z+r),c.rotateZ(l),c.scale.setScalar(o*(c===a.ember?.75:1)),ce.add(c);a.t=0,Ns.push(a)}function X0(n){for(let e=po.length-1;e>=0;e--){let t=po[e];t.t-=n;let i=Math.max(0,t.t/t.T);t.m.scale.setScalar(t.s*(.6+.4*i)),t.m.material.uniforms.a.value=i,t.t<=0&&(ce.remove(t.m),Od.push(t.m),po.splice(e,1))}for(let e=Ns.length-1;e>=0;e--){let t=Ns[e];t.t+=n,t.ember.material.opacity=Math.max(0,1-t.t/.6),t.burn.material.opacity=Math.min(1,Math.max(0,1-(t.t-3.5)/1.5)),t.t>5&&(ce.remove(t.burn,t.ember),Ns.splice(e,1))}}function q0(){for(let n of po)ce.remove(n.m),Od.push(n.m);po.length=0;for(let n of Ns)ce.remove(n.burn,n.ember);Ns.length=0}function Y0(n){let e=[];for(let t of n){let i=Tc(t);e.push(new ne(wc,i.glow),new ne(Rc,i.trail),new ne(wc,i.flash))}return e.push(new ne(Ac,G0),new ne(Ac,V0)),e.forEach(t=>{t.frustumCulled=!1}),e}var Xn=.75,J0=3,rS=.13,oS=3,aS=1.6,lS=0;function cS(){return{mx:0,mz:0,aim:0,tx:0,tz:0,fire:!1,sup:!1,aiming:!1}}function Bd(n){let e=Qn[n.hero],t={id:++lS,name:n.name,team:n.team,hero:n.hero,H:e,isMe:!!n.isMe,bot:null,level:n.level||1,x:0,z:0,vx:0,vz:0,kx:0,kz:0,aim:n.team===0?Math.PI:0,alive:!1,hp:e.hp,max:e.hp,ammo:ei,cdT:0,charge:0,regenT:0,spawnT:0,shieldT:0,deadT:0,respawnT:.01,atkT:9,supT:9,flash:0,stunT:0,revealT:0,inGrass:!1,gems:0,kills:0,deaths:0,dmgDone:0,lastHitBy:null,pendingBeam:null,inp:cS(),V:null,tag:null,victory:!1,defeat:!1};return t.pow=t.pow0=1+(t.level-1)*.05,t.max=t.hp=Math.round(e.hp*t.pow),t.V=Ma(n.hero),t.V.root.visible=!1,ce.add(t.V.root),y.fighters.push(t),t}function j0(){for(let n of y.fighters)ce.remove(n.V.root),vc(n.V),n.tag&&n.tag.el.remove();y.fighters.length=0,y.me=null}function mo(n){return n===y.me?"me":y.me&&n.team===y.me.team?"ally":"foe"}function xo(n,e){let t=U.spawns[n.team]||U.spawns.ffa,i=e||t[(n.slot??0)%t.length];e||(n.power=0,n.pow=n.pow0,n.max=Math.round(n.H.hp*n.pow0*(n.hpMul||1))),n.x=i.x,n.z=i.z,n.vx=n.vz=n.kx=n.kz=0,n.alive=!0,n.hp=n.max,n.ammo=ei,n.cdT=0,n.deadT=0,n.spawnT=0,n.shieldT=aS,n.regenT=0,n.aim=U.spawns[n.team]?n.team===0?Math.PI:0:hS(n.x,n.z),n.V.yaw=n.aim,n.inp.aim=n.aim,n.atkT=n.supT=9,n.spot={},n.pendingBeam=null,n.stunT=0,n.gems=0,n.scope=!1,n.scopeT=0,n.burst=null,n.frenzyT=0,n.bloom=0,n.V.root.visible=!0,n.V.root.scale.setScalar(1),_c(n.V,mo(n)),Us.spawn(n.V),n.V.root.position.set(n.x,0,n.z),pt(Et,n.x,.3,n.z,{n:18,color:mo(n)==="foe"?"#FF7A6A":"#8FE0FF",sp:1.5,upMin:.6,upMax:1,vy:3,life:.7,s0:.25,s1:.05,drag:1.5,soft:!0}),Oi(n.x,n.z,.2,1.3,.5,mo(n)==="foe"?"#FF5A4A":"#6FD8FF"),ft("spawn",n)}function hS(n,e){let t=Math.atan2(-n,-e),i=t,s=-1e9;for(let r=0;r<8;r++){let o=r*Math.PI/4,a=Mn(n,e,n+Math.sin(o)*8,e+Math.cos(o)*8),c=(a<0?8:a*8)+Math.cos(o-t)*3;c>s&&(s=c,i=o)}return i}var Z0=3.2,uS=10,dS=6.5,fS=3.5,Hd=(n,e)=>e.spot&&e.spot[n]>0;function vo(n,e){if(e.team===n.team)return!0;if(!pS(n.team,e))return!1;if(Hd(n.team,e))return!0;let t=e.x-n.x,i=e.z-n.z,s=y.match&&y.match.mode==="br"?dS:uS;return t*t+i*i<s*s||ao(n.x,n.z,e.x,e.z)}function pS(n,e){if(e.team===n||!e.alive||!e.inGrass||e.revealT>0)return!0;for(let t of y.fighters)if(t.alive&&t.team===n&&(t.x-e.x)**2+(t.z-e.z)**2<Z0*Z0)return!0;return!1}var xi={x:0,z:0};function Q0(n,e){if(!n.alive){n.deadT+=e,y.match&&y.match.respawn&&!y.match.over&&(n.respawnT-=e,n.respawnT<=0&&xo(n));return}let t=n.H,i=n.inp;if(n.spawnT+=e,n.atkT+=e,n.supT+=e,n.regenT+=e,n.shieldT=Math.max(0,n.shieldT-e),n.revealT=Math.max(0,n.revealT-e),n.flash=Math.max(0,n.flash-e*6),n.cdT=Math.max(0,n.cdT-e),n.stunT=Math.max(0,n.stunT-e),n.frenzyT>0&&(n.frenzyT=Math.max(0,n.frenzyT-e)),n.atkT>.3&&n.bloom&&(n.bloom=Math.max(0,n.bloom-e*1.8)),n.ammo<ei&&(n.ammo=Math.min(ei,n.ammo+e/t.attack.reload*(n.frenzyT>0?3:1)),n.ammo>=ei&&n.isMe&&ft("ammoFull",n)),n.regenT>J0&&n.hp<n.max){let f=Math.min(n.max-n.hp,n.max*rS*e);n.hp+=f,n.healAcc=(n.healAcc||0)+f,n.healAcc>400&&(n===y.me&&ya(n.x,t.height+.3,n.z,n.healAcc,"heal"),n.healAcc=0)}let s=y.state!=="play"||n.stunT>0||n.pendingBeam,r=s?0:i.mx,o=s?0:i.mz,a=Math.hypot(r,o);a>1&&(r/=a,o/=a);let l=t.attack.scope;l&&n.scope&&y.state==="play"?n.scopeT=(n.scopeT||0)+e:n.scopeT=0;let c=t.speed*(y.ball&&y.ball.holder===n?.9:1)*(l&&n.scope?l.slow:1),h=1-Math.exp(-e*18);n.vx+=(r*c-n.vx)*h,n.vz+=(o*c-n.vz)*h;let d=Math.exp(-e*7);n.kx*=d,n.kz*=d,xi.x=n.x+(n.vx+n.kx)*e,xi.z=n.z+(n.vz+n.kz)*e,ki(xi,t.rad);for(let f of y.fighters){if(f===n||!f.alive)continue;let g=xi.x-f.x,x=xi.z-f.z,m=g*g+x*x,p=t.rad+f.H.rad;if(m<p*p&&m>1e-6){let v=Math.sqrt(m),_=(p-v)*.5/v;xi.x+=g*_,xi.z+=x*_}}if(ki(xi,t.rad),e>0){let f=(xi.x-n.x)/e,g=(xi.z-n.z)/e;n.vx=Wn(n.vx,f,.5),n.vz=Wn(n.vz,g,.5)}n.x=xi.x,n.z=xi.z;let u=cc(n.x,n.z);if(u&&!n.inGrass&&n.V.root.visible&&pt(on,n.x,.6,n.z,{n:4,color:"#7FC24E",sp:1.2,life:.5,s0:.12,s1:.06,grav:4,drag:1}),n.inGrass=u,Math.hypot(n.vx,n.vz)>2&&Math.random()<e*4&&!n.H.hover&&!u&&a0(n.x,n.z,1),!n.pendingBeam&&(!s||y.state==="countdown"&&n.stunT<=0)&&(n.aim=i.aim),n.pendingBeam&&(n.pendingBeam.t-=e,n.pendingBeam.t<=0&&_S(n)),n.burst)for(n.burst.t-=e;n.burst&&n.burst.t<=0;)tg(n);s||(i.sup&&n.charge>=1?gS(n,i.tx,i.tz):i.fire&&mS(n,i.tx,i.tz)),i.fire=i.sup=!1}function Bi(n){return n.alive&&n.ammo>=1&&n.cdT<=0&&!n.pendingBeam&&y.state==="play"}function Lc(n,e){return n.V.muzzle.getWorldPosition(e),e.y=Xn,e}var We=new P;function mS(n,e,t){if(y.attackHook&&n.alive&&n.cdT<=0&&y.state==="play"&&y.attackHook(n,e,t,!1))return;if(!Bi(n)){n.isMe&&n.ammo<1&&n.cdT<=0&&ft("empty",n);return}let i=n.H,s=i.attack;n.ammo-=1,n.cdT=s.cd*(n.frenzyT>0?.6:1),n.atkT=0,n.regenT=0,n.revealT=Math.max(n.revealT,1);let r=Math.atan2(e-n.x,t-n.z);n.aim=r,n.V.yaw=r,Us.attack(n.V),eg(n,s,r,e,t,!1),ft("attack",n,!1)}function gS(n,e,t){if(!n.alive||n.pendingBeam||y.state!=="play"||y.attackHook&&y.attackHook(n,e,t,!0))return;let i=n.H,s=i.super;n.charge=0,n.supT=0,n.atkT=0,n.regenT=0,n.revealT=Math.max(n.revealT,1.2);let r=Math.atan2(e-n.x,t-n.z);if(n.aim=r,n.V.yaw=r,Us.super(n.V),s.kind==="beam"){n.pendingBeam={t:s.windup,aim:r},ft("super",n,!0),Se("super",n);return}if(s.kind==="frenzy"){n.frenzyT=s.time,n.ammo=ei,n.bloom=0,Oi(n.x,n.z,.3,2,.5,s.color),pt(Et,n.x,1,n.z,{n:18,color:s.color,sp:3,vy:1.5,life:.5,s0:.25,s1:.03,soft:!0}),ft("super",n,!1),Se("super",n);return}eg(n,s,r,e,t,!0),ft("super",n,!1),Se("super",n)}function eg(n,e,t,i,s,r){Lc(n,We);let o=n.pow;if(e.kind==="fan"){for(let a=0;a<e.count;a++){let l=t+(e.count>1?(a/(e.count-1)-.5)*e.spread:0)+D(-.015,.015);Ea(n,We.x,We.z,l,e,e.dmg*o,r)}ks(We.x,We.y,We.z,e.color,r?1.3:.85,.08),pt(Et,We.x,We.y,We.z,{n:r?16:8,color:e.color,sp:r?7:4,vx:Math.sin(t)*4,vz:Math.cos(t)*4,life:.22,s0:.35,s1:.05,drag:6}),pt(on,We.x,We.y,We.z,{n:r?10:5,color:"#F2E8D0",sp:1.5,vx:Math.sin(t)*3,vz:Math.cos(t)*3,life:.5,s0:.18,s1:.5,drag:4,soft:!0,a:.6}),r&&(n.kx-=Math.sin(t)*7,n.kz-=Math.cos(t)*7,y.shake=Math.max(y.shake,n.isMe?.5:0)),Se(r?"boom":"shot_shotgun",n)}else if(e.kind==="burst")n.burst={n:e.count+(n.frenzyT>0?2:0),t:0,W:e,pow:o},tg(n);else if(e.kind==="bounce")Ea(n,We.x,We.z,t,e,e.dmg*o,r),ks(We.x,We.y,We.z,e.color,r?1.4:.6,.07),pt(Et,We.x,We.y,We.z,{n:r?12:5,color:e.color,sp:3,life:.2,s0:.25,s1:.04,drag:6}),r&&(n.kx-=Math.sin(t)*4,n.kz-=Math.cos(t)*4,y.shake=Math.max(y.shake,n.isMe?.35:0)),Se(r?"boom":"shot_pop",n,r?.7:1);else if(e.kind==="needle"){let a=e.scope,l=a&&n.scope?$e(n.scopeT/a.time,0,1):0;if(a&&n.scope){let c=1+a.dmg*l,h=Object.assign({},e,{range:e.range*a.range,speed:e.speed*a.speed,dmgFar:e.dmgFar*c,size:e.size*(1+l*.5)});Ea(n,We.x,We.z,t,h,e.dmg*c*o,r),n.scopeT=0,l>=1&&(ks(We.x,We.y,We.z,"#FFF2A0",1.3,.1),Se("shot_beam",n,.5,1.4))}else Ea(n,We.x,We.z,t,e,e.dmg*o,r);ks(We.x,We.y,We.z,e.color,.7,.07),pt(Et,We.x,We.y,We.z,{n:6,color:e.color,sp:3,life:.18,s0:.3,s1:.05,drag:6}),Se("shot_beam",n,.6)}else if(e.kind==="lob"){let a=$e(Math.hypot(i-n.x,s-n.z),1.5,e.range);$0(n,n.x+Math.sin(t)*a,n.z+Math.cos(t)*a,e,e.flight*(.65+.35*a/e.range),0,r),Se("shot_throw",n)}else if(e.kind==="barrage"){let a=$e(Math.hypot(i-n.x,s-n.z),3,e.range);for(let l=0;l<e.count;l++){let c=(l-(e.count-1)/2)*e.step,h=$e(a+c,1.5,e.range+e.step);$0(n,n.x+Math.sin(t)*h+D(-.3,.3),n.z+Math.cos(t)*h+D(-.3,.3),e,e.flight*(.7+.3*h/e.range),l*.08,!0)}Se("shot_throw",n)}}function tg(n){let e=n.burst;if(!e||!n.alive){n.burst=null;return}let t=e.W,i=n.frenzyT>0?.3:1;n.bloom=Math.min(1,(n.bloom||0)+t.bloom);let s=t.spread*(1+n.bloom*4)*i;Lc(n,We);let r=n.aim+(Math.random()+Math.random()-1)*s;Ea(n,We.x,We.z,r,t,t.dmg*e.pow,!1),ks(We.x,We.y,We.z,t.color,.45,.05),Se("shot_pop",n,.55,1.3+Math.random()*.2),n.V.sp.kick.v+=4,n.atkT=0,e.n--,e.t+=t.gap,e.n<=0&&(n.burst=null)}var ng=new Ot(1,10,8),ig=new ia(.5,2.2,3,8);ig.rotateX(Math.PI/2);var K0={},Sa=(n,e=2.4)=>K0[n+e]||(K0[n+e]=new Fe({color:new te(n).multiplyScalar(e),toneMapped:!1}));function Ea(n,e,t,i,s,r,o){let a=s.kind==="needle",l=s.kind==="bounce",c=s.size||.2,h=B0(s.color,a||l?c*2.6:c*2.2,a?3.6:l?o?2.6:1.8:o?1.8:1.4,a||l||!ct);kd(h,e,Xn,t,Math.sin(i),Math.cos(i),0),y.shots.push({owner:n,team:n.team,x:e,z:t,x0:n.x,z0:n.z,vx:Math.sin(i)*s.speed,vz:Math.cos(i)*s.speed,range:s.range,dist:0,dmg:r,W:s,isSuper:o,m:h,knock:s.knock||0,bounces:s.bounces||0,seg:0,hits:s.pierce?new Set:null})}function sg(n,e,t,i){let s=Math.sign(t)||1,r=Math.sign(i)||1,o=lc(gi(n+s*.06,e-r*.06)),a=lc(gi(n-s*.06,e+r*.06));return o&&!a?[-t,i]:a&&!o?[t,-i]:[-t,-i]}function Gd(n,e,t,i,s){let r=[{x:n,z:e}],o=Math.sin(t),a=Math.cos(t),l=i;for(let c=0;c<=s&&l>.05;c++){let h=n+o*l,d=e+a*l,u=Mn(n,e,h,d);if(u<0){r.push({x:h,z:d});break}let f=n+(h-n)*u-o*.03,g=e+(d-e)*u-a*.03;if(r.push({x:f,z:g}),l-=Math.hypot(f-n,g-e),c===s)break;[o,a]=sg(f+o*.03,g+a*.03,o,a),n=f,e=g}return r}function rg(n,e,t,i){for(let s=1;s<n.length;s++)if(Pc(n[s-1].x,n[s-1].z,n[s].x,n[s].z,e,t)<i*i)return!0;return!1}function Pc(n,e,t,i,s,r){let o=t-n,a=i-e,l=o*o+a*a,c=l>0?((s-n)*o+(r-e)*a)/l:0;c=$e(c,0,1);let h=n+o*c-s,d=e+a*c-r;return h*h+d*d}function og(n){for(let e=y.shots.length-1;e>=0;e--){let t=y.shots[e],i=Math.hypot(t.vx,t.vz)*n,s=t.x+t.vx*n,r=t.z+t.vz*n,o=!1;if(t.dist+i>=t.range){let l=(t.range-t.dist)/i;s=t.x+t.vx*n*l,r=t.z+t.vz*n*l,o=!0}let a=Mn(t.x,t.z,s,r);if(a>=0){s=t.x+(s-t.x)*a,r=t.z+(r-t.z)*a,o=!0,uo(s,Xn,r,t.W.color),Se("hit_wall",{x:s,z:r},.35,t.bounces>0?1.5:1);let l=Math.hypot(t.vx,t.vz)||1;ks(s,Xn,r,t.W.color,(t.W.size||.2)*4,.09);let c=Math.abs(t.vx)>Math.abs(t.vz);if(W0(s,Xn,r,c?-Math.sign(t.vx):0,0,c?0:-Math.sign(t.vz),t.W.kind==="needle"?.55:.32),A0(s+t.vx/l*.08,r+t.vz/l*.08,t.W.dmgFar?Wn(t.dmg,t.W.dmgFar*t.owner.pow,$e(t.dist/t.range,0,1)):t.dmg),t.bounces>0){[t.vx,t.vz]=sg(s,r,t.vx,t.vz),t.rico=(t.rico||0)+1,t.hits||(t.vx*=1.08,t.vz*=1.08),t.bounces--,o=!1,t.bounced=!0;let h=Math.hypot(t.vx,t.vz)||1;s+=t.vx/h*.03,r+=t.vz/h*.03}}for(let l of y.fighters){if(!l.alive||l.team===t.team)continue;let c=l.H.rad+(t.W.size||.2)*.8;if(Pc(t.x,t.z,s,r,l.x,l.z)<c*c){if(t.hits){if(t.hits.has(l))continue;t.hits.add(l)}let h=t.dmg;if(t.W.dmgFar&&(h=Wn(t.dmg,t.W.dmgFar*t.owner.pow,$e((t.dist+i)/t.range,0,1))),t.rico&&t.W.ricochet&&(h*=t.W.ricochet),or(l,h,t.owner,t.isSuper),t.knock){let d=Math.hypot(t.vx,t.vz);l.kx+=t.vx/d*t.knock*2.2,l.kz+=t.vz/d*t.knock*2.2,l.stunT=Math.max(l.stunT,.25)}if(uo(l.x,Xn+.1,l.z,t.W.color),ks(l.x,Xn+.1,l.z,t.W.color,.7,.08),t.hits)continue;o=!0,s=l.x,r=l.z;break}}t.dist+=Math.hypot(s-t.x,r-t.z),t.x=s,t.z=r,t.bounced&&(t.seg=t.dist,t.bounced=!1),kd(t.m,s,Xn,r,t.vx,t.vz,t.dist-t.seg),Math.random()<.25&&Et.emit({x:s,y:Xn,z:r,vx:0,vy:0,vz:0,life:t.W.kind==="needle"?.3:.16,t:0,s0:(t.W.size||.2)*(t.W.kind==="needle"?1.6:1.4),s1:.02,r:1,g:.8,b:.4,a:.7,grav:0,drag:0,soft:1}),o&&(Cc(t.m),y.shots.splice(e,1))}}var ag=new Ot(.16,12,10),lg=mt({color:"#26262E",roughness:.35,metalness:.2}),Vd=new Ss(.9,1,36);Vd.rotateX(-Math.PI/2);function $0(n,e,t,i,s,r,o){let a=new ne(ag,lg);a.castShadow=!0;let l=new ne(ng,Sa("#FFC04A",3));l.scale.setScalar(.05),l.position.y=.17,a.add(l),a.visible=!1,ce.add(a);let c=new ne(Vd,new Fe({color:mo(n)==="foe"?"#FF4A3A":"#5FC8FF",transparent:!0,opacity:0,depthWrite:!1}));c.position.set(e,.05,t),c.scale.setScalar(i.radius),c.renderOrder=3,ce.add(c),Lc(n,We),y.lobs.push({owner:n,team:n.team,x0:We.x,z0:We.z,y0:1,x1:e,z1:t,T:s,t:-r,W:i,isSuper:o,m:a,mark:c,h:3.2+Math.hypot(e-n.x,t-n.z)*.2})}function cg(n){for(let e=y.lobs.length-1;e>=0;e--){let t=y.lobs[e];if(t.t+=n,t.t<0)continue;let i=Math.min(1,t.t/t.T),s=Wn(t.x0,t.x1,i),r=Wn(t.z0,t.z1,i),o=Wn(t.y0,.15,i)+Math.sin(i*Math.PI)*t.h;t.m.visible=!0,t.m.position.set(s,o,r),t.m.rotation.x+=n*9,t.m.rotation.z+=n*5,t.mark.material.opacity=.25+.55*i,t.mark.scale.setScalar(t.W.radius*(1.25-.25*i)),Math.random()<.6&&Et.emit({x:s,y:o+.17,z:r,vx:D(-.4,.4),vy:.6,vz:D(-.4,.4),life:.3,t:0,s0:.12,s1:.02,r:1,g:.75,b:.3,a:1,grav:0,drag:1,soft:0}),i>=1&&(ce.remove(t.m),ce.remove(t.mark),t.mark.material.dispose(),y.lobs.splice(e,1),xS(t.owner,t.x1,t.z1,t.W,t.isSuper))}}function xS(n,e,t,i,s){xc(e,t,i.radius,i.color),Se(s?"boom_big":"boom",{x:e,z:t});for(let r of y.fighters){if(!r.alive||r.team===n.team)continue;let o=Math.hypot(r.x-e,r.z-t);if(!(o>i.radius+r.H.rad)&&(or(r,i.dmg*n.pow,n,s),i.knock)){let a=o||1;r.kx+=(r.x-e)/a*i.knock*3,r.kz+=(r.z-t)/a*i.knock*3,r.stunT=Math.max(r.stunT,.3)}}R0(e,t,i.radius,i.dmg*n.pow),i.puddle&&vS(n,e,t,i.puddle)}var Wd=new Vn(1,32);Wd.rotateX(-Math.PI/2);var Ic={uTime:{value:0}},hg=new yt({transparent:!0,depthWrite:!1,uniforms:Object.assign({uK:{value:1}},Ic),vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform float uTime; uniform float uK; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
    float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
    void main(){ vec2 p = vUv - 0.5; float d = length(p) * 2.0;
      float e = n(p * 7.0 + uTime * 0.7) * 0.25 + n(p * 15.0 - uTime) * 0.12;
      float a = 1.0 - smoothstep(0.82, 1.0, d + e * 0.6);
      float bub = smoothstep(0.62, 0.8, n(p * 12.0 + vec2(uTime * 0.5, -uTime * 0.8)));
      vec3 col = mix(vec3(0.95, 0.35, 0.05), vec3(1.0, 0.8, 0.25), bub + (1.0 - d) * 0.4);
      gl_FragColor = vec4(col * 1.6, a * 0.78 * uK);
      #include <colorspace_fragment>
    }`});function vS(n,e,t,i){let s=new ne(Wd,hg.clone());s.material.uniforms.uTime=Ic.uTime,s.position.set(e,.045,t),s.scale.setScalar(.2),s.renderOrder=3,ce.add(s),y.puddles.push({owner:n,team:n.team,x:e,z:t,r:i.r,dps:i.dps*n.pow,t:0,life:i.t,tick:0,m:s})}function ug(n){Ic.uTime.value+=n;for(let e=y.puddles.length-1;e>=0;e--){let t=y.puddles[e];t.t+=n,t.tick-=n;let i=t.t/t.life;if(t.m.scale.setScalar(t.r*Math.min(1,t.t/.15)),t.m.material.uniforms.uK.value=i>.75?(1-i)/.25:1,Math.random()<n*14&&Et.emit({x:t.x+D(-t.r,t.r)*.7,y:.1,z:t.z+D(-t.r,t.r)*.7,vx:0,vy:D(.6,1.4),vz:0,life:.5,t:0,s0:.14,s1:.02,r:1,g:.6,b:.15,a:1,grav:0,drag:.5,soft:1}),t.tick<=0){t.tick=.25;for(let s of y.fighters)s.alive&&s.team!==t.team&&(s.x-t.x)**2+(s.z-t.z)**2<(t.r+s.H.rad*.5)**2&&or(s,t.dps*.25,t.owner,!1,!0)}t.t>=t.life&&(ce.remove(t.m),t.m.material.dispose(),y.puddles.splice(e,1))}}var go=new Vt(1,1,1,12,1,!0);go.rotateX(Math.PI/2);go.translate(0,0,.5);function _S(n){let e=n.H.super,t=n.pendingBeam.aim;n.pendingBeam=null,n.aim=t,Lc(n,We);let i=We.x,s=We.z,r=i+Math.sin(t)*e.range,o=s+Math.cos(t)*e.range;for(let c of y.fighters){if(!c.alive||c.team===n.team)continue;let h=e.width/2+c.H.rad;Pc(i,s,r,o,c.x,c.z)<h*h&&(or(c,e.dmg*n.pow,n,!0),c.kx+=Math.sin(t)*6,c.kz+=Math.cos(t)*6,uo(c.x,Xn,c.z,e.color))}for(let c of U.crates)c.alive&&Pc(i,s,r,o,c.x,c.z)<(e.width/2+.7)**2&&Nd(c,e.dmg*n.pow);let a=new ne(go,Sa("#FFF6C0",3)),l=new ne(go,new Fe({color:new te(e.color).multiplyScalar(2),transparent:!0,opacity:.55,depthWrite:!1,blending:un}));for(let c of[a,l])c.position.set(i,Xn+.05,s),c.rotation.y=t,ce.add(c);a.scale.set(.08,.08,e.range),l.scale.set(e.width*.5,e.width*.5,e.range),y.beams.push({core:a,outer:l,t:0,life:.45,w:e.width});for(let c=0;c<e.range;c+=.6)pt(Et,i+Math.sin(t)*c,Xn,s+Math.cos(t)*c,{n:1,color:e.color,sp:1.5,life:.5,s0:.25,s1:.02,drag:2,soft:!0});n.kx-=Math.sin(t)*5,n.kz-=Math.cos(t)*5,Us.super(n.V),n.isMe&&(y.shake=Math.max(y.shake,.4)),Se("shot_beam",n,1.2)}function dg(n){for(let e=y.beams.length-1;e>=0;e--){let t=y.beams[e];t.t+=n;let i=t.t/t.life,s=(1-i)*t.w*.5;t.outer.scale.x=t.outer.scale.y=Math.max(.001,s),t.core.scale.x=t.core.scale.y=Math.max(.001,.08*(1-i)),t.outer.material.opacity=.55*(1-i),i>=1&&(ce.remove(t.core),ce.remove(t.outer),t.outer.material.dispose(),y.beams.splice(e,1))}}function or(n,e,t,i,s){if(!n.alive||n.shieldT>0||e<=0||y.match&&y.match.over)return 0;t&&y.match&&y.match.mode==="br"&&(e*=Wt.dmg),e=Math.round(e),n.hp-=e,n.flash=1,n.hurtAt=y.time,n.regenT=0,n.revealT=Math.max(n.revealT,.6),n.lastHitBy=t,t&&t.team!==n.team&&(n.spot=n.spot||{},n.spot[t.team]=fS),t&&(t.dmgDone+=e,t.regenT=Math.min(t.regenT,J0*.5),!i&&t.charge<1&&(t.charge=Math.min(1,t.charge+e/t.H.super.charge),t.charge>=1&&ft("superReady",t))),s||Us.hurt(n.V);let r=y.me?y.me.team:0;return(y.me&&vo(y.me,n)||n===y.me||t===y.me)&&ya(n.x,n.H.height+.25,n.z,e,n===y.me?"me":t===y.me?"mine":""),ft("damage",n,e,t),t===y.me&&n!==y.me&&ft("hitMarker",n.hp<=0),n.hp<=0&&yS(n,t),e}function yS(n,e){n.hp=0,n.alive=!1,n.deadT=0,n.deaths++,n.respawnT=oS,n.pendingBeam=null,n.burst=null,n.frenzyT=0,e&&e!==n&&e.kills++,cs(n.x,.8,n.z,n.H.color,34),Se("die",n),ft("kill",n,e)}function fg(n,e){let t=y.me?y.me.team:0;for(let i of y.fighters){let s=i.V;if(i.spot)for(let a in i.spot)i.spot[a]=Math.max(0,i.spot[a]-n);i.seen=y.me?vo(y.me,i):!0,yc(s,i,n,e),i.alive&&!i.seen&&(s.root.visible=!1);let r=i.alive&&i.inGrass&&i.team===t?.55:1;if(i===y.me&&y.state!=="menu"){let a=Be.position.distanceTo(s.root.position)-.6;a<2.2&&(r=Math.min(r,Math.max(.15,(a-.6)/1.6)))}let o=r<1;s.mat.transparent!==o&&(s.mat.transparent=o,s.mat.depthWrite=!o,s.ol.visible=!o&&!ct),s.mat.opacity=r,i.shieldT>0?s.mat.userData.u.uTint.value.setScalar(.12+Math.sin(e*20)*.08):i.frenzyT>0?s.mat.userData.u.uTint.value.setRGB(.25,.45,.05).multiplyScalar(.6+Math.sin(e*18)*.4):(s.id!=="wasp"||i.supT>=1.2)&&s.mat.userData.u.uTint.value.setScalar(0)}}function pg(){let n={team:0,x:0,z:0,pow:1,H:{attack:{}},V:null},e=[],t=new ne(Wd,hg.clone());return t.material.uniforms.uTime=Ic.uTime,e.push(t),e.push(new ne(ag,lg),new ne(Vd,new Fe({transparent:!0,depthWrite:!1}))),e.push(new ne(go,Sa("#FFF6C0",3)),new ne(go,new Fe({transparent:!0,opacity:.5,depthWrite:!1,blending:un}))),e.push(new ne(ng,Sa("#FF6B4A",2.2)),new ne(ig,Sa("#FFB21E",2.2))),e}var Jt={goals:2,dur:150,golden:60,r:.36,kick:14,superKick:23,catchT:.35,friction:1.1},vi={x:0,z:0},qn=null;function gg(){let n=di(128,64,(a,l,c)=>{a.fillStyle="#F1E7D2",a.fillRect(0,0,l,c);for(let h=0;h<260;h++)a.fillStyle=`rgba(${150+D(0,60)|0},${130+D(0,50)|0},${100+D(0,40)|0},${D(.25,.6)})`,a.beginPath(),a.arc(D(0,l),D(0,c),D(1,3.5),0,Pe),a.fill();a.fillStyle="rgba(120,95,70,.5)";for(let h=0;h<18;h++)a.beginPath(),a.arc(D(0,l),D(0,c),D(3,6),0,Pe),a.fill()},{repeat:!0}),e=new ne(new Ot(Jt.r,20,14),mt({map:n,roughness:.9}));e.castShadow=!ct;let t=new ne(new Yr(.07,.1,8),mt({color:"#C9B08A",roughness:.9}));t.position.y=Jt.r,e.add(t);let i=di(64,64,a=>{let l=a.createRadialGradient(32,32,2,32,32,30);l.addColorStop(0,"rgba(0,0,0,.45)"),l.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=l,a.fillRect(0,0,64,64)}),s=new ne(new Gt(1,1).rotateX(-Math.PI/2),new Fe({map:i,transparent:!0,depthWrite:!1}));s.renderOrder=1;let r=new ne(new Vt(.06,.18,6,10,1,!0).translate(0,3,0),new Fe({color:new te("#FFF2C0"),transparent:!0,opacity:.18,depthWrite:!1,blending:un,toneMapped:!1}));r.renderOrder=5;let o=new xt;o.add(e,s,r),ce.add(o),qn={grp:o,ball:e,sh:s,beam:r}}var Fc=null;function MS(){let n=new xt,e=new Vt(.09,.09,1.8,10),t=mt({color:"#F4EFE6",roughness:.6}),i=di(64,64,s=>{s.clearRect(0,0,64,64),s.strokeStyle="rgba(255,255,255,.75)",s.lineWidth=2;for(let r=0;r<=64;r+=8)s.beginPath(),s.moveTo(r,0),s.lineTo(r,64),s.stroke(),s.beginPath(),s.moveTo(0,r),s.lineTo(64,r),s.stroke()},{repeat:!0});for(let s of["g","h"]){let r=1e9,o=-1,a=-1;for(let x=0;x<U.H;x++)for(let m=0;m<U.W;m++)U.rows[x][m]===s&&(r=Math.min(r,m),o=Math.max(o,m),a=x);if(a<0)continue;let l=qt(r)-.8,c=qt(o)+.8,h=s==="g"?1:-1,d=$t(a)+h*.8;for(let x of[l,c]){let m=new ne(e,t);m.position.set(x,.9,d),m.castShadow=!0,n.add(m)}let u=new ne(new Vt(.08,.08,c-l,10),t);u.rotation.z=Math.PI/2,u.position.set((l+c)/2,1.8,d),n.add(u);let f=i.clone();f.needsUpdate=!0,f.repeat.set((c-l)/.5,1.8/.5);let g=new ne(new Gt(c-l,1.8),new Fe({map:f,transparent:!0,side:zt,depthWrite:!1,color:s==="g"?"#FFD0D0":"#D0ECFF"}));g.position.set((l+c)/2,.9,d-h*1.5),n.add(g)}ce.add(n),Fc=n}function wa(n){let e=n===0?"h":"g",t=0,i=0,s=0;for(let r=0;r<U.H;r++)for(let o=0;o<U.W;o++)U.rows[r][o]===e&&(t+=qt(o),i+=$t(r),s++);return s?{x:t/s,z:i/s}:{x:0,z:0}}function xg(){qd(),gg(),MS();let n=U.mine||{x:0,z:0};y.match={mode:"ball",t:0,dur:Jt.dur,over:!1,winner:null,respawn:!0,count:[0,0],golden:!1,resetT:0},y.ball={x:n.x,z:n.z,y:Jt.r,vx:0,vz:0,vy:0,holder:null,kicker:null,kickT:9,power:!1,spin:0,home:{x:n.x,z:n.z}},y.attackHook=bS}function qd(){qn&&(ce.remove(qn.grp),qn=null),Fc&&(ce.remove(Fc),Fc=null),y.ball=null,y.attackHook=null}function bS(n,e,t,i){let s=y.ball;if(!s||s.holder!==n)return!1;let r=Math.atan2(e-n.x,t-n.z),o=i?Jt.superKick:Jt.kick;return s.holder=null,s.kicker=n,s.kickT=0,s.power=i,s.x=n.x+Math.sin(r)*.7,s.z=n.z+Math.cos(r)*.7,s.vx=Math.sin(r)*o,s.vz=Math.cos(r)*o,s.vy=i?2.5:3.2,n.aim=r,n.V.yaw=r,n.atkT=0,n.cdT=.3,n.revealT=Math.max(n.revealT,1),i&&(n.charge=0,n.supT=0),pt(on,s.x,.4,s.z,{n:i?16:8,color:"#E8DCC0",sp:2.5,life:.6,s0:.2,s1:.5,drag:3,soft:!0,a:.7}),i&&cs(s.x,.5,s.z,"#FFE07A",16),Se(i?"boom":"shot_throw",n,i?.7:1,i?1:1.3),ft("kick",n,i),!0}Dt("kill",n=>{let e=y.ball;e&&e.holder===n&&(e.holder=null,e.kicker=null,e.kickT=.2,e.vx=D(-2,2),e.vz=D(-2,2),e.vy=3)});function mg(n){let e=y.match,t=y.ball;e.count[n]++,t.vx=t.vz=0,t.holder=null,e.resetT=2.6;let i=t.kicker&&t.kicker.team===n?t.kicker:null;i&&(i.gemsPicked=(i.gemsPicked||0)+1),cs(t.x,.6,t.z,n===0?"#6FD8FF":"#FF6A5A",40),Oi(t.x,t.z,.3,3,.7,n===0?"#6FD8FF":"#FF5A4A"),ft("goal",n,i),(e.count[n]>=Jt.goals||e.golden)&&Xd(n,"goals")}function Xd(n,e){let t=y.match;t.over=!0,t.winner=n,t.why=e,ft("matchOver",n,e)}function vg(n,e){let t=y.match,i=y.ball;if(!(!t||t.mode!=="ball"||!i)){if(y.state==="play"&&!t.over){if(t.t+=n,t.t>=t.dur&&!t.golden&&!t.resetT){if(t.count[0]!==t.count[1])return Xd(t.count[0]>t.count[1]?0:1,"time");t.golden=!0,ft("golden")}if(t.golden&&t.t>=t.dur+Jt.golden)return Xd(-1,"time")}if(t.resetT>0&&!t.over&&(t.resetT-=n,t.resetT<=0&&(t.resetT=0,Object.assign(i,{x:i.home.x,z:i.home.z,y:Jt.r,vx:0,vz:0,vy:0,holder:null,kicker:null,kickT:9}),ft("kickoff"))),i.kickT+=n,i.holder){let s=i.holder;i.x=s.x+Math.sin(s.aim)*.62,i.z=s.z+Math.cos(s.aim)*.62,i.y=Jt.r+Math.abs(Math.sin(e*9))*.06,i.vx=s.vx,i.vz=s.vz,vi.x=i.x,vi.z=i.z,ki(vi,Jt.r*.8),i.x=vi.x,i.z=vi.z}else if(!t.resetT||t.resetT>0){let s=Math.max(1,Math.ceil(Math.hypot(i.vx,i.vz)*n/.25));for(let o=0;o<s;o++){let a=n/s,l=i.x,c=i.z;vi.x=i.x+i.vx*a,vi.z=i.z+i.vz*a,ki(vi,Jt.r)&&(Math.abs(vi.x-(l+i.vx*a))>1e-4&&(i.vx=-i.vx*.65),Math.abs(vi.z-(c+i.vz*a))>1e-4&&(i.vz=-i.vz*.65),Math.hypot(i.vx,i.vz)>4&&Se("hit_wall",i,.4,.7)),i.x=vi.x,i.z=vi.z}let r=Math.exp(-n*Jt.friction*(i.y>Jt.r+.05?.3:1));if(i.vx*=r,i.vz*=r,i.vy-=18*n,i.y+=i.vy*n,i.y<Jt.r&&(i.y=Jt.r,i.vy=Math.abs(i.vy)>2?-i.vy*.45:0),i.power&&Math.hypot(i.vx,i.vz)<8&&(i.power=!1),!t.over&&!t.resetT){let o=gi(i.x,i.z);o==="g"?mg(0):o==="h"&&mg(1)}if(!t.resetT&&y.state==="play"){let o=Math.hypot(i.vx,i.vz);for(let a of y.fighters)if(!(!a.alive||(a.x-i.x)**2+(a.z-i.z)**2>(a.H.rad+Jt.r+.1)**2)){if(i.power&&a.team!==(i.kicker&&i.kicker.team)){let l=o||1;a.kx+=i.vx/l*7,a.kz+=i.vz/l*7,a.stunT=Math.max(a.stunT,.5),i.vx*=.7,i.vz*=.7,i.power=!1,ft("ballHit",a,i.kicker);continue}if(!(a===i.kicker&&i.kickT<Jt.catchT)&&!(a!==i.kicker&&i.kickT<.08)&&!(o>16&&a.team===(i.kicker&&i.kicker.team)&&a!==i.kicker)){i.holder=a,i.power=!1,i.vy=0,Se("gem",a,a===y.me?.6:.3,.7),ft("ballTaken",a);break}}}}if(qn){qn.grp.visible=t.resetT<=0||t.resetT>2.2,qn.ball.position.set(i.x,i.y,i.z);let s=Math.hypot(i.vx,i.vz);s>.05&&(i.spin+=s*n/Jt.r,qn.ball.rotation.set(i.spin*Math.cos(Math.atan2(i.vx,i.vz)),0,-i.spin*Math.sin(Math.atan2(i.vx,i.vz)))),qn.sh.position.set(i.x,.03,i.z),qn.sh.scale.setScalar(.9+(i.y-Jt.r)*.2),qn.beam.position.set(i.x,0,i.z),qn.beam.material.opacity=i.holder?.1:.2+Math.sin(e*4)*.05,s>9&&Math.random()<n*30&&Et.emit({x:i.x,y:i.y,z:i.z,vx:0,vy:.4,vz:0,life:.35,t:0,s0:.18,s1:.02,r:1,g:.95,b:.75,a:.8,grav:0,drag:0,soft:1})}}}function _g(){gg();let n=qn.grp;return ce.remove(n),qn=null,[n]}var Ee={yaw:Math.PI,pitch:-.08,x:0,z:0,dist:3.5,pivotH:1.6,shoulder:.6,sens:_t.get("sens",1),turnTo:null,zoom:0},bg=()=>!!(y.me&&y.me.H.attack.scope),ES=-.6,SS=.38,Bn={},_i={l:!1,r:!1,x:0,y:0},yo=!1,Ce={move:null,atk:null,sup:null,cam:null},Ct={x:0,y:0,z:0,foe:null,inRange:!1,gx:0,gz:0,groundHit:!1};function Yd(n,e,t){t*=1-Ee.zoom*.6,Ee.yaw-=n*t*Ee.sens,Ee.pitch=$e(Ee.pitch-e*t*Ee.sens,ES,SS),Ee.turnTo=null}addEventListener("keydown",n=>{Bn[n.code]=!0,["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(n.code)&&y.state!=="menu"&&n.preventDefault(),(n.code==="KeyE"||n.code==="Space")&&y.me&&(y.me.wantSup=!0)});addEventListener("keyup",n=>{Bn[n.code]=!1});addEventListener("blur",()=>{for(let n in Bn)Bn[n]=!1;_i.l=_i.r=!1});nr.addEventListener("mousedown",n=>{if(fo(),!Kt){if(Zd()&&!yo&&nr.requestPointerLock)try{let e=nr.requestPointerLock();e&&e.catch&&e.catch(()=>{})}catch{}n.button===0&&(_i.l=!0),n.button===2&&y.me&&(bg()?_i.r=!0:y.me.wantSup=!0)}});addEventListener("mouseup",n=>{n.button===0&&(_i.l=!1),n.button===2&&(_i.r=!1)});nr.addEventListener("contextmenu",n=>n.preventDefault());addEventListener("mousemove",n=>{(yo||Zd()&&!Kt)&&!y.paused&&Yd(n.movementX,n.movementY,.0026),_i.x=n.clientX,_i.y=n.clientY});var Eg=!1;document.addEventListener("pointerlockchange",()=>{yo=document.pointerLockElement===nr,yo&&(Eg=!0)});function Sg(){let n=J("lockhint"),e=!yo&&!Eg&&!Kt&&y.state==="play"&&y.match&&y.match.t<12&&y.me&&y.me.alive&&!y.paused&&!_i.l;n.hidden===e&&(n.hidden=!e)}function Dc(){document.exitPointerLock&&yo&&document.exitPointerLock()}var Zd=()=>y.state==="play"||y.state==="countdown";function wg(n,e){let t=J("stick");t.style.left=n+"px",t.style.top=e+"px",t.hidden=!1}function wS(n){if(fo(),!Zd()||y.paused)return;let e=!1;for(let t of n.changedTouches){if(t.target.closest&&t.target.closest("button:not([data-btn]), input, .screen"))continue;e=!0;let i=t.target.closest&&t.target.closest("[data-btn]");if(i){let s=i.dataset.btn;if(s==="scope"){Ce.scopeOn=!Ce.scopeOn,i.classList.toggle("on",Ce.scopeOn);continue}(s==="atk"&&!Ce.atk||s==="sup"&&!Ce.sup&&y.me&&y.me.charge>=1)&&(Ce[s]={id:t.identifier,x:t.clientX,y:t.clientY,moved:0,t0:performance.now(),el:i},i.classList.add("on"));continue}t.clientX<innerWidth*.42&&!Ce.move?(Ce.move={id:t.identifier,x0:t.clientX,y0:t.clientY,dx:0,dy:0},wg(t.clientX,t.clientY)):Ce.cam||(Ce.cam={id:t.identifier,x:t.clientX,y:t.clientY})}e&&n.preventDefault()}function Kd(){for(let n of["atk","sup"])Ce[n]&&(Ce[n].el.classList.remove("on"),Ce[n]=null);Ce.move=Ce.cam=null,J("stick").hidden=!0,J("knob").style.transform="",Ce.scopeOn=!1,J("b-scope").classList.remove("on"),_i.r=!1}var yg=.0055;function TS(n){if(!(!Ce.move&&!Ce.cam&&!Ce.atk&&!Ce.sup)){for(let e of n.changedTouches){if(Ce.move&&e.identifier===Ce.move.id){let t=e.clientX-Ce.move.x0,i=e.clientY-Ce.move.y0,s=Math.hypot(t,i),r=56;s>r&&(Ce.move.x0+=t*(1-r/s),Ce.move.y0+=i*(1-r/s),t=e.clientX-Ce.move.x0,i=e.clientY-Ce.move.y0,wg(Ce.move.x0,Ce.move.y0)),Ce.move.dx=t/r,Ce.move.dy=i/r,J("knob").style.transform=`translate(${t}px,${i}px)`;continue}if(Ce.cam&&e.identifier===Ce.cam.id){Yd(e.clientX-Ce.cam.x,e.clientY-Ce.cam.y,yg),Ce.cam.x=e.clientX,Ce.cam.y=e.clientY;continue}for(let t of["atk","sup"]){let i=Ce[t];if(!i||e.identifier!==i.id)continue;let s=e.clientX-i.x,r=e.clientY-i.y;i.moved+=Math.abs(s)+Math.abs(r),Yd(s,r,yg*.8),i.x=e.clientX,i.y=e.clientY}}n.preventDefault()}}function Tg(n){for(let e of n.changedTouches){Ce.move&&e.identifier===Ce.move.id&&(Ce.move=null,J("stick").hidden=!0,J("knob").style.transform=""),Ce.cam&&e.identifier===Ce.cam.id&&(Ce.cam=null);for(let t of["atk","sup"]){let i=Ce[t];if(!i||e.identifier!==i.id)continue;i.el.classList.remove("on");let s=y.me;if(s&&s.alive){let r=i.moved<14&&performance.now()-i.t0<350,o=r&&AS(t==="sup")||_o(s,t==="sup");s.inp.tx=o.x,s.inp.tz=o.z,t==="sup"?s.inp.sup=!0:s.inp.fire=!0,s.inp.locked=!0,r&&o.foe&&(Ee.turnTo=Math.atan2(o.x-s.x,o.z-s.z))}Ce[t]=null}}}document.addEventListener("touchstart",wS,{passive:!1});document.addEventListener("touchmove",TS,{passive:!1});document.addEventListener("touchend",Tg);document.addEventListener("touchcancel",Tg);function AS(n){let e=y.me,t=n?e.H.super:e.H.attack;if(y.ball&&y.ball.holder===e){let l=wa(1-e.team);return{x:l.x,z:l.z,foe:null}}let i=t.kind==="lob"||t.kind==="barrage"||t.kind==="beam",s=null,r=1e9;for(let l of y.fighters){if(!l.alive||l.team===e.team||!vo(e,l))continue;let c=Math.hypot(l.x-e.x,l.z-e.z);if(c>t.range*1.15)continue;let h=Math.abs(tr(Ee.yaw,Math.atan2(l.x-e.x,l.z-e.z))),d=!i&&Mn(e.x,e.z,l.x,l.z)>=0,u=c+h*4+(d?10:0);u<r&&(r=u,s=l)}if(!s)return null;if(t.kind==="bounce"&&Mn(e.x,e.z,s.x,s.z)>=0){let l=$d(e,s,t);if(l)return{x:e.x+Math.sin(l)*6,z:e.z+Math.cos(l)*6,foe:s}}let o=Math.hypot(s.x-e.x,s.z-e.z),a=t.kind==="lob"||t.kind==="barrage"?t.flight*.8:o/(t.speed||40);return{x:s.x+s.vx*a*.7,z:s.z+s.vz*a*.7,foe:s}}function $d(n,e,t){let i=Math.atan2(e.x-n.x,e.z-n.z);for(let s=1;s<=36;s++){let r=i+(s%2?1:-1)*Math.ceil(s/2)*.17;if(rg(Gd(n.x,n.z,r,t.range,t.bounces),e.x,e.z,e.H.rad+.1))return r}return null}function _o(n,e){let t=e?n.H.super:n.H.attack;if(t.kind==="lob"||t.kind==="barrage"){let i=Math.atan2(Ct.gx-n.x,Ct.gz-n.z),s=Ct.groundHit?$e(Math.hypot(Ct.gx-n.x,Ct.gz-n.z),1.5,t.range):t.range;return{x:n.x+Math.sin(i)*s,z:n.z+Math.cos(i)*s}}return{x:Ct.x,z:Ct.z}}var Os=new P;function RS(n){let e=Be.position,t=Os;Ct.groundHit=t.y<-.01;let i=Ct.groundHit?(e.y-.05)/-t.y:40;Ct.gx=e.x+t.x*Math.min(i,40),Ct.gz=e.z+t.z*Math.min(i,40);let s=Math.max(.6,(n.x-e.x)*t.x+(n.z-e.z)*t.z),r=Math.min(i,40);for(let l=s;l<r;l+=.2){let c=e.x+t.x*l,h=e.y+t.y*l,d=e.z+t.z*l;if(h<Jm(gi(c,d))){r=l;break}}Ct.foe=null;let o=Math.hypot(t.x,t.z)||1e-6;for(let l of y.fighters){if(!l.alive||l.team===n.team||!l.seen)continue;let c=l.x-e.x,h=l.z-e.z,d=(c*t.x+h*t.z)/(o*o);if(d<=s-.6||d>=r)continue;let u=e.x+t.x*d-l.x,f=e.z+t.z*d-l.z,g=e.y+t.y*d;u*u+f*f<(l.H.rad+.15)**2&&g>-.2&&g<l.H.height+(l.H.hover||0)+.3&&(r=d,Ct.foe=l)}Ct.x=e.x+t.x*r,Ct.y=e.y+t.y*r,Ct.z=e.z+t.z*r,Math.hypot(Ct.x-n.x,Ct.z-n.z)<1.2&&(Ct.x=n.x+Math.sin(Ee.yaw)*8,Ct.z=n.z+Math.cos(Ee.yaw)*8);let a=n.H.attack;Ct.inRange=!!Ct.foe&&Math.hypot(Ct.foe.x-n.x,Ct.foe.z-n.z)<a.range+.5}function Ag(n){let e=y.me;if(!e)return;let t=e.inp,i=0,s=0;Ce.move?(i=-Ce.move.dy,s=Ce.move.dx):(i=(Bn.KeyW||Bn.ArrowUp?1:0)-(Bn.KeyS||Bn.ArrowDown?1:0),s=(Bn.KeyD||Bn.ArrowRight?1:0)-(Bn.KeyA||Bn.ArrowLeft?1:0));let r=Math.hypot(i,s);r>1&&(i/=r,s/=r);let o=Math.sin(Ee.yaw),a=Math.cos(Ee.yaw);if(t.mx=o*i-a*s,t.mz=a*i+o*s,Ee.turnTo!==null){let l=tr(Ee.yaw,Ee.turnTo);Ee.yaw+=l*Math.min(1,n*8),Math.abs(l)<.02&&(Ee.turnTo=null)}if(RS(e),!t.locked){let l=_o(e,!1);t.tx=l.x,t.tz=l.z}if(t.locked=!1,t.aim=Math.atan2(t.tx-e.x,t.tz-e.z),e.aiming=!0,e.scope=bg()&&(_i.r||Bn.ShiftLeft||Bn.ShiftRight||!!Ce.scopeOn),!Kt){if(_i.l&&Bi(e)){let l=_o(e,!1);t.tx=l.x,t.tz=l.z,t.fire=!0}if(e.wantSup&&(e.wantSup=!1,e.charge>=1)){let l=_o(e,!0);t.tx=l.x,t.tz=l.z,t.sup=!0}}}var Mg=new P,CS=n=>n==="X";function Rg(n){let e=y.me;if(!e)return;let t=1-Math.exp(-n*14);Ee.x=Wn(Ee.x,e.x,t),Ee.z=Wn(Ee.z,e.z,t);let i=Math.sin(Ee.yaw),s=Math.cos(Ee.yaw),r=Math.cos(Ee.pitch),o=Math.sin(Ee.pitch);Os.set(i*r,o,s*r);let a=-s,l=i,c=Ee.x+a*Ee.shoulder*.4,h=Ee.z+l*Ee.shoulder*.4,d=Ee.pivotH;Ee.zoom+=((e.scope&&e.alive?1:0)-Ee.zoom)*Math.min(1,n*12);let u=Be.userData.baseFov||55,f=u*(1-Ee.zoom*.55);Math.abs(Be.fov-f)>.01&&(Be.fov=f,Be.updateProjectionMatrix());let g=Ee.dist*(1-Ee.zoom*.55),x=c-Os.x*g+a*Ee.shoulder,m=h-Os.z*g+l*Ee.shoulder,p=Mn(c,h,x,m,CS),v=x,_=m,M=d-Os.y*g+.25;if(p>=0){let S=Math.max(.3,p-.12);v=c+(x-c)*S,_=h+(m-h)*S,M=d+(M-d)*S}if(M=Math.max(.35,M),y.shake>0){let S=y.shake*.12;v+=(Math.random()-.5)*S,M+=(Math.random()-.5)*S,_+=(Math.random()-.5)*S,y.shake=Math.max(0,y.shake-n*2.5)}Be.position.set(v,M,_),Mg.set(v+Os.x*10,M+Os.y*10,_+Os.z*10),Be.lookAt(Mg)}var lr=new xt;lr.visible=!1;ce.add(lr);var zc=new Fe({color:"#FFFFFF",transparent:!0,opacity:.75,depthWrite:!1,depthTest:!1}),Cg=new Fe({color:"#FFD23F",transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1}),Pg=new Ss(.86,1,40);Pg.rotateX(-Math.PI/2);var ar=new ne(Pg,zc);ar.renderOrder=6;lr.add(ar);var PS=new Ot(.06,8,6),Bs=[];for(let n=0;n<16;n++){let e=new ne(PS,zc);e.renderOrder=6,lr.add(e),Bs.push(e)}function Lg(){let n=y.me,e=n&&n.alive&&y.state==="play"&&(!Kt||Ce.atk||Ce.sup),t=Kt?!!Ce.sup:n&&n.charge>=1&&Bn.KeyE,i=n&&(t?n.H.super:n.H.attack),s=i&&(i.kind==="lob"||i.kind==="barrage");if(e&&i&&i.kind==="bounce")return LS(n,i,t);if(lr.visible=!!(e&&s),!lr.visible)return;ar.visible=!0,Bs.forEach(c=>{c.visible=!0});let r=t?Cg:zc;r.opacity=Bi(n)||t?.8:.3,ar.material=r,Bs.forEach(c=>c.material=r);let o=_o(n,t),a=Math.hypot(o.x-n.x,o.z-n.z),l=3.2+a*.2;ar.position.set(o.x,.07,o.z),ar.scale.setScalar(i.radius),Bs.forEach((c,h)=>{let d=(h+1)/(Bs.length+1);c.position.set(Wn(n.x,o.x,d),Wn(1,.15,d)+Math.sin(d*Math.PI)*l,Wn(n.z,o.z,d))})}function LS(n,e,t){lr.visible=!0,ar.visible=!1;let i=t?Cg:zc;i.opacity=Bi(n)||t?.8:.3,Bs.forEach(d=>d.material=i);let s=_o(n,t),r=Gd(n.x,n.z,Math.atan2(s.x-n.x,s.z-n.z),Math.min(e.range,14),e.bounces),o=0;for(let d=1;d<r.length;d++)o+=Math.hypot(r[d].x-r[d-1].x,r[d].z-r[d-1].z);let a=Math.max(.55,o/Bs.length),l=1,c=0,h=a*.6;for(let d of Bs){for(;l<r.length;){let x=r[l-1],m=r[l],p=Math.hypot(m.x-x.x,m.z-x.z);if(c+h<=p){c+=h;break}h-=p-c,c=0,l++}if(l>=r.length){d.visible=!1;continue}let u=r[l-1],f=r[l],g=Math.hypot(f.x-u.x,f.z-u.z)||1;d.visible=!0,d.position.set(u.x+(f.x-u.x)*c/g,Xn,u.z+(f.z-u.z)*c/g),h=a}}var IS={easy:{err:.22,react:.6,lead:.4,dodge:.2},normal:{err:.11,react:.35,lead:.75,dodge:.5},hard:{err:.05,react:.18,lead:1,dodge:.85}},FS={shroom:.5,beetle:.72,wasp:.82,roly:.62,hopper:.6};function Uc(n="normal"){return{S:IS[n],temper:D()<.55?"careful":"bold",path:null,pathT:0,gx:null,gz:null,mode:"idle",target:null,seenT:0,mem:new Map,strafe:D()<.5?-1:1,strafeT:D(.6,1.6),thinkT:0,holdX:0,holdZ:0,stuck:0,lx:0,lz:0}}var ni=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z);function bn(n,e,t,i){let s=n.bot;if(s.pathT-=i,(!s.path||s.pathT<=0||Math.hypot((s.gx??1e9)-e,(s.gz??1e9)-t)>1.2)&&(s.path=bd(n.x,n.z,e,t)?[{x:e,z:t}]:jm(n.x,n.z,e,t),s.gx=e,s.gz=t,s.pathT=D(.5,.9)),!s.path||!s.path.length)return[0,0];let r=s.path[0];for(;s.path.length>1&&Math.hypot(r.x-n.x,r.z-n.z)<.45;)s.path.shift(),r=s.path[0];let o=r.x-n.x,a=r.z-n.z,l=Math.hypot(o,a);return l<.25?[0,0]:[o/l,a/l]}function zg(n,e){let t=n.bot,i=n.H,s=n.inp,r=y.match;if(!n.alive||!r)return;let o=y.time,a=null,l=-1e9;for(let u of y.fighters){if(!u.alive||u.team===n.team)continue;if(vo(n,u))t.mem.set(u.id,{x:u.x,z:u.z,t:o,o:u});else continue;let g=-ni(n,u)+(u.gems||0)*1.2+(y.ball&&y.ball.holder===u?6:0)+(u.power||0)*.5+(1-u.hp/u.max)*4+(u===t.target?2:0);g>l&&(l=g,a=u)}a!==t.target?(t.target=a,t.seenT=0):t.seenT+=e;let c=t.target;t.shootAt=null;let h=0,d=0;t.kick=null,r.mode==="br"?[h,d]=US(n,t,c,e):r.mode==="ball"?[h,d]=DS(n,t,c,e):[h,d]=zS(n,t,c,e),NS(n,t,c,h,d,e),y.ball&&y.ball.holder===n&&(s.fire=s.sup=!1,t.kick&&(s.tx=t.kick.x,s.tz=t.kick.z,s.aim=Math.atan2(t.kick.x-n.x,t.kick.z-n.z),t.kick.sup&&n.charge>=1?s.sup=!0:s.fire=!0))}function Ig(n,e,t){if(Mn(n.x,n.z,e,t)>=0)return!1;let i=e-n.x,s=t-n.z,r=i*i+s*s||1;for(let o of y.fighters){if(!o.alive||o.team===n.team)continue;let a=$e(((o.x-n.x)*i+(o.z-n.z)*s)/r,0,1),l=n.x+i*a-o.x,c=n.z+s*a-o.z;if(a>.05&&l*l+c*c<1.2*1.2)return!1}return!0}function DS(n,e,t,i){let s=y.ball,r=y.match,o=y.time;if(!s||r.resetT>0)return[0,0];let a=wa(n.team),l=wa(1-n.team),c=y.fighters.filter(v=>v.team===n.team&&v.alive),h=s.holder,d=v=>Math.hypot(l.x-v.x,l.z-v.z);if(h===n){e.mode="carry";let v=l.x+(D()<.5?-1:1)*D(.8,2.6),_=d(n),M=Ig(n,v,l.z);if(_<9.5&&M)return e.kick={x:v,z:l.z,sup:n.charge>=1&&_>6},[0,0];if(y.fighters.some(b=>b.alive&&b.team!==n.team&&Math.hypot(b.x-n.x,b.z-n.z)<3.5)&&o>(e.passT||0)){let b=c.filter(R=>R!==n&&d(R)<_+2&&Math.hypot(R.x-n.x,R.z-n.z)<12&&Ig(n,R.x,R.z)).sort((R,F)=>d(R)-d(F))[0];if(b)return e.kick={x:b.x+b.vx*.35,z:b.z+b.vz*.35},e.passT=o+1.2,[0,0];if(_<14&&M)return e.kick={x:v,z:l.z,sup:n.charge>=1},[0,0]}return bn(n,l.x,l.z,i)}let u=c.slice().sort((v,_)=>Math.hypot(v.x-s.x,v.z-s.z)-Math.hypot(_.x-s.x,_.z-s.z)),f=u.indexOf(n),g=Math.hypot(s.x-n.x,s.z-n.z);if(!h&&(f===0||f===1&&g<7))return e.mode="ball",bn(n,s.x+s.vx*.3,s.z+s.vz*.3,i);if(h&&h.team!==n.team&&(f<=1||Math.hypot(h.x-a.x,h.z-a.z)<10))return e.mode="press",bn(n,h.x,h.z,i);if(n.slot===0){if(!h&&Math.hypot(s.x-a.x,s.z-a.z)<8)return e.mode="ball",bn(n,s.x,s.z,i);e.mode="guard";let v=.16;return bn(n,a.x+(s.x-a.x)*v,a.z+(s.z-a.z)*v,i)}e.mode="support";let x=n.slot===1?-1:1,m=s.x+(l.x-s.x)*.45+x*4,p=s.z+(l.z-s.z)*.45;return bn(n,$e(m,-U.hx+2,U.hx-2),p,i)}function zS(n,e,t,i){let s=n.H,r=y.match,o=y.time,a=r.count[n.team],l=r.count[1-n.team],c=U.spawns[n.team][1]||U.spawns[n.team][0];if(e.thinkT-=i,e.thinkT<=0){e.thinkT=D(.2,.35);let u=n.hp<n.max*.42;n.gems>=3&&u?e.mode="retreat":r.cd&&r.cd.team===n.team&&n.gems>0?e.mode=t&&ni(n,t)<s.attack.range*.8?"fight":"hold":u&&t&&ni(n,t)<6&&n.hp<t.hp?e.mode="retreat":t&&ni(n,t)<s.attack.range*1.35?e.mode="fight":y.pickups.length&&!(r.cd&&r.cd.team===n.team)?e.mode="collect":r.cd&&r.cd.team!==n.team?e.mode="hunt":e.mode="patrol"}let h=0,d=0;if(e.mode==="retreat"||e.mode==="hold"){let u=c.x+(n.slot-1)*2.5,f=c.z+(n.team===0?-3:3);[h,d]=bn(n,u,f,i),Math.hypot(n.x-u,n.z-f)<1.5&&(h=Math.sin(o*1.3+n.id)*.4,d=0)}else if(e.mode==="collect"){let u=null,f=1e9;for(let g of y.pickups){let x=Math.hypot(g.x-n.x,g.z-n.z)+(g.landed?0:1);x<f&&(f=x,u=g)}u&&([h,d]=bn(n,u.x,u.z,i))}else if(e.mode==="hunt"){let u=null;for(let p of y.fighters)p.alive&&p.team!==n.team&&(!u||p.gems>u.gems)&&(u=p);let f=u&&e.mem.get(u.id),g=U.mine||{x:0,z:0},x=f&&o-f.t<4?f.x:g.x,m=f&&o-f.t<4?f.z:g.z+(n.team===0?-4:4);[h,d]=bn(n,x,m,i)}else if(e.mode==="patrol"){let u=n.team===0?1:-1,f=U.mine||{x:0,z:0},g=f.x+(n.slot-1)*3.2,x=f.z+u*(2.5+(n.slot===1?0:1.5));[h,d]=bn(n,g,x,i)}return[h,d]}var Fg=n=>n.hp*(1+.15*(n.power||0)),cr=(n,e,t)=>Math.hypot(n,e)<t;function Jd(n,e,t,i=7){let s=null,r=1e9;for(let o=0;o<22;o++){let a=D(0,Pe),l=D(0,i),c=n+Math.sin(a)*l,h=e+Math.cos(a)*l;if(!cr(c,h,t))continue;let d=gi(c,h);if(d!=="."&&d!=='"')continue;let u=l+(d==='"'?-6:0);if(d==="."){let f=0;for(let[g,x]of[[1.6,0],[-1.6,0],[0,1.6],[0,-1.6]])gi(c+g,h+x)==="#"&&f++;u-=f*1.5}u<r&&(r=u,s={x:c,z:h})}return s}function US(n,e,t,i){let s=n.H,r=y.match,o=y.time,a=P0(),l=Math.min(a,L0(8)),c=Math.hypot(n.x,n.z),h=e.temper==="bold";if(e.holdFire=!1,e.thinkT-=i,e.thinkT<=0){e.thinkT=D(.25,.4),e.crate=null,e.pk=null;let u=t?ni(n,t):1e9,f=s.attack.range,g=o-(n.hurtAt||-9)<1.5&&n.lastHitBy&&n.lastHitBy.alive,x=r.t<Wt.calm*(h?.75:1.1)&&!g,m=r.alive<=4,p=t?Fg(n)/Math.max(1,Fg(t)):9,v=t&&(t.x-n.x)*t.vx+(t.z-n.z)*t.vz>0&&Math.hypot(t.vx,t.vz)>2,_=t&&o-(t.hurtAt||-9)<1.5&&t.lastHitBy&&t.lastHitBy!==n&&t.lastHitBy.alive&&ni(t,t.lastHitBy)<12,M=x&&t&&!g;if(e.quiet=M,c>l-2.5)e.mode="zone";else if(n.hp<n.max*.4&&(!t||u>f*.6))e.mode="heal";else if(t&&g&&n.lastHitBy===t&&p<(x?1.3:.7)&&u>3)e.mode="retreat";else if(M){let S=Dg(n,l);e.mode=S?S.pk?"collect":"crate":"hold",S&&(e.pk=S.pk,e.crate=S.crate)}else if(t&&_&&p<2.5&&t.hp>t.max*.35)e.mode="wait";else if(t&&u<f*(x?.6:1.3)&&!(v&&u>f*.9)&&(p>(r.alive<=2?.8:m?1.15:h?1:1.35)||g||u<f*.45))e.mode="fight";else if(t&&u<f*1.3)e.mode="avoid";else{let S=Dg(n,l);if(S&&(S.pk||!m))e.mode=S.pk?"collect":"crate",e.pk=S.pk,e.crate=S.crate;else{let b=null;for(let R of e.mem.values())R.o.alive&&o-R.t<5&&cr(R.x,R.z,l)&&(!b||R.t>b.t)&&(b=R);b&&!x&&n.hp>n.max*.8&&(r.alive<=2||h&&(n.power||0)>=4&&r.alive<=6&&!m)?(e.mode="hunt",e.huntX=b.x,e.huntZ=b.z):e.mode="hold"}}e.mode!==e.lastMode&&(e.spot=null,e.lastMode=e.mode)}let d=Math.max(2,l-2.5);if(e.noChase=!!t&&!cr(t.x,t.z,l-1),(e.mode==="heal"||e.mode==="hold"||e.mode==="wait"||e.mode==="avoid"||e.quiet)&&(e.holdFire=!0),e.mode==="zone"){if(!e.spot||!cr(e.spot.x,e.spot.z,d)){let u=Math.min(l*.55,c)/(c||1);e.spot=Jd(n.x*u,n.z*u,d,5)||{x:n.x*u,z:n.z*u}}return bn(n,e.spot.x,e.spot.z,i)}if((e.mode==="retreat"||e.mode==="avoid")&&t){let u=ni(n,t)||1;if(!e.spot||o>(e.spotT||0)){let f=n.x+(n.x-t.x)/u*7,g=n.z+(n.z-t.z)/u*7,x=Math.hypot(f,g);x>d&&(f*=d/x,g*=d/x),e.spot=Jd(f,g,d,4)||{x:f,z:g},e.spotT=o+1.5}return bn(n,e.spot.x,e.spot.z,i)}if(e.mode==="heal"||e.mode==="hold"||e.mode==="wait"){if(!e.spot||!cr(e.spot.x,e.spot.z,d)){let u=n.x,f=n.z;if(e.mode==="wait"&&t){let g=ni(n,t)||1,x=n.H.attack.range+2;u=t.x+(n.x-t.x)/g*x,f=t.z+(n.z-t.z)/g*x}if(e.mode==="hold"&&c>l*.7){let g=l*.5/(c||1);u=n.x*g,f=n.z*g}e.spot=Jd(u,f,d)||{x:u,z:f}}return Math.hypot(e.spot.x-n.x,e.spot.z-n.z)>.8?bn(n,e.spot.x,e.spot.z,i):(t||(n.inp.aim+=i*.4),[0,0])}if(e.mode==="collect"&&e.pk&&y.pickups.includes(e.pk))return bn(n,e.pk.x,e.pk.z,i);if(e.mode==="crate"&&e.crate&&e.crate.alive){let u=e.crate,f=Math.hypot(u.x-n.x,u.z-n.z),g=Math.min(s.attack.range*.7,6),x=Mn(n.x,n.z,u.x,u.z),m=n.x+(u.x-n.x)*x,p=n.z+(u.z-n.z)*x,v=x<0||Ti(m+(u.x-n.x)/(f||1)*.08)===u.c&&Ai(p+(u.z-n.z)/(f||1)*.08)===u.r;return f<g+.5&&(v||s.attack.kind==="lob")?(e.shootAt=u,[Math.sin(o*1.7+n.id)*.3,Math.cos(o*1.3+n.id)*.3]):bn(n,u.x,u.z,i)}if(e.mode==="hunt"){if(Math.hypot(e.huntX-n.x,e.huntZ-n.z)>1.2)return bn(n,e.huntX,e.huntZ,i);e.thinkT=0}return[0,0]}function Dg(n,e){let t=y.fighters.filter(l=>l.alive&&l!==n&&n.bot.mem.has(l.id)&&y.time-n.bot.mem.get(l.id).t<3),i=(l,c,h)=>!t.some(d=>Math.hypot(d.x-l,d.z-c)<h-.5),s=null,r=14;for(let l of y.pickups){let c=Math.hypot(l.x-n.x,l.z-n.z);c<r&&cr(l.x,l.z,e-1.5)&&i(l.x,l.z,c)&&(r=c,s=l)}if(s)return{pk:s};let o=null,a=18;for(let l of U.crates){if(!l.alive)continue;let c=Math.hypot(l.x-n.x,l.z-n.z);c<a&&cr(l.x,l.z,e-1.5)&&i(l.x,l.z,c)&&(a=c,o=l)}return o?{crate:o}:null}function NS(n,e,t,i,s,r){let o=n.H,a=n.inp,l=y.time;if(t&&(e.mode==="fight"||ni(n,t)<o.attack.range)){let u=ni(n,t),f=o.attack.range*FS[n.hero],g=(t.x-n.x)/(u||1),x=(t.z-n.z)/(u||1);if(e.strafeT-=r,e.strafeT<=0&&(e.strafeT=D(.5,1.4),e.strafe=-e.strafe),e.mode==="fight"){let m=0,p=0;e.noChase||(u>f+1||!hc(n.x,n.z,t.x,t.z)&&n.hero!=="beetle"?[m,p]=bn(n,t.x,t.z,r):u<f-1.5&&(m=-g,p=-x)),i=m*.9+-x*e.strafe*.7,s=p*.9+g*e.strafe*.7}}if(Math.random()<e.S.dodge)for(let u of y.shots){if(u.team===n.team)continue;let f=n.x-u.x,g=n.z-u.z,x=Math.hypot(u.vx,u.vz),m=(f*u.vx+g*u.vz)/x;if(m<0||m>6)continue;let p=(f*u.vz-g*u.vx)/x;if(Math.abs(p)<1.1){let v=p>=0?1:-1;i+=u.vz/x*v*1.4,s+=-u.vx/x*v*1.4;break}}for(let u of y.puddles)if(u.team!==n.team){let f=n.x-u.x,g=n.z-u.z,x=Math.hypot(f,g);x<u.r+.5&&(i+=f/(x||1)*1.5,s+=g/(x||1)*1.5)}let c=Math.hypot(n.x-e.lx,n.z-e.lz);e.lx=n.x,e.lz=n.z,Math.hypot(i,s)>.3&&c<.01?e.stuck+=r:e.stuck=Math.max(0,e.stuck-r),e.stuck>.6&&(e.path=null,i+=D(-1,1),s+=D(-1,1),e.stuck>1.2&&(e.stuck=0));let h=o.attack.scope;n.scope=!!(h&&t&&Bi(n)&&ni(n,t)>7&&ni(n,t)<o.attack.range*h.range*.95&&hc(n.x,n.z,t.x,t.z)&&l-(n.hurtAt||-9)>1&&!(y.ball&&y.ball.holder===n)),n.scope&&(i*=.2,s*=.2);let d=Math.hypot(i,s);if(d>1&&(i/=d,s/=d),a.mx=i,a.mz=s,d>.1&&(a.aim=Math.atan2(i,s)),a.fire=a.sup=!1,t){let u=ni(n,t),f=o.attack,g=o.super,x=f.speed||f.range/(f.flight||.8),m=(f.kind==="lob"?f.flight*(.65+.35*u/f.range):u/x)*e.S.lead,p=t.x+t.vx*m,v=t.z+t.vz*m,_=e.S.err*(1+(t.inGrass?.5:0)),M=Math.atan2(p-n.x,v-n.z)+D(-_,_);p=n.x+Math.sin(M)*u,v=n.z+Math.cos(M)*u,a.aim=M,a.tx=p,a.tz=v;let S=hc(n.x,n.z,t.x,t.z),b=y.time-(n.hurtAt||-9)<1.5,R=e.seenT>e.S.react&&(!e.holdFire||b||!e.quiet&&u<f.range*.55);if(R&&n.charge>=1&&(g.kind==="fan"&&u<g.range*.75&&S||g.kind==="barrage"&&u<g.range||g.kind==="beam"&&u<g.range*.9||g.kind==="bounce"&&u<11||g.kind==="frenzy"&&u<f.range&&S)&&(a.sup=!0),!a.sup&&R&&Bi(n)){let F=u<f.range*(f.kind==="fan"?.85:f.kind==="lob"?1:.95)*(n.scope?f.scope.range:1),E=n.scope&&n.scopeT<f.scope.time*(e.S.react>.3?.7:.95),T=n.frenzyT>0||(n.ammo>=2||u<f.range*.6||t.hp<t.max*.4)&&!(f.kind==="burst"&&(n.bloom||0)>.6&&u>f.range*.5);if(F&&(S||f.kind==="lob")&&T&&!E)a.fire=!0;else if(f.kind==="bounce"&&!S&&u<f.range*.8&&T&&l>(e.bankT||0)){e.bankT=l+.3;let z=$d(n,t,f);z!==null&&(a.aim=z,a.tx=n.x+Math.sin(z)*6,a.tz=n.z+Math.cos(z)*6,a.fire=!0)}}}else if(e.shootAt){let u=e.shootAt;a.aim=Math.atan2(u.x-n.x,u.z-n.z),a.tx=u.x,a.tz=u.z,Bi(n)&&n.ammo>=1&&(a.fire=!0)}else if(n.hero==="beetle"&&!e.holdFire&&Bi(n)&&n.ammo>=2.5)for(let u of e.mem.values()){if(!u.o.alive||l-u.t>2.5||l-u.t<.4)continue;if(Math.hypot(u.x-n.x,u.z-n.z)<o.attack.range&&(cc(u.x,u.z)||!ao(n.x,n.z,u.x,u.z))){a.aim=Math.atan2(u.x-n.x,u.z-n.z),a.tx=u.x,a.tz=u.z,a.fire=!0;break}}}var Mo={goal:10,hold:15,interval:5,first:4,dur:180},ii=null,Ug=new Cl(.2,0),kS=mt({color:"#B583FF",emissive:"#8A4DFF",emissiveIntensity:1.6,roughness:.2,flatShading:!0}),OS=new Fe({color:new te("#E9D8FF").multiplyScalar(2),toneMapped:!1}),BS=(()=>{let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d"),t=e.createRadialGradient(32,32,2,32,32,30);return t.addColorStop(0,"rgba(0,0,0,.45)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new vn(n)})(),kg=new Gt(.7,.7);kg.rotateX(-Math.PI/2);var HS=new Fe({map:BS,transparent:!0,depthWrite:!1});function jd(n=!0){if(ii&&(ce.remove(ii.g),ii=null),!U.mine||!n)return;let e=new xt;e.position.set(U.mine.x,0,U.mine.z);let t=new ne(new Vt(.95,1.35,.32,24),mt({color:"#6E5A3E",roughness:.95}));t.position.y=.12,t.receiveShadow=t.castShadow=!0,e.add(t);let i=new ne(new Di(.95,.16,8,28),mt({color:"#5E9E3A",roughness:.9}));i.rotation.x=Math.PI/2,i.position.y=.27,e.add(i);let s=document.createElement("canvas");s.width=s.height=256;let r=s.getContext("2d"),o=r.createRadialGradient(128,128,10,128,128,128);o.addColorStop(0,"#F4E8FF"),o.addColorStop(.25,"#B58AFF"),o.addColorStop(.6,"#5A2AB8"),o.addColorStop(.9,"#2A0F5A"),o.addColorStop(1,"#1A0A30"),r.fillStyle=o,r.fillRect(0,0,256,256),r.globalCompositeOperation="lighter";for(let x=0;x<5;x++){r.strokeStyle="rgba(200,160,255,.35)",r.lineWidth=6,r.beginPath();for(let m=0;m<2.6;m+=.05){let p=18+m*40;r.lineTo(128+Math.cos(m+x*1.256)*p,128+Math.sin(m+x*1.256)*p)}r.stroke()}let a=new vn(s);a.colorSpace=gt;let l=new Fe({map:a,color:"#FFFFFF"}),c=new ne(new Vn(.78,32),l);c.rotation.x=-Math.PI/2,c.position.y=.29,e.add(c);let h=mt({color:"#F1E6FF",roughness:.6}),d=mt({color:"#B07BFF",emissive:"#7A3DFF",emissiveIntensity:.9,roughness:.4}),u=new Vt(.05,.07,1,8),f=new Ot(1,14,8,0,Pe,0,Math.PI/2),g=[];for(let x=0;x<9;x++){let m=x/9*Pe+D(-.15,.15),p=D(1.2,1.5),v=D(.25,.55),_=new ne(u,h);_.scale.set(1,v,1),_.position.set(Math.cos(m)*p,v/2,Math.sin(m)*p),_.castShadow=!0,e.add(_);let M=new ne(f,d);M.scale.set(D(.14,.22),D(.1,.16),D(.14,.22)),M.position.set(Math.cos(m)*p,v,Math.sin(m)*p),M.castShadow=!0,e.add(M),g.push(M)}ce.add(e),ii={g:e,hole:c,holeMat:l,caps:g,pulse:0}}function Og(n,e,t,i,s=4){let r=new ne(Ug,kS);r.castShadow=!0;let o=new ne(Ug,OS);o.scale.setScalar(.5),r.add(o);let a=new ne(kg,HS);a.renderOrder=1,ce.add(r,a),y.pickups.push({x:n,z:e,y:.5,vx:t,vz:i,vy:s,t:0,m:r,sh:a,landed:!1,ph:D(0,Pe)})}function Bg(n){let e=y.pickups[n];ce.remove(e.m,e.sh),y.pickups.splice(n,1)}function Qd(){for(let n=y.pickups.length-1;n>=0;n--)Bg(n)}function Hg(){Qd(),y.match={mode:"spores",t:0,dur:Mo.dur,over:!1,winner:null,respawn:!0,count:[0,0],cd:null,mineT:Mo.first,hot:!1,spawned:0}}Dt("kill",n=>{if(!y.match||y.match.mode!=="spores"||!n.gems)return;let e=n.gems;n.gems=0;for(let t=0;t<e;t++){let i=t/e*Pe+D(-.3,.3),s=D(1.5,3.2);Og(n.x,n.z,Math.sin(i)*s,Math.cos(i)*s,D(3,5))}Se("gem_drop",n)});var Ta={x:0,z:0};function Gg(n,e){let t=y.match;if(!t||t.mode!=="spores")return;if(ii){ii.pulse=Math.max(0,ii.pulse-n*1.5);let r=.9+Math.sin(e*3)*.12+ii.pulse*1.2;ii.holeMat.color.setScalar(r),ii.hole.rotation.z=e*.6,Math.random()<n*6&&Et.emit({x:U.mine.x+D(-.5,.5),y:.35,z:U.mine.z+D(-.5,.5),vx:0,vy:D(.5,1.2),vz:0,life:1.1,t:0,s0:.1,s1:.02,r:.75,g:.55,b:1,a:1,grav:0,drag:.3,soft:1}),ii.caps.forEach((o,a)=>{o.position.y+=Math.sin(e*2+a)*8e-4})}if(y.state==="play"&&!t.over&&(t.t+=n,t.mineT-=n,t.mineT<=0)){t.mineT=Mo.interval,t.spawned++;let r=D(0,Pe),o=D(.8,2.2);Og(U.mine.x,U.mine.z,Math.sin(r)*o,Math.cos(r)*o,5.5),ii&&(ii.pulse=1),pt(Et,U.mine.x,.5,U.mine.z,{n:16,color:"#C9A0FF",sp:2.5,upMin:.5,vy:2,life:.7,s0:.25,s1:.04,soft:!0}),Oi(U.mine.x,U.mine.z,.5,2.2,.6,"#B583FF"),Se("respawn",U.mine,.6)}for(let r=y.pickups.length-1;r>=0;r--){let o=y.pickups[r];o.t+=n,o.landed||(o.vy-=16*n,o.x+=o.vx*n,o.z+=o.vz*n,o.y+=o.vy*n,Ta.x=o.x,Ta.z=o.z,ki(Ta,.25)&&(o.x=Ta.x,o.z=Ta.z,o.vx*=-.4,o.vz*=-.4),o.y<.45&&(o.y=.45,Math.abs(o.vy)>2?(o.vy=-o.vy*.4,o.vx*=.6,o.vz*=.6):o.landed=!0));let a=o.landed?Math.sin(e*3+o.ph)*.08:0;if(o.m.position.set(o.x,o.y+a,o.z),o.m.rotation.y=e*2+o.ph,o.m.rotation.x=.3,o.sh.position.set(o.x,.04,o.z),Math.random()<n*3&&Et.emit({x:o.x+D(-.2,.2),y:o.y,z:o.z+D(-.2,.2),vx:0,vy:.5,vz:0,life:.6,t:0,s0:.08,s1:.01,r:.75,g:.6,b:1,a:1,grav:0,drag:.5,soft:1}),!(o.t<.35||y.state!=="play")){for(let l of y.fighters)if(!(!l.alive||(l.x-o.x)**2+(l.z-o.z)**2>.85*.85)){l.gems++,Bg(r),pt(Et,l.x,1,l.z,{n:10,color:"#C9A0FF",sp:2,vy:1.5,life:.4,s0:.16,s1:.02,soft:!0}),Se("gem",l,l===y.me?1:.7,1+Math.min(10,l.gems)*.03),ft("pickup",l);break}}}t.count[0]=t.count[1]=0;for(let r of y.fighters)r.alive&&(t.count[r.team]+=r.gems);if(t.over)return;let i=t.count,s=i[0]>=Mo.goal&&i[0]>i[1]?0:i[1]>=Mo.goal&&i[1]>i[0]?1:-1;if(s<0)t.cd&&(ft("countdownStop",t.cd.team),t.cd=null);else if(!t.cd||t.cd.team!==s)t.cd={team:s,t:Mo.hold},ft("countdownStart",s);else if(y.state==="play"){let r=Math.ceil(t.cd.t);if(t.cd.t-=n,Math.ceil(t.cd.t)!==r&&t.cd.t>0&&ft("countdownTick",Math.ceil(t.cd.t)),t.cd.t<=0)return Ng(s,"spores")}t.hot=!!t.cd||t.dur-t.t<30,t.t>=t.dur&&!t.cd&&Ng(i[0]>i[1]?0:i[1]>i[0]?1:-1,"time")}function Ng(n,e){let t=y.match;t.over=!0,t.winner=n,t.why=e,ft("matchOver",n,e)}var Nc={day:{name:"\u0414\u0435\u043D\u044C",top:"#3B78C8",hor:"#CFE6F5",hor2:"#A9CBE8",disc:"#FFF4D0",cloud:"#FFFFFF",dir:[-.5,.78,.35],sunC:"#FFF2D8",sunI:2.6,hs:"#BFD8F2",hg:"#5A6E34",hi:.95,fog:"#BCD2DE",exp:1,stars:0},dusk:{name:"\u0417\u0430\u043A\u0430\u0442",top:"#27477E",hor:"#FFB46A",hor2:"#9C7FB0",disc:"#FFA040",cloud:"#F6C6A4",dir:[-.86,.3,.22],sunC:"#FFC88C",sunI:2.5,hs:"#AFC2EC",hg:"#4E5E2C",hi:.8,fog:"#B9A08A",exp:1,stars:0},night:{name:"\u041D\u043E\u0447\u044C",top:"#060D24",hor:"#22355A",hor2:"#1A2848",disc:"#C8D6FF",cloud:"#141C2E",dir:[.35,.72,-.6],sunC:"#A8BEFF",sunI:1.15,hs:"#7090D0",hg:"#1E2A22",hi:.75,fog:"#1C2A40",exp:1.35,stars:1}},ef={summer:"\u041B\u0435\u0442\u043E",autumn:"\u041E\u0441\u0435\u043D\u044C",winter:"\u0417\u0438\u043C\u0430"},Ln={sky:"dusk",season:"summer"};function Aa(){let n=_t.get("tod","rand"),e=_t.get("season","rand");return{sky:Nc[n]?n:is(["day","day","dusk","night"]),season:ef[e]?e:is(["summer","summer","autumn","winter"])}}function bo(n,e){n=Nc[n]?n:"dusk",e=ef[e]?e:"summer",(n!==Ln.sky||!Ln.baked)&&(Cm(Nc[n]),Ln.baked=!0),Ln.sky=n,Ln.season=e,GS(),XS()}function GS(){let n=Ln.season==="winter",e=Ln.season==="autumn";pn.season.value.set(n?1:0,e?1:0,0);let t=Ln.sky==="night"?.32:Ln.sky==="dusk"?1:1.08;for(let i of U.bands||[])i.material.color.copy(i.userData.tint).multiplyScalar(t);U.waterMat&&(U.waterMat.color.set(n?"#D4ECF4":"#2C86A8"),U.waterMat.opacity=n?.96:.9,U.waterMat.roughness=n?.35:.2);for(let i of U.flowers||[])i.visible=!n}var VS=(()=>{let n=document.createElement("canvas");n.width=n.height=32;let e=n.getContext("2d"),t=e.createRadialGradient(16,16,0,16,16,15);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.5,"rgba(255,255,255,.7)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,32,32),new vn(n)})(),WS=(()=>{let n=document.createElement("canvas");n.width=n.height=32;let e=n.getContext("2d");return e.fillStyle="#fff",e.beginPath(),e.ellipse(16,16,13,7,.6,0,Math.PI*2),e.fill(),new vn(n)})(),Nt={pts:null,kind:null,p:null,v:null,ph:null},Pn={x:16,y:9,z:16};function XS(){Nt.pts&&(ce.remove(Nt.pts),Nt.pts.geometry.dispose(),Nt.pts.material.dispose(),Nt.pts=null);let n=Ln.season==="winter"?"snow":Ln.season==="autumn"?"leaves":Ln.sky==="night"?"flies":null;if(Nt.kind=n,!n)return;let e=(n==="snow"?160:n==="leaves"?60:50)*(ct?.5:1)|0,t=new Float32Array(e*3),i=new Float32Array(e*3),s=new te;Nt.v=new Float32Array(e*3),Nt.ph=new Float32Array(e);for(let l=0;l<e;l++)t[l*3]=D(-Pn.x,Pn.x),t[l*3+1]=D(0,Pn.y),t[l*3+2]=D(-Pn.z,Pn.z),Nt.ph[l]=D(0,100),n==="snow"?(s.set("#FFFFFF"),Nt.v[l*3+1]=-D(.8,1.6)):n==="leaves"?(s.set(is(["#E8A33C","#C8562A","#D9C24A","#B5452E"])),Nt.v[l*3+1]=-D(.5,1)):(s.set("#D8FF7A"),t[l*3+1]=D(.3,3)),i[l*3]=s.r,i[l*3+1]=s.g,i[l*3+2]=s.b;let r=new vt;r.setAttribute("position",new ot(t,3)),r.setAttribute("color",new ot(i,3));let o=n==="flies",a=new er({size:n==="snow"?.09:n==="leaves"?.16:.14,map:n==="leaves"?WS:VS,vertexColors:!0,transparent:!0,depthWrite:!1,alphaTest:n==="leaves"?.4:0,blending:o?un:Ii,toneMapped:!o,fog:!o});o&&a.color.setScalar(2.2),Nt.pts=new Xr(r,a),Nt.pts.frustumCulled=!1,Nt.pts.renderOrder=5,ce.add(Nt.pts)}function Vg(n,e){if(!Nt.pts)return;let t=Nt.pts.geometry.attributes.position,i=t.array,s=t.count,r=Be.position.x,o=Be.position.z;for(let a=0;a<s;a++){let l=a*3,c=Nt.ph[a];Nt.kind==="snow"?(i[l]+=Math.sin(e*.8+c)*.25*n,i[l+1]+=Nt.v[l+1]*n,i[l+2]+=Math.cos(e*.7+c)*.2*n):Nt.kind==="leaves"?(i[l]+=(Math.sin(e*1.6+c)*.9+.3)*n,i[l+1]+=Nt.v[l+1]*n,i[l+2]+=Math.cos(e*1.3+c)*.6*n):(i[l]+=Math.sin(e*.5+c)*.5*n,i[l+1]+=Math.sin(e*.9+c*2)*.25*n,i[l+2]+=Math.cos(e*.45+c)*.5*n);let h=i[l]-r,d=i[l+2]-o;h>Pn.x?i[l]-=Pn.x*2:h<-Pn.x&&(i[l]+=Pn.x*2),d>Pn.z?i[l+2]-=Pn.z*2:d<-Pn.z&&(i[l+2]+=Pn.z*2),i[l+1]<0?i[l+1]+=Pn.y:i[l+1]>Pn.y&&(i[l+1]-=Pn.y)}t.needsUpdate=!0,Nt.kind==="flies"&&(Nt.pts.material.opacity=.75+Math.sin(e*3)*.25)}var Wg=()=>Nc[Ln.sky].name+", "+ef[Ln.season].toLowerCase();var Eo=new P,Zg='<span class="gem-ico"></span>';function sf(n){let e=document.createElement("div");e.className="tag "+mo(n),e.innerHTML=`<div class="gm" hidden>${Zg}<b></b></div><div class="tn">${dn(n.name)}</div><div class="hpb"><s></s><u></u><b></b></div>`+(n===y.me?'<div class="am">'+"<i><u></u></i>".repeat(ei)+"</div>":"")+'<i class="sup"></i><i class="spot">!</i>',J("hud-world").appendChild(e),n.tag={el:e,gm:e.querySelector(".gm"),gmb:e.querySelector(".gm b"),u:e.querySelector(".hpb u"),s:e.querySelector(".hpb s"),b:e.querySelector(".hpb b"),am:[...e.querySelectorAll(".am i")],last:{}}}function Kg(){let n=innerWidth,e=innerHeight;for(let t of y.fighters){let i=t.tag;if(!i)continue;if(!(t.alive&&t.seen&&y.state!=="menu"&&J("end").hidden&&t!==y.me)){i.last.vis!==!1&&(i.el.style.display="none",i.last.vis=!1);continue}if(Eo.set(t.V.root.position.x,t.H.height+(t.H.hover||0)+.45,t.V.root.position.z).project(Be),Eo.z>1||Math.abs(Eo.x)>1.2||Math.abs(Eo.y)>1.2){i.last.vis!==!1&&(i.el.style.display="none",i.last.vis=!1);continue}i.last.vis!==!0&&(i.el.style.display="",i.last.vis=!0);let r=Be.position.distanceTo(t.V.root.position),o=Math.max(.5,Math.min(1.05,7/r));i.el.style.transform=`translate(${((Eo.x*.5+.5)*n).toFixed(1)}px,${((-Eo.y*.5+.5)*e).toFixed(1)}px) translate(-50%,-100%) scale(${o.toFixed(2)})`;let a=y.me&&t.team!==y.me.team&&Hd(y.me.team,t)&&!ao(y.me.x,y.me.z,t.x,t.z);i.last.sp!==a&&(i.el.classList.toggle("spotted",a),i.last.sp=a);let l=Math.max(0,Math.ceil(t.hp)),c=(l/t.max*100).toFixed(1)+"%";i.last.hp!==l&&(i.u.style.width=c,i.s.style.width=c,i.b.textContent=l,i.last.hp=l);let h=y.match&&y.match.mode==="br"?t.power||0:t.gems;i.last.gems!==h&&(i.gm.hidden=!h,i.gmb.textContent=h,i.last.gems=h);let d=t.charge>=1;i.last.ready!==d&&(i.el.classList.toggle("ready",d),i.last.ready=d),i.am.length&&i.am.forEach((u,f)=>{let g=$e(t.ammo-f,0,1);u.firstChild.style.width=(g*100).toFixed(0)+"%",u.classList.toggle("full",g>=1)})}}var Xg=n=>(n=Math.max(0,Math.ceil(n)),Math.floor(n/60)+":"+String(n%60).padStart(2,"0")),tf=null;function Oc(){let n=y.match,e=y.me;if(!n||!e)return;let t=e.team,i=n.mode==="br";if(i){hs("sc0",n.alive),hs("sc1",e.power||0);let p=Wt.wait-n.t;hs("timer",p>0?Xg(p):"\u2601"),hs("mode-lbl",Mt(p>0?"\u0422\u0443\u043C\u0430\u043D":n.fog.r>Wt.r1?"\u0422\u0443\u043C\u0430\u043D \u0438\u0434\u0451\u0442":"\u0424\u0438\u043D\u0430\u043B"))}else hs("sc0",n.count[t]),hs("sc1",n.count[1-t]),hs("timer",n.golden?"\u26BD":Xg(n.dur-n.t)),hs("mode-lbl",Mt(n.mode==="ball"?n.golden?"\u0417\u043E\u043B\u043E\u0442\u043E\u0439 \u0433\u043E\u043B":"\u0414\u043E\u0436\u0434\u0435\u0432\u0438\u043A\u0431\u043E\u043B":"\u0421\u043F\u043E\u0440\u044B"));let s=J("cdown");if(n.cd&&!n.over&&!i){s.hidden=!1;let p=n.cd.team===t,v=Math.ceil(n.cd.t);s.classList.toggle("foe",!p),v!==tf&&(J("cd-n").textContent=v,s.classList.remove("pulse"),s.offsetWidth,s.classList.add("pulse"),tf=v),J("cd-t").textContent=p?Mt("\u0414\u0435\u0440\u0436\u0438\u043C \u0441\u043F\u043E\u0440\u044B!"):Mt("\u0412\u0440\u0430\u0433 \u0443\u043D\u043E\u0441\u0438\u0442 \u0441\u043F\u043E\u0440\u044B!")}else s.hidden=!0,tf=null;let r=e.charge,o=r>=1;J("sp-ring").style.strokeDashoffset=(214*(1-r)).toFixed(1),J("superpc").classList.toggle("ready",o),J("tsp-ring").style.strokeDashoffset=(277*(1-r)).toFixed(1),J("b-sup").classList.toggle("ready",o);let a=J("ammopc").children;for(let p=0;p<a.length;p++){let v=$e(e.ammo-p,0,1);a[p].firstChild.style.width=(v*100).toFixed(0)+"%",a[p].classList.toggle("full",v>=1)}qS(e);let l=Math.max(0,Math.ceil(e.hp)),c=l+"/"+e.id;Oc.hp!==c&&(Oc.hp=c,J("mehp").firstChild.style.width=(l/e.max*100).toFixed(1)+"%",J("mehp").lastChild.textContent=l);let h=e.H.attack.scope,d=J("scope"),u=!!h&&Ee.zoom>.5&&e.alive;if(d.hidden===u&&(d.hidden=!u),u){let p=$e((e.scopeT||0)/h.time,0,1),v=p.toFixed(2);d._k!==v&&(d._k=v,d.style.setProperty("--k",v),d.classList.toggle("full",p>=1),hs("sc-hint",Mt(p>=1?"\u0417\u0430\u0440\u044F\u0436\u0435\u043D\u043E!":"\u041F\u0440\u0438\u0446\u0435\u043B")))}let g="xhair "+(Ct.foe?Ct.inRange?"foe":"far":"")+(e.ammo<1?" empty":"")+(e.H.attack.kind==="lob"?" lob":""),x=J("xhair");x.className!==g&&(x.className=g),x.hidden=!e.alive;let m=J("dead");!e.alive&&!n.over&&n.respawn?(m.hidden=!1,J("dead-n").textContent=Math.max(1,Math.ceil(e.respawnT))):m.hidden=!0}var qg={};function hs(n,e){e=String(e),qg[n]!==e&&(qg[n]=e,J(n).textContent=e)}function qS(n){if(!Kt)return;let e=J("tammo");if(!e.childElementCount){let t="";for(let i=0;i<ei;i++)t+=`<path class="tammo-seg" stroke="rgba(0,0,0,.35)" d="${Yg(i)}"/><path class="tammo-seg" id="tam${i}" stroke="#FFC93C" d="${Yg(i)}"/>`;e.innerHTML=t}for(let t=0;t<ei;t++){let i=$e(n.ammo-t,0,1),s=J("tam"+t),r=s._len||(s._len=s.getTotalLength());s.style.strokeDasharray=r,s.style.strokeDashoffset=(r*(1-i)).toFixed(1),s.setAttribute("stroke",i>=1?"#FFC93C":"#FF8A3D")}}function Yg(n){let s=-Math.PI/2+n/ei*Math.PI*2+.12,r=-Math.PI/2+(n+1)/ei*Math.PI*2-.12;return`M${(60+Math.cos(s)*54).toFixed(1)} ${(60+Math.sin(s)*54).toFixed(1)}A54 54 0 0 1 ${(60+Math.cos(r)*54).toFixed(1)} ${(60+Math.sin(r)*54).toFixed(1)}`}function Bc(n,e){let t=document.createElement("div");t.className=e||"",t.innerHTML=n;let i=J("feed");for(i.appendChild(t);i.children.length>4;)i.firstChild.remove();setTimeout(()=>t.remove(),4200)}var kc=0;function En(n,e,t,i=1.8){let s=J("ann");s.className="ann "+(t||""),s.innerHTML="<b>"+dn(Mt(n))+"</b>"+(e?"<span>"+dn(Mt(e))+"</span>":""),s.offsetWidth,s.classList.add("show"),s.style.opacity=1,kc=i}function $g(n){kc>0&&(kc-=n,kc<=0&&(J("ann").style.opacity=0))}function Jg(n,e){let t=J("heroes");t.innerHTML=Ni.map(o=>{let a=Qn[o];return`<button class="hcard${o===n?" sel":""}" data-h="${o}">${sc[o]}<b>${dn(a.name)}</b><small>${dn(a.role)}</small></button>`}).join("");for(let o of t.querySelectorAll(".hcard"))o.onclick=()=>e(o.dataset.h);let i=Qn[n],s=(o,a,l,c)=>`<div class="stat"><span>${o}</span><i><u style="width:${$e(a/l*100,6,100).toFixed(0)}%"></u></i><em>${c}</em></div>`,r=i.attack.kind==="fan"||i.attack.kind==="burst"?i.attack.dmg*i.attack.count:i.attack.kind==="needle"?i.attack.dmgFar:i.attack.dmg;J("hero-info").innerHTML=`<h3>${dn(i.name)}</h3><div class="sub">${dn(i.species)} \xB7 ${dn(i.role)}</div><p>${dn(i.desc)}</p>`+s("\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435",i.hp,4200,i.hp)+s("\u0423\u0440\u043E\u043D",r,1600,Math.round(r))+s("\u0414\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C",i.attack.range,15,i.attack.range.toFixed(0)+" \u043C")+s("\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C",i.speed-3.5,2,i.speed.toFixed(1))+`<div class="abil"><span class="k">\u2694</span><div><b>${dn(i.attack.name)}</b><small>${dn(YS(i.attack))}</small></div></div><div class="abil"><span class="k s">\u2605</span><div><b>${dn(i.super.name)}</b><small>${dn(i.super.desc)}</small></div></div>`}function YS(n){return n.kind==="fan"?n.count+" \u043A\u0430\u0440\u0442\u0435\u0447\u0438\u043D \u0432\u0435\u0435\u0440\u043E\u043C":n.kind==="lob"?"\u0431\u043E\u043C\u0431\u0430 \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0435\u043D\u044B, \u0433\u043E\u0440\u044F\u0449\u0430\u044F \u043B\u0443\u0436\u0430":n.kind==="bounce"?"\u043E\u0442\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u043E\u0442 \u043A\u0443\u0441\u0442\u043E\u0432 "+n.bounces+" \u0440\u0430\u0437\u0430, \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u0441\u043A\u043E\u043A\u0430 \u0431\u044C\u0451\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435":n.kind==="burst"?"\u043E\u0447\u0435\u0440\u0435\u0434\u044C \u0438\u0437 "+n.count+" \u0437\u0430\u0440\u044F\u0434\u043E\u0432, \u0440\u0430\u0437\u0431\u0440\u043E\u0441 \u0440\u0430\u0441\u0442\u0451\u0442 \u043F\u0440\u0438 \u0441\u0442\u0440\u0435\u043B\u044C\u0431\u0435":"\u0434\u0430\u043B\u044C\u043D\u0438\u0439 \u0432\u044B\u0441\u0442\u0440\u0435\u043B, \u0443\u0440\u043E\u043D \u0440\u0430\u0441\u0442\u0451\u0442 \u0441 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C"}function jg(n){let e=y.me,t=y.match;if(t.mode==="br")return KS(n);J("e-board").classList.remove("br");let i=J("e-title");i.textContent=Mt(n==="win"?"\u041F\u043E\u0431\u0435\u0434\u0430!":n==="lose"?"\u041F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435":"\u041D\u0438\u0447\u044C\u044F"),i.className=n,t.mode==="ball"?J("e-sub").textContent=Mt("\u0421\u0447\u0451\u0442")+" "+t.count[e.team]+" : "+t.count[1-e.team]:J("e-sub").textContent=Mt(t.why==="spores"?t.winner===e.team?"\u0422\u0432\u043E\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0443\u0434\u0435\u0440\u0436\u0430\u043B\u0430 \u0441\u043F\u043E\u0440\u044B.":"\u0412\u0440\u0430\u0433\u0438 \u0443\u0434\u0435\u0440\u0436\u0430\u043B\u0438 \u0441\u043F\u043E\u0440\u044B.":"\u0412\u0440\u0435\u043C\u044F \u0432\u044B\u0448\u043B\u043E: ")+(t.why==="time"?t.count[e.team]+" : "+t.count[1-e.team]:"");let s=a=>a.kills*3+a.dmgDone/1500+(a.gemsPicked||0)*.6,r=[...y.fighters].sort((a,l)=>s(l)-s(a))[0],o=[...y.fighters].sort((a,l)=>(a.team===e.team?0:1)-(l.team===e.team?0:1)||s(l)-s(a));J("e-board").innerHTML=o.map(a=>`<tr class="t${a.team===e.team?0:1}${a===e?" me":""}"><td>${sc[a.hero]}</td><td>${dn(a.name)}${a===r?'<span class="mvp">MVP</span>':""}</td><td>\u2694 ${a.kills}</td><td>\u2620 ${a.deaths}</td><td>${t.mode==="ball"?"\u26BD":Zg} ${a.gemsPicked||0}</td><td>${Math.round(a.dmgDone)}</td></tr>`).join(""),J("end").hidden=!1}var ZS=[20,15,12,9,7,5,3,2,1,0],nf={v:0};function KS(n){let e=y.me,t=y.match,i=J("e-title"),s=h=>ti.lang==="en"?"#"+h+" place":"#"+h+" \u043C\u0435\u0441\u0442\u043E";i.textContent=n==="win"?Mt("\u041F\u043E\u0431\u0435\u0434\u0430!"):s(t.place),i.className=t.place<=3?"win":"lose";let r=e.lastHitBy,o=ZS[t.place-1]||0,a=Math.min(3,e.kills);t.scored||(t.scored=!0,nf.v=(+_t.get("brPts",0)||0)+o+a,_t.set("brPts",nf.v)),J("e-sub").textContent=(n==="win"?Mt("\u0422\u044B \u2014 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0442\u0430\u043D\u043A!"):r&&r!==e?Mt("\u0422\u0435\u0431\u044F \u043F\u043E\u0434\u0431\u0438\u043B: ")+r.name:Mt("\u0422\u0435\u0431\u044F \u043D\u0430\u043A\u0440\u044B\u043B \u044F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0442\u0443\u043C\u0430\u043D."))+" \xB7 "+Mt("\u041E\u0447\u043A\u0438")+": +"+o+(a?" +"+a+" \u2694":"")+" ("+Mt("\u0432\u0441\u0435\u0433\u043E")+" "+nf.v+")";let l=[...y.fighters].sort((h,d)=>(h.place||0)-(d.place||0)||d.kills-h.kills),c='<span class="gem-ico gold"></span>';J("e-board").classList.add("br"),J("e-board").innerHTML=l.map(h=>`<tr class="t${h===e?0:1}${h===e?" me":""}${h.alive?"":" out"}"><td class="pl">${h.place?"#"+h.place:"\u2014"}</td><td>${sc[h.hero]}</td><td>${dn(h.name)}</td><td>\u2694 ${h.kills}</td><td>${c} ${h.power||0}</td><td>${Math.round(h.dmgDone)}</td></tr>`).join(""),J("end").hidden=!1}var mn={sdk:null,ready:!1,adOn:!1,playing:!1},rf=()=>!!window.YaGames;async function Qg(){if(rf())try{mn.sdk=await window.YaGames.init();try{let n=mn.sdk.environment.i18n.lang;n&&fc(dc(n))}catch{}}catch{}}function ex(){if(mn.sdk&&!mn.ready){mn.ready=!0;try{mn.sdk.features.LoadingAPI.ready()}catch{}}}function tx(){if(!mn.sdk)return;let n=!mn.adOn&&!y.paused&&!document.hidden&&(y.state==="play"||y.state==="countdown");if(n!==mn.playing){mn.playing=n;try{let e=mn.sdk.features.GameplayAPI;n?e.start():e.stop()}catch{}}}function $S(){if(mn.adOn=!0,De.ad=!0,bc(!0),document.exitPointerLock)try{document.exitPointerLock()}catch{}}function JS(){mn.adOn=!1,De.ad=!1,document.hidden||bc(!1)}function of(n){if(!mn.sdk){n&&n();return}let e=!1,t=()=>{e||(e=!0,JS(),n&&n())};try{mn.sdk.adv.showFullscreenAdv({callbacks:{onOpen:$S,onClose:t,onError:t,onOffline:t}})}catch{t()}}addEventListener("visibilitychange",()=>{mn.adOn||bc(document.hidden)});var Sn={hero:Qn[_t.get("hero","shroom")]?_t.get("hero","shroom"):"shroom",diff:_t.get("diff","normal"),mode:"br"},jS=n=>ti.lang==="en"?`#${n} place`:`#${n} \u043C\u0435\u0441\u0442\u043E`,ax=["\u0420\u0436\u0430\u0432\u0447\u0438\u043A","\u0413\u0430\u0435\u0447\u043A\u0430","\u0411\u043E\u043B\u0442\u0438\u043A","\u0428\u0435\u0441\u0442\u0435\u0440\u0451\u043D\u043A\u0430","\u0411\u0430\u043C\u043F\u0435\u0440","\u0414\u0438\u0437\u0435\u043B\u044C","\u0422\u0440\u0430\u043A\u0442\u043E\u0440","\u041F\u043E\u0440\u0448\u0435\u043D\u044C","\u041A\u0430\u0440\u0431\u044E\u0440\u0430\u0442\u043E\u0440","\u041A\u043B\u0451\u043F\u043A\u0430","\u0411\u0440\u043E\u043D\u044F","\u041F\u044B\u0445\u0442\u0443\u043D","\u0413\u0440\u043E\u043C\u044B\u0445\u0430\u043B\u043E","\u0420\u044B\u0447\u0430\u0433","\u0414\u043E\u043C\u043A\u0440\u0430\u0442","\u0422\u0430\u0440\u0430\u0445\u0442\u0443\u043D","\u0411\u0443\u043A\u0441\u0438\u0440","\u041A\u0430\u0442\u0443\u0448\u043A\u0430"];rf()?await Qg():fc();var lx=n=>{J("load-bar").style.width=Math.round(n*100)+"%"};await Promise.all([Bm(n=>lx(n*.7)),Ym(),u0()]);lx(.92);wd("maze");{let n=Aa();bo(n.sky,n.season)}jd();Im();addEventListener("resize",Qr);{let n=pg().concat(D0(),_g(),Y0(Ni.flatMap(e=>[Qn[e].attack.color,Qn[e].super.color])));n.forEach(e=>ce.add(e)),xc(0,0,1.7),uo(0,1,0,"#fff"),cs(0,1,0,"#fff",4);for(let e of Ni){let t=Ma(e);ce.add(t.root),n.push(t.root)}try{Ut.compile(ce,Be)}catch{}n.forEach(e=>ce.remove(e)),Pd(),y.shake=0}J("load").hidden=!0;var si=null;function cx(n){si&&(ce.remove(si.V.root),vc(si.V));let e=Ma(n);_c(e,"me"),ce.add(e.root);let t=U.map.id==="maze"?{x:0,z:1.2}:U.spawns[0][1];si={V:e,hop:1.2,f:{id:99,x:t.x,z:t.z-1.2,vx:0,vz:0,aim:Math.PI,alive:!0,atkT:9,supT:0,flash:0,deadT:0,victory:!1}},e.yaw=e.hullYaw=Math.PI+.55,si.f.aim=Math.PI+.25,Us.spawn(e)}function Wc(){Jg(Sn.hero,n=>{Sn.hero=n,_t.set("hero",n),Se("select"),Wc(),cx(n)});for(let n of J("m-diff").querySelectorAll("button"))n.classList.toggle("sel",n.dataset.v===Sn.diff);for(let n of J("m-mode").querySelectorAll(".mode-card"))n.classList.toggle("sel",n.dataset.v===Sn.mode);J("howto").textContent=Mt(Kt?"\u041B\u0435\u0432\u044B\u0439 \u043F\u0430\u043B\u0435\u0446 \u2014 \u0431\u0435\u0433, \u043F\u0440\u0430\u0432\u044B\u0439 \u2014 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043A\u0430\u043C\u0435\u0440\u044B. \u041A\u043D\u043E\u043F\u043A\u0430 \u0430\u0442\u0430\u043A\u0438: \u043A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u0435 \u2014 \u0430\u0432\u0442\u043E\u043F\u0440\u0438\u0446\u0435\u043B, \u0441 \u043F\u0440\u043E\u0442\u044F\u0436\u043A\u043E\u0439 \u2014 \u0446\u0435\u043B\u0438\u0448\u044C\u0441\u044F \u0441\u0430\u043C. \u0417\u0432\u0435\u0437\u0434\u0430 \u2014 \u0441\u0443\u043F\u0435\u0440.":"WASD \u2014 \u0431\u0435\u0433, \u043C\u044B\u0448\u044C \u2014 \u043A\u0430\u043C\u0435\u0440\u0430 \u0438 \u043F\u0440\u0438\u0446\u0435\u043B, \u041B\u041A\u041C \u2014 \u0430\u0442\u0430\u043A\u0430, \u041F\u041A\u041C \u0438\u043B\u0438 E \u2014 \u0441\u0443\u043F\u0435\u0440, Esc \u2014 \u043F\u0430\u0443\u0437\u0430.")}J("m-mode").onclick=n=>{let e=n.target.closest(".mode-card");!e||e.dataset.v===Sn.mode||(Sn.mode=e.dataset.v,_t.set("mode",Sn.mode),Se("select"),Wc())};J("m-diff").onclick=n=>{let e=n.target.dataset.v;e&&(Sn.diff=e,_t.set("diff",e),Se("click"),Wc())};var us={fps:_t.get("fps",!1),tod:_t.get("tod","rand"),season:_t.get("season","rand")};function wo(){for(let n of J("s-gfx").querySelectorAll("button"))n.classList.toggle("sel",n.dataset.v===de.level);for(let n of J("s-fps").querySelectorAll("button"))n.classList.toggle("sel",n.dataset.v==="1"===us.fps);for(let n of J("s-tod").querySelectorAll("button"))n.classList.toggle("sel",n.dataset.v===us.tod);for(let n of J("s-season").querySelectorAll("button"))n.classList.toggle("sel",n.dataset.v===us.season);for(let n of J("s-snd").querySelectorAll("button")){let e=n.dataset.v==="sfx"?De.sfxOn:De.musicOn;n.classList.toggle("sel",e),n.classList.toggle("off",!e)}J("s-sens").value=Ee.sens,J("s-sens-v").textContent=(+Ee.sens).toFixed(2),J("fps").hidden=!us.fps}function hx(n){J("s-gfx-row").hidden=J("s-gfx-note").hidden=!!n,wo(),J("settings").hidden=!1,Se("click")}J("m-set").onclick=()=>hx(!1);J("p-set").onclick=()=>hx(!0);J("s-close").onclick=()=>{J("settings").hidden=!0,Se("click")};J("s-gfx").onclick=n=>{let e=n.target.dataset.v;!e||e===de.level||(Lm(e),Se("click"),setTimeout(()=>location.reload(),150))};J("s-fps").onclick=n=>{let e=n.target.dataset.v;e!==void 0&&(us.fps=e==="1",_t.set("fps",us.fps),Se("click"),wo())};J("s-tod").onclick=n=>{let e=n.target.dataset.v;if(e&&(us.tod=e,_t.set("tod",e),Se("click"),wo(),y.state==="menu")){let t=Aa();bo(t.sky,t.season)}};J("s-season").onclick=n=>{let e=n.target.dataset.v;if(e&&(us.season=e,_t.set("season",e),Se("click"),wo(),y.state==="menu")){let t=Aa();bo(t.sky,t.season)}};J("s-snd").onclick=n=>{let e=n.target.dataset.v;e&&(fo(),e==="sfx"?d0(!De.sfxOn):f0(!De.musicOn),Se("click"),wo())};J("s-sens").oninput=n=>{Ee.sens=+n.target.value,_t.set("sens",Ee.sens),J("s-sens-v").textContent=Ee.sens.toFixed(2)};wo();var nx=-1;function QS(){if(!us.fps||de.fps===nx)return;nx=de.fps;let n=J("fps");n.textContent=de.fps+" FPS",n.className="fps"+(de.fps<30?" bad":de.fps<50?" mid":"")}J("play").onclick=()=>{fo(),Se("confirm"),cf()};function ux(){Ee.zoom=0,Be.fov=Be.userData.baseFov||55,Be.updateProjectionMatrix()}function Xc(){y.state="menu",y.paused=!1,ux(),dx(),J("menu").hidden=!1,J("hud").hidden=!0,J("end").hidden=!0,J("pause").hidden=!0,Wc(),cx(Sn.hero)}function dx(){j0(),Qd(),T0(),qd(),Pd();for(let n of y.shots)Cc(n.m);y.shots.length=0,q0();for(let n of y.lobs)ce.remove(n.m),ce.remove(n.mark);y.lobs.length=0;for(let n of y.puddles)ce.remove(n.m);y.puddles.length=0;for(let n of y.beams)ce.remove(n.core),ce.remove(n.outer);y.beams.length=0,y.match=null}var So=0,hr=0,Vc=0;function fx(n){U.map.id!==n?(wd(n),jd(U.map.mode!=="ball"&&U.map.mode!=="br")):n0();let e=Aa();bo(e.sky,e.season)}function cf(n={}){dx(),si&&(ce.remove(si.V.root),si=null);let e=y.mode="br";if(document.body.classList.toggle("br",e==="br"),e==="br")return ew(n);let t=e==="ball";fx(t?"pitch":n.map||(Math.random()<.5?"glade":"creek")),t?xg():Hg();let i=Jr([...ax]),s=n.hero||Sn.hero,r=Jr(Ni.filter(l=>l!==s)).concat(Ni).slice(0,2),o=Jr([...Ni]),a=[r[0],s,r[1]];for(let l=0;l<2;l++)for(let c=0;c<3;c++){let h=l===0&&c===1,d=l===0?a[c]:o[c],u=Bd({name:h?Mt("\u0422\u044B"):Mt(i.pop()),team:l,hero:d,isMe:h});u.slot=c,u.gemsPicked=0,h?y.me=u:u.bot=Uc(n.diff||Sn.diff)}for(let l of y.fighters)sf(l),xo(l);t?af("\u0414\u043E\u0436\u0434\u0435\u0432\u0438\u043A\u0431\u043E\u043B","\u0417\u0430\u043A\u0430\u0442\u0438 \u0433\u0440\u0438\u0431-\u0434\u043E\u0436\u0434\u0435\u0432\u0438\u043A \u0432 \u0432\u043E\u0440\u043E\u0442\u0430 \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430: 2 \u0433\u043E\u043B\u0430 \u2014 \u043F\u043E\u0431\u0435\u0434\u0430"):af("\u0421\u043F\u043E\u0440\u044B",U.map.name+" \xB7 \u0421\u043E\u0431\u0435\u0440\u0438 10 \u0441\u043F\u043E\u0440 \u0438 \u0443\u0434\u0435\u0440\u0436\u0438 \u0438\u0445 15 \u0441\u0435\u043A\u0443\u043D\u0434")}function ew(n){fx("maze"),w0(),lf=0;let e=Jr([...ax]),t=n.hero||Sn.hero,i=Jr(U.spawns.ffa.map((s,r)=>r));for(let s=0;s<Wt.fighters;s++){let r=s===0,o=Bd({name:r?Mt("\u0422\u044B"):Mt(e.pop()),team:s,hero:r?t:Ni[Math.floor(Math.random()*Ni.length)],isMe:r});o.slot=i[s%i.length],o.gemsPicked=0,o.hpMul=Wt.hp,r?y.me=o:o.bot=Uc(n.diff||Sn.diff)}for(let s of y.fighters)sf(s),xo(s);af("\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0442\u0430\u043D\u043A","\u041E\u0441\u0442\u0430\u043D\u044C\u0441\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u043C! \u041B\u043E\u043C\u0430\u0439 \u044F\u0449\u0438\u043A\u0438 \u2014 \u0432 \u043D\u0438\u0445 \u0441\u0438\u043B\u0430")}function af(n,e){let t=y.me;Ee.yaw=t.aim,Ee.x=t.x,Ee.z=t.z,Ee.pitch=-.08,ux(),Kd();let i=!!t.H.attack.scope;J("b-scope").hidden=!(Kt&&i),J("sp-keys").textContent=Mt(i?"E \xB7 \u041F\u0440\u043E\u0431\u0435\u043B":"\u041F\u041A\u041C \xB7 E"),y.state="countdown",So=3.2,Vc=4,hr=0,J("menu").hidden=!0,J("end").hidden=!0,J("hud").hidden=!1,J("touch").hidden=!Kt,J("superpc").hidden=Kt,J("ammopc").hidden=Kt,document.body.classList.toggle("touch-on",Kt),J("lockhint").hidden=Kt;let s=y.mode==="br",r=y.mode==="ball";J("ico0").className=s?"shroom-ico":r?"ball-ico":"gem-ico",J("ico1").className=s?"gem-ico gold":r?"ball-ico":"gem-ico",En(n,Mt(e)+" \xB7 "+Mt(Wg()),"sun",2.6)}function tw(n){So-=n;let e=Math.ceil(So);e!==Vc&&e>=1&&e<=3&&(Vc=e,En(String(e),"","sun",.8),Se("countdown")),So<=0&&(y.state="play",En("\u0412 \u0431\u043E\u0439!","","sun",1),Se("start"))}function px(n){let e=n.V.yaw,t=-1e9;y.endDist=4.6;for(let i=0;i<16;i++){let s=(i%2?1:-1)*Math.ceil(i/2)*Pe/16,r=n.V.yaw+s,o=Mn(n.x,n.z,n.x+Math.sin(r)*5,n.z+Math.cos(r)*5,Md),a=o<0?5:o*5,l=a-Math.abs(s)*.35;if(l>t&&(t=l,e=r,y.endDist=Math.max(1.8,Math.min(4.6,a-.4))),a>=5&&Math.abs(s)<1.3)break}return e}function nw(){y.state="end",hr=0;let n=y.me,e=y.match,t=e.place===1;y.result=t?"win":"lose";for(let s of y.fighters)s.inp.mx=s.inp.mz=0,s.inp.fire=s.inp.sup=!1;let i=n.lastHitBy;y.endFocus=t?n:i&&i.alive?i:y.fighters.filter(s=>s.alive).sort((s,r)=>r.kills-s.kills)[0]||n,y.endYaw=px(y.endFocus),t&&(n.victory=!0,n.aim=y.endYaw),En(t?"\u041F\u043E\u0431\u0435\u0434\u0430!":jS(e.place),t?"\u0422\u044B \u2014 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0442\u0430\u043D\u043A!":"",t?"sun":"foe",2.2),Se(t?"win":"lose"),Dc()}function iw(n){if(y.match&&y.match.mode==="br")return nw();y.state="end",hr=0;let e=y.me,t=n<0?"draw":n===e.team?"win":"lose";y.result=t;for(let s of y.fighters)n>=0&&s.team===n?(s.alive||xo(s,{x:s.x,z:s.z}),s.victory=!0):n>=0&&(s.defeat=!0),s.inp.mx=s.inp.mz=0;let i=s=>s.kills*3+s.dmgDone/1500+(s.gemsPicked||0)*.6;y.endFocus=n<0||n===e.team?e:y.fighters.filter(s=>s.team===n).sort((s,r)=>i(r)-i(s))[0],y.endYaw=px(y.endFocus);for(let s of y.fighters)s.victory&&(s.aim=y.endYaw);En(t==="win"?"\u041F\u043E\u0431\u0435\u0434\u0430!":t==="lose"?"\u041F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435":"\u041D\u0438\u0447\u044C\u044F","",t==="win"?"sun":t==="lose"?"foe":"ally",2.2),Se(t==="lose"?"lose":"win"),Dc()}J("e-again").onclick=()=>{Se("confirm"),of(()=>cf())};J("e-menu").onclick=()=>{Se("click"),of(Xc)};var Hc=n=>`<b style="color:${n===y.me?"var(--sun)":n.team===y.me.team?"var(--ally)":"var(--foe)"}">${dn(n.name)}</b>`;Dt("kill",(n,e)=>{y.me&&(e&&e!==n?Bc(Hc(e)+" \u2694 "+Hc(n),e===y.me?"m":e.team===y.me.team?"a":"f"):e||Bc("\u2601 "+Hc(n),"f"),y.match&&y.match.mode==="br"&&n!==y.me&&!y.match.over&&y.me.alive&&sw(),y.state!=="end"&&(e===y.me&&n!==y.me&&(En("\u041F\u043E\u0434\u0431\u0438\u0442!",n.name,"sun",1.1),Se("kill")),n===y.me&&En("\u0422\u0435\u0431\u044F \u043F\u043E\u0434\u0431\u0438\u043B\u0438",e?e.name:"","foe",1.6)))});Dt("pickup",n=>{n.gemsPicked=(n.gemsPicked||0)+1});Dt("countdownStart",n=>{let e=n===y.me.team;En(e?"\u0421\u043F\u043E\u0440\u044B \u0443 \u043D\u0430\u0441!":"\u0412\u0440\u0430\u0433 \u043D\u0430\u0431\u0440\u0430\u043B \u0441\u043F\u043E\u0440\u044B!",e?"\u0414\u0435\u0440\u0436\u0438\u0442\u0435\u0441\u044C 15 \u0441\u0435\u043A\u0443\u043D\u0434":"\u041E\u0442\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0445!",e?"ally":"foe",1.8),Se(e?"super_ready":"gem_drop")});Dt("countdownStop",()=>{y.state==="play"&&En("\u041E\u0442\u0441\u0447\u0451\u0442 \u0441\u0431\u0440\u043E\u0448\u0435\u043D","","sun",1.2)});Dt("countdownTick",n=>{n<=5&&Se("countdown",null,.8)});Dt("matchOver",n=>iw(n));Dt("goal",(n,e)=>{let t=n===y.me.team;En(t?"\u0413\u043E\u043B!":"\u0413\u043E\u043B \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430",e?e.name:"",t?"sun":"foe",2),Se(t?"win":"lose",null,.6),y.shake=Math.max(y.shake,.4),e&&Bc(Hc(e)+" \u26BD",e===y.me?"m":t?"a":"f")});Dt("kickoff",()=>{for(let n of y.fighters)n.burst=null,xo(n);y.me&&(Ee.yaw=y.me.aim,Ee.x=y.me.x,Ee.z=y.me.z),y.state="countdown",So=2.2,Vc=3});Dt("golden",()=>En("\u0417\u043E\u043B\u043E\u0442\u043E\u0439 \u0433\u043E\u043B!","\u041A\u0442\u043E \u0437\u0430\u0431\u044C\u0451\u0442 \u2014 \u0442\u043E\u0442 \u043F\u043E\u0431\u0435\u0434\u0438\u043B","sun",2.2));Dt("ballTaken",n=>{n===y.me&&En("\u041C\u044F\u0447 \u0443 \u0442\u0435\u0431\u044F","\u0410\u0442\u0430\u043A\u0430 \u2014 \u0443\u0434\u0430\u0440 \u0438\u043B\u0438 \u043F\u0430\u0441, \u0441\u0443\u043F\u0435\u0440 \u2014 \u043F\u0443\u0448\u0435\u0447\u043D\u044B\u0439 \u0443\u0434\u0430\u0440","ally",1.4)});Dt("fogHurt",(n,e)=>or(n,e,null,!1,!0));Dt("fogStart",()=>{y.state==="play"&&(En("\u0422\u0443\u043C\u0430\u043D \u0441\u0433\u0443\u0449\u0430\u0435\u0442\u0441\u044F!","\u0414\u0435\u0440\u0436\u0438\u0441\u044C \u0431\u043B\u0438\u0436\u0435 \u043A \u0446\u0435\u043D\u0442\u0440\u0443","ally",2),Se("gem_drop"))});Dt("power",n=>{n.gemsPicked=(n.gemsPicked||0)+1});var lf=0;function sw(){let n=y.match.alive;n>4||n<=1||n===lf||(lf=n,n===4?En(ti.lang==="en"?"4 left":"\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C 4 \u0431\u043E\u0439\u0446\u0430","\u0417\u0430\u0439\u043C\u0438 \u0443\u043A\u0440\u044B\u0442\u0438\u0435","sun",1.6):n===3?En("\u0422\u044B \u0432 \u0442\u043E\u043F-3!","\u041F\u0443\u0441\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0435\u0440\u0443\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C\u0438","sun",1.6):En("\u0424\u0438\u043D\u0430\u043B!","\u041E\u0434\u0438\u043D \u043D\u0430 \u043E\u0434\u0438\u043D","foe",1.6))}var ix=null;Dt("hitMarker",n=>{let e=J("hitm");e.classList.remove("hit","killhit"),e.offsetWidth,e.classList.add(n?"killhit":"hit"),clearTimeout(ix),ix=setTimeout(()=>e.classList.remove("hit","killhit"),n?380:180)});Dt("superReady",n=>{n===y.me&&Se("super_ready")});Dt("empty",n=>{n===y.me&&Se("empty")});Dt("damage",(n,e,t)=>{n===y.me?Se("hurt",null,.7):t===y.me&&Se("hit",null,.6)});Dt("spawn",n=>{n===y.me&&y.state==="play"&&(Se("respawn"),Ee.yaw=n.team===0?Math.PI:0,Ee.x=n.x,Ee.z=n.z)});function To(n){y.state!=="play"&&y.state!=="countdown"&&(n=!1),y.paused=n,J("pause").hidden=!n,n&&(Dc(),Kd())}J("pause-btn").onclick=()=>To(!0);J("p-resume").onclick=()=>{Se("click"),To(!1)};J("p-quit").onclick=()=>{Se("click"),To(!1),Xc()};addEventListener("keydown",n=>{(n.code==="Escape"||n.code==="KeyP")&&(y.state==="play"||y.state==="countdown")&&To(!y.paused)});document.addEventListener("visibilitychange",()=>{document.hidden&&y.state==="play"&&To(!0)});var sx=.95,rx=new P;function Gc(n){if(y.time+=n,pn.time.value=y.time,Rm(n),tx(),y.state==="play"||y.state==="countdown"||y.state==="end"){y.state==="countdown"&&tw(n),(y.state==="play"||y.state==="countdown")&&y.me&&y.me.alive&&!y.me.bot&&!y.noInput&&Ag(n);for(let i of y.fighters)i.bot&&y.state==="play"&&zg(i,n);for(let i of y.fighters)Q0(i,n);og(n),cg(n),ug(n),dg(n),X0(n),Gg(n,y.time),F0(n,y.time),vg(n,y.time),y.state==="end"&&(hr+=n,hr>2.6&&J("end").hidden&&(jg(y.result),J("hud").hidden=!0))}fg(n,y.time);let t=0;for(let i of y.fighters)i.alive&&t<pn.push.value.length&&pn.push.value[t++].set(i.x,i.z,sx);for(si&&t<pn.push.value.length&&pn.push.value[t++].set(si.f.x,si.f.z,sx);t<pn.push.value.length;t++)pn.push.value[t].set(0,0,0);if(y.me&&y.me.alive&&y.state!=="menu"?pn.me.value.set(y.me.x,y.me.z,2.2):pn.me.value.set(0,0,0),y.dbgCam)Be.position.set(y.dbgCam[0],y.dbgCam[1],y.dbgCam[2]),Be.lookAt(y.dbgCam[3],y.dbgCam[4],y.dbgCam[5]);else if(y.state==="menu"&&si){let i=si,s=i.f;i.hop-=n,s.victory=i.hop>0,s.supT+=n,yc(i.V,s,n,y.time);let r=innerWidth/innerHeight>1.3?.35:0;Be.position.set(s.x+r*1.5,1.55,s.z-4.4),Be.lookAt(s.x+r,.75,s.z)}else if(y.state==="end"&&y.me){let i=y.endFocus||y.me,s=y.endYaw+Math.sin(y.time*.3)*.35,r=y.endDist||4.6;rx.set(i.x+Math.sin(s)*r,2.7+(4.6-r)*.35,i.z+Math.cos(s)*r),Be.position.lerp(rx,1-Math.exp(-n*2.5)),Be.lookAt(i.x,.8,i.z)}else y.me&&Rg(n);Lg(),Sg(),o0(n),Vg(n,y.time),Kg(),y.state!=="menu"&&Oc(),$g(n),eo.position.copy(Be.position)}var ox=performance.now();function mx(n){let e=(n-ox)/1e3;ox=n;let t=Math.min(.05,e);y.state==="end"&&hr<1.2&&(t*=.4),!y.paused&&!mn.adOn&&Gc(t),Fm(e,y.state==="play"),QS(),Hu(),requestAnimationFrame(mx)}Xc();ex();requestAnimationFrame(mx);window.__bg={start(n={}){n.hero&&(Sn.hero=n.hero),n.diff&&(Sn.diff=n.diff),n.mode&&(Sn.mode=n.mode),cf(n),n.skipCount&&(So=0,y.state="play")},autopilot(n){y.me&&(y.me.bot=n?Uc("normal"):null)},sim(n,e=1/30){let t=Math.round(n/e);for(let i=0;i<t&&(Gc(e),!(y.state==="end"&&hr>3));i++);},get s(){let n=y.match;return{state:y.state,mode:n&&n.mode,t:n&&+n.t.toFixed(1),count:n&&[...n.count],alive:n&&n.alive,place:n&&n.place,fog:n&&n.fog&&+n.fog.r.toFixed(1),cd:n&&n.cd&&{team:n.cd.team,t:+n.cd.t.toFixed(1)},over:n&&n.over,winner:n&&n.winner,why:n&&n.why,pickups:y.pickups.length,me:y.me&&{hp:Math.round(y.me.hp),alive:y.me.alive,x:+y.me.x.toFixed(1),z:+y.me.z.toFixed(1),gems:y.me.gems,charge:+y.me.charge.toFixed(2),ammo:+y.me.ammo.toFixed(2)}}},board:()=>y.fighters.map(n=>`${n.name}[${n.hero}/t${n.team}] k${n.kills} d${n.deaths} g${n.gemsPicked} dmg${Math.round(n.dmgDone)}`),fighters:()=>y.fighters,G:y,A:U,CAM:Ee,menu:Sn,showMenu:Xc,cam(n){y.dbgCam=n},env(n,e){bo(n,e)},get envNow(){return{...Ln}},info:()=>({calls:Ut.info.render.calls,tris:Ut.info.render.triangles,geos:Ut.info.memory.geometries,tex:Ut.info.memory.textures,progs:Ut.info.programs.length,PR:de.PR,post:de.post}),post(n){de.post=!!n&&!!de.composer,de.noPost=!n},pause:To,tr:Mt,L:ti,tick:Gc,dmg:or,bench(n=60,e){e&&(Ut.setPixelRatio(e),Qr());let t=Ut.getContext(),i=performance.now(),s=new Uint8Array(4);for(let r=0;r<n;r++)Gc(1/60),Hu(),t.readPixels(0,0,1,1,t.RGBA,t.UNSIGNED_BYTE,s);return(performance.now()-i)/n}};window.__bgReady=!0;
