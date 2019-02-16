
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
