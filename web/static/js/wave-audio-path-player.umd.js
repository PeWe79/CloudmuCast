var ht=Object.defineProperty;
var ot=(v,m,A)=>m in v?ht(v,m,{enumerable:!0,configurable:!0,writable:!0,value:A}):v[m]=A;
var $=(v,m,A)=>(ot(v,typeof m!="symbol"?m+"":m,A),A);
(function(v,m){
    typeof exports=="object"&&typeof module!="undefined"?m(exports):typeof define=="function"&&define.amd?define(["exports"],m):(v=typeof globalThis!="undefined"?globalThis:v||self,m(v["wave-audio-path-player"]={}))
})
(this,function(v){
    "use strict";
    const m=g=>{
        window.AudioContext=window.AudioContext||window.webkitAudioContext;
        const n=new AudioContext;
        return fetch(g).then(h=>h.arrayBuffer()).then(h=>n.decodeAudioData(h)).catch(h=>{console.error(h)})
    },
    A=(T,J)=>{
        var W,X,Y;
        const{
            channel:h=0,samples:u=T.length,height:i=100,width:w=800,top:d=0,left:a=0,type:s="steps",paths:t=[{d:"Q",sx:0,sy:0,x:50,y:100,ex:100,ey:0}],animation:k=!1,animationframes:L=10,normalize:F=!0
        }=J;
        var J=tt(T,h,k,L),T=et(J,u),H=F?it(T):T;
        let l="";
        var R,G,p=s!="bars"?(i+2*d)/2:i+d,r=w/u,N=t.length,at=s=="mirror"?2*N:N,st=H.length;
        for(let S=0;S<st;S++){
            0<S&&(R=l.length,G=l.charAt(R-1),l+=G==";"||R===0?" M 0 0 ;":";");
            let y=-9999,f=-9999;
            for(let o=0;o<u;o++){
                var c=s=="bars"||o%2?1:-1;let b=1;
                for(let z=0;z<at;z++){
                    let e=z;z>=N&&(e=z-N,b=-1),t[e].minshow=(W=t[e].minshow)!=null?W:0,t[e].maxshow=(X=t[e].maxshow)!=null?X:1,t[e].normalize=(Y=t[e].normalize)!=null?Y:!1;
                    var x=t[e].normalize?1:H[S][o];
                    if(t[e].minshow<=H[S][o]&&t[e].maxshow>=H[S][o])switch(t[e].d){
                        case"L":var D=o*r+r*t[e].sx/100+a,C=p+x*t[e].sy/100*(s!="bars"?i/2:i)*-c*b,B=o*r+r*t[e].ex/100+a,P=p+x*t[e].ey/100*(s!="bars"?i/2:i)*-c*b;
                        D===y&&C===f||(l+=`M ${D} ${C} `),l+=`L ${B} ${P} `,y=B,f=P;
                        break;
                        case"H":D=o*r+r*t[e].sx/100+a,C=p+x*t[e].y/100*(s!="bars"?i/2:i)*-c*b,B=o*r+r*t[e].ex/100+a,D===y&&C===f||(l+=`M ${D} ${C} `),l+=`H ${B} `,y=B,f=C;
                        break;
                        case"V":var P=o*r+r*t[e].x/100+a,I=p+x*t[e].sy/100*(s!="bars"?i/2:i)*-c*b,M=p+x*t[e].ey/100*(s!="bars"?i/2:i)*-c*b;P===y&&I===f||(l+=`M ${P} ${I} `),l+=`V ${M} `,y=P,f=M;
                        break;
                        case"C":var I=o*r+r*t[e].sx/100+a,M=p-p*t[e].sy/100*c,j=o*r+r*t[e].x/100+a,q=p+x*t[e].y/100*(s!="bars"?i:2*i)*-c*b,Q=o*r+r*t[e].ex/100+a,_=p-p*t[e].ey/100*c;
                        I===y&&M===f||(l+=`M ${I} ${M} `),l+=`C ${I} ${M} ${j} ${q} ${Q} ${_} `,y=Q,f=_;
                        break;
                        case"Q":var j=o*r+r*t[e].sx/100+a,q=p+x*t[e].sy/100*(s!="bars"?i/2:i)*-c*b,Q=o*r+r*t[e].x/100+a,_=p+x*t[e].y/100*(s!="bars"?i:2*i)*-c*b,E=o*r+r*t[e].ex/100+a,O=p+x*t[e].ey/100*(s!="bars"?i/2:i)*-c*b;
                        j===y&&q===f||(l+=`M ${j} ${q} `),l+=`Q ${Q} ${_} ${E} ${O} `,y=E,f=O;
                        break;
                        case"A":{
                            var E=o*r+r*t[e].sx/100+a,O=p+x*t[e].sy/100*(s!="bars"?i/2:i)*-c*b,K=o*r+r*t[e].ex/100+a,U=p+x*t[e].ey/100*(s!="bars"?i/2:i)*-c*b,rt=(E===y&&O===f||(l+=`M ${E} ${O} `),t[e].rx*r/100),nt=t[e].ry*r/100;
                            let V=t[e].sweep;
                            c==-1&&(V=V==1?0:1),b==-1&&(V=V==1?0:1),l+=`A ${rt} ${nt} ${t[e].angle} ${t[e].arc} ${V} ${K} ${U} `,y=K,f=U;
                            break
                        }
                        case"Z":l+="Z "
                    }
                }
            }
        }return l
    },
    tt=(g,n,h,u)=>{
        const i=g.getChannelData(n),w=[];
        if(h){
            var d=g.sampleRate/u;
            for(let s=0;s<i.length;s+=d){
                var a=i.slice(s,s+d);
                w.push(a)
            }
        }else w.push(i);
        return w
    },
    et=(g,n)=>{
        const h=[];
        var u=g.length;
        for(let d=0;d<u;d++){
            var i=Math.floor(g[d].length/n);const a=[];
            for(let s=0;s<n;s++){
                var w=i*s;
                let t=0;
                for(let k=0;k<i;k++)t+=Math.abs(g[d][w+k]);
                a.push(t/i)
            }h.push(a)
        }return h
    },
    it=g=>{
        const n=[];
        var h=g.length;
        for(let a=0;a<h;a++){
            var u=Math.max(...g[a]);
            n.push(u)
        }
        const i=Math.pow(Math.max(...n),-1),w=[];
        for(let a=0;a<h;a++){
            var d=g[a].map(s=>s*i);
            w.push(d)
        }return w
    };
    class Z extends HTMLElement{
        constructor(){
            super();
            $(this,"loadSong",()=>{
                this.durationContainer.textContent=this.calculateTime(this.audio.duration),this.seekSlider.max=this.audio.duration,this.svg.unpauseAnimations(),this.animationsvg.setAttribute("dur",""+this.audio.duration+"s"),this.animation||this.animationsvgx.setAttribute("dur",""+this.audio.duration+"s"),this.svg.pauseAnimations(),this.svg.setCurrentTime(0)
            });
            $(this,"playPause",()=>{
                this.audio.paused?(this.audio.play(),this.svg.unpauseAnimations(),this.path2.style.display="block",this.playPathButton.setAttribute("d",this.pausePath),this.raf=requestAnimationFrame(this.whilePlaying)):(this.audio.pause(),this.svg.pauseAnimations(),this.playPathButton.setAttribute("d",this.playPath),cancelAnimationFrame(this.raf))
            });
            $(this,"sliderInput",()=>{
                this.path2.style.display="block",this.currentTimeContainer.textContent=this.calculateTime(this.seekSlider.value),this.svg.setCurrentTime(this.seekSlider.value),this.audio.paused||cancelAnimationFrame(this.raf)
            });
            $(this,"sliderChange",()=>{
                this.audio.currentTime=this.seekSlider.value,this.path2.style.display="block",this.svg.setCurrentTime(this.seekSlider.value),this.audio.paused||(this.raf=requestAnimationFrame(this.whilePlaying))
            });
            $(this,"onFinish",()=>{
                this.seekSlider.value=this.seekSlider.max,this.svg.setCurrentTime(this.audio.duration),this.svg.pauseAnimations(),this.playPathButton.setAttribute("d",this.playPath),cancelAnimationFrame(this.raf)
            });
            $(this,"whilePlaying",()=>{
                this.seekSlider.value=this.audio.currentTime,this.currentTimeContainer.textContent=this.calculateTime(this.seekSlider.value),this.svg.setCurrentTime(this.seekSlider.value),this.raf=requestAnimationFrame(this.whilePlaying)
            });
            $(this,"svgDraw",()=>{
                const n=A(this.audioData,this.options);this.animation?this.animationsvg.setAttribute("values",n):(this.path1.setAttribute("d",n),this.path2.setAttribute("d",n)),this.svg.setCurrentTime(this.seekSlider.value)
            });
            $(this,"calculateTime",n=>{
                const h=Math.floor(n/60),u=Math.floor(n%60),i=u<10?`0${u}`:`${u}`;return`${h}:${i}`
            });
            this.shadowDOM=this.attachShadow({mode:"open"}),this.audioData=null,this.hasAttribute("wave-options")?(this.options=JSON.parse(this.attributes["wave-options"].value),this.options.width=parseInt(this.attributes["wave-width"].value),this.options.height=parseInt(this.attributes["wave-height"].value)):this.options={
                samples:40,type:"mirror",width:parseInt(this.attributes["wave-width"].value),height:parseInt(this.attributes["wave-height"].value),paths:[{d:"V",sy:0,x:50,ey:100}]
            },this.options.hasOwnProperty("animation")?this.animation=this.options.animation:this.animation=!1,this.playPath="M8,16 C12.4183,16 16,12.4183 16,8 C16,3.58172 12.4183,0 8,0 C3.58172,0 0,3.58172 0,8 C0,12.4183 3.58172,16 8,16 Z M7.5547,5.16795 C7.24784,4.96338 6.8533,4.94431 6.52814,5.11833 C6.20298,5.29235 6,5.63121 6,6.00000106 L6,10.0000011 C6,10.3688 6.20298,10.7077 6.52814,10.8817 C6.8533,11.0557 7.24784,11.0366 7.5547,10.8321 L10.5547,8.8321 C10.8329,8.6466 11,8.3344 11,8.00000106 C11,7.66565 10.8329,7.35342 10.5547,7.16795 L7.5547,5.16795 Z",this.pausePath="M16,8 C16,12.4183 12.4183,16 8,16 C3.58172,16 0,12.4183 0,8 C0,3.58172 3.58172,0 8,0 C12.4183,0 16,3.58172 16,8 Z M5,6 C5,5.44772 5.44772,5 6,5 C6.55228,5 7,5.44772 7,6 L7,10 C7,10.5523 6.55228,11 6,11 C5.44772,11 5,10.5523 5,10 L5,6 Z M10,5 C9.4477,5 9,5.44772 9,6 L9,10 C9,10.5523 9.4477,11 10,11 C10.5523,11 11,10.5523 11,10 L11,6 C11,5.44772 10.5523,5 10,5 Z",this.playPathButton=null,this.svg=null,this.path1=null,this.path2=null,this.animationsvg=null,this.animationsvgx=null,this.audio=null,this.durationContainer=null,this.seekSlider=null,this.currentTimeContainer=null,this.playIconContainer=null,this.raf=null
        }
        initComponent(){
            this.playPathButton=this.shadowDOM.getElementById("playPathButton"),this.svg=this.shadowDOM.getElementById("svg"),this.path1=this.shadowDOM.getElementById("path1"),this.path2=this.shadowDOM.getElementById("path2"),this.animationsvg=this.shadowDOM.getElementById("animationsvg"),this.animationsvgx=this.shadowDOM.getElementById("animationsvgx"),this.audio=this.shadowDOM.querySelector("audio"),this.durationContainer=this.shadowDOM.getElementById("duration"),this.seekSlider=this.shadowDOM.getElementById("seek-slider"),this.currentTimeContainer=this.shadowDOM.getElementById("current-time"),this.playIconContainer=this.shadowDOM.getElementById("play"),this.svg.pauseAnimations(),this.audio.readyState>0?this.loadSong():this.audio.addEventListener("loadedmetadata",this.loadSong),this.audio.addEventListener("ended",this.onFinish),this.seekSlider.addEventListener("input",this.sliderInput),this.seekSlider.addEventListener("change",this.sliderChange),this.playIconContainer.addEventListener("click",this.playPause)
        }
        async audioPath(){
            this.audioData=await m(this.attributes.src.value),this.svgDraw()
        }
        mapComponentAttributes(){
            ["src","wave-height","wave-width","color","wave-options","wave-color","wave-progress-color","wave-slider"].forEach(h=>{
                this.attributes[h]||(this.attributes[h]={value:null})
            })
        }
        connectedCallback(){
            this.mapComponentAttributes(),this.render(),this.initComponent(),this.audioPath()
        }
        render(){
            this.shadowDOM.innerHTML=`${this.templateCss()}${this.template()}`
        }
        template(){
            let n=`
            <div part="player" class="player">
                <button id="play" part="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="34" height="34" part="button">
                        <path id="playPathButton" fill="currentColor" fill-rule="evenodd" d="M8,16 C12.4183,16 16,12.4183 16,8 C16,3.58172 12.4183,0 8,0 C3.58172,0 0,3.58172 0,8 C0,12.4183 3.58172,16 8,16 Z M7.5547,5.16795 C7.24784,4.96338 6.8533,4.94431 6.52814,5.11833 C6.20298,5.29235 6,5.63121 6,6.00000106 L6,10.0000011 C6,10.3688 6.20298,10.7077 6.52814,10.8817 C6.8533,11.0557 7.24784,11.0366 7.5547,10.8321 L10.5547,8.8321 C10.8329,8.6466 11,8.3344 11,8.00000106 C11,7.66565 10.8329,7.35342 10.5547,7.16795 L7.5547,5.16795 Z"></path>
                    </svg>
                </button>
            <div id="current-time" part="currenttime">0:00</div>
            <div id="slider" part="slider">
                <svg id="svg" part="svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 ${this.attributes["wave-width"].value} ${this.attributes["wave-height"].value}" width="${this.attributes["wave-width"].value}" height="${this.attributes["wave-height"].value}">`;
                return this.animation?n+=`
                <path id="path1" part="path1"  stroke-width="2" style="display:none;"></path>
                <path id="path2" part="path2"  stroke-width="2" style="display:block;">
                    <animate id="animationsvg" attributeName="d" dur="99999s" calcMode="linear" values="" fill="freeze"></animate>
                </path>`:n+=`
                <defs>
                    <clipPath id="left-to-right-x">
                    <rect x="-1" y="-100" width="${parseInt(this.attributes["wave-width"].value)+2}" height="${parseInt(this.attributes["wave-height"].value)+200}" >
                        <animate id="animationsvgx" attributeName="x" values="-1;${parseInt(this.attributes["wave-width"].value)+2}" dur="99999s" fill="freeze" />   
                    </rect>
                    </clipPath>
                    <clipPath id="left-to-right">
                    <rect x="-${parseInt(this.attributes["wave-width"].value)+2}" y="-100" width="${parseInt(this.attributes["wave-width"].value)+2}" height="${parseInt(this.attributes["wave-height"].value)+200}" >
                        <animate id="animationsvg" attributeName="x" values="-${parseInt(this.attributes["wave-width"].value)+2};-1" dur="99999s" fill="freeze" />   
                    </rect>
                    </clipPath>    
                </defs> 
                <path id="path1" part="path1"  stroke-width="2" d="" clip-path="url(#left-to-right-x)"></path>
                <path id="path2" part="path2"  stroke-width="2" d="" clip-path="url(#left-to-right)" style="display:none;"></path>`,n+=`
            </svg>
                    <input type="range" part="input" id="seek-slider" max="100" value="0" step="any">
                </div>
                <div id="duration" part="duration">0:00</div>
            </div>
            <audio src="${this.attributes.src.value}"></audio>
            `,n
        }
        templateCss(){
            var n,h,u,i,w,d,a,s,t,k,L,F;
            return`
                <style>
                *, :after, :before { 
                    box-sizing: border-box;
                    margin: 0;
                }
                :host {
                    display: flex;
                
                }
                .player {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                #play {
                    background: transparent;
                    border: none;
                    cursor:pointer;
                    padding: 0 0 0 10px;
                    margin: 0px;
                    
                }
                #play svg {
                    fill: ${(h=(n=this.attributes.color)==null?void 0:n.value)!=null?h:"#858a8d"};
                    position:relative;
                    transition: transform 0.3s;
                    top: -0.5px;
                }
                #play svg:hover {
                    transform: scale(1.2);
                }
                #play svg path {
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    transition: 0.2s;
                }
                #svg {
                    margin: 0 10px;
                    overflow: visible;
                    stroke-width: 1px;
                    fill: none;
                }
                #path1 {
                    stroke: ${(i=(u=this.attributes["wave-color"])==null?void 0:u.value)!=null?i:"#dadcdd"}; 
                    overflow: visible;
                    stroke-linecap: round;
                }
                #path2 {
                    stroke: ${(d=(w=this.attributes["wave-progress-color"])==null?void 0:w.value)!=null?d:"#858a8d"};
                    overflow: visible;
                    stroke-linecap: round;
                }
                #slider  {
                    position:relative;
                }
                #duration, #current-time {
                    position: relative;
                    top:-1.1px;
                    color: ${(s=(a=this.attributes.color)==null?void 0:a.value)!=null?s:"#858a8d"};
                    margin: 0px 10px;
                    font-size: 16px;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    min-width:32px;
                }
                #seek-slider {
                    position: absolute;
                    width: 100%;
                    left: 0;
                }
                input[type=range] {
                    -webkit-appearance: none; 
                    width: 100%; 
                    background: transparent; 
                    padding: 0px;
                    margin: 0px;
                    border: 0px;
                    height: ${parseInt(this.attributes["wave-height"].value)}px;
                }  
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                }
                input[type=range]:focus {
                    outline: none; 
                }
                
                input[type=range]::-ms-track {
                    width: 100%;
                    cursor: pointer;
                    /* Hides the slider so custom styles can be added */
                    background: transparent; 
                    border-color: transparent;
                    color: transparent;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    position:relative;
                    height: 12.5px;
                    width: 12.5px;
                    border-radius: 50%;
                    background: ${(k=(t=this.attributes["wave-slider"])==null?void 0:t.value)!=null?k:"#4fc3f7"};
                    cursor: pointer;
                    box-shadow: none;
                }
                input[type="range"]::-webkit-slider-thumb {
                    transition: transform 0.3s;
                }
                input[type="range"]:active::-webkit-slider-thumb {
                    transform: scale(1.5);
                }
                input[type="range"]::-moz-range-thumb {
                    height: 12.5px;
                    width: 12.5px;
                    border-radius: 50%;
                    background: ${(F=(L=this.attributes["wave-slider"])==null?void 0:L.value)!=null?F:"#4fc3f7"};
                    cursor: pointer;
                    box-shadow: none;
                    border: 0px;
                }

                input[type="range"]:active::-moz-range-thumb {
                    transform: scale(1.5);
                }  
                </style>`
        }
    }
    window.customElements.define("wave-audio-path-player",Z),v.AudioPathPlayer=Z,Object.defineProperty(v,"__esModule",{value:!0}),v[Symbol.toStringTag]="Module"
});
