export interface Character {
    data:            Data;
    characteristics: Characteristics;
    stats:           Stats;
    skills:          Skills;
    successSkills:  string[];
    objects:         Objects;
    weapons:         Weapon[];
    cash:            Cash;
    combat:          Combat;
    conditions:      string[];
}

export interface Combat{
    damageBonus:    DamageBonus;
    build:          number;
}

export interface DamageBonus{
    modifyer:    number;
    dice:      number | null;
}

export interface Cash {
    spendingLevel: number;
    cash:          number;
    assets:        number;
}

export interface Characteristics {
    FUE:    number;
    DES:    number;
    POD:    number;
    CON:    number;
    APA:    number;
    EDU:    number;
    TAM:    number;
    INT:    number;
    Mov:    number;
}

export interface Objects{
    [key: string]: number;
}

export interface Data {
    name:       string;
    age:        number;
    occupation: string;
    sex:        string;
    residence:  string;
    birthplace: string;
}

export interface Skills {
    [key: string]: number;
}

export interface Stats {
    currentStats: CurrentStats;
    maxStats:     MaxStats;
}

export interface CurrentStats {
    hp:     number;
    mp:     number;
    sanity: number;
    luck:   number;
}

export interface MaxStats {
    hpMax:     number;
    mpMax:     number;
    sanityMax: number;
    luckMax:   number;
}

export interface Weapon {
    name:       string,
    number:     number;
    skill:      string;
    damage:     string;
    range:      number;
    usesRound:  number;
    magazine:   number;
    malfunction:number;
}