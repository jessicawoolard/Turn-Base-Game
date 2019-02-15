(function ($) {
    $(function () {
        var csrftoken = $(“[name=csrfmiddlewaretoken]“).val();
       function csrfSafeMethod(method) {
       // these HTTP methods do not require CSRF protection
       return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));


class Character{
    constructor(context){
       this.playerName =  context.playerName;
       this.health = context.health || 100;
       this.attack1 = context.attack1;
       this.attack2 = context.attack2;
    }
}

class Hero extends Character{
    constructor(context){
        super(context);
        this.specialPower = context.specialPower
    }
}

class Villain extends Character{
    constructor(context){
        super(context);
        this.villainPower = context.villainPower
    }
}


var fiona = new Hero({playerName: "Fiona", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
console.log(fiona);
var frank = new Villain({playerName: "Frank", attack1: 'hit1', attack2: 'hit2', villainPower: 'drunk joke here'});
console.log(frank);
var michael = new Hero({playerName: "Michael", attack1: 'hit1', attack2: 'hit2', specialPower: 'lonely punch'});
console.log(michael);
var jan = new Villain({playerName: "Prison Mike", attack1: 'hit1', attack2: 'hit2', villainPower: 'drunk joke here'});
console.log(jan);
var will = new Hero({playerName: "Will", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
console.log(will);
var carlton = new Villain({playerName: "Carlton", attack1: 'hit1', attack2: 'hit2', villainPower: 'drunk joke here'});
console.log(carlton);
var zack = new Hero({playerName: "Zack Morris", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
console.log(zack);
var belding = new Villain({playerName: "Mr. Belding", attack1: 'hit1', attack2: 'hit2', villainPower: 'drunk joke here'});
console.log(belding);
var eric = new Hero({playerName: "Eric", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
console.log(eric);
var red = new Villain({playerName: "Red", attack1: 'hit1', attack2: 'hit2', villainPower: 'drunk joke here'});
console.log(red);

});

}(jQuery));