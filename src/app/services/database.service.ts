// src/app/services/database.service.ts
import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

/**
 * Modelos
 */
export interface Occupation {
  id_occupation?: number; // llave autoincremental
  occupationName: string;
  minCredit: number;
  maxCredit: number;
  occupationSkills: any; // objeto con la estructura JSON que tu proporcionaste
}

export interface Character {
  id?: number;
  name: string;
  data: any;
}

/**
 * Servicio Dexie
 */
@Injectable({ providedIn: 'root' })
export class DatabaseService extends Dexie {
  // tablas
  occupations!: Table<Occupation, number>;
  characters!: Table<Character, number>;

  constructor() {
    super('CutuluDB'); // nombre de la BD en IndexedDB
    // Version 1: definimos tablas y los índices
    this.version(1).stores({
      occupations: '++id_occupation, occupationName, minCredit, maxCredit',
      characters: '++id, name'
    });

    // Mapear propiedades a las tablas (para que TS conozca los tipos)
    this.occupations = this.table('occupations');
    this.characters = this.table('characters');
  }

  /**
   * Inicializar: debe llamarse al arranque (APP_INITIALIZER)
   * - crea tablas (ya hecho por Dexie)
   * - inserta datos por defecto en occupations si está vacía
   */
  async init(): Promise<void> {
    // Espera a que Dexie termine de inicializar
    await this.open();

    // Si la tabla occupations está vacía, insertar valores por defecto
    const count = await this.occupations.count();
    if (count === 0) {
      console.log('DB: No hay occupations. Insertando valores por defecto...');
      await this.occupations.bulkAdd(DEFAULT_OCCUPATIONS);
      console.log('DB: occupations insertadas.');
    } else {
      console.log(`DB: occupations ya existentes: ${count}`);
    }
  }

  // === Métodos CRUD de ejemplo para characters ===
  
  async getCharacterNames(): Promise<string[]> {
    const characters = await this.characters.toArray();
    return characters.map(c => c.name);
  }

  async getCharacterByName(name: string) {
    const character = await this.characters.get({ name });
    return character?.data;
  }

  async getOccupationNames(): Promise<string[]> {
    const occupations = await this.occupations.toArray();
    return occupations.map(o => o.occupationName);
  }

  async getOccupationSkills(occupationName: string): Promise<string[]> {
    const occ = await this.occupations.get({ occupationName });
    return occ?.occupationSkills ?? [];
  }

  async getOccupationCreditRange(name: string) {
    const occ = await this.occupations
      .where("occupationName")
      .equals(name)
      .first();

    if (!occ) {
      throw new Error("Character not found");
    }

    return {
      minCredit: occ.minCredit,
      maxCredit: occ.maxCredit
    };
  }

  async addCharacter(c: Omit<Character, 'id'>) {
    return await this.characters.add({ ...c });
  }

  async updateCharacter(name: string, newData: any) {
    const character = await this.characters
      .where("name")
      .equals(name)
      .first();

    if (!character) {
      throw new Error("Character not found");
    }

    return await this.characters.update(character.id!, newData);
  }

  async deleteCharacter(name: string) {
    return await this.characters.where({ name }).delete();
  }
}

/**
 * ---------------------------------------------------
 *  DEFAULT_OCCUPATIONS: pega aquí tus 27 entradas
 *  (he convertido el JSON que me diste a objetos JS)
 * ---------------------------------------------------
 */
