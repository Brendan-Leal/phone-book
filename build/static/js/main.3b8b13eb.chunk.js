(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,n,t){},23:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var c=t(17),r=t.n(c),u=(t(22),t(8)),o=t(3),a=t(1),i=(t(23),t(0)),s=function(e){var n=e.newName,t=e.newNumber,c=e.onNameChange,r=e.onNumberChange,u=e.onSubmit;return Object(i.jsxs)("form",{onSubmit:u,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:n,onChange:c})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{placeholder:"555-555-5555",value:t,onChange:r})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{value:t,type:"submit",children:"add"})})]})},l=function(e){var n=e.contacts,t=e.filterTerm,c=e.deletePerson;return Object(i.jsx)("ul",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(i.jsxs)("li",{children:[e.name,": ",e.number,Object(i.jsx)("button",{onClick:c(e.id),children:"Delete"})]},e.name)}))})};var b=function(e){var n=e.message;return null==n?null:Object(i.jsx)("div",{className:"error",children:n})},j=function(e){var n=e.term,t=e.onChange;return Object(i.jsxs)("div",{children:["Filter By Name: ",Object(i.jsx)("input",{value:n,onChange:t})]})};var m=function(e){var n=e.message;return null==n?null:Object(i.jsx)("div",{className:"success",children:n})},d=t(4),f=t.n(d),h="/api/persons";var O={getAll:function(){return f.a.get(h).then((function(e){return e.data}))},makeNewPerson:function(e){return f.a.post(h,e).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},deletePerson:function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},updatePerson:function(e){return f.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}))}};var v=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),d=Object(o.a)(r,2),f=d[0],h=d[1],v=Object(a.useState)(""),p=Object(o.a)(v,2),x=p[0],g=p[1],w=Object(a.useState)(""),N=Object(o.a)(w,2),C=N[0],y=N[1],S=Object(a.useState)(null),k=Object(o.a)(S,2),P=k[0],T=k[1],A=Object(a.useState)(null),L=Object(o.a)(A,2),B=L[0],D=L[1];return Object(a.useEffect)((function(){O.getAll().then((function(e){c(e)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(m,{message:P}),Object(i.jsx)(b,{message:B}),Object(i.jsx)(s,{newName:f,newNumber:x,onNameChange:function(e){h(e.target.value)},onNumberChange:function(e){g(e.target.value)},onSubmit:function(e){if(e.preventDefault(),t.some((function(e){return e.name===f&&e.number!==x}))){var n=t.find((function(e){return e.name===f&&e.number!==x})),r=Object(u.a)(Object(u.a)({},n),{},{number:x});window.confirm("".concat(f," is already in the phonebook do you want to update that persons phone number?"))&&O.updatePerson(r).then((function(e){c(t.map((function(n){return n.id===e.id?e:n}))),T("Successfully updated ".concat(e.name," ")),setTimeout((function(){T(null)}),6e3)})).catch((function(e){D("Already removed ".concat(f," from server")),setTimeout((function(){D(null)}),5e3)}))}else if(t.some((function(e){return e.name===f})))alert("".concat(f," is already in the phonebook"));else{var o={name:f,number:x};O.makeNewPerson(o).then((function(e){c(t.concat(e)),h(""),g(""),T("Successfully created ".concat(e.name," ")),setTimeout((function(){T(null)}),3e3)}))}}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(j,{term:C,onChange:function(e){y(e.target.value.toLowerCase())}}),Object(i.jsx)(l,{deletePerson:function(e){return function(){var n=t.filter((function(n){return n.id!==e}));window.confirm("Are you sure you want to delete them?")&&O.deletePerson(e).then((function(){c(n)}))}},contacts:t,filterTerm:C})]})};r.a.render(Object(i.jsx)(v,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.3b8b13eb.chunk.js.map