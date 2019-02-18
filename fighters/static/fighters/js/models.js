
class Character{
    constructor(context){
       this.playerName =  context.playerName;
       this.health = context.health || 100;
       this.image = context.image
    }

}

class Hero extends Character{
    constructor(context){
        super(context);
        this.specialPower = context.specialPower
    }

}

class Villain extends Character {
    constructor(context) {
        super(context);
        this.villainPower = context.villainPower
    }
}