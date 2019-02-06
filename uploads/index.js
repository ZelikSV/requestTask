
// Замыкание с обьектом
/* let o = { val: 10 };

function s(a = o){
    a.val++;
    console.log(a.val);
}
function h(a = o){
    a.val--;
    console.log(a.val);
}

s();
s();
h();
h();
h();
console.log(o); */



// Замыкание с переменной
/* let g = 5;

function s2(a = g){
    a++;
    console.log(a);
}
function h2(a = g){
    a--;
    console.log(a);
}

s2();
s2();
s2();
h2();
h2();
h2(); */

/* var a = 1;

function a(a = a){
    a = a + 1;
    return a;
}
// x = a();
try{
    x = a();
} catch(error){
    console.log(error);
    
}
console.log(x);
console.log(a);
 */
/* 
var x;
x = function(){};
x = 10;
x = [1, 2, 3]
console.log(x);
 */
function Animal(name, age){
    this.name = name;
    this.age = age;
}
Animal.prototype.run = function(){
    console.log(this.name);
}

const a = new Animal('Heh', 45);

a.run();

function Rabbit(weight){
    this.weight = weight;
}

Rabbit.prototype = Object.create(Animal.prototype);

const b = new Rabbit();