const DEFAULT_OCCUPATIONS: Occupation[] = [
  {
    id_occupation: 1,
    occupationName: 'Abogado',
    minCredit: 30,
    maxCredit: 80,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Buscar_libros', 'Contabilidad', 'Derecho', 'Psicología'] },
      interpersonalSkills: { number: '2', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 2,
    occupationName: 'Agente de policía',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arma_corta', 'Fusil_o_Escopeta', 'Pelea', 'Derecho', 'Descubrir', 'Primeros_auxilios', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      personalSkill: { number: '1', skills: ['Conducir_automóvil', 'Equitación'] },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 3,
    occupationName: 'Anticuario',
    minCredit: 30,
    maxCredit: 70,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arte_o_Artesanía', 'Buscar_libros', 'Descubrir', 'Historia', 'Otras_lenguas', 'Tasación'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 4,
    occupationName: 'Artista',
    minCredit: 9,
    maxCredit: 50,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arte_o_Artesanía', 'Descubrir', 'Historia', 'Naturaleza', 'Otras_lenguas', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      occupationPoints: 3
    }
  },
  {
    id_occupation: 5,
    occupationName: 'Atleta profesional',
    minCredit: 9,
    maxCredit: 70,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Pelea', 'Equitación', 'Lanzar', 'Nadar', 'Saltar', 'Trepar'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 6,
    occupationName: 'Bibliotecario',
    minCredit: 9,
    maxCredit: 35,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Buscar_libros', 'Contabilidad', 'Lengua_propia', 'Otras_lenguas'] },
      extraSkills: { number: '4' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 7,
    occupationName: 'Clérigo',
    minCredit: 9,
    maxCredit: 60,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Buscar_libros', 'Contabilidad', 'Escuchar', 'Historia', 'Otras_lenguas', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 8,
    occupationName: 'Criminal',
    minCredit: 5,
    maxCredit: 65,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Descubrir', 'Psicología', 'Sigilo'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      personalSkill: { number: '4', skills: ['Arma_corta', 'Fusil_o_Escopeta', 'Cerrajería', 'Pelea', 'Disfrazarse', 'Juego_de_manos', 'Mecánica', 'Tasación'] },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 9,
    occupationName: 'Diletante',
    minCredit: 50,
    maxCredit: 99,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arma_corta', 'Fusil_o_Escopeta', 'Arte_o_Artesanía', 'Equitación', 'Otras_lenguas'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '3' },
      occupationPoints: 4
    }
  },
  {
    id_occupation: 10,
    occupationName: 'Escritor',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Literatura', 'Buscar_libros', 'Historia', 'Lengua_propia', 'Naturaleza', 'Ciencias_ocultas', 'Otras_lenguas', 'Psicología'] },
      extraSkills: { number: '1' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 11,
    occupationName: 'Fanático',
    minCredit: 0,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Historia', 'Psicología', 'Sigilo'] },
      interpersonalSkills: { number: '2', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '3' },
      occupationPoints: 5
    }
  },
  {
    id_occupation: 12,
    occupationName: 'Granjero',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Agricultura', 'Conducir_automóvil', 'Conducir_maquinaria', 'Mecánica', 'Naturaleza', 'Seguir_rastros', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 13,
    occupationName: 'Ingeniero',
    minCredit: 30,
    maxCredit: 60,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Dibujo_técnico', 'Buscar_libros', 'Ingeniería', 'Física', 'Conducir_maquinaria', 'Electricidad', 'Mecánica'] },
      extraSkills: { number: '1' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 14,
    occupationName: 'Inspector de policía',
    minCredit: 20,
    maxCredit: 50,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arma_corta', 'Fusil_o_Escopeta', 'Interpretación', 'Disfrazarse', 'Derecho', 'Descubrir', 'Escuchar', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 15,
    occupationName: 'Intérprete',
    minCredit: 9,
    maxCredit: 70,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Interpretación', 'Disfrazarse', 'Escuchar', 'Psicología'] },
      interpersonalSkills: { number: '2', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      occupationPoints: 4
    }
  },
  {
    id_occupation: 16,
    occupationName: 'Investigador privado',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Fotografía', 'Buscar_libros', 'Derecho', 'Descubrir', 'Disfrazarse', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 17,
    occupationName: 'Médico',
    minCredit: 30,
    maxCredit: 80,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Biología', 'Farmacología', 'Medicina', 'Latín', 'Primeros_auxilios', 'Psicología'] },
      extraSkills: { number: '2' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 18,
    occupationName: 'Miembro de una tribu',
    minCredit: 0,
    maxCredit: 15,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Ciencias_ocultas', 'Pelea', 'Lanzar', 'Descubrir', 'Escuchar', 'Naturaleza', 'Supervivencia', 'Trepar'] },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 19,
    occupationName: 'Misionero',
    minCredit: 0,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arte_o_Artesanía', 'Medicina', 'Mecánica', 'Naturaleza'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 20,
    occupationName: 'Músico',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Instrumento', 'Escuchar', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '4' },
      occupationPoints: 3
    }
  },
  {
    id_occupation: 21,
    occupationName: 'Oficial militar',
    minCredit: 20,
    maxCredit: 70,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arma_corta', 'Fusil_o_Escopeta', 'Contabilidad', 'Orientarse', 'Psicología', 'Supervivencia'] },
      interpersonalSkills: { number: '2', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '1' },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 22,
    occupationName: 'Parapsicólogo',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Antropología', 'Fotografía', 'Buscar_libros', 'Ciencias_ocultas', 'Historia', 'Otras_lenguas', 'Psicología'] },
      extraSkills: { number: '1' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 23,
    occupationName: 'Periodista',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Fotografía', 'Buscar_libros', 'Historia', 'Lengua_propia', 'Psicología'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 24,
    occupationName: 'Piloto',
    minCredit: 20,
    maxCredit: 70,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Astronomía', 'Conducir_maquinaria', 'Electricidad', 'Mecánica', 'Orientarse', 'Pilotar_aeronave'] },
      extraSkills: { number: '2' },
      occupationPoints: 6
    }
  },
  {
    id_occupation: 25,
    occupationName: 'Profesor de universidad',
    minCredit: 20,
    maxCredit: 70,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Buscar_libros', 'Lengua_propia', 'Otras_lenguas', 'Psicología'] },
      extraSkills: { number: '4' },
      occupationPoints: 1
    }
  },
  {
    id_occupation: 26,
    occupationName: 'Soldado',
    minCredit: 9,
    maxCredit: 30,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Arma_corta', 'Fusil_o_Escopeta', 'Pelea', 'Esquivar', 'Sigilo', 'Supervivencia', 'Trepar', 'Nadar'] },
      personalSkill: { number: '2', skills: ['Mecánica', 'Otras_lenguas', 'Primeros_auxilios'] },
      occupationPoints: 2
    }
  },
  {
    id_occupation: 27,
    occupationName: 'Vagabundo',
    minCredit: 0,
    maxCredit: 5,
    occupationSkills: {
      occupationSkill: { number: '100', skills: ['Escuchar', 'Orientarse', 'Saltar', 'Sigilo', 'Trepar'] },
      interpersonalSkills: { number: '1', skills: ['Charlatanería', 'Encanto', 'Intimidar', 'Persuasión'] },
      extraSkills: { number: '2' },
      occupationPoints: 7
    }
  }
];