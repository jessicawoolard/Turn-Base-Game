


class Character{
    constructor(context){
       this.playerName =  context.playerName;
       this.health = context.health || 100;
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
var frank = new Villain({playerName: "Frank", attack1: 'hit1', attack2: 'hit2', image: 'image', villainPower: 'drunk joke here'});
console.log(frank);

// The Office
//     Michael Scott
//     Jan Levinson-Gould
//
// Saved by the bell
//     Zack Morris
//     Mr. Belding
//
// Fresh Prince
//     Will Smith
//     Carlton Banks
//
//
// Married with children
//     Peggy Bundy
//     Al Bundy
//
// That 70's Show
//     Eric Forman
//     Red Forman