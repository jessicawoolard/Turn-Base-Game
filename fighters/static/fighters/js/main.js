


class Character{
    constructor(context){
       this.playerName =  context.playerName;
       this.attack1 = context.attack1;
       this.attack2 = context.attack2;
       this.image = context.image;
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


var fiona = new Hero({playerName: "Fiona", attack1: 'hit1', attack2: 'hit2', image: 'image', specialPower: 'snatch and grab'});
console.log(fiona);
var frank = new Villain({playerName: "Frank", attack1: 'hit1', attack2: 'hit2', image: 'image', specialPower: 'drunk joke here'});
console.log(frank);