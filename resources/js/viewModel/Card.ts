import {Monster, Magic ,Trap} from '../pages/home/cardList';

export class CardFactory {
    static createEntity(json: Monster|Magic|Trap): Card {
        if (json.card_type_id === 1) {
            return MonsterEntity.fromJson(json as Monster)
        }
        if (json.card_type_id === 2) {
            return MagicEntity.fromJson(json as Magic)
        }
        if (json.card_type_id === 3) {
            return TrapEntity.fromJson(json as Trap)
        }
        throw Error('不正な値です')
    }
}

export const createEntity = (json: Monster|Magic|Trap) => {
    if (json.card_type_id === 1) {
        return MonsterEntity.fromJson(json as Monster)
    }
    if (json.card_type_id === 2) {
        return MagicEntity.fromJson(json as Magic)
    }
    if (json.card_type_id === 3) {
        return TrapEntity.fromJson(json as Trap)
    }
    throw Error('不正な値です')
}

export interface Card {
    get_id():number;
    get_card_type_id():number;
    get_name():string;
    get_attack():number;
    get_defense():number;
    get_monster_attribute_id():number;
    get_level():number;
    get_img_path():string;
    get_effectText():string|null;
    get_type_id():number;
}


export class MonsterEntity implements Card {
    id:number;
    card_type_id:number;
    name:string;
    attack:number;
    defense:number;
    monster_attribute_id:number;
    level:number;
    monster_type_id:number;
    img_path:string;
    effectText:string|null;

    private constructor(json: Monster) {
        this.id = json.id
        this.card_type_id = json.card_type_id
        this.name = json.name
        this.attack = json.attack
        this.defense = json.defense
        this.monster_attribute_id = json.monster_attribute_id
        this.level = json.level
        this.monster_type_id = json.monster_type_id
        this.effectText = json.effectText
        this.img_path = json.img_path
    }

    get_id(): number {
        return this.id;
    }

    get_card_type_id(): number {
        return this.card_type_id
    }

    get_name(): string {
        return this.name
    }

    get_attack(): number {
        return this.attack
    }

    get_defense(): number {
        return this.defense
    }

    get_img_path(): string {
        return this.img_path
    }

    get_level(): number {
        return this.level
    }

    get_monster_attribute_id(): number {
        return this.monster_attribute_id
    }

    get_type_id(): number {
        return this.monster_type_id
    }

    get_effectText(): string | null {
        return this.effectText
    }

    static fromJson(json: Monster) {
        return new MonsterEntity({...json})
    }
}

export class MagicEntity implements Card{
    id:number;
    card_type_id:number;
    name:string;
    magic_type_id:number;
    img_path:string;
    effectText:string|null;

    private constructor(json: Magic) {
        this.id = json.id
        this.card_type_id = json.card_type_id
        this.name = json.name
        this.magic_type_id = json.magic_type_id
        this.img_path = json.img_path
        this.effectText = json.effectText
    }

    get_id(): number {
        return this.id;
    }

    get_card_type_id(): number {
        return this.card_type_id
    }

    get_name(): string {
        return this.name
    }

    get_attack(): number {
        
        throw Error('not monster')
        
    }

    get_defense(): number {
        throw Error('not monster')

    }

    get_img_path(): string {
        return this.img_path
    }

    get_level(): number {
        throw Error('not monster')
        
    }

    get_monster_attribute_id(): number {
        throw Error('not monster')
        
    }

    get_effectText(): string | null {
        return this.effectText
    }

    get_type_id(): number {
        return this.magic_type_id
    }

    static fromJson(json: Magic) {
        return new MagicEntity({...json})
    }
}
export class TrapEntity implements Card{
    id:number;
    card_type_id:number;
    name:string;
    trap_type_id:number;
    img_path:string;
    effectText:string|null;

    private constructor(json: Trap) {
        this.id = json.id
        this.card_type_id = json.card_type_id
        this.name = json.name
        this.trap_type_id = json.trap_type_id
        this.img_path = json.img_path
        this.effectText = json.effectText
    }

    get_id(): number {
        return this.id;
    }

    get_card_type_id(): number {
        return this.card_type_id
    }

    get_name(): string {
        return this.name
    }

    get_attack(): number {
        throw Error('not monster')
    }

    get_defense(): number {
        throw Error('not monster')

    }

    get_img_path(): string {
        return this.img_path
    }

    get_level(): number {
        throw Error('not monster')
        
    }

    get_monster_attribute_id(): number {
        throw Error('not monster')
        
    }

    get_effectText(): string | null {
        return this.effectText
    }

    get_type_id(): number {
        return this.trap_type_id
    }

    static fromJson(json: Trap) {
        return new TrapEntity({...json})
    }
}
