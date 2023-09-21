"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[391,733,805],{401:function(e,n,t){var l,a=t(168),r=t(9256),o=t(1646),i=r.ZP.section(l||(l=(0,a.Z)(["\n  width: var(--inner);\n  margin: var(--center);\n  padding-top: 50px;\n  .write-wrapper {\n    display: flex;\n    .input-container {\n      gap: 15px;\n      width: 1%;\n      flex: 1;\n    }\n    gap: 100px;\n    "," {\n      flex-direction: column;\n      .input-container {\n        width: 100%;\n        flex: 1;\n      }\n    }\n  }\n  .write-description {\n    position: sticky;\n    top: 50px;\n    order: 1;\n    "," {\n      position: static;\n      order: 0;\n    }\n  }\n  input {\n    border: none;\n    border-bottom: 1px solid var(--black-600);\n    padding-top: 10px;\n    padding-left: 3px;\n    border-radius: 0;\n    transition: all.1s;\n    font-weight: var(--nanum-semi-bold);\n    font-size: 1.6rem;\n    &:focus {\n      border-color: var(--black-100);\n    }\n  }\n  .progress-input {\n    position: relative;\n    .progress-bar {\n      position: absolute;\n      bottom: 25px;\n    }\n  }\n  .selectors {\n    position: relative;\n    display: flex;\n    gap: 30px;\n    .lang-selector {\n      flex: 1;\n    }\n  }\n  .tag-container {\n    margin-top: 30px;\n    input {\n      margin-bottom: -10px;\n    }\n  }\n  .body-content {\n    border: 1px solid var(--black-500);\n    transition: all.1s;\n    font-weight: var(--nanum-bold);\n    font-size: 1.6rem;\n    &:focus {\n      border-color: var(--black-100);\n    }\n  }\n  .progress-textarea {\n    position: relative;\n    .progress-bar {\n      position: absolute;\n      top: 10px;\n    }\n  }\n\n  .body-image {\n    margin-top: 40px;\n  }\n  .button-box {\n    margin-top: 60px;\n    display: flex;\n    gap: 20px;\n    button {\n      width: 70px;\n    }\n  }\n"])),o.gv,o.gv);n.Z=i},9805:function(e,n,t){t.r(n),t.d(n,{default:function(){return d}});var l,a=t(168),r=(t(2791),t(9256)),o=t(2665),i=t(5983),s=t(6764),u=t(184),c=(0,r.zo)(o.Z)(l||(l=(0,a.Z)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  h2 {\n    font-size: 15rem;\n    margin-bottom: 50px;\n    font-weight: bold;\n    color: var(--backgroundColor);\n    text-shadow: 0px 0px 10px var(--black-300);\n  }\n  span {\n    font-size: 2rem;\n    text-align: center;\n    margin-bottom: 30px;\n    font-weight: var(--nanum-semi-bold);\n    color: var(--black-300);\n  }\n  button {\n    padding: 10px 25px;\n  }\n"])));function d(){var e=(0,s.Z)().toAbout;return(0,u.jsxs)(c,{children:[(0,u.jsx)("h2",{children:"404"}),(0,u.jsx)("span",{children:"\uc694\uccad\ud558\uc2e0 \ud398\uc774\uc9c0\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,u.jsx)(i.Td,{onClick:e,children:"\ud648\uc73c\ub85c"})]})}},5391:function(e,n,t){t.r(n),t.d(n,{default:function(){return D}});var l=t(9439),a=t(2791),r=t(1743),o=t(6450),i=t(2715),s=t(5983),u=t(3712),c=t(6764),d=t(8390),h=t(8632),p=t(7190),m=t(4931),g=t(1767),x=t(2889),f=t(769),v=t(6276),b=t(7085),j=t(977),Z=t(7689),w=t(9434),N=t(9100),y=t(7889),C=t(3733),I=t(9805),F=t(184);function D(){var e,n,t,D=(0,c.Z)().toProject,k=(0,Z.UO)().projectId,S=(0,u.Z)(b.cl),P=(0,l.Z)(S,4),z=P[0],L=P[1],U=(P[2],P[3]),E=(0,m.Z)({},b.FD),A=(0,l.Z)(E,4),H=A[0],G=A[1],Y=A[2],T=A[3],W=(0,a.useState)(!1),M=(0,l.Z)(W,2),O=M[0],V=M[1],X=(0,y.Z)(),q=(0,l.Z)(X,4),R=q[0],B=q[1],J=q[2],K=q[3],Q=(0,a.useState)(!1),$=(0,l.Z)(Q,2),_=$[0],ee=$[1],ne=(0,a.useState)(!0),te=(0,l.Z)(ne,2),le=te[0],ae=te[1],re=(0,w.v9)((function(e){return e.user})),oe=(0,w.v9)((function(e){return e.user})).userInfo.memberId;(0,a.useEffect)((function(){v.Z.get("/projects/".concat(k)).then((function(e){e.data.memberId!==oe&&(D(),alert("\uc218\uc815 \uad8c\ud55c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4")),U((0,j.X)(e.data)),ae(!0)})).catch((function(e){V(!0),"Request failed with status code 404"===e.message?ae("404"):ae(!1)}))}),[]);var ie="100%",se="30rem",ue=function(){var e=[];e.push({value:"",label:"-"});for(var n=0;n<f.Z.length;n++)e.push({value:f.Z[n],label:f.Z[n]});return e}();return(0,F.jsx)(F.Fragment,{children:"404"===le?(0,F.jsx)(I.default,{}):!0===le&&(0,F.jsxs)(C.StyleProjectWrite,{className:"col",children:[O&&(0,F.jsx)(N.Z,{type:_?"confirm":"alert",setIsOpen:V,title:"\uc54c\ub9bc",body:le?R:"\uc11c\ubc84\uc640\uc758 \ud1b5\uc2e0\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.",confirmHandler:function(){return!le||B||_?D():V(!1)}}),(0,F.jsxs)("div",{className:"write-wrapper",children:[(0,F.jsx)(h.Z,{type:"project",state:"edit"}),(0,F.jsxs)("div",{className:"input-container col",children:[(0,F.jsxs)("div",{className:"progress-input",children:[(0,F.jsx)(r.Z,{label:"\ud504\ub85c\uc81d\ud2b8 \uc81c\ubaa9",width:"100%",onChange:function(e){L(null,e.target.value,"title"),G(null,e.target.value,"title",g.e)},placeholder:"\ucd5c\uc18c 10 \uae00\uc790 \ucd5c\ub300 30\uae00\uc790\uae4c\uc9c0 \uc785\ub825 \uac00\ub2a5 \ud569\ub2c8\ub2e4. (\ud544\uc218)",type:"text",maxLength:30,defaultValue:z.title}),(0,F.jsx)(x.Z,{width:"100%",fontSize:"1.3rem",comPleteNum:b.FD.title.max,proGressNum:null!==(e=z.title.length)&&void 0!==e?e:0,error:z.title.length<10})]}),(0,F.jsx)("div",{className:"selectors col",children:(0,F.jsx)(p.Z,{className:"lang-selector",text:"\uc5b8\uc5b4 \uc120\ud0dd",component:(0,F.jsx)(o.Z,{width:ie,options:ue,defaultLabel:z.lang,onClickHandler:function(e){L(null,e,"lang"),G(null,e,"lang",g.e)}})})}),(0,F.jsx)(d.Z,{width:"100%",height:"3.5rem",placeholder:"\ud0dc\uadf8\ub294 \ucd5c\ub300 3\uac1c\uae4c\uc9c0 \ub4f1\ub85d\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.",defaultTags:1===z.tags.length&&""===z.tags[0]?[]:z.tags,handleInputChange:L}),(0,F.jsxs)("div",{className:"progress-textarea",children:[(0,F.jsx)(r.Z,{label:"\uae30\ud68d\uc11c",width:ie,height:se,type:"textarea",onChange:function(e){L(null,e.target.value,"body"),G(null,e.target.value,"body",g.e)},placeholder:"\ucd5c\uc18c 100 ~ 500\uae00\uc790\uae4c\uc9c0 \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4. (\ud544\uc218)",maxLength:500,defaultValue:z.body}),(0,F.jsx)(x.Z,{className:"margin-top-remove",width:"100%",height:"1.2rem",fontSize:"1.2rem",comPleteNum:b.FD.body.max,proGressNum:null!==(n=z.body.length)&&void 0!==n?n:0,error:z.body.length<100})]}),(0,F.jsxs)("div",{className:"progress-textarae",children:[(0,F.jsx)(r.Z,{label:"\uc0c1\uc138 \uc694\uac15",width:ie,height:se,type:"textarea",onChange:function(e){L(null,e.target.value,"description"),G(null,e.target.value,"description",g.e)},placeholder:"\ucd5c\ub300 200\uae00\uc790\uae4c\uc9c0 \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4. (\uc120\ud0dd)",maxLength:200,defaultValue:z.description}),(0,F.jsx)(x.Z,{className:"margin-top-remove",width:"100%",height:"1.2rem",fontSize:"1.2rem",comPleteNum:b.FD.description.max,proGressNum:null!==(t=z.description.length)&&void 0!==t?t:0,error:z.description.length>200})]}),(0,F.jsx)(i.Z,{name:"\ud0c0\uc774\ud2c0 \uc774\ubbf8\uc9c0",width:"100%",height:"200px",number:1,dataForm:z,handleInputChange:L,handleErrorChange:G,clearError:Y,defaultImgs:z.titleImage,setWillDeleteImgs:!0}),(0,F.jsx)(i.Z,{name:"\uc774\ubbf8\uc9c0",width:"100%",height:"200px",number:7,dataForm:z,handleInputChange:L,defaultImgs:z.images,setWillDeleteImgs:!0})]})]}),(0,F.jsxs)("div",{className:"button-box",children:[(0,F.jsx)(s.wU,{onClick:function(){V(!0),J(z,H,T,"project",re.userInfo.memberId,k)},children:"\uc218\uc815"}),(0,F.jsx)(s.wU,{onClick:function(){V(!0),ee(!0),K("\uc791\uc131 \ucde8\uc18c\uc2dc \uc791\uc131\ud55c \ub0b4\uc6a9\uc740 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.")},children:"\ucde8\uc18c"})]})]})})}},3733:function(e,n,t){t.r(n),t.d(n,{StyleProjectWrite:function(){return k},default:function(){return S}});var l=t(9439),a=t(168),r=t(2791),o=t(9256),i=t(1743),s=t(6450),u=t(2715),c=t(3712),d=t(3433),h=t(1767),p=t(184);function m(e){var n=e.defaultDate,t=e.width,a=e.handleInputChange,o=e.handleErrorChange,i=new Date,u=(0,r.useState)([]),c=(0,l.Z)(u,2),m=c[0],g=c[1];(0,r.useEffect)((function(){if(null!==n&&void 0!==n&&n.length){var e=new Date(n);g([e.getFullYear(),e.getMonth()+1,e.getDate()])}}),[n]);var x=[function(){for(var e=[],n=i.getFullYear();n<=i.getFullYear()+10;n++)e.push({value:n,label:n});return e}(),function(){for(var e=[],n=i.getFullYear()===m[0]?i.getMonth()+1:1;n<=12;n++)e.push({value:n,label:n});return e}(),function(){for(var e=[],n=new Date(m[0],m[1],0).getDate(),t=i.getFullYear()===m[0]&&i.getMonth()+1===m[1]?i.getDate()+1:1;t<=n;t++)e.push({value:t,label:t});return e}()];return(0,p.jsx)(p.Fragment,{children:m.map((function(e,n){return(0,p.jsx)(s.Z,{width:t,options:x[n],defaultLabel:e,onClickHandler:function(e){g(function(e,n){if(0===e){var t=(0,d.Z)(m);return t[0]=n,t[1]="-",t[2]="-",t}if(1===e){var l=(0,d.Z)(m);return l[1]=n,l[2]="-",l}if(2===e){var a=(0,d.Z)(m);return a[2]=n,a}}(n,e)),2===n?(a(null,String(new Date(m[0],m[1]-1,e)),"closedAt"),o(null,String(new Date(m[0],m[1],e)),"closedAt",h.e)):(a(null,"","closedAt"),o(null,"","closedAt",h.e))}},n)}))})}t(2665);var g,x=t(6764),f=t(8390),v=t(8632),b=t(7190),j=t(4931),Z=t(2889),w=t(769),N=t(7085),y=t(9100),C=t(9434),I=t(5983),F=t(7889),D=t(401),k=(0,o.zo)(D.Z)(g||(g=(0,a.Z)(["\n  .selectors {\n    gap: 70px;\n    margin-bottom: 5rem;\n  }\n  .data-select-container {\n    gap: 1rem;\n  }\n"])));function S(){var e,n,t,a=(0,x.Z)().toProject,o=(0,r.useState)(!1),d=(0,l.Z)(o,2),g=d[0],D=d[1],S=(0,c.Z)(N.cl),P=(0,l.Z)(S,2),z=P[0],L=P[1],U=(0,j.Z)(N.sH,N.FD),E=(0,l.Z)(U,4),A=E[0],H=E[1],G=E[2],Y=E[3],T=(0,F.Z)(),W=(0,l.Z)(T,4),M=W[0],O=W[1],V=W[2],X=W[3],q=(0,r.useState)(!1),R=(0,l.Z)(q,2),B=R[0],J=R[1],K=(0,C.v9)((function(e){return e.user})),Q="100%",$="23rem",_=function(){var e=[];e.push({value:"",label:"-"});for(var n=0;n<w.Z.length;n++)e.push({value:w.Z[n],label:w.Z[n]});return e}();return(0,p.jsxs)(k,{className:"col",children:[g&&(0,p.jsx)(y.Z,{type:B?"confirm":"alert",setIsOpen:D,title:"\uc54c\ub9bc",body:M,confirmHandler:function(){return O||B?a():D(!1)}}),(0,p.jsxs)("div",{className:"write-wrapper",children:[(0,p.jsx)(v.Z,{type:"project"}),(0,p.jsxs)("div",{className:"input-container col",children:[(0,p.jsxs)("div",{className:"progress-input",children:[(0,p.jsx)(i.Z,{label:"\ud504\ub85c\uc81d\ud2b8 \uc81c\ubaa9",width:"100%",onChange:function(e){L(null,e.target.value,"title"),H(null,e.target.value,"title",h.e)},placeholder:"\ucd5c\uc18c 10 \uae00\uc790 \ucd5c\ub300 30\uae00\uc790\uae4c\uc9c0 \uc785\ub825 \uac00\ub2a5 \ud569\ub2c8\ub2e4. (\ud544\uc218)",type:"text",maxLength:30}),(0,p.jsx)(Z.Z,{width:"100%",fontSize:"1.3rem",comPleteNum:N.FD.title.max,proGressNum:null!==(e=z.title.length)&&void 0!==e?e:0,error:z.title.length<10})]}),(0,p.jsxs)("div",{className:"selectors col",children:[(0,p.jsx)(b.Z,{className:"lang-selector",text:"\uc5b8\uc5b4 \uc120\ud0dd",component:(0,p.jsx)(s.Z,{height:"37px",width:Q,options:_,defaultLabel:"-",onClickHandler:function(e){L(null,e,"lang"),H(null,e,"lang",h.e)}})}),(0,p.jsx)(b.Z,{text:"\ubaa8\uc9d1\ud560 \uc778\uc6d0\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.",component:(0,p.jsx)(s.Z,{width:Q,options:[{value:"",label:"-"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"8"},{value:"9",label:"9"},{value:"10",label:"10"}],defaultLabel:"-",onClickHandler:function(e){L(null,e,"totalPeople"),H(null,e,"totalPeople",h.e)}}),error:A.totalPeople,name:"\ubaa8\uc9d1 \uc778\uc6d0"}),(0,p.jsx)(b.Z,{text:"\ud504\ub85c\uc81d\ud2b8 \ub9c8\uac10 \ub0a0\uc9dc\ub97c \uc120\ud0dd \ud574 \uc8fc\uc138\uc694. (\ubaa8\uc9d1 \uc2dc\uc791\uc740 \uc791\uc131\uc77c \uae30\uc900\uc785\ub2c8\ub2e4.)",component:(0,p.jsx)("div",{className:"data-select-container row",children:(0,p.jsx)(m,{defaultDate:z.closedAt,width:Q,handleInputChange:L,handleErrorChange:H})}),error:A.closedAt,name:"\ub9c8\uac10 \ub0a0\uc9dc"})]}),(0,p.jsx)(f.Z,{className:"tag-container",width:"100%",height:"3.5rem",placeholder:"\ud0dc\uadf8\ub294 \ucd5c\ub300 3\uac1c\uae4c\uc9c0 \ub4f1\ub85d\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.",dataForm:z,handleInputChange:L}),(0,p.jsxs)("div",{className:"progress-textarea",children:[(0,p.jsx)(i.Z,{className:"body-content",label:"\ud504\ub85c\uc81d\ud2b8 \ubcf8\ubb38",width:Q,height:$,type:"textarea",onChange:function(e){L(null,e.target.value,"body"),H(null,e.target.value,"body",h.e)},placeholder:"100 - 500 \uae00\uc790\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694",maxLength:500}),(0,p.jsx)(Z.Z,{width:"100%",height:"1.2rem",fontSize:"1.2rem",comPleteNum:N.FD.body.max,proGressNum:null!==(n=z.body.length)&&void 0!==n?n:0,error:z.body.length<100})]}),(0,p.jsxs)("div",{className:"progress-textarea",children:[(0,p.jsx)(i.Z,{className:"body-content",label:"\uc0c1\uc138 \uc694\uac15",width:Q,height:$,type:"textarea",onChange:function(e){L(null,e.target.value,"description"),H(null,e.target.value,"description",h.e)},placeholder:"\ucd5c\ub300 200\uae00\uc790\uae4c\uc9c0 \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4",maxLength:200}),(0,p.jsx)(Z.Z,{width:"100%",height:"1.2rem",fontSize:"1.2rem",comPleteNum:N.FD.description.max,proGressNum:null!==(t=z.description.length)&&void 0!==t?t:0,error:z.description.length>200})]}),(0,p.jsx)(u.Z,{className:"title-image",name:"\ud0c0\uc774\ud2c0 \uc774\ubbf8\uc9c0",width:"100%",height:"200px",number:1,dataForm:z,handleInputChange:L,handleErrorChange:H,clearError:G}),(0,p.jsx)(u.Z,{className:"body-image",name:"\uc774\ubbf8\uc9c0",width:"100%",height:"200px",number:7,dataForm:z,handleInputChange:L})]})]}),(0,p.jsxs)("div",{className:"button-box",children:[(0,p.jsx)(I.wU,{onClick:function(){D(!0),V(z,A,Y,"project",K.userInfo.memberId)},children:"\uc791\uc131"}),(0,p.jsx)(I.wU,{onClick:function(){D(!0),J(!0),X("\uc791\uc131 \ucde8\uc18c\uc2dc \uc791\uc131\ud55c \ub0b4\uc6a9\uc740 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.")},children:"\ucde8\uc18c"})]})]})}},977:function(e,n,t){t.d(n,{X:function(){return a}});var l=t(1413),a=function(e,n){var t=(0,l.Z)({},e);for(var a in e)if("images"===a){for(var r=[],o=0;o<e[a].length;o++)r.push(e[a][o].imageUrl);t[a]=r,t.imageFile=new FormData,t.imageUrls=[]}else"projectTitleImage"!==a&&"portfolioTitleImage"!==a||(t.titleImage=[e[a].imageUrl],t.titleImageFile=new FormData,t.titleImageUrl="");return t}}}]);
//# sourceMappingURL=391.59b1105d.chunk.js.map