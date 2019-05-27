(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{41:function(t,e,n){t.exports=n(69)},46:function(t,e,n){},56:function(t,e){},69:function(t,e,n){"use strict";n.r(e);var i=n(1),o=n.n(i),a=n(18),r=n.n(a),s=(n(46),n(47),n(8)),c=n.n(s),u=n(11),l=n(32),h=n(19),f=n(5),m=n(6),d=n(21),p=n(20),g=n(22),v=n(35),b=n.n(v),_=n(2),w=function(){function t(e,n,i,o){Object(f.a)(this,t),this.k_p="number"===typeof e?e:1,this.k_i=n||0,this.k_d=i||0,this.dt=o||0,this.i_max=0,this.sumError=0,this.lastError=0,this.lastTime=0,this.target=0}return Object(m.a)(t,[{key:"setTarget",value:function(t){this.target=t}},{key:"update",value:function(t){this.currentValue=t;var e=this.dt;if(!e){var n=Date.now();e=0===this.lastTime?0:(n-this.lastTime)/1e3,this.lastTime=n}"number"===typeof e&&0!==e||(e=1);var i=this.target-this.currentValue;if(this.sumError=this.sumError+i*e,this.i_max>0&&Math.abs(this.sumError)>this.i_max){var o=this.sumError>0?1:-1;this.sumError=o*this.i_max}var a=(i-this.lastError)/e;return this.lastError=i,this.k_p*i+this.k_i*this.sumError+this.k_d*a}},{key:"reset",value:function(){this.sumError=0,this.lastError=0,this.lastTime=0}}]),t}(),E=function(){function t(e,n,i,o){Object(f.a)(this,t);var a=o/2;this.body=_.Bodies.rectangle(e,n-i/2.3,i,o,{collisionFilter:{group:-1},chamfer:{radius:10},density:2e-4,label:"vehicle_body"}),this.wheel=_.Bodies.circle(e+0,n+a,i/2.3,{collisionFilter:{group:-1},friction:.8,label:"vehicle_wheel"});var r=_.Constraint.create({bodyB:this.body,pointB:{x:0,y:a},bodyA:this.wheel,stiffness:1,length:0});this.composite=_.Composite.create({label:"vehicle"}),_.Composite.addBody(this.composite,this.body),_.Composite.addBody(this.composite,this.wheel),_.Composite.addConstraint(this.composite,r),this.collidableBodyId=this.body.id}return Object(m.a)(t,[{key:"setWheelAngularVelocity",value:function(t){_.Body.setAngularVelocity(this.wheel,-t)}},{key:"getBodyAngle",value:function(){return this.body.angle}}]),t}(),y=function(){function t(e,n){Object(f.a)(this,t),this.width=e,this.height=n;var i={isSensor:!0,isStatic:!0},o=_.Bodies.rectangle(e/2+n/2,n/2,1,n,i),a=_.Bodies.rectangle(e/2-n/2,n/2,1,n,i),r=_.Bodies.rectangle(e/2,0,n,1,i),s=_.Bodies.rectangle(e/2,n,n,1,i);o.render.visible=!1,a.render.visible=!1,r.render.visible=!1,s.render.visible=!1,this.rotationStep=0,this.rotationFactor=15e-6,this.walls=_.Composite.create({label:"walls"}),_.Composite.add(this.walls,[a,o,r,s]),this.wheel=_.Composite.create({label:"wheel"}),this.spike2=_.Bodies.polygon(e/2,1.7*n,4,n,{isStatic:!0,friction:.8,chamfer:{radius:70}}),this.spike3=_.Bodies.polygon(e/2,1.7*n,6,n,{isStatic:!0,friction:.8,chamfer:{radius:70}}),this.spike4=_.Bodies.polygon(e/2,1.7*n,7,n,{isStatic:!0,friction:.8,chamfer:{radius:100}}),_.Composite.add(this.wheel,[this.spike2,this.spike3,this.spike4]),this.composite=_.Composite.create({label:"scene"}),_.Composite.add(this.composite,[this.walls,this.wheel])}return Object(m.a)(t,[{key:"reset",value:function(){_.Composite.allBodies(this.wheel).forEach(function(t){_.Body.setAngle(t,-Math.PI/2)}),this.rotationStep=0,this.rotationFactor=15e-6}},{key:"rotateRandomly",value:function(t){var e=this;this.rotationStep+=this.rotationFactor,_.Composite.allBodies(this.wheel).forEach(function(t){_.Body.rotate(t,e.rotationStep),_.Body.setAngularVelocity(t,e.rotationStep)}),this.rotationFactor>1e-8&&(this.rotationFactor-=1e-8)}}]),t}(),k=function(){function t(){var e=this;Object(f.a)(this,t),this.vehicles=[],this.engine=_.Engine.create(),this.simulationWidth=window.innerWidth,this.simulationHeight=window.innerHeight,_.Events.on(this.engine,"collisionStart",function(t){t.pairs.forEach(function(t){e.vehicles.forEach(function(e,n,i){t.bodyA.id!==e.obj.collidableBodyId&&t.bodyB.id!==e.obj.collidableBodyId||(e.resolver(e.stepCount),i.splice(n,1))})})}),_.Events.on(this.engine,"beforeUpdate",function(t){e.scene.rotateRandomly(),e.vehicles.forEach(function(t){t.stepCount+=1,t.obj.setWheelAngularVelocity(t.controller.update(t.obj.getBodyAngle()))})}),this.scene=new y(this.simulationWidth,this.simulationHeight),_.World.add(this.engine.world,[this.scene.composite]),_.Engine.run(this.engine)}return Object(m.a)(t,[{key:"reset",value:function(){this.scene.reset()}},{key:"stop",value:function(){this.vehicles.forEach(function(t){return t.resolver(t.stepCount)})}},{key:"addVehicle",value:function(){var t=Object(u.a)(c.a.mark(function t(e,n,i){var o,a,r,s,u,l;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=new E(this.simulationWidth/2,this.simulationHeight/2,this.simulationHeight/5,this.simulationHeight/3),(a=new w(e,n,i,1)).setTarget(0),s=new Promise(function(t,e){r=t}),u={obj:o,controller:a,resolver:r,stepCount:0},this.vehicles.push(u),t.next=8,s;case 8:return l=t.sent,_.Composite.remove(this.engine.world,u.obj.composite),this.vehicles=this.vehicles.filter(function(t){return t!==u}),t.abrupt("return",l);case 12:case"end":return t.stop()}},t,this)}));return function(e,n,i){return t.apply(this,arguments)}}()},{key:"run",value:function(){var t=this;this.scene.reset(),this.vehicles.forEach(function(e){_.World.add(t.engine.world,[e.obj.composite])})}}]),t}(),j=n(36),x={tournament2:function(t,e){var n=t.length,i=t[Math.floor(Math.random()*n)],o=t[Math.floor(Math.random()*n)];return e(i.fitness,o.fitness)?i.genome:o.genome},tournament3:function(t,e){var n=t.length,i=t[Math.floor(Math.random()*n)],o=t[Math.floor(Math.random()*n)],a=t[Math.floor(Math.random()*n)],r=e(i.fitness,o.fitness)?i:o;return(r=e(r.fitness,a.fitness)?r:a).genome},fittest:function(t,e){return t[0].genome},random:function(t,e){return t[Math.floor(Math.random()*t.length)].genome}},C={tournament2:function(t,e){return[x.tournament2(t,e),x.tournament2(t,e)]},tournament3:function(t,e){return[x.tournament3(t,e),x.tournament3(t,e)]},random:function(t){return[x.random(t),x.random(t)]},fittestRandom:function(t){return[x.fittest(t),x.random(t)]}},O={maximize:function(t,e){return t>=e},minimize:function(t,e){return t<e}},S={iterations:5e3,population_size:10,mutation_rate:.6,crossover_rate:.6,fittestAlwaysSurvive:!0},F=function(){function t(){Object(f.a)(this,t),this.newIndividualFromGenome=function(t){return{fitness:0,genome:t}},this.shouldApplyFromRate=function(t){return Math.random()<=t},this.population=[],this.stopFlag=!1,this.fitness=null,this.seed=null,this.mutate=null,this.crossover=null,this.optimize=O.maximize,this.generation=null,this.notification=null,this.selectParents=C.tournament3,this.selectIndividual=x.tournament3}return Object(m.a)(t,[{key:"stop",value:function(){this.stopFlag=!0}},{key:"run",value:function(){var t=Object(u.a)(c.a.mark(function t(e){var n,i,o,a,r,s,l=this;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(this.config=Object(j.a)({},S,e),n=0;n<this.config.population_size;++n)this.population.push(this.newIndividualFromGenome(this.seed()));this.generation(0,this.population),i=0;case 4:if(!(i<this.config.iterations)||this.stopFlag){t.next=19;break}return this.population=this.population.map(function(){var t=Object(u.a)(c.a.mark(function t(e){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.fitness(e.genome);case 2:return t.t0=t.sent,t.t1=e.genome,t.abrupt("return",{fitness:t.t0,genome:t.t1});case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),this.preFitnessEval&&this.preFitnessEval(),t.next=9,Promise.all(this.population);case 9:for(this.population=t.sent,this.population.sort(function(t,e){return l.optimize(t.fitness,e.fitness)?-1:1}),this.generation(i,this.population),o=[],this.config.fittestAlwaysSurvive&&o.push(this.population[0]);o.length<this.config.population_size;)this.crossover&&this.shouldApplyFromRate(this.config.crossover_rate)&&o.length+1<this.config.population_size?(a=this.selectParents(this.population,this.optimize),r=this.crossover(a[0],a[1]),o.concat(r.map(function(t){return l.newIndividualFromGenome(t)}))):(s=this.selectIndividual(this.population,this.optimize),this.shouldApplyFromRate(this.config.mutation_rate)&&(s=this.mutate(s)),o.push(this.newIndividualFromGenome(s)));this.population=o;case 16:++i,t.next=4;break;case 19:this.population=[],this.stopFlag=!1;case 21:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}]),t}(),M=function(t,e){for(var n,i,o,a,r=t.length/e,s=[],c=0;c<t.length;c+=r)s.push((n=parseInt(t.substr(c,r),2),i=0,o=Number.MAX_SAFE_INTEGER,(n-i)*(1-(a=0))/(o-i)+a));return s},z=Number.MAX_SAFE_INTEGER.toString(2).length,R=function(){var t=[Math.random(),Math.random(),Math.random()],e="";return t.forEach(function(t){var n;e+=(n=Math.floor(t*Number.MAX_SAFE_INTEGER).toString(2),"0".repeat(z-n.length)+n)}),e},B=function(t){var e,n,i,o=Math.floor(Math.random()*t.length);return e=t,n=o,i="1"===t[o]?"0":"1",e.substring(0,n)+i+e.substring(n+1)},A=function(t,e){var n=t.length,i=Math.floor(Math.random()*n),o=Math.floor(Math.random()*n);if(i>o){var a=o;o=i,i=a}return[e.substr(0,i)+t.substr(i,o-i)+e.substr(o),t.substr(0,i)+e.substr(i,o-i)+t.substr(o)]},I=n(3),P=n(4);function W(){var t=Object(I.a)(["\n\tz-index: 1;\n\tposition: absolute;\n"]);return W=function(){return t},t}var G=P.a.canvas(W()),T=function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(d.a)(this,Object(p.a)(e).call(this,t))).canvasRef=o.a.createRef(),n}return Object(g.a)(e,t),Object(m.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=this.canvasRef.current;e.width=window.innerWidth,e.height=window.innerHeight,window.addEventListener("resize",function(){t.canvasRef.current.width=window.innerWidth,t.canvasRef.current.height=window.innerHeight});var n=_.Render.create({canvas:this.canvasRef.current,engine:this.props.engine,options:{width:window.innerWidth,height:window.innerHeight,wireframes:!0,showAngleIndicator:!0,showCollisions:!0,showIds:!0,showDebug:!0}}),i=_.Mouse.create(n.canvas),o=_.MouseConstraint.create(this.props.engine,{mouse:i,constraint:{stiffness:.2,render:{visible:!1}}});_.World.add(this.props.engine.world,o),_.Render.run(n)}},{key:"render",value:function(){return o.a.createElement(G,{ref:this.canvasRef})}}]),e}(o.a.Component);function V(){var t=Object(I.a)(['\n\tfloat: left;\n\tclear: left;\n\tfont-size: 1.5em;\n\tcolor: black;\n\tbackground-color: white;\n\tpadding: 0.2rem 0.3rem;\n\tmargin-bottom: 0.2rem;\n\tfont-family: "Source Code Pro", monospace;\n']);return V=function(){return t},t}function H(){var t=Object(I.a)(["\n\tmargin-bottom: 1.5rem;\n\toverflow: auto;\n"]);return H=function(){return t},t}var D=P.a.div(H()),N=P.a.div(V()),X=function(){return o.a.createElement(D,null,o.a.createElement(N,null,"genetic"),o.a.createElement(N,null,"playground"))};function J(){var t=Object(I.a)(['\n\tfont-size: 1em;\n\tcolor: white;\n\tfont-family: "Source Code Pro", monospace;\n\tmargin-top: 0.5em;\n']);return J=function(){return t},t}var U=P.a.div(J());function L(){var t=Object(I.a)(["\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tz-index: 2;\n\tmargin: 3rem;\n\tdisplay: flex;\n\tjustify-content: space-between;\n"]);return L=function(){return t},t}var $=P.a.div(L());function q(){var t=Object(I.a)([""]);return q=function(){return t},t}var K=P.a.div(q());function Q(){var t=Object(I.a)([""]);return Q=function(){return t},t}function Y(){var t=Object(I.a)(['\n\tmargin-left: 0.5rem;\n\twidth: 8rem;\n\tpadding: 0.2rem 0.5rem;\n\tdisplay: inline-block;\n\tborder: 1px solid #333;\n\t-webkit-appearance: none;\n\t-webkit-border-radius: 0px;\n\tbackground-color: transparent;\n\tfont-size: 1em;\n\tcolor: white;\n\tfont-family: "Source Code Pro", monospace;\n\toutline: none;\n\t&:disabled {\n\t\tborder-color: transparent;\n\t}\n']);return Y=function(){return t},t}function Z(){var t=Object(I.a)(['\n\tmargin-left: 0.5rem;\n\twidth: 4rem;\n\tpadding: 0.2rem 0.5rem;\n\tdisplay: inline-block;\n\tborder: 1px solid #333;\n\tbackground-color: transparent;\n\tfont-size: 1em;\n\tcolor: white;\n\tfont-family: "Source Code Pro", monospace;\n\toutline: none;\n\t&:disabled {\n\t\tborder-color: transparent;\n\t}\n']);return Z=function(){return t},t}function tt(){var t=Object(I.a)(['\n\tfont-size: 1em;\n\tcolor: white;\n\tfont-family: "Source Code Pro", monospace;\n']);return tt=function(){return t},t}function et(){var t=Object(I.a)(["\n\tmargin-bottom: 0.5rem;\n\tdisplay: flex;\n\tflex-direction: row;\n\talign-items: center;\n\tjustify-content: stretch;\n"]);return et=function(){return t},t}var nt=P.a.div(et()),it=P.a.div(tt()),ot=P.a.input(Z()),at=P.a.select(Y()),rt=P.a.option(Q()),st=function(t){var e=t.text,n=t.name,i=t.value,a=t.options,r=t.disabled,s=t.onChange;return o.a.createElement(nt,null,o.a.createElement(it,null,"".concat(e,":")),void 0===a?o.a.createElement(ot,{name:n,onChange:s,disabled:r,value:i}):o.a.createElement(at,{name:n,onChange:s,disabled:r,value:i},a.map(function(t){return o.a.createElement(rt,{key:t,value:t},t)})))};function ct(){var t=Object(I.a)(["\n\tpadding: 1rem;\n"]);return ct=function(){return t},t}var ut=P.a.div(ct());function lt(){var t=Object(I.a)(['\n\tpadding: 0.5rem 1rem;\n\tborder: 2px solid white;\n\tbackground-color: transparent;\n\tcolor: white;\n\tfont-size: 1rem;\n\tfont-family: "Source Code Pro", monospace;\n\tcursor: pointer;\n\toutline: none;\n\t&:hover {\n\t\topacity: 0.8;\n\t}\n']);return lt=function(){return t},t}var ht=P.a.button(lt());function ft(){var t=Object(I.a)(["\n\tcolor: white;\n\ttext-decoration: none;\n\t&:hover {\n\t\tcursor: pointer;\n\t\topacity: 0.8;\n\t}\n"]);return ft=function(){return t},t}function mt(){var t=Object(I.a)(['\n\talign-self: flex-end;\n\tfont-size: 0.8rem;\n\tcolor: white;\n\tfont-family: "Source Code Pro", monospace;\n']);return mt=function(){return t},t}var dt=P.a.div(mt()),pt=P.a.a(ft()),gt=function(){return o.a.createElement(dt,null,"Made with"," ",o.a.createElement("span",{role:"img","aria-label":"heart"},"\u2764\ufe0f")," ","by"," ",o.a.createElement(pt,{href:"https://github.com/theochampion"},"Th\xe9o Champion"))};function vt(){var t=Object(I.a)([""]);return vt=function(){return t},t}var bt=P.a.div(vt());function _t(){var t=Object(I.a)(['\n\tfont-size: 1em;\n\tcolor: #d21f3c;\n\tfont-family: "Source Code Pro", monospace;\n']);return _t=function(){return t},t}function wt(){var t=Object(I.a)(['\n\twidth: 300px;\n\tword-wrap: break-word;\n\tmargin-top: 0.5em;\n\tfont-size: 1em;\n\tcolor: white;\n\tfont-family: "Source Code Pro", monospace;\n']);return wt=function(){return t},t}var Et=P.a.div(wt()),yt=P.a.span(_t()),kt=function(t){var e=t.exGenome,n=t.genome;return o.a.createElement(Et,null,Array.from(n).map(function(t,n){return t===e[n]?t:o.a.createElement(yt,{key:n},t)}))};function jt(){var t=Object(I.a)(['\n\tfont-size: 1em;\n\tcolor: #d21f3c;\n\tfont-family: "Source Code Pro", monospace;\n']);return jt=function(){return t},t}var xt=P.a.span(jt()),Ct=function(t){var e=t.perc;return e>=0?"+".concat(e.toFixed(1),"%"):o.a.createElement(xt,null,"".concat(e.toFixed(1),"%"))},Ot=n(15);function St(){var t=Object(I.a)(["\n\tmargin-top: 1rem;\n"]);return St=function(){return t},t}var Ft=P.a.div(St()),Mt=function(t){var e=t.best_fitness_data,n=t.avg_fitness_data;return o.a.createElement(Ft,null,o.a.createElement(Ot.c,{width:300,height:200},o.a.createElement(Ot.a,{data:e.map(function(t){return{x:t.generation,y:t.fitness}}),color:"red",curve:null,opacity:1,strokeStyle:"solid",strokeWidth:"1px"}),o.a.createElement(Ot.a,{data:n.map(function(t){return{x:t.generation,y:t.fitness}}),color:"red",curve:null,opacity:.9,strokeStyle:"dashed",strokeWidth:"1px"}),o.a.createElement(Ot.b,{title:"generation",style:{line:{stroke:"#fff"},ticks:{stroke:"#fff"},text:{stroke:"none",fill:"#fff",fontWeight:600},title:{stroke:"none",fill:"#fff",fontWeight:600}}}),o.a.createElement(Ot.d,{title:"fitness",style:{line:{stroke:"#fff"},ticks:{stroke:"#fff"},text:{stroke:"none",fill:"#fff",fontWeight:600},title:{stroke:"none",fill:"#fff",fontWeight:600}}})))},zt=function(t){return t[t.length-1]},Rt=function(t){return t.length<=2?0:(e=t[t.length-1].fitness,n=t[t.length-2].fitness,(e-n)/n*100);var e,n},Bt=function(t,e){var n="";return t.forEach(function(t,i){return n+="".concat(t.generation,",").concat(t.fitness,",").concat(e[i].fitness,"\n")}),console.log(n),encodeURI("data:text/csv;charset=utf-8,".concat("generation,best_fitness,average_fitness","\n").concat(n))},At=[{text:"Population Size",name:"population_size"},{text:"Mutation rate",name:"mutation_rate"},{text:"Crossover rate",name:"crossover_rate"},{text:"Random seed",name:"random_seed"}],It="h8cnkRWfbI",Pt=function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(d.a)(this,Object(p.a)(e).call(this,t)))._runSimulation=function(){b()(n.state.random_seed,{global:!0}),n.geneticEngine.run({iterations:5e3,population_size:parseFloat(n.state.population_size),mutation_rate:parseFloat(n.state.mutation_rate),crossover_rate:parseFloat(n.state.crossover_rate)}),n.setState({simulationRunning:!0})},n._stopSimulation=function(){n.geneticEngine.stop(),n.simulatorEngine.stop(),n.setState({simulationRunning:!1})},n._handleSettingChange=function(t){return n.setState(Object(h.a)({},t.target.name,t.target.value))},n._downloadStatsAsCSV=function(){var t=Bt(n.state.best_fitness_stat,n.state.avg_fitness_stat),e="GP_export_".concat(n.state.indiv_selector,"_").concat(n.state.parent_selector,"_").concat(n.state.population_size,"_").concat(n.state.mutation_rate,"_").concat(n.state.crossover_rate,"_").concat(n.state.random_seed,"_").concat(Date.now(),".csv"),i=document.createElement("a");i.setAttribute("href",t),i.setAttribute("download",e),document.body.appendChild(i),i.click(),document.body.removeChild(i)},n.state={indiv_selector:"tournament3",parent_selector:"tournament3",population_size:10,mutation_rate:.5,crossover_rate:.5,random_seed:It,simulationRunning:!1,generation:0,ex_fittest_genome:"",fittest_genome:"",fittest_params:[],best_fitness_stat:[],avg_fitness_stat:[]},n.geneticEngine=new F,n.simulatorEngine=new k,n.geneticEngine.seed=R,n.geneticEngine.mutate=B,n.geneticEngine.crossover=A,n.geneticEngine.optimize=O.maximize,n.geneticEngine.selectIndividual=x[n.state.indiv_selector],n.geneticEngine.selectParents=C[n.state.parent_selector],n.geneticEngine.generation=function(t,e){n.setState(function(n){return{generation:t+1,ex_fittest_genome:0===t?e[0].genome:n.fittest_genome,fittest_genome:e[0].genome,fittest_params:M(e[0].genome,3),best_fitness_stat:[].concat(Object(l.a)(n.best_fitness_stat),[{generation:t,fitness:e[0].fitness}]),avg_fitness_stat:[].concat(Object(l.a)(n.avg_fitness_stat),[{generation:t,fitness:e.map(function(t){return t.fitness}).reduce(function(t,e){return t+e},0)/e.length}])}})},n.geneticEngine.preFitnessEval=function(){n.simulatorEngine.run()},n.geneticEngine.fitness=function(){var t=Object(u.a)(c.a.mark(function t(e){var i;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=M(e,3),t.next=3,n.simulatorEngine.addVehicle(i[0],i[1],i[2]);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),n}return Object(g.a)(e,t),Object(m.a)(e,[{key:"render",value:function(){var t=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement($,null,o.a.createElement(K,null,o.a.createElement(X,null),o.a.createElement(gt,null),o.a.createElement(ut,null),o.a.createElement(st,{text:"Indiv selector",name:"indiv_selector",value:this.state.indiv_selector,options:Object.keys(x),disabled:this.state.simulationRunning,onChange:function(e){t.geneticEngine.selectIndividual=x[e.target.value],t._handleSettingChange(e)}}),o.a.createElement(st,{text:"Parent selector",name:"parent_selector",value:this.state.parent_selector,options:Object.keys(C),disabled:this.state.simulationRunning,onChange:function(e){t.geneticEngine.selectParents=C[e.target.value],t._handleSettingChange(e)}}),o.a.createElement(ut,null),At.map(function(e){var n=e.text,i=e.name;return o.a.createElement(st,{key:i,text:n,name:i,value:t.state[i],disabled:t.state.simulationRunning,onChange:t._handleSettingChange})}),o.a.createElement(ut,null),o.a.createElement(ht,{onClick:this.state.simulationRunning?this._stopSimulation:this._runSimulation},this.state.simulationRunning?"Stop":"Run")),this.state.simulationRunning&&o.a.createElement(bt,null,o.a.createElement(U,null,"Generation: ".concat(this.state.generation)),o.a.createElement(U,null,"Average fitness: ".concat(zt(this.state.avg_fitness_stat).fitness," ("),o.a.createElement(Ct,{perc:Rt(this.state.avg_fitness_stat)}),")"),o.a.createElement(U,null,"Best fitness: ".concat(zt(this.state.best_fitness_stat).fitness," ("),o.a.createElement(Ct,{perc:Rt(this.state.best_fitness_stat)}),")"),o.a.createElement(Mt,{best_fitness_data:this.state.best_fitness_stat,avg_fitness_data:this.state.avg_fitness_stat}),o.a.createElement(U,null,"Fittest individual genome:"),o.a.createElement(kt,{exGenome:this.state.ex_fittest_genome,genome:this.state.fittest_genome}),o.a.createElement(U,null,"Fittest individual params:"),o.a.createElement(U,null,"P:".concat(this.state.fittest_params[0].toFixed(3)," I:").concat(this.state.fittest_params[1].toFixed(3)," D:").concat(this.state.fittest_params[2].toFixed(3))),o.a.createElement(ht,{onClick:this._downloadStatsAsCSV},"Download CSV"))),o.a.createElement(T,{engine:this.simulatorEngine.engine}))}}]),e}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(Pt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[41,1,2]]]);
//# sourceMappingURL=main.4d2d97bc.chunk.js.map